'use strict';
var User = require('./model/user.js');
const sendGridMailer = require("./component/sendGridMailer.js")
var base64 = require('base-64');
// var OtpGenerator = require('./component/otp.js')
var Otp_ = require('./model/otp');

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
            context.log("Not Already registered");
            User.sync({force: false})
              .then(function () {
                  context.log("User table synced")
                  User.create({
                      firstName: first_name,
                      lastName: last_name,
                      middleName: middle_name,
                      email: email,
                      qatarId: qatari_id,
                      mobile: mobile,
                      active: false
                  }).then(function(){
                    User.findOne({ where: {email: email} }).then(function(user) {
                      // let otpGenerator = new OtpGenerator(user.id, 0)
                      context.log("Generating otp")
                      var otp = Math.floor(Math.random() * (999999 - 100000)) + 100000;
                  		context.log("OTP generated-->" + otp)
                  		//delete existing otp if any
                  		Otp_.destroy({
                  			where: {
                  				otpType: 0,
                  				userId: user.id
                  			}
                  		});
                  		//save the otp
                  		Otp_.sync({force: false})
                        .then(function () {
                            Otp_.create({
                              userId: user.id,
                    				  otpType: 0,
                    				  otp: otp
                            });
                        });
                      context.log("OTP-->" + otp)
                      //   to be done
                      var encoded_data = 'some_string'
                      let mailer = new sendGridMailer();
                      var argument_dictionary = {
                          'first_name': first_name,
                          'last_name': last_name,
                          'decode_data' : encoded_data
                      }
                      context.log("Calling mail")
                      var mail_success = mailer.sendMail(context,callback,email,'Account Activation','account-activation',argument_dictionary);
                      context.log(mail_success);
                      
                      res.body = `{status: true, message: Success}`;
                      res.status = 200
                    })
                  })
              });
                     
            
        }
      })
    }catch(err){
      res.status = 400
      res.body = 'Error' + err.message
    }

  } else {
    res.status = 400;
    res.body = 'Please pass a name on the query string or in the request body';
  }

  context.done(null, res);

};

