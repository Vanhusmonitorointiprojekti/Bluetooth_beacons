var model = module.exports;
var r = require('rethinkdb');
var config = require('../config');

var DB_TABLE = 'tenant_statuses';

model.setup = function (callback) {
    console.log("Setting up RethinkDB...");
    
    r.connect(config.database).then(function(conn) {
        // Does the database exist?
        r.dbCreate(config.database.db).run(conn).then(function(result) {
            console.log("Database created...");
        }).error(function(error) {
            console.log("Database already created...");
        }).finally(function() {
            // Does the table exist?
            r.table(DB_TABLE).limit(1).run(conn, function(error, cursor) {
                var promise;
                if (error) {
                    console.log("Creating table...");
                    promise = r.tableCreate(DB_TABLE).run(conn);
                } else {    
                    promise = cursor.toArray();
                }

                // The table exists, setup the update listener
                promise.then(function(result) {
                    console.log("Setting up update listener...");
                    r.table(DB_TABLE).changes().run(conn).then(function(cursor) {
                        cursor.each(function(error, row) {
                            callback(row);
                        });
                    });
                }).error(function(error) {
                    throw error;
                });
            });
        });
    }).error(function(error) {
        throw error;
    });
}

model.getStatuses = function (callback) {
    r.connect(config.database).then(function(conn) {
        r.table(DB_TABLE).run(conn).then(function(cursor) {
            cursor.toArray(function(error, results) {
                if (error) throw error;
                callback(results);
            });
        }).error(function(error) {
            throw error;
        });
    }).error(function(error) {
        throw error;
    });
}

model.getTenant = function (id, callback) {
    r.connect(config.database).then(function(conn) {
        r.table(DB_TABLE).get(id).run(conn).then(function(result) {
            callback(result);
        }).error(function(error) {
            callback(error);
        });
    }).error(function(error) {
        callback(error);
    });
}

model.saveTenant = function (tenant, callback) {
    r.connect(config.database).then(function(conn) {
        r.table(DB_TABLE).insert(tenant).run(conn).then(function(results) {
            callback(true, results);
        }).error(function(error) {
            callback(false, error);
        });
    }).error(function(error) {
        callback(false, error);
    });
}

model.updateTenantStatus = function (id, new_status, measurement_time, location, callback) {
    r.connect(config.database).then(function(conn) {
        r.table(DB_TABLE).get(id).update({
            status: new_status,
            measurement_time: measurement_time,
            location: location,
            last_updated: r.now()
        })
        .run(conn).then(function(results) {
           callback(true, results);
        }).error(function(error) {
            callback(false, error);
        });
    }).error(function(error) {
        callback(false, error);
    });
}

model.updateTenantChecked = function (id, checked, callback) {
    r.connect(config.database).then(function(conn) {
        r.table(DB_TABLE).get(id).update({
            checked: checked
        })
        .run(conn).then(function(results) {
           callback(true, results);
        }).error(function(error) {
            callback(false, error);
        });
    }).error(function(error) {
        callback(false, error);
    });
}

//https://github.com/eh3rrera/rethinkdb-example