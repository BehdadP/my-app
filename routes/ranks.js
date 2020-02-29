const express = require('express');
const connection = require('../helpers/connection');
const query = require('../helpers/query');
const router = express.Router();
const dbConfig = require('../dbConfig');
router.get('/', async (req, res,next) => {
    const  order  = req.query.order;
    const date=req.query.aq_date? req.query.aq_date:null;
    console.log(date);
    if (order !== 'asc' && order !== 'desc') {
      let err = new Error('Invalid sort order');
        err.status = 503;
        next(err);
    }
    const conn = await connection(dbConfig).catch(console.log);
    const ranks =  await query(conn,
        `select tracker_uid ,max(speed) as rank,aquisition_time  from 
        data  group by tracker_uid`+(date? ` having from_unixtime(aquisition_time,'%Y-%m-%d')=?`:'')+ ` order by rank `+order,[date]);
       res.send(ranks);
    
      });

module.exports = router;
