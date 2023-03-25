const { Router }= require('express')
const RegisterUser = require('../../models/RegisterUser.js')
const bcrypt= require('bcrypt')
const router = Router()

router.get('/:id', async(req, res) => {
    var {id} = req.params
    try{
        var users = await RegisterUser.findById(id)
        if(!users) throw new Error('No users')
        else res.status(200).json(users)
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    var newUser = new RegisterUser(req.body)
    let usrexst= await RegisterUser.exists({username: newUser.username});
    let emailexst= await RegisterUser.exists({email: newUser.email});
    try{
        if (!usrexst&&!emailexst){
            newUser.password = await bcrypt.hash(newUser.password, 10);
            var users = await newUser.save()
            console.log(newUser)
            if(!users) throw new Error('Something went wrong saving the users')
            res.status(200).json(users)
            console.log("Success entry");
        }
        else if(!usrexst&&emailexst) {
            let message="Account for this email exits";
            console.log(message);
            res.status(500).json({message: message});
        }
        else if(!emailexst&&usrexst){
            let message="Username is already used";
            console.log(message);
            res.status(500).json({message: message});
        }
        else{
            let message="Already registered user";
            console.log(message);
            res.status(500).json({message: message});
          }
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.put('/:id', async(req,res)=> {
    var {id} = req.params
    try{
        var response = await RegisterUser.findByIdAndUpdate(id, req.body)
        if(!response) throw Error('Something went wrong')
        var updated = { ...response._doc, ...req.body}
        res.status(200).json(updated)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.delete('/:id', async (req,res) =>{
    var {id}=req.params
    try{
        var removed = await RegisterUser.findByIdAndDelete(id)
        if(!removed) throw Error('Something went wrong')
        res.status(200).json(removed)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router