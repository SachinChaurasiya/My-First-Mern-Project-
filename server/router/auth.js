const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwtoken = require('jsonwebtoken')
const authenticate = require("../middleware/authenticate");

// database link
require("../db/conn")
const User = require("../model/userSchema")

router.get('/', (req, res) => {
    res.send(`Hello world from the server rotuer js`);
});


// Using Promise
// router.post('/register', (req, res) => {

//     const {name ,  email ,  phone ,  work ,  password , cpassword} = req.body;

//     if(!name ||  !email ||  !phone ||  !work ||  !password || !cpassword){
//             return res.status(422).json({ error : "Plzz fill properly in box"});
//     }



//     User.findOne({email:email})
//     .then((userExist) => {
//         if(userExist){
//             return res.status(422).json({ error : "Email Already Exist"})
//         }

//         const user = new User({name ,  email ,  phone ,  work ,  password , cpassword});

//          user.save().then(() => {
//              res.status(201).json({massage :"Regesterd Successfully" });
//          }).catch((err) => res.status(500).json({err : "Faild to registered"}));

//     }).catch(err => { console.log(err);});

// });


// Using async await
router.post('/register', async (req, res) => {

    const {name ,  email ,  phone ,  work ,  password , cpassword} = req.body;

    if(!name ||  !email ||  !phone ||  !work ||  !password || !cpassword){
            return res.status(422).json({ error : "Plzz fill properly in box"});
    }

    try{
        const userExist =  await User.findOne({email:email});

        //    if(userExist){
        //     return res.status(422).json({ error : "Email Already Exist"})
        // }

    
        if(userExist){
            return res.status(422).json({ error : "Email Already Exist"})
        }else if(password != cpassword){
            return res.status(422).json({ error : "password are ot matching"})
        }else{
              const user = new User({name ,  email ,  phone ,  work ,  password , cpassword});


      const userRegister = await user.save();

      if(userRegister){
           res.status(201).json({massage :"Registered Successfully" });
      } else{
          res.status(500).json({err : "Faild to registered"})
      }
        }

       

    } catch(err){
       console.log(err);
    }

    
});


// Login validation

router.post('/signin' , async (req , res) => {
    try{
           const {email , password} = req.body;
           if(!email || !password){
                return res.status(400).json({error : "plzz filled all inbox "});
           }

          const userLogin = await User.findOne({email:email});

          if(userLogin){
                const isMatch = await bcrypt.compare(password , userLogin.password);

              const token = await userLogin.generateAuthToken();
              console.log(token);

              res.cookie('jwtoken' , token , {
                  expires: new Date(Date.now()+ 25892000000),
                  httpOnly: true
              })
              


          if(!isMatch){
              res.status(400).json({error : "User error"})
          }else{
              res.json({massage: "Signin Successfully"});
          }
          }else{
               res.status(400).json({error : "Invalid Information"});
          }

       

         

    }catch(err){
        console.log(err);
    }
});





// About us ka page 

router.get('/about', authenticate, (req, res) => {
    console.log(`Hello my About`);
    res.send(req.rootUser);
});

// get user data for contact and home page
router.get('/getdata', authenticate, (req, res) => {
    console.log(`Hello my About`);
    res.send(req.rootUser);
});


// contact us ka page
router.post('/contact', authenticate,  async (req, res) => {
    try{
       const {name , email , phone , message} = req.body

       if(!name || !email || !phone || !message){
         console.log("err in contact form");
         return res.json({error: "plzz filed the contact form"});
       }

       const userContact = await User.findOne({_id: req.userId})

       if(userContact){
           const userMessage = await userContact.addMessage(name , email , phone , message)
           await userContact.save();
           res.status(201).json({message : "user contact Successfully"})
       }else{
                console.log(error);
       }



    }catch(error){
        console.log(error);
    }
});


// logout ka page
router.get('/logout', (req, res) => {
    console.log(`Hello my logout page`);
    res.clearCookie('jwtoken' , {path : '/'});
    res.status(200).send(`User Logout`);
});

module.exports = router;