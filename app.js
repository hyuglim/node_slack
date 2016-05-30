var express = require('express');
var app = express();
var fs = require('fs');
var TOKEN = 'Ap4fzgCtpuAF8wdgvCMUJAQz';

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/', function(req, res){
  console.log(req);
  console.log(req.query.token);
  console.log(req.query.imgPath);
	
  var exec = require('child_process').exec, child;
  var script = 'cd Noisy-lang-compiler; make clean; make; ./noisy-darwin-EN --optimize 0 --dot 4 ' + req.query.imgPath + ' | dot -T pdf -O; cd ..';

  console.log(script);
  child = exec(script,
      function (error, stdout, stderr) {
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
          if (error !== null) {
               console.log('exec error: ' + error);
          }
      });
  
  var img = fs.readFileSync('./Noisy-lang-compiler/noname.gv.pdf');
  res.writeHead(200, {'Content-Type': 'image/pdf' });
  res.end(img, 'binary');

  // res.send(req.query.token);
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
