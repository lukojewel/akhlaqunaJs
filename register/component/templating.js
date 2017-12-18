var nunjucks = require('nunjucks');


class Template{
	constructor(){
		nunjucks.configure('./views', { autoescape: true });
	}
	renderHTML(file,arguments_){
		nunjucks.render(file, arguments_);
	}
} 

module.exports = Template;