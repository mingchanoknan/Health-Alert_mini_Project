const express = require("express");
const pool = require("../config/config_promise");
router = express.Router();

router.get('/getEdableTimebyId/:id', async (req, res, next) => {
    const conn = await pool.getConnection();
    let listTime = []
    try {
        const [row, field] = await conn.query(
            `SELECT morning_time, noon_time, evening_time, night_time FROM Reminder WHERE patient_id = ?`,
            [req.params.id]
        )
        for (let x of row) {
            if (x.morning_time != null && listTime.findIndex(item => item == x.morning_time) == -1) {
                listTime.push(x.morning_time)
            }
            if (x.noon_time != null && listTime.findIndex(item => item == x.noon_time) == -1) {
                listTime.push(x.noon_time)
            }
            if (x.evening_time != null && listTime.findIndex(item => item == x.evening_time) == -1) {
                listTime.push(x.evening_time)
            }
            if (x.night_time != null && listTime.findIndex(item => item == x.night_time) == -1) {
                listTime.push(x.night_time)
            }
        }
        res.send(listTime).status(200)
    } catch (err) {
        console.log(err)
        res.status(404).json(err.message)
    } finally {
        conn.release()
    }
});

router.get('/getMedicineToEat/:id', async (req, res, next) => {
    const conn = await pool.getConnection();
    const id = req.params.id
    try {
        let today_addsec = new Date(Date.now() + 60 * 1000)
        let today_delsec = new Date(Date.now() - 60 * 1000)
        let time_end = today_addsec.getHours() + ":" + today_addsec.getMinutes() + ":" + today_addsec.getSeconds();
        let time_start = today_delsec.getHours() + ":" + today_delsec.getMinutes() + ":" + today_delsec.getSeconds();
        // time_end = "13:32:0"
        // time_start="13:29:0"
        
        const [row, field] = await conn.query(
            `SELECT medicine_id, medicine_name,amount_per_time,medicine_image FROM Reminder JOIN Medicine USING (medicine_id) 
            WHERE patient_id = ? AND (morning_time BETWEEN '${time_start}' AND '${time_end}' OR noon_time BETWEEN '${time_start}' AND '${time_end}' OR evening_time BETWEEN '${time_start}' AND '${time_end}' OR night_time BETWEEN '${time_start}' AND '${time_end}')`,
            [id]
        )
        res.send(row).status(200)
    } catch (err) {
        console.log(err)
        res.status(404).json(err.message)
    } finally {
        conn.release()
    }
    
})

router.get('/timeToEatMedicineComing/:id', async (req, res, next) => {
    const conn = await pool.getConnection();
    const id = req.params.id
    const today = new Date()
  
    let time_start = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let hours = parseInt(today.getHours()) 
    // time_start = "12:00:00"
    // hours = 12
    // let checkPeriodTime = () => {
    //     if (hours > 3 && hours < 11) {
    //         return "morning_time"
    //     }
    //     else if (hours > 11 && hours < 16){
    //         return "noon_time"
    //     }
    //     else if (hours > 16 && hours < 21){
    //         return "evening_time"
    //     }
    //     else {
    //         return "nitght_time"
    //     }
    // }
    let checkPeriodTime =""
    if (hours > 3 && hours < 11) {
                checkPeriodTime = "morning_time"
            }
            else if (hours > 11 && hours < 16){
                checkPeriodTime = "noon_time"
            }
            else if (hours > 16 && hours < 21){
                checkPeriodTime = "evening_time"
            }
            else {
                checkPeriodTime = "night_time"
            }
    
    try {
        const [row, field] = await conn.query(
            `SELECT ${checkPeriodTime} AS time,medicine_id, medicine_name,amount_per_time,medicine_image,treatment,number_of_times_per_day,period 
            FROM Reminder JOIN Medicine USING (medicine_id)
            WHERE patient_id = ? AND (morning_time BETWEEN '${time_start}' AND '23:59:59' OR noon_time BETWEEN '${time_start}' AND '23:59:59' OR evening_time BETWEEN '${time_start}' AND '23:59:59' OR night_time BETWEEN '${time_start}' AND '23:59:59')
            ORDER BY ${checkPeriodTime}`
            , [id])
        
        res.send(row).status(200)
    }catch (err) {
        console.log(err)
        res.status(404).json(err.message)
    } finally {
        conn.release()
    }
})

exports.router = router;