var Otp_ = require('./../model/otp');

class OtpGenerator{
	constructor(userId, otpType){
		this.userId = userId;
		this.otpType = otpType;
	}
	generateOTP(context,callback) {
        var otp = Math.floor(Math.random() * (999999 - 100000)) + 100000;
		context.log("OTP generated-->" + otp)
		//delete existing otp if any
		Otp.destroy({
			where: {
				otpType: this.otpType,
				userId: this.userId
			}
		});
		//save the otp
		Otp.sync({force: false})
          .then(function () {
              Otp.create({
                  userId: this.userId,
				  otpType: this.otpType,
				  otp: otp
              });
          });
		  
		 
		
    }	
}

module.exports = OtpGenerator;