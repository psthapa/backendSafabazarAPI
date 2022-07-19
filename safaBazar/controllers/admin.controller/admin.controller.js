const Admin=require('../../safaBazarAdmin/admin.model');
const CryptoJS=require("crypto-js")
const jwt=require('jsonwebtoken')

function getadmin(req,res,next){
    console.log("inside get users")
    
    Admin.find()
    .then((admin)=>{
        (res.send(admin))})
    .catch((err)=>{res.send(err)});
}
function login(req, res, next) {
    console.log("inside login")
    Admin.findOne({ name: req.body.name }).select('+password')
        .then((user) => {
            
            console.log("inside then")
            console.log(user.name);
            console.log(" password is")
            console.log(user.password);
              
         
            
            console.log("req password is")
            console.log(req.body.password)
            
            if (user.name == req.body.name && user.password == req.body.password) {
                console.log("before accesstoken")
                const{password , ...others}=  user._doc;
                const accessToken=jwt.sign({id:user._id,
                    isAdmin:user.isAdmin},
                     process.env.jwt_sec,
                     {expiresIn:'2d'}
                )
                console.log(accessToken) 
            console.log("loged in successfully")
            return res.status(200).json({...others, accessToken})
          
            }
            else {
            if(user.password!==req.body.password){

                const logEr = " password error"
                return next(logEr);
            }
            }
             
          
        })
        .catch(e => {
            const errId="user id not found"
            console.log("inside exception error")
            next(errId);
        })


}
module.exports={getadmin,login}