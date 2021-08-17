const mongoose = require('mongoose')
const { Schema, model } = mongoose

const aluminiSchema=new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:true,
    unique:true
  },
    pendingDates: {
        type: Array,
        default:[]
      },
      acceptedDates: {
        type: Array,
        default:[]
      },
      status:{
        type: Number,
        default:0
      },
      studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        },
   

},
{ timestamps: true }, //whenever a new entry is created in this schema it will store its time in db
)
const Alumini = model('Alumini', aluminiSchema)

module.exports = Alumini