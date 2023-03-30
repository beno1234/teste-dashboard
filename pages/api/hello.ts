import nextConnect from "next-connect";

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    const resObj = { error: `Method '${req.method}' Not Allowed` };
    res.statusCode = 405;
    res.end(JSON.stringify(resObj));
  },
  onError(error, _, res) {
    const resObj = { error: `Sorry something Happened! ${error.message}` };
    res.statusCode = 501;
    res.end(JSON.stringify(resObj));
  },
});

apiRoute.get(async (req, res) => {
  try {
    const response = await fetch("http://benotestehello.us-3.evennode.com/");
    const data = await response.json();
    res.statusCode = response.status;
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end({ msg: "Error processing request" });
  }
});

export default apiRoute;
