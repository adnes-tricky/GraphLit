const { Router }= require('express')
const RegisterUser = require('../../models/RegisterUser.js')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')
const router = Router()

router.post('/', async (req,res) => {
    try{
        //query for existing user returns one record
        let foundUser = await RegisterUser.findOne({email: req.body.email});
        var message={
            "description":"",
            "user":"",
            "token":""
        }
        if (foundUser!=null) {
            let submittedPass = req.body.password;
            let storedPass = foundUser.password;
            
            var passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                let usrname = foundUser.username;

                //JWT Token generration
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                let data = {
                    time: Date(),
                    userId: usrname,
                }

                var token = jwt.sign(data, jwtSecretKey);
                console.log(token);
                
                message["description"]="Login Successful";
                message["user"]=usrname;
                message["token"]=token;

                res.status(200).json({"message": message});
                
            } else {
                message["description"]="Incorrect Password";
                res.status(200).json({"message": message});
            }
        }
        else {
            let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            await bcrypt.compare(req.body.password, fakePass);
            message["description"]="Incorrect email";
            res.status(200).json({"message": message})   
        }
    } catch(err){
        res.status(500).json({message: err.message});
    }
})

module.exports = router