var http = require('http');
var fs = require('fs');
var io = require('socket.io');

var documentRoot = 'F:/nodeJS/talk/WWW';

var httpServer = http.createServer(function(req,res){
	
	var url = req.url;
	
	var file = documentRoot + url;
	
	fs.readFile(file,function(err,data){
		if(err){
			res.writeHeader(404,{
				'content-type' : 'text/html;charset="UTF-8"'
			});
			res.write('<h1>404</h1><p>你要找的页面被吃了</p>');
			res.end();
		} else {
			res.writeHeader(200,{
				'content-type' : 'text/html;charset="UTF-8"'
			});
			res.write(data);
			res.end();
		}
	});
	
	
}).listen(5858);

var socket = io.listen(httpServer);

socket.sockets.on('connection',function(socket){

//	console.log('有人通过socket连接进来了');
	//发送信息
	socket.emit('join','欢迎加入聊天室');
	
	//监听hellotoo
	socket.on('hellotoo',function(data){
		//广播
		socket.emit('join','<p>你说:' + data.content + '</p>');
		socket.broadcast.emit('broadcast',{
			user : data.user,
			content : data.content
		});
	})
	
	
});


console.log('服务器开启成功');
