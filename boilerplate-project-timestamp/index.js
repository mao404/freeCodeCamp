var express = require("express");
var app = express();
var cors = require("cors");

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api", (req, res) => {
  const currentDate = new Date();
  const unix = currentDate.getTime();
  const date = currentDate.toUTCString();
  return res.json({ unix: unix, utc: date });
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

const dateHandler = (req, res) => {
  const date = req.params.date;

  if (!isNaN(date)) {
    const timestamp =
      date.length === 13 ? parseInt(date) : parseInt(date) * 1000;
    const utc = new Date(timestamp).toUTCString();
    return res.json({ unix: timestamp, utc: utc });
  }

  const parsedDate = new Date(date);

  if (!isNaN(parsedDate.getTime())) {
    const unix = parsedDate.getTime();
    const utc = parsedDate.toUTCString();
    return res.json({ unix: unix, utc: utc });
  } else {
    return res.json({ error: "Invalid Date" });
  }
};

app.get("/api/:date", dateHandler);

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
