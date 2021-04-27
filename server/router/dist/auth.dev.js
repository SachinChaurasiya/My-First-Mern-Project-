"use strict";

var express = require('express');

var router = express.Router();

var bcrypt = require("bcryptjs");

var jwtoken = require('jsonwebtoken');

var authenticate = require("../middleware/authenticate"); // database link


require("../db/conn");

var User = require("../model/userSchema");

router.get('/', function (req, res) {
  res.send("Hello world from the server rotuer js");
}); // Using Promise
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

router.post('/register', function _callee(req, res) {
  var _req$body, name, email, phone, work, password, cpassword, userExist, user, userRegister;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, phone = _req$body.phone, work = _req$body.work, password = _req$body.password, cpassword = _req$body.cpassword;

          if (!(!name || !email || !phone || !work || !password || !cpassword)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(422).json({
            error: "Plzz fill properly in box"
          }));

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 6:
          userExist = _context.sent;

          if (!userExist) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(422).json({
            error: "Email Already Exist"
          }));

        case 11:
          if (!(password != cpassword)) {
            _context.next = 15;
            break;
          }

          return _context.abrupt("return", res.status(422).json({
            error: "password are ot matching"
          }));

        case 15:
          user = new User({
            name: name,
            email: email,
            phone: phone,
            work: work,
            password: password,
            cpassword: cpassword
          });
          _context.next = 18;
          return regeneratorRuntime.awrap(user.save());

        case 18:
          userRegister = _context.sent;

          if (userRegister) {
            res.status(201).json({
              massage: "Regesterd Successfully"
            });
          } else {
            res.status(500).json({
              err: "Faild to registered"
            });
          }

        case 20:
          _context.next = 25;
          break;

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0);

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 22]]);
}); // Login validation

router.post('/signin', function _callee2(req, res) {
  var _req$body2, email, password, userLogin, isMatch, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

          if (!(!email || !password)) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            error: "plzz filled all inbox "
          }));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 6:
          userLogin = _context2.sent;

          if (!userLogin) {
            _context2.next = 19;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(password, userLogin.password));

        case 10:
          isMatch = _context2.sent;
          _context2.next = 13;
          return regeneratorRuntime.awrap(userLogin.generateAuthToken());

        case 13:
          token = _context2.sent;
          console.log(token);
          res.cookie('jwtoken', token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
          });

          if (!isMatch) {
            res.status(400).json({
              error: "User error"
            });
          } else {
            res.json({
              massage: "Signin Successfully"
            });
          }

          _context2.next = 20;
          break;

        case 19:
          res.status(400).json({
            error: "Invalid Information"
          });

        case 20:
          _context2.next = 25;
          break;

        case 22:
          _context2.prev = 22;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 25:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 22]]);
}); // About us ka page 

router.get('/about', authenticate, function (req, res) {
  console.log("Hello my About");
  res.send(req.rootUser);
}); // get user data for contact and home page

router.get('/getdata', authenticate, function (req, res) {
  console.log("Hello my About");
  res.send(req.rootUser);
}); // contact us ka page

router.post('/contact', authenticate, function _callee3(req, res) {
  var _req$body3, name, email, phone, message, userContact, userMessage;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body3 = req.body, name = _req$body3.name, email = _req$body3.email, phone = _req$body3.phone, message = _req$body3.message;

          if (!(!name || !email || !phone || !message)) {
            _context3.next = 5;
            break;
          }

          console.log("err in contact form");
          return _context3.abrupt("return", res.json({
            error: "plzz filed the contact form"
          }));

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            _id: req.userId
          }));

        case 7:
          userContact = _context3.sent;

          if (!userContact) {
            _context3.next = 17;
            break;
          }

          _context3.next = 11;
          return regeneratorRuntime.awrap(userContact.addMessage(name, email, phone, message));

        case 11:
          userMessage = _context3.sent;
          _context3.next = 14;
          return regeneratorRuntime.awrap(userContact.save());

        case 14:
          res.status(201).json({
            message: "user contact Successfully"
          });
          _context3.next = 18;
          break;

        case 17:
          console.log(error);

        case 18:
          _context3.next = 23;
          break;

        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 23:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 20]]);
}); // logout ka page

router.get('/logout', function (req, res) {
  console.log("Hello my logout page");
  res.clearCookie('jwtoken', {
    path: '/'
  });
  res.status(200).send("User Logout");
});
module.exports = router;