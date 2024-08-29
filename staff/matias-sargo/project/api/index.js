import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";

import { mongoose } from "../cor/index.js";

import {
  jsonBodyParser,
  jwtVerifier,
  errorHandler,
} from "./middlewares/index.js";

import {
  registerUserHandler,
  authenticateUserHandler,
  createPropHandler,
  getAllPropsHandler,
  createContractHandler,
  signContractHandler,
  createDocumentHandler
} from "./handlers/index.js";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.info(`API connected to ${process.env.MONGODB_URI}`);

    const api = express();
    const upload = multer({ dest: 'uploads/' });

    api.use(cors());

    api.post("/users", jsonBodyParser, registerUserHandler);
    api.post("/users/auth", jsonBodyParser, authenticateUserHandler);

    api.post("/properties", jsonBodyParser, jwtVerifier, createPropHandler);
    api.get("/properties", jwtVerifier, getAllPropsHandler);

    api.post("/contracts", jsonBodyParser, jwtVerifier, createContractHandler);
    api.post("/contracts/:contractId/sign", jsonBodyParser, jwtVerifier, signContractHandler);

    api.post('/documents', upload.single('content'), createDocumentHandler);
    
    api.use(errorHandler);

    api.listen(process.env.PORT, () =>
      console.info(`API listening on PORT ${process.env.PORT}`)
    );
  })
  .catch((error) => console.error(error));
