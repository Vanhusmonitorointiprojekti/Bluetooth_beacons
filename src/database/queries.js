global.GET_all_detections = 
            ' \
            SELECT * \
            FROM beacon_detections \
            order by measument_time desc limit 10 \
            ';

global.GET_beacon_info = 
            ' \
            SELECT * \
            FROM beacon_info \
            ';

global.GET_receiver_info =
            ' \
            SELECT * \
            FROM receiver_info \
            ';

global.GET_last_beacon_detections =
            ' \
            SELECT * \
            FROM beacon_detections \
            ORDER BY measument_time DESC \
            LIMIT 10 \
            ';

global.GET_beacon_locations =
            ' \
            (SELECT d.receiver_id, i.beacon_user, d.signal_db, d.measument_time FROM beacon_detections d \
            JOIN beacon_info i ON (d.beacon_id = i.beacon_id) WHERE d.beacon_id = "e2:e3:23:d1:b0:54" ORDER BY measument_time DESC limit 1) \
            UNION (SELECT d.receiver_id, i.beacon_user, d.signal_db, d.measument_time FROM beacon_detections d JOIN beacon_info i ON (d.beacon_id = i.beacon_id) WHERE d.beacon_id = "d6:2c:ca:c0:d4:9c" ORDER BY measument_time DESC limit 1) \
            UNION (SELECT d.receiver_id, i.beacon_user, d.signal_db, d.measument_time FROM beacon_detections d JOIN beacon_info i ON (d.beacon_id = i.beacon_id) WHERE d.beacon_id = "f2:36:00:21:c0:50" ORDER BY measument_time DESC limit 1); \
            ';
            
global.GET_detections_ranneke1 = 
            ' \
            SELECT( \
                \
                SELECT signal_db \
                FROM beacon_detections \
                WHERE receiver_id = "Receiver1" \
                AND beacon_id = "e2:e3:23:d1:b0:54" \
                ORDER BY measument_time DESC \
                LIMIT 1 ) AS AVG_Receiver1_Ranneke1,\
                \
                ( \
                SELECT signal_db \
                FROM beacon_detections \
                WHERE receiver_id = "Receiver2" \
                AND beacon_id = "e2:e3:23:d1:b0:54" \
                ORDER BY measument_time DESC \
                LIMIT 1 ) AS AVG_Receiver2_Ranneke1,\
                \
                ( \
                SELECT signal_db \
                FROM beacon_detections \
                WHERE receiver_id = "Receiver3" \
                AND beacon_id = "e2:e3:23:d1:b0:54" \
                ORDER BY measument_time DESC \
                LIMIT 1 ) AS AVG_Receiver3_Ranneke1 \
                \
            ';

global.GET_detections_ranneke2 = 
            ' \
            SELECT( \
                \
                SELECT signal_db \
                FROM beacon_detections \
                WHERE receiver_id = "Receiver1" \
                AND beacon_id = "d6:2c:ca:c0:d4:9c" \
                ORDER BY measument_time DESC \
                LIMIT 1 ) AS AVG_Receiver1_Ranneke2,\
                \
                ( \
                SELECT signal_db \
                FROM beacon_detections \
                WHERE receiver_id = "Receiver2" \
                AND beacon_id = "d6:2c:ca:c0:d4:9c" \
                ORDER BY measument_time DESC \
                LIMIT 1 ) AS AVG_Receiver2_Ranneke2,\
                \
                ( \
                SELECT signal_db \
                FROM beacon_detections \
                WHERE receiver_id = "Receiver3" \
                AND beacon_id = "d6:2c:ca:c0:d4:9c" \
                ORDER BY measument_time DESC \
                LIMIT 1 ) AS AVG_Receiver3_Ranneke2 \
                \
            ';

global.GET_detections_ranneke3 =
            ' \
            SELECT( \
                \
                SELECT signal_db \
                FROM beacon_detections \
                WHERE receiver_id = "Receiver1" \
                AND beacon_id = "f2:36:00:21:c0:50" \
                ORDER BY measument_time DESC \
                LIMIT 1 ) AS AVG_Receiver1_Ranneke3,\
                \
                ( \
                SELECT signal_db \
                FROM beacon_detections \
                WHERE receiver_id = "Receiver2" \
                AND beacon_id = "f2:36:00:21:c0:50" \
                ORDER BY measument_time DESC \
                LIMIT 1 ) AS AVG_Receiver2_Ranneke3,\
                \
                ( \
                SELECT signal_db \
                FROM beacon_detections \
                WHERE receiver_id = "Receiver3" \
                AND beacon_id = "f2:36:00:21:c0:50" \
                ORDER BY measument_time DESC \
                LIMIT 1 ) AS AVG_Receiver3_Ranneke3\
                \
            ';

global.GET_detections_ranneke4 =
            ' \
            SELECT( \
                \
                SELECT signal_db \
                FROM beacon_detections \
                WHERE receiver_id = "Receiver1" \
                AND beacon_id = "e2:18:ef:c9:66:f4" \
                ORDER BY measument_time DESC \
                LIMIT 1 ) AS AVG_Receiver1_Ranneke4,\
                \
                ( \
                SELECT signal_db \
                FROM beacon_detections \
                WHERE receiver_id = "Receiver2" \
                AND beacon_id = "e2:18:ef:c9:66:f4" \
                ORDER BY measument_time DESC \
                LIMIT 1 ) AS AVG_Receiver2_Ranneke4,\
                \
                ( \
                SELECT signal_db \
                FROM beacon_detections \
                WHERE receiver_id = "Receiver3" \
                AND beacon_id = "e2:18:ef:c9:66:f4" \
                ORDER BY measument_time DESC \
                LIMIT 1 ) AS AVG_Receiver3_Ranneke4 \
                \
            ';

global_DELETE_beacon = 
            ' \
            DELETE \
            FROM beacon_info \
            WHERE beacon_id = ? \
            ';

global_INSERT_beacon =
            ' \
            INSERT INTO beacon_info \
            (beacon_user, beacon_id) \
            VALUES (?,?) \
            ';