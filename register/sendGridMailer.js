var sg = require('sendgrid')('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');


class SendGridMailer{

	constructor(mail){
		this.mail = mail
	}
	sendMail(context){
		var request = sg.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: {
			  personalizations: [
			    {
			      to: [
			        {
			          email: this.mail
			        }
			      ],
			      subject: 'Account Activation'
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
	     	callback();
	    })
	    .catch(function (error) {
	      context.log('Mail not sent');
	      callback();
	    });
	}
		
}

module.exports = SendGridMailer;
		