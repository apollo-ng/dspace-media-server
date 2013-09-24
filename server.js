var nconf = require('nconf');
var express = require('express');
var cors = require('cors');
var fs = require('fs');

/*
 * get config from file
 */
nconf.file({ file: 'config.json' });


/*
 * static media files
 */

var app = express();

// enable CORS
app.use(cors());

// serve static files
app.use(express.static(nconf.get('uploads').path));

app.use(express.multipart());

function saveAttachement(fields, files) {
  var uuid = JSON.parse(fields.meta).uuid;
  var destination = nconf.get('uploads').path + '/' +  uuid;

  var is = fs.createReadStream(files.file.path);
  var os = fs.createWriteStream(destination);

  is.pipe(os);
  is.on('end',function() {
    fs.unlinkSync(files.file.path);
  });
}

app.post('/', function(req, res) {
  res.writeHead(200);
  res.end(saveAttachement(req.body, req.files));
});

var port = nconf.get('server').port;
app.listen(port, function() {
  console.log('listening on ' + port);
});
