const express = require('express');
const connection = require('../helpers/connection');
const query = require('../helpers/query');
const router = express.Router();
const dbConfig = require('../dbConfig');
router.get('/', async (req, res, next) => {
    const order = req.query.order;
    const date = req.query.aq_date ? req.query.aq_date : null;
    if (order !== 'asc' && order !== 'desc') {
        return res.status(400).send(
            {
                status: 400,
                result: `Missing 'order' Parameter`
            });
    }
    const conn = await connection(dbConfig).catch(console.log);
    const ranks = await query(conn,
        `select tracker_uid ,max(speed) as rank,aquisition_time  from 
         data  group by tracker_uid ${(date ? ` having from_unixtime(aquisition_time,'%Y-%m-%d')=?` : '')} 
         order by rank ${order}`, [date]).catch(console.log);
    res.send(ranks);

});

module.exports = router;
