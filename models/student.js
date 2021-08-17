const mongoose = require('mongoose')
const { Schema, model } = mongoose

const studentSchema=new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:true,
    unique:true
  },
    pendingDate: {
        type: Array,
        default:[]
      },
      acceptedDate: {
        type: Array,
        default:[]
      },
      status:{
        type: Number,
        default:0
      },
      slots:{
        type: Number,
        default:0
      },
      AluminiId: {
        type: Schema.Types.ObjectId,
        ref: 'Alumini',
        
      },
   

},
{ timestamps: true }, //whenever a new entry is created in this schema it will store its time in db
)
const Student = model('Student', studentSchema)

module.exports = Student