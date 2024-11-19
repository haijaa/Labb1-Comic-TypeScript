import cors from "cors";
import * as dotenv from "dotenv";
import { Client } from "pg";
import express from "express";

dotenv.config();

const port: number = 3000;

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app = express();

app.use(cors(), express.json());

app.get("/api/magazines", async (_request, response) => {
  const { rows } = await client.query(
    "SELECT magazines.title, magazines.description, magazines.image, magazines.character, publisher.name AS publisher_name FROM magazines JOIN publisher ON publisher.id = publisherid"
  );
  response.send(rows);
});

app.get("/api/magazines/marvel", async (_request, response) => {
  const { rows } = await client.query(
    "SELECT magazines.title, magazines.description, magazines.image, magazines.character, publisher.name AS publisher_name FROM magazines JOIN publisher ON publisher.id = publisherid WHERE publisher.id = 1"
  );
  response.send(rows);
});

app.get("/api/magazines/dc", async (_request, response) => {
  const { rows } = await client.query(
    "SELECT magazines.title, magazines.description, magazines.image, magazines.character, publisher.name AS publisher_name FROM magazines JOIN publisher ON publisher.id = publisherid WHERE publisher.id = 2"
  );
  response.send(rows);
});

app.post("/api/magazines/post", async (req, res) => {
  const { title, description, image, character, publisherid } = req.body;

  try {
    const { rows } = await client.query(
      "INSERT INTO magazines (title, description, image, character, publisherid) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, image, character, publisherid]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Fel här", error);
    res.status(500).send("Fel vid server");
  }
});

app.listen(port, () => {
  console.log(`Backend är nu igång på ${port}`);
});
