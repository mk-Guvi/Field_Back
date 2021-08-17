const Alumini = require("../models/alumini")
const Student=require("../models/student")

exports.postStudentDetails=(req,res)=>{
    let body=req.body
    User.findOne({_id:body.user,role:0}).exec((err,result)=>{
        if (err) {
            return res.status(400).json({ error: 'No Student found' })
          }
          const student=new Student(body)
      return student.save(body).then(data=>{
            res.status(200).json({"message":`Student saved successfully`})
        }).catch((e)=>{console.log(e);res.status(400).json({"error":"unable to save Student"})})
      
      
    
    })
}

exports.getStudentDetails=(req,res)=>{

    let id=req.profile._id
    
     Student.findOne({user:id}).populate("user","name role").exec((err,student)=>{
        
       if (err) {
         return res.status(400).json({ error: 'No Student found' })
       }
       
       return res.json(student)
   
     })
   
   }
   
exports.sendDateRequest=async(req,res)=>{
    let id=req.profile._id
    let studId=req.body.studentId
    let AlumId=req.body.AluminiId
    let date=req.body.pendingDate
    
    
    
    console.log(req.body)
    const findSTudent=await Student.find({status:1}).populate("user")
    console.log(date)
    console.log(findSTudent,"sad")
    let Dates={}
    Dates[req.profile.name]=date
    console.log(Dates)
    if(findSTudent.length!==0){
        return res.json({ error: 'SomeOne Has Already requested' })
    }
    else{
     const checkSlots=await Student.find({user:id,slots:{$lt:2}})
     
    if(checkSlots.length!==0){
        Student.findOneAndUpdate(
            { user: id },
            {$set: { "status":1,"AluminiId":AlumId },$push: {pendingDate: Dates}
       }, //since its array we use push
            { new: true,upsert:true }, //it returns the updated data not the old one
            (err, each) => {
              if (err) {
                return res.json({
                  error: 'Unable to save the Date',
                })
              }
              Alumini.findOneAndUpdate(
                { _id: AlumId},
                {$set: { "status":1,"studentId":studId },$push: {"pendingDates": Dates}//this indicates there are pending request in alumini
           },
                { new: true ,upsert:true},
                //it returns the updated data not the old onen
                (err, data) => {
                  if (err) {
                    return res.json({
                      error: 'Unable to save the date in Alumini',
                    })
                  }
                  res.json({"message":"Successfuly sent request"})
                },
              )
            },
          ) 

    }else{
        return res.json({ error: 'Slots Full' })
    }
    }

   }

   exports.getSelectedDates=(req,res)=>{
      Alumini.find({},{acceptedDates:1}).exec((err,dates)=>{
        
        if (err) {
          return res.status(400).json({ error: 'No Dates found' })
        }
        
        return res.json(dates)
    
      })
   }