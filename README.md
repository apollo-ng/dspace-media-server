# DSpace Media Server

Server accepting file uploads and serving them

    $ npm install
    $ cp config.json.example config.json
    $ node server.js

expects uploads to have meta parameter with JSON object { noteUUID: "" } used for filename
