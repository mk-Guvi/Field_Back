const express = require('express')
const router = express.Router()

const { isSignedIn, isAuthenticated,getUserById, isAlumini} = require('../controllers/auth')
const {rejectstudentDates,acceptstudentpendingDates,postAluminiDetails,getAluminiDetails}=require("../controllers/alumini")
router.param("userId", getUserById)

router.get('/alumini/:userId', isSignedIn, isAuthenticated,isAlumini,(req,res)=>{
    let g=req.query.user
    res.json({"message":"hi","query":g})})
router.post('/alumini/:userId', isSignedIn, isAuthenticated,isAlumini,postAluminiDetails)

router.get('/alumini/getDetails/:userId', isSignedIn, isAuthenticated,isAlumini,getAluminiDetails)

router.get('/alumini/acceptDate/:userId', isSignedIn, isAuthenticated,isAlumini,acceptstudentpendingDates)
router.get('/alumini/rejectDate/:userId', isSignedIn, isAuthenticated,isAlumini,rejectstudentDates)







module.exports = router

