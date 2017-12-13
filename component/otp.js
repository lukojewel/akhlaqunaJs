

class Otp{
	constructor(userId, otpType){
		this.userId = userId;
		this.otpType = otpType;
	}
	generateOTP() {
        var otp = Math.floor(Math.random() * (999999 - 100000)) + 100000;
		//save the otp for the user
		
    }	
}

module.exports = Otp