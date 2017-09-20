var hapi=require('hapi');
var mysql=require('mysql');
var server=new hapi.Server();
server.connection({
	host:'localhost',
	port:3000
}) 

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'sameer12345',  database : 'practice'
});
connection.connect();

server.register(require('vision'),(err)=>{  
if(err){throw err}

	server.route({
	method:'get',
	path:'/file',
	handler:(req,rep)=>{
         rep.view('index',{name:'mujahed'})
	}
             })
server.views({
	engines:{html:require('handlebars')},
	relativeTo:__dirname,
	path:'templates'
})



})

server.route({
	method:'get',
	path:'/',
	handler:(req,rep)=>{
       connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error){ 
  	throw error;
  }else{
  	rep('The solution is: '+ results[0].solution); 
  	//console.log(results[0].solution);
  }
  
});
	}
})
server.route({
	method:'get',
	path:'/hello',
	handler:function(req,reply){
		reply('hello world from hello get methd');
	}
});
server.route({
	method:'get',
	path:'/users/{username}',
	handler:(req,res)=>{
         res("helo user "+req.params.username)
	}
})

server.start(()=>{
	console.log('srver running at',server.info.uri);
});

