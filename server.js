const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const fallbackProfil = {
  nom: "Mansour Toure",
  prenom: "Mansour",
  titre: "Développement logiciel & Data",
  email: "touresie408@gmail.com",
  pays: "Tunisie",
  specialite: "Développement, data & IA"
};

const mongoUri = process.env.MONGODB_URI;
const client = mongoUri ? new MongoClient(mongoUri) : null;

app.use(express.static("."));

app.get("/api/profil", async (req, res) => {
  if (!mongoUri || !client) {
    return res.json(fallbackProfil);
  }

  try {
    await client.connect();

    const profil = await client
      .db("DSI")
      .collection("ANSSI")
      .findOne({ nom: "Toure" });

    return res.json(profil || fallbackProfil);
  } catch (error) {
    console.error("Erreur MongoDB :", error.message);
    return res.json(fallbackProfil);
  }
});

app.listen(3000, () => {
  console.log("Portfolio disponible sur http://localhost:3000");
});