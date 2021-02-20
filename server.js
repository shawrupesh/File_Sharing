require('dotenv').config()
const { request } = require('express');
const express=require('express')
const app=express()
const ejs=require('ejs')

const path=require('path')
app.use(express.static('public'))

const PORT=process.env.PORT || 3000;

const connectDb=require('./config/db')
connectDb();
//template engine
app.set('views',path.join(__dirname, '/views'))
app.set('view engine','ejs')

//router

app.use('/api/files',require('./routes/files'))
app.use('/files',require('./routes/show'))
app.use('/files/download',require('./routes/download'))

app.listen(PORT,()=>{

    console.log(`listening o port ${PORT}`);
})