const {Schema, model} = require('mongoose')

// const BucketListeItemSchema = new Schema({
//     description: {
//         type: String,
//         required: true,
//     }, 
//     date: {
//         type: Date,
//         default: Date.now,
//     },
// })
const registerSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        default: Date.now,
    },
  })

const registerUser = model('registerUser', registerSchema)

module.exports = registerUser

// {
// 	"ID1" : "2023-02-08T16:17:56.713+00:00",
// 	"username" : "Adarsh v",
// 	"email" : "adarshv@abs.com",
// 	"password" : "$2b$10$sUCLWnLB39fzOAxZg5WXeOt06HNDnvVBi4pI.HiKCBez4uVP.ps5.",
// 	"phoneNo" : "9999999999",
// 	"dob" : "2023-02-01T00:00:00.000+00:00"
// }