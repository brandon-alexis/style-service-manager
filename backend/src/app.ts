import express from "express";
import logger from "morgan";
import cors from "cors";

export const app = express();

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
