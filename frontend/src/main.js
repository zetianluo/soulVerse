// establish a connection
var socket = io.connect('http://localhost:5000');

// emit a 'message' event with the text data
socket.emit('message', 'Hello, world!');

// listen for 'response' events from the server
socket.on('response', function(data) {
    console.log(data);  // print the data received from the server
    // if there is a file in the response, handle it
    if (data.file) {
        // do something with data.file
        console.log('Received file: ' + data.file);
    }
});

// listen for 'error' events from the server
socket.on('error', function(data) {
    console.log(data);  // print the error received from the server
});
