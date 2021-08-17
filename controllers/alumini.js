const User = require('../models/user')
const Student = require('../models/student')
const Alumini=require("../models/alumini")
exports.getAluminiDetails=(req,res)=>{

 let id=req.profile._id
  
  Alumini.findOne({user:id}).populate("user","name role").exec((err,alumini)=>{
    if (err) {
      return res.status(400).json({ error: 'No Alumini found' })
    }
    
    return res.json(alumini)

  })

}

exports.acceptstudentpendingDates=(req,res)=>{

    let id=req.profile._id
     let studentId=""
     let date=[]
     let named=""

     Student.findOne({status:1}).populate('user').exec((err,student)=>{
        if (err) {
          return res.status(400).json({ error: 'No Student found' })
        }
        studentId+=student._id; 
        named+=student.user.name
        date.push(student.pendingDate[0]);
        console.log(studentId)
        console.log(date)
     Alumini.findOne({user:id,studentId:studentId}).exec((err,alumini)=>{
       if (err) {
         return res.status(400).json({ error: 'No Alumini/Student found' })
       }
       let AcceptedDates=date[0]
       Alumini.findOneAndUpdate(
        { user:id},
        {$push: {"acceptedDates": AcceptedDates} ,
        $pull: { "pendingDates": date[0] },
       status:0,
    },
        { new: true }, //it returns the updated data not the old one
        (err, eachData) => {
          if (err) {
            return res.status(400).json({
              error: 'Unable to update the dates',
            })
          }
          Student.findOneAndUpdate(
            { status:1},
         {$set:{ status:0},$inc:{"slots":1},$pull:{"pendingDate":date[0]},$push:{"acceptedDate":date[0]}}
        ,
           
            { new: true }, //it returns the updated data not the old one
            (err, each) => {
              if (err) {
                return res.status(400).json({
                  error: `Unable to update details of ${student.user.name}`,
                })
              }
              res.status(200).json({
                message: `successfully accpeted ${student.user.name} request`,
              })
           
            },
          )
       
        },
      )
 

                })

                  
   
     })

     


   
   }


   exports.postAluminiDetails=(req,res)=>{
let body=req.body
User.findOne({_id:body.user,role:1}).exec((err,result)=>{
    if (err) {
        return res.status(400).json({ error: 'No Alumini found' })
      }
      const alumini=new Alumini(body)
  return alumini.save(body).then(data=>{
        res.status(200).json({"message":`Alumini saved successfully`})
    }).catch((e)=>{console.log(e);res.status(400).json({"error":"unable to save Alumini"})})
  
  

})

    
     
    
   }

   exports.rejectstudentDates=(req,res)=>{
       
    let id=req.profile._id
    console.log(id)
    let studentId=""
    let date=[]
    let named=""

    Student.findOne({status:1}).populate('user').exec((err,student)=>{
       if (err) {
         return res.status(400).json({ error: 'No Student found' })
       }
       studentId+=student._id; 
       named+=student.user.name
       date.push(student.pendingDate[0]);
       console.log(studentId)
       console.log(date)
    Alumini.findOne({user:id,studentId:studentId}).exec((err,alumini)=>{
      if (err) {
        return res.status(400).json({ error: 'No Alumini/Student found' })
      }
      let AcceptedDates={}
      AcceptedDates[named]=date[0]
      Alumini.findOneAndUpdate(
       { user:id},
       {$pull: { "pendingDates": date[0] },
      status:0,
   },
       { new: true }, //it returns the updated data not the old one
       (err, eachData) => {
         if (err) {
           return res.status(400).json({
             error: 'Unable to update the dates',
           })
         }
         Student.findOneAndUpdate(
           { status:1},
        {$set:{ status:0},$pull:{"pendingDate":date[0]}},
          
           { new: true }, //it returns the updated data not the old one
           (err, each) => {
             if (err) {
               return res.status(400).json({
                 error: `Unable to update details of ${student.user.name}`,
               })
             }
             res.status(200).json({
               message: `successfully rejected ${student.user.name} request`,
             })
          
           },
         )
      
       },
     )


               })

                 
  
    })

    


   }