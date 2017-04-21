var http = require("http")
var url = require("url")

var server = http.createServer(function (req, res) {
    var page = url.parse(req.url).pathname;
    console.log(page);

    var response_code = 200
    var response_body = "";

    if (page == "/all") {
        response_body += "That's all"
    }

    res.writeHead(response_code, { "Content-Type": "text/plain" });
    res.write(response_body);
    res.end();
});
server.listen(8080);