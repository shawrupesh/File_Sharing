const router =require('express').Router()
const File = require('../model/file')
//const filepath=`${_dirname}/../${file.path}`
router.get('/:uuid',async(req,res)=>{
          
    const file =await File.findOne({uuid: req.params.uuid})
    console.log(file)
    if(!file)
    {
        return res.render('download',{error:'Link has been expired'})
    }
    const filepath=`${__dirname}/../${file.path}`
    return res.download(filepath)



})

module.exports=router