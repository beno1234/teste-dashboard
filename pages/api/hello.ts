import nextConnect from "next-connect";
import mysql from "mysql";


const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    const resObj = { error: `Method ${req.method} Not Allowed` }
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
  const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
  });

  db.query("SELECT * FROM blog", (err, results) => {
    if (err) {
      return;
    }

    const link = "https://www.bmouseproductions.com/";

    // Modify the response to include the file path to the uploaded image
    const blogPosts = results.map((post: any) => ({
      uuid: post.uuid,
      photo: `https://www.bmouseproductions.com/uploads/${post.photo}`, // Add the file path to the photo
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
    res.end(`${blogPosts}`);
  });

});




export default apiRoute;