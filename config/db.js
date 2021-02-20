const mongoose =require('mongoose')

const url='mongodb://localhost/File_sharing';

function connectDb(){
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true, useCreateIndex:true})

     const connection=mongoose.connection;

     connection.once('open',()=>{
         console.log("database connected")
     }).catch( err=>{
         console.log(err)
     })


}

module.exports=connectDb