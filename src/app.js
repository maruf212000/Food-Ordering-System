const express = require("express");
const alert= require("alert");
const path = require("path")
const app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var morgan = require("morgan");
require("./db/conn")
const port= process.env.PORT || 3000;
const Reserve=require("./models/reserve")
const Register=require("./models/registers")
const Order=require("./models/Order")
const Item=require("./models/menu");
const { Session } = require("inspector");
const static_path =path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../templates/views");


// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    key: "user_id",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);
var sessionChecker = (req, res, next) => {
    if (req.session.user ) {
      res.redirect("/afterlogin");
    } else {
      res.render("login");
    }
  };

app.set("view engine","hbs");
app.set("views",template_path)
app.use(express.static(static_path))
//will get the data from form
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get("/", (req, res) => {
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.render('index');
      }
  });
  }
);
//get registartion
app.get("/registration",(req,res)=>{
    res.render("registration")
})
//post-create customer in database
app.post("/registration",async(req,res)=>{

  //  try{
        const password=req.body.password;
        const emailf=req.body.email;
        const cpassword=req.body.confirmpassword;
        const mobile=req.body.mobile;
        //if(password === cpassword)
        //{
            var user = new Register({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                mobileno : req.body.mobileno,
                password : password, 
                confirmpassword : cpassword

            });
            user.save((err,docs)=>{
                if(err){
                    res.redirect("/registration");
                    alert("User Already Exist");
                }else{
                    console.log(docs)
                    req.session.user=docs;
                    res.redirect("/afterlogin");
                }
            });
        });

//get login
app.get("/login",sessionChecker,(req,res)=>{
    
    res.render("login");
})
//index
app.get("/afterlogin",(req,res)=>{
    if(req.session.user){
    
       res.render("afterlogin");
    }
    else{
        res.redirect("/login")
    }
});
//post login check
app.post("/login",async(req,res)=>{
    
        const email=req.body.email;
        const password=req.body.password;
        try{
        var user =await Register.findOne({email:email}).exec();
        if(!user)
        {
            res.redirect("/login");
        }
        
        if(user.password === password){
            req.session.user=user;
            res.redirect("/afterlogin");
        }else{
            alert("Invalid Login Details");         
        }

    }catch(error){
       // alert("Invalid Login Details");
       console.log(error);
        //res.render("login");
    }
})
app.listen(port,()=>{
    console.log(`Server is running at port no ${port}`)
})
app.get("/menu",async(req,res)=>{
    if(req.session.user)
    {
        const useremail=await Item.find({category:'Pizza'});
        const pasta=await Item.find({category:'Pasta'});
        const starters=await Item.find({category:'Starters'});
        res.render("menu",{
               "pizza":useremail,
               'pasta':pasta,
               "starters":starters
    });
    
    }
    else{
        res.redirect("/login");
    }
});
app.post("/menu",async(req,res)=>{
    try{
      var cust_id = req.session.user._id;
      const itms=await Item.find({});
      const a = new Order({});
      //let date_ob = new Date();
      const b  = req.body;
      let totalam = 0;
      itms.forEach(element =>{
        const fname = element.name;
        a[fname] = b[fname];
        if(b[fname] > 0)
          totalam += element.price*b[fname];
        //console.log(fname);
      });
        a["total"] = totalam;
        a["Customer"] = cust_id;
        a.save((err,docs)=>{
          if(err){
              //res.redirect("/menu");
              alert("Order not Placed!!");
          }else{
             // console.log(docs)
              req.session.user=docs;
              res.redirect("/orderplaced");
          }
      });
       }catch(error){
                console.log(error);
                res.render("index");
            }
});
//orderplaced
    app.get("/orderplaced",(req,res)=>{
  res.render("orderplaced");
});


//logout session
// route for user logout
app.get("/logout", (req, res) => {
    if (req.session.user) {
      req.session.destroy(function(err) {
        if(err) {
          console.log(err);
        } else {
          res.redirect('/');
        }
    });
    } else {
      res.redirect("/login");
    }
  });

//Edit Profile
app.get("/editprofile",async(req,res)=>{
    if(req.session.user)
    {
        var x=req.session.user._id;
       // var user =await Register.findById({_id}).exec();
       const user=await Register.findOne({_id:x});
       //console.log(user); 
       res.render("editprofile",{
            "details":user});
    }
    else{
        res.redirect("/login")
    }
});

app.post("/editprofile",async(req,res)=>{
    if(req.session.user)
    {
        var x=req.session.user._id;
       // var user =await Register.findById({_id}).exec();
       Register.findByIdAndUpdate(x, { firstname: req.body.firstname },
       function (err, docs) {
        if (err){
        console.log(err)
        }
        else{
            alert("Data Updated Sucessfully");
            res.redirect("/afterlogin");
        }
    });
    }
    else{
        res.send("Something Went Wrong")
    }
});

//Reserve
app.get("/reserve",async(req,res)=>{
  if(req.session.user)
  {
     res.render("afterlogin");
  }
  else{
      res.redirect("/login")
  }
});
app.post("/reserve",async(req,res)=>{
  if(req.session.user)
  {
    try{
      var x=req.session.user._id;
     var rese = new Reserve({
      name : req.body.name,
      phone : req.body.phone,
      email : req.body.email,
      nog : req.body.nop,
      rdate : req.body.date, 
      rtime : req.body.time,
      customer_id : x
  });
    rese.save();
    alert("Request For Table Reservation Send");
    }catch(error){
      console.log(error);
     }
     res.render("afterlogin")
  }
  else{
      res.redirect("/login")
  }
});