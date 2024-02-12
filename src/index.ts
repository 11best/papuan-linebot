import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { carBubble } from "./replyBubble";

const dotenv = require("dotenv");
dotenv.config();

const PORT = 3000;
const LINE_MESSAGING_API = "https://api.line.me/v2/bot";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env["LINE_TOKEN"] || ""}`,
};

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/webhook", (c) => {
  return c.text("Webhook is ready!");
});

app.post("/webhook", async (c) => {
  const body = await c.req.raw.json();

  if (!body.events) {
    console.log("no body", body);
    return c.text("no body", 501);
  }

  const messageType = body.events[0]?.message?.type;

  if (messageType == "text") {
    const textMessage = body.events[0].message.text;

    if (textMessage === "car") {
      reply(body.events[0].replyToken, carBubble);
    } else {
      reply(body.events[0].replyToken, {
        type: "text",
        text: textMessage,
      });
    }
  }

  console.log("HTTP POST request sent to the webhook URL!", body.events[0]);

  return c.text(
    "HTTP POST request sent to the webhook URL!" + body.events[0],
    200
  );
});

const reply = (token: any, payload: any) => {
  console.log("payload", payload);
  const url = `${LINE_MESSAGING_API}/message/reply`;
  const requestOptions = {
    method: "POST",
    headers: {
      ...LINE_HEADER,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      replyToken: token,
      messages: [payload],
    }),
  };

  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

console.log(`Server is running on port ${PORT}`);

serve({
  fetch: app.fetch,
  port: PORT,
});
