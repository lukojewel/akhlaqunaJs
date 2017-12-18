var sg = require('sendgrid')('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');

var Template = require('./templating');
var html_files = {
                'account-activation': 'Activation.html',
	}
	
class SendGridMailer{

	constructor(){
		
	}
	sendMail(context,callback,mail,subject,template_name,arguments_){
		context.log('In the mailer')
		let template = new Template(template_name,arguments_)
		
		var request = sg.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: {
			  personalizations: [
			    {
			      to: [
			        {
			          email: mail
			        }
			      ],
			      subject: subject
			    }
			  ],
			  from: {
			    email: 'support@email.teamevoque.com'
			  },
			  content: [
			    {
			      type: 'text/plain',
			      value: 'Activation'
			    }
			  ]
			}
			});

	    sg.API(request)
	    .then(function (response) {
	      context.log("Mail sent");
	     	// callback();
			// return true;
	    })
	    .catch(function (error) {
	      context.log('Mail not sent');
	      // callback();
		  // return false;
	    });
	}
		
}

module.exports = SendGridMailer;
		