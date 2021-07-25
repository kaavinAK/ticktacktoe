let mongoose = require('mongoose')

let Schema = mongoose.Schema

let Usertype = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    score:{
        type:String,
        default:0
        
    }
})
let User= mongoose.model("user",Usertype)
module.exports={User}