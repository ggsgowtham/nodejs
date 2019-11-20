// var http = require('http');
// var url = require('url'); //initialize url query string

// http.createServer(function (req,res) {
// 	res.writeHead(200,{'Content-type': 'text/html'});
// 	var q = url.parse(req.url, true).query; //parse url values to the page
// 	var dates = q.year + " " +q.month; //concatinate the query input values and display
// 	res.end(dates); //end the response
// }).listen(8000);


var http = require('http');
var fs = require('fs'); //file access module
var url = require('url');
const PORT = process.env.PORT || 5000;

http.createServer(function (req,res) {
	var q = url.parse(req.url, true);
	var filename = "."+ q.pathname;
	if(filename == './') {
		filename = './index';
	}
	filename = filename + ".html";
	console.log(filename);
	fs.readFile(filename, function(err, data) {
		if(err) {
			res.writeHead(404,{'Content-type': 'text/html'})
			return res.end("404 Not Found");
		}
		res.writeHead(200,{'Content-type': 'text/html'});
		res.write(data);
		console.log("...Incoming Request:"+ req.url)
		return res.end();
	})
}).listen(PORT);

console.log("server listening to port" + PORT);