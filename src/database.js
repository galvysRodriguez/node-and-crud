//conexion con la base de datos
const mysql = require('mysql');
const {promisify} = require('util')
const {database } = require('./keys');
const pool = mysql.createPool(database);

pool.getConnection((err, conection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONECTION_LOST'){
            console.error(' LA CONEXION CON LA BASE DE DATOS HA SIDO CERRADA')
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error(' LA CONEXION CON LA BASE DE DATOS SON MUCHAS')
        }
        if(err.code === 'ECONNREFUSED'){
            console.error(' LA CONEXION CON LA BASE DE DATOS HA SIDO RECHAZADA')
        }
    }
    if(conection) conection.release();
    return;
});
pool.query = promisify(pool.query)
module.exports = pool
