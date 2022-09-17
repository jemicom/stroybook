const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const mariadb = require('mariadb');

const PORT = process.env.PORT || 3500; 

const pool = mariadb.createPool({
    host : process.env.HOST, 
    user: process.env.ROOT,
    database: process.env.DATABASE,
    password: process.env.DATABASEPWD,
    connectionLimit : 5
})

app.use( cors());
app.use( express.json());
app.use( express.urlencoded({ extended : false}));


app.listen( PORT, ()=>{
    console.log( `my storybook server listing ${PORT}`);
})

app.get('/', async (req, res)=>{
    //res.send('Hello express get root');
    let conn; 
    try{
        conn = await pool.getConnection();
        const query = 'SELECT * FROM user_info';
        const rows = await conn.query(query);
        //console.log( rows );
        res.send( rows );
    }catch(err){
        throw err; 
    }finally{
        if(conn){
            conn.end();
        }
    }
})

app.post('/idpost' , (req, res)=>{
    const serverid = req.body.idpost;
    console.log(  req.url,  serverid );

    const sendtext = { data : `server 3500 : ${serverid}`}
    res.send(sendtext);
})

app.post('/login' , async (req, res)=>{
    console.log( req.url, req.body.ui_id );
    let conn; 
    try{
        conn = await pool.getConnection();
        const query = `SELECT count(1) as cnt from user_info  WHERE  ui_id = '${req.body.ui_id}';`
        const rows = await conn.query(query);
        console.log( rows );
        res.json( rows[0].cnt == 1 ? { success : true} : { success : false})
    }catch(err){
        throw err; 
    }finally{
        if(conn) conn.end();
    }
})

app.put('/update' , async (req, res)=>{
    console.log( req.url, req.body.ui_id );
    let conn; 
    try{
        conn = await pool.getConnection();
        const query = `UPDATE user_info SET ui_name = "${req.body.ui_name}" , ui_email = "${req.body.ui_email}" wHERE ui_id = "${req.body.ui_id}";`
        const rows = await conn.query(query);
        console.log( rows );
        // OkPacket { affectedRows: 1, insertId: 0n, warningStatus: 0 }
        res.json( rows.affectedRows ? { success : true} : { success : false})
    }catch(err){
        throw err; 
    }finally{
        if(conn) conn.end();
    }
})

app.delete('/delete' , async (req, res)=>{
    console.log( req.url, req.body.ui_id );
    let conn; 
    try{
        conn = await pool.getConnection();
        const query = `DELETE FROM user_info WHERE  ui_id = '${req.body.ui_id}';`
        const rows = await conn.query(query);
        console.log( rows );
        // OkPacket { affectedRows: 1, insertId: 0n, warningStatus: 0 }
        res.json( rows.affectedRows ? { success : true} : { success : false})
    }catch(err){
        throw err; 
    }finally{
        if(conn) conn.end();
    }
})

app.post('/sign-up' , async (req, res)=>{
    console.log( req.url, req.body.ui_id );
    let conn; 
    try{
        conn = await pool.getConnection();
        const checkQuery = `SELECT count(1) as cnt from user_info  WHERE  ui_id = '${req.body.ui_id}';`
        const checkRows = await conn.query(checkQuery);
        console.log( checkRows);

        if( checkRows[0].cnt == 1){
            const params = { success : `${req.body.ui_id}는 이미 존재합니다.` }

            return res.json( params );
        }

        const query = ` INSERT INTO user_info(ui_id, ui_pwd, ui_email, ui_name)
        VALUES('${req.body.ui_id}', '${req.body.ui_pwd}', '${req.body.ui_email}', '${req.body.ui_name}');`
        const rows = await conn.query(query);
        console.log( rows );
        // OkPacket { affectedRows: 1, insertId: 0n, warningStatus: 0 }
        res.json( rows.affectedRows ? { success : true} : { success : false})
    }catch(err){
        throw err; 
    }finally{
        if(conn) conn.end();
    }
})