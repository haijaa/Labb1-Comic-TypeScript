"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const pg_1 = require("pg");
const express_1 = __importDefault(require("express"));
dotenv.config();
const port = 3000;
const client = new pg_1.Client({
    connectionString: process.env.PGURI,
});
client.connect();
const app = (0, express_1.default)();
app.use((0, cors_1.default)(), express_1.default.json());
app.get("/api/magazines", (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield client.query("SELECT magazines.title, magazines.description, magazines.image, magazines.character, publisher.name AS publisher_name FROM magazines JOIN publisher ON publisher.id = publisherid");
    response.send(rows);
}));
app.get("/api/magazines/marvel", (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield client.query("SELECT magazines.title, magazines.description, magazines.image, magazines.character, publisher.name AS publisher_name FROM magazines JOIN publisher ON publisher.id = publisherid WHERE publisher.id = 1");
    response.send(rows);
}));
app.get("/api/magazines/dc", (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield client.query("SELECT magazines.title, magazines.description, magazines.image, magazines.character, publisher.name AS publisher_name FROM magazines JOIN publisher ON publisher.id = publisherid WHERE publisher.id = 2");
    response.send(rows);
}));
app.post("/api/magazines/post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, image, character, publisherid } = req.body;
    try {
        const { rows } = yield client.query("INSERT INTO magazines (title, description, image, character, publisherid) VALUES ($1, $2, $3, $4, $5) RETURNING *", [title, description, image, character, publisherid]);
        res.status(201).json(rows[0]);
    }
    catch (error) {
        console.error("Fel här", error);
        res.status(500).send("Fel vid server");
    }
}));
app.get("/api/publisher", (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield client.query("SELECT * FROM publisher");
    response.send(rows);
}));
app.listen(port, () => {
    console.log(`Backend är nu igång på ${port}`);
});
