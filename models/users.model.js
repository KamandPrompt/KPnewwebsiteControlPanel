const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({
    team:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    position:{
        type:String,
        required:true,
    },
    instaid:{
        type:String,   
        unique:true,
    },
    linkdin:{
        type: String,
        unique:true
    },
    image:{
        type: [String]
    }
});


const Update=mongoose.model('User',userSchema);

module.exports=Update;