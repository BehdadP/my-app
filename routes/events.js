const express = require('express');
const connection = require('../helpers/connection');
const query = require('../helpers/query');
const router = express.Router();
const dbConfig = require('../dbConfig');
router.get('/', async (req, res) => {
    const tuid = req.query.tracker_uid;
    if (!tuid) {
        return res.status(400).send(
            {
                status: 400,
                result: `Missing Parameter tracker_uid`
            });
    }
    const date = req.query.aq_date ? req.query.aq_date : null;
    const conn = await connection(dbConfig).catch(console.log);
    let events = await query(conn,
        `select  uid, tracker_uid, angle,speed,aquisition_time,visible_satellites,
        engine,event_id,event_info,insert_time,mileage,voltage,driver_ibutton,hdop  
        from data where tracker_uid=?${(date ? `&& from_unixtime(aquisition_time,'%Y-%m-%d')=?` : '')}`, [tuid, date]).catch(console.log);
    res.send(events);
});

module.exports = router;
