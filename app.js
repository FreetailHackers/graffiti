var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.listen(3000, function () {
    console.log('listening on *:3000');
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    
    socket.on('nameQ', function(name){
        var logError = function(err) { console.log(err); }
        console.log('new participant connected: ' + name)
        io.emit('message event',
        {
            'newName': name,
        });

    });
});
