import "dotenv/config";
import express from "express";
import cors from "cors";
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
  createDocumentHandler,  // Importa el handler que usaremos
  getDocumentHandler,
} from "./handlers/index.js";

// Conexión a la base de datos
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.info(`API connected to ${process.env.MONGODB_URI}`);

    const api = express();
    api.use(cors());

    // Rutas
    api.post("/users", jsonBodyParser, registerUserHandler);
    api.post("/users/auth", jsonBodyParser, authenticateUserHandler);
    api.post("/properties", jsonBodyParser, jwtVerifier, createPropHandler);
    api.get("/properties", jwtVerifier, getAllPropsHandler);
    api.post("/contracts", jsonBodyParser, jwtVerifier, createContractHandler);
    api.post("/contracts/:contractId/sign", jsonBodyParser, jwtVerifier, signContractHandler);

    // Ruta para la creación de documentos
    api.post('/documents', jwtVerifier, createDocumentHandler);
    api.get("/properties/:propertyId/documents/:documentType", jwtVerifier, getDocumentHandler);

    // Manejo de errores
    api.use(errorHandler);

    // Iniciar servidor
    api.listen(process.env.PORT, () => {
      console.info(`API listening on PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => console.error(error));
