const jsonServer = require("json-server");
const server = jsonServer.create();
const cors = require("cors");
const router = jsonServer.router("./db.json");
const middleware = jsonServer.defaults({
    static : {
  "root" : "build/",
  "clean_urls" : false,
  "routes" : {
    "/**" : "index.html"
  }
}
})

const port = process.env.PORT || 5000
server.use(middleware)


server.use(router);
server.use(cors());
server.listen(port, () => console.log(`Server is running on ${port}`));