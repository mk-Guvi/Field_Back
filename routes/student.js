const express = require('express')
const router = express.Router()

const { isSignedIn, isAuthenticated,getUserById} = require('../controllers/auth')
const {postStudentDetails,getStudentDetails,sendDateRequest,getSelectedDates}=require("../controllers/student")
router.param("userId", getUserById)

router.get('/student/:userId', isSignedIn, isAuthenticated,(req,res)=>{res.json({"message":"hi"})})

router.post('/student/:userId', isSignedIn, isAuthenticated,postStudentDetails)


router.get('/student/getDetails/:userId', isSignedIn, isAuthenticated,getStudentDetails)
router.get('/student/getSelectedDates/:userId', isSignedIn, isAuthenticated,getSelectedDates)

router.put('/student/sendDateRequest/:userId', isSignedIn, isAuthenticated,sendDateRequest)




module.exports = router

