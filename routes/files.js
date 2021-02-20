
const router =require('express').Router()
const multer=require('multer')
const File = require('../model/file')
const {v4: uuid4} =require('uuid')
const path=require('path')

let storage=multer.diskStorage({

        destination:(req, file, cb) => cb(null,'uploads/'),
        filename: (req, file, cb) =>{
         const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
         cb(null,uniqueName)

        }

})

let upload =multer({
     storage,
     limit:{fileSize: 1000000 * 100 }

}).single('myfile');

//Post endpoints
router.get('/',(req,res)=>{
    res.send("Madarchod life")
})

router.post('/',(req,res)=>{

//validate request


//store file
upload(req,res, async(err)=>{


    if(!req.file)
{
    return res.json({error:'all fiels required'});
}



    if(err){
        return res.status(500).send({error:err.message})
    }
   //store into database
  const file =new File ({
          filename:req.file.fieldname,
          uuid:uuid4(),
          path:req.file.path,
          size:req.file.size


  });

const response = await file.save();

return res.json({file:`${process.env.APP_BASE_URL}/files/${response.uuid}`})


})



//response link



})

router.post('/send',(req,res)=>{
         
    const {uuid,emailTo,emailFrom}=req.
    if(!uuid || !emailTo || !emailFrom)
    {

        return res.status(222).send({error:'all feild required'})
    }
//database 

const file =File.findOne({uuid:uuid})
if(file.send)
{
    return res.send({error:'Email already sent'})
}
  
find.sender=emailFrom;
find.receiver=emailTo;
const response =file.save()

//send mail
   const sendMail = require('../services/mailService');
sendMail({
  from: emailFrom,
  to: emailTo,
  subject: 'inShare file sharing',
  text: `${emailFrom} shared a file with you.`,
  html: require('../services/emailTemplate')({
            emailFrom, 
            downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}?source=email` ,
            size: parseInt(file.size/1000) + ' KB',
            expires: '24 hours'
        })
}).then(() => {
  return res.json({success: true});
}).catch(err => {
  return res.status(500).json({error: 'Error in email sending.'});
});


});



module.exports=router