	net = require('net');
	var sockets = [];

 	// Cleans the input of carriage return, newline
	function formatInput(data) {
		return data.toString().replace(/(\r\n|\n|\r)/gm,"");
	}

	var chatServer = net.createServer(function(socket){
		sockets.push(socket);

		socket.write('\n\n');
		socket.write('****Telnet server established!****\n');
		socket.write("****Quit with '@exit'**** \n");	

		socket.on('data', function(data){
			if(formatInput(data) === '@exit') {
				socket.end('Goodbye!\n');
			}
			var socketAddress = socket.remoteAddress;
			// processing data
			for(var i=0; i< sockets.length; i++){
				if(sockets[i] == socket) continue; // stop server echo 				
				sockets[i].write(socketAddress+': '+data);			
			}
		});

		socket.on('end', function(){
			// delete socket when quit			
			var i = sockets.indexOf(socket);
			sockets.splice(i, 1);
		});

	});

	chatServer.listen(8001);
