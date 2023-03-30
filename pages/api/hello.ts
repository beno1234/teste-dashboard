import nextConnect from "next-connect";

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    const resObj = { error: `Method '${req.method}' Not Allowed` }
    res.statusCode = 405;
    res.write(JSON.stringify(resObj));
    res.end();
  },
  onError(error, _, res) {
    const resObj = { error: `Sorry something Happened! ${error.message}` }
    res.statusCode = 501;
    res.write(JSON.stringify(resObj));
    res.end();
  }
});

apiRoute.get(async (req, res) => {
  res.statusCode = 200;
  res.write("hello world");
  res.end();
});

export default apiRoute;


/* const http = require("http");
const mysql = require("mysql");

const hostname = "localhost";
const port = 3002;
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

const server = http.createServer(async (req, res) => {
  try {
    db.query("SELECT * FROM blog", (err, results) => {
      if (err) {
        return;
      }

      const link = "https://www.bmouseproductions.com/";

      const blogPosts = results.map((post) => ({
        uuid: post.uuid,
        photo: `https://www.bmouseproductions.com/uploads/${post.photo}`, 
        news: post.news,
        friendly_url: post.friendly_url,
        news_title: post.news_title,
        post_day: new Date(post.post_day).toLocaleDateString("pt-BR", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      }));

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end(JSON.stringify(blogPosts));
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Error processing request" });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/)`);
}); */