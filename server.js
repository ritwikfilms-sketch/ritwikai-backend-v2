import express from "express";

const app = express();
app.use(express.json());

app.post("/slack/events", (req, res) => {
  const body = req.body;

  // Slack URL verification
  if (body.type === "url_verification") {
    return res.json({ challenge: body.challenge });
  }

  // Other Slack events
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
