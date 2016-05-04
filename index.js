const express = require('express');  
const app = express();
const port = 3000;

app.set("view options", {layout: false});
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {  
  res.render('index.html');
})

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`)
});