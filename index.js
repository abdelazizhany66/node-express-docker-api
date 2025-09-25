import express from 'express'

const PORT = 4000;
const app = express();

app.get('/',(req,res)=>res.send('<h1>Hello Adhm!</h1>'))


app.listen(PORT,()=>console.log(`app is running in port ${PORT}`))