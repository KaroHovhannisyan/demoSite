var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.listen(8888,function(){
    console.log("Server is listening ......")
});

mongoose.connect('mongodb://localhost/users',{ useMongoClient: true });
mongoose.Promise = global.Promise;
 
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    gender:String,  
    phoneNumber:String
})

const User = mongoose.model('User',UserSchema);




app.post('/addUser',function(req,res){
    
  var RegisteredUser = new User({
                    email:req.body.email ,
                    password:req.body.password,
                    username:req.body.username,
                    gender:req.body.gender,
                    phoneNumber:req.body.phoneNumber});
    
    RegisteredUser.save(function(err){
            if(err)res.send("Error!!!!!")
              res.send("OK");
    });
})


    
app.get('/getUser',function(req,res){
    
 User.find({email:req.headers.email,
            password:req.headers.password},
           function(err,user){
                        if(err)res.send("Eroor!!");
     res.json(user);

     
                        });
    
})

app.get('/cheking',function(req,res){
    User.find({email:req.headers.email},function(err,user){
                          if(err)res.send("Eroor!!");
     if(user[0]){res.send(false);}else{res.send(true)}
})
})

app.get('/chekingUsername',function(req,res){
    User.find({username:req.headers.username},function(err,user){
                          if(err)res.send("Eroor!!");
     if(user[0]){res.send(false);}else{res.send(true)}
})
})



app.get('/example',function(req,res){
    User.find({},function(err,users){
        res.json(users);
    })
   
})

app.get('/delete',function(req,res){
    
User.find({}).remove().exec();
     res.end("deleted")

     
    
})
