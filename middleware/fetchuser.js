var jwt = require('jsonwebtoken');  //import json web token
const webtoken = '554$0@32'
const fetchusers = (req,res,next)=>{
    //Get the user from the jwt token & add id to req to object
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:'Please authenticate using a valid token'})
    }
    try {
       const data = jwt.verify(token, webtoken)
        req.user = data.user
        next()
    }catch (error) {
        console.error(error.message)
        res.status(401).send({error:'Please authenticate using a valid token'})
      }
}
module.exports = fetchusers