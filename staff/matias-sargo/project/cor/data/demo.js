import "dotenv/config";
import mongoose from "mongoose";
import fs from "fs"

import { Document } from "./models.js";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    const document = new Document({
      property: "66cd84c564d763f19ce6d19f",
      content: fs.readFileSync(`contract.pdf`),
      type: "contract",
      url: "https://drive.google.com/file/d/1WKxd6Nlursd9ZIEPh-hykScsbpAcRKSN/view?usp=sharing",
      
    });

    document
      .save()
      .then(() => console.log("document saved"))
      .catch((error) => console.error(error));
  })
  .catch((error) => console.error(error));
