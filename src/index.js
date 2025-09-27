const express =require('express')
// const mongoose = require('mongoose')
const redis = require('redis')
const {Client} = require('pg')

const PORT = 4000;
const app = express();

const REDIS_PORT=6379;
const REDIS_HOST= 'redis'

const redisClient = redis.createClient({
 url: `redis://${REDIS_HOST}:${REDIS_PORT}`
})
redisClient.on('error',(err) => console.log('faild to connect redis',err))
redisClient.on('connect',() => console.log('connected to redis...'))
redisClient.connect()

const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_HOST = 'postgres';
const DB_PORT = 5432;

const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
const client = new Client ({
  connectionString: URI
})
client
.connect()
.then(()=>console.log('connected to postgres db...'))
.catch((err)=> console.log('failed to connect db',err));



// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_HOST = 'mongo';
// const DB_PORT = 27017;
// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
// mongoose.connect(URI).then(()=>console.log('connected to db...')).catch((err)=> console.log('failed to connect db',err));


app.get('/',(req,res)=>{
  redisClient.set('product','product....')
  res.send('<h1>Hello Adhm!</h1>')
})

app.get('/data',async(req,res)=>{
  const product = await redisClient.get('product')
  res.send(`<h1>Hello Adhm!</h1> <h2>${product}</h2>`)
})

app.listen(PORT,()=>console.log(`app is running in port ${PORT}`))