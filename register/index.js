'use strict';
var User = require('./../model/models.js');
const sendGridMailer = require("./sendGridMailer.js")
var base64 = require('base-64');
var Otp = require('./../component/otp.js')

module.exports.register = (context, req, callback) => {
  context.log('JavaScript HTTP trigger function processed a request.');
  const res = {};
  
  
  if (req.body.first_name) {
    try{
      var first_name = req.body.first_name;
      var last_name = req.body.last_name;
      var middle_name = ''
      if(req.body.middle_name){middle_name = req.body.middle_name;}
      var email = req.body.email;
      var qatari_id = req.body.qatari_id;
      var mobile = req.body.mobile;

      User.findOne({ where: {$or: [{email: email},{mobile:mobile}, {qatarId:qatari_id}]} }).then(function(user) {
        
        if(user==null){
          context.log("Already registered")
          res.body = "Already registered";
          res.status = 200
        }else{
            User.sync({force: false})
              .then(function () {
                  return User.create({
                      firstName: first_name,
                      lastName: last_name,
                      middleName: middle_name,
                      email: email,
                      qatarId: qatari_id,
                      mobile: mobile
                  });
              });
          
          var otp = generateOTP();
          context.log(otp)

          let mailer = new sendGridMailer(email);
          mailer.sendMail(context,callback)
          
          res.body = `{status: true, message: Success}`;
          res.status = 200
        }
      })
      
      
    }catch(err){
      res.status = 400
      res.body = err.message
    }

  } else {
    res.status = 400;
    res.body = 'Please pass a name on the query string or in the request body';
  }

  context.done(null, res);

};

