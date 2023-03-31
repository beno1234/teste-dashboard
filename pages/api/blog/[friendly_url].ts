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

  try {
    const friendly_url = (req as any).query.friendly_url;
    db.query(
      "SELECT * FROM blog WHERE friendly_url=?",
      [friendly_url],
      (err, results) => {
        if (err) {
          console.error(err);
          res.statusCode = 500
          res.end(JSON.stringify({ msg: "Error processing request" }));
          return;
        }
        if (results.length === 0) {
          res.statusCode = 404
          res.end(JSON.stringify({ msg: "Blog post not found" }));
          return;
        }
        const blogPost = results[0];
        res.statusCode = 200
        res.end(JSON.stringify(blogPost));
      }
    );
  } catch (err) {
    console.error(err);
    res.statusCode = 500
    res.end(JSON.stringify({ msg: "Error processing request" }));
  }

});