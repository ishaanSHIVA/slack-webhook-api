const express = require("express");

require("dotenv").config();
const axios = require("axios");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded());

app.use(cors());

const sendMessageToSlack = async (text) => {
  const url = process.env.SLACK_PRIVATE_URL;

  const options = {
    url,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      text,
    },
  };

  axios(options)
    .then((response) => {
      return response.done == "ok";
    })
    .catch((error) => {
      console.error(error);
    });
};

app.post("/", (req, response) => {
  const { text } = req.body;

  sendMessageToSlack(text) ? response.status(200) : response.status(404);
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
