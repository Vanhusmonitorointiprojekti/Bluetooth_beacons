DROP TABLE profiles;
DROP TABLE beacons;
DROP TABLE location_types;
DROP TABLE spaces;
DROP TABLE receivers;
DROP TABLE beacon_detections;
DROP TABLE tenants;

CREATE TABLE profiles (
profile_id char(20) NOT NULL,
profile_type INT NOT NULL,
description char(50),
PRIMARY KEY (profile_id)
);

CREATE TABLE beacons (
beacon_id char(20) NOT NULL,
beacon_name char(20) NOT NULL,
PRIMARY KEY (beacon_id)
);

CREATE TABLE location_types (
location_type_id char(20) NOT NULL,
location_type int NOT NULL,
description char(50),
PRIMARY KEY (location_type_id)
);

CREATE TABLE spaces (
space_id char(20) NOT NULL,
space_name char(20) NOT NULL,
location_type_id char(20),
PRIMARY KEY (space_id),
FOREIGN KEY (location_type_id) REFERENCES location_types(location_type_id)
);

CREATE TABLE receivers (
receiver_id char(20) NOT NULL,
receiver_name char(20) NOT NULL,
space_id char(20),
PRIMARY KEY (receiver_id),
FOREIGN KEY (space_id) REFERENCES spaces(space_id)
);

# huom ei pk:ta
CREATE TABLE beacon_detections (
receiver_id char(20),
beacon_id char(20),
signal_db int DEFAULT NULL,
measurement_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (receiver_id) REFERENCES receivers(receiver_id),
FOREIGN KEY (beacon_id) REFERENCES beacons(beacon_id)
);

CREATE TABLE tenants (
tenant_id char(20) NOT NULL,
space_id char(20),
beacon_id char(20),
profile_id char(20),
tenant_firstname char(50) NOT NULL,
tenant_lastname char(50) NOT NULL,
PRIMARY KEY (tenant_id),
FOREIGN KEY (space_id) REFERENCES spaces(space_id),
FOREIGN KEY (beacon_id) REFERENCES beacons(beacon_id),
FOREIGN KEY (profile_id) REFERENCES profiles(profile_id)
);

CREATE TABLE tokens (
id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
token VARCHAR(30) NOT NULL
);

INSERT INTO profiles (profile_id, profile_type, description) VALUES
('2020PM1', 1, 'rajoitettu omaan pienkotiin'), ('2020PM2', 2, 'liikkuu vapaasti'),
('2020PM3', 3, 'muut pienkodit ei sallittu');

INSERT INTO beacons (beacon_id, beacon_name) VALUES ('e2:e3:23:d1:b0:54', 'SOTE_OS1_b054'),
('d6:2c:ca:c0:d4:9c', 'SOTE_OS1_d49c'),
('f2:36:00:21:c0:50', 'SOTE_OS1_c050'),
('e2:18:ef:c9:66:f4', 'SOTE_OS1_66f4');

INSERT INTO location_types (location_type_id, location_type, description) VALUES
('2020LTM1', 1, 'pienkoti'), ('2020LTM2', 2, 'yleinen tila'), ('2020LTM3', 3, 'tie ulos'),
('2020LTM4', 4, 'ulko-ovi');

INSERT INTO spaces (space_id, space_name, location_type_id) VALUES 
('2020SM1', 'A1', '2020LTM1'), ('2020SM2', 'A2', '2020LTM1'), ('2020SM3', 'A3', '2020LTM1'),
('2020SM4', 'A4', '2020LTM1'),
('2020SM5', 'B', '2020LTM2'), ('2020SM6', 'Aula1', '2020LTM3'), ('2020SM7', 'Ovi1', '2020LTM4');

INSERT INTO receivers (receiver_id, receiver_name, space_id) VALUES
('Receiver1', 'RCVR1', '2020SM1'),
('Receiver2', 'RCVR2', '2020SM5'),
('Receiver3', 'RCVR3', '2020SM6'),
('Receiver4', 'RCVR4', '2020SM7');

INSERT INTO tenants (tenant_id, space_id, beacon_id, profile_id, tenant_firstname, tenant_lastname) VALUES
('2020TNT1', '2020SM1', 'e2:e3:23:d1:b0:54', '2020PM1', 'Albert', 'Einstein'),
('2020TNT2', '2020SM1', 'd6:2c:ca:c0:d4:9c', '2020PM2', 'Marie', 'Curie'),
('2020TNT3', '2020SM2', 'f2:36:00:21:c0:50', '2020PM2', 'Charles', 'Darwin'),
('2020TNT4', '2020SM2', 'e2:18:ef:c9:66:f4', '2020PM3', 'Maria', 'Goeppert-Mayer');
