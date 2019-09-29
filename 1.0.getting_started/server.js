const app = require("http").createServer(handler),
  fs = require("fs"),
  url = require("url"),
  path = require("path"),
  port = {
    app: 8080,
    socket: 5678
  };

// socket host is localhost:5678
io = require("socket.io")(port.socket);

// server host is localhost:8080
app.listen(port.app);
console.log(`app listen on port ${port.app}`);

function handler(req, res) {
  const urlParts = url.parse(req.url);
  var route = urlParts.pathname;
  if (urlParts.pathname.indexOf("/assets") == 0) route = "/assets";
  switch (route) {
    case "/":
      return homepage(req, res);
    case "/assets":
      return assets(req, res);
    default:
      res.writeHead(404, "Not Found");
      res.write("404: File Not Found!");
      return res.end();
  }
}

// socket conf
// after client connt to server socket, server will emit message "news"
io.on("connection", socket => {
  socket.emit("news", { hello: "world" });
  socket.on("my other event", data => {
    console.log(data);
  });
});

// homepage
function homepage(req, res) {
  fs.readFile(`${__dirname}/public/index.html`, (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end("error loading index.html");
    }

    res.writeHead(200);
    res.end(data);
  });
}

// assets
function assets(req, res) {
  var fileLoc = `${__dirname}/public`;
  fileLoc = path.join(fileLoc, req.url);

  // ...otherwise load the file
  fs.readFile(fileLoc, function(err, data) {
    if (err) {
      res.writeHead(404, "Not Found");
      res.write("404: File Not Found!");
      return res.end();
    }

    res.statusCode = 200;

    res.write(data);
    return res.end();
  });
}
