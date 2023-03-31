import nextConnect from "next-connect";

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
  setTimeout(() => {
    res.statusCode = 200
    res.write("Hello World")
    res.end()
  },);
});

export default apiRoute;
