const express = require('express');  
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(__dirname + '/public'));

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, (err) => {  
	if (err) {
		return console.log('something bad happened', err);
	}
	console.log(`server is listening on ${port}`)
});