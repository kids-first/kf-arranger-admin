import "babel-polyfill";
import adminGraphql from "@arranger/admin/dist";
import cors from "cors";
import express from "express";
import egoTokenMiddleware from "ego-token-middleware";
import { ES_HOST, PORT, EGO_URL } from "./env";
import { name, version } from "../package.json";

const status = ({ startTime }) => (req, res) => {
  res.send({ name, version, startTime, upTime: Date.now() - startTime });
};

const start = async () => {
  const app = express();
  app.use(cors());

  app.use("/status", status({ startTime: Date.now() }));

  app.use(
    egoTokenMiddleware({
      egoURL: EGO_URL,
      accessRules: [
        {
          type: "allow",
          route: ["/", "/(.*)"],
          role: "admin"
        }
      ]
    })
  );

  const adminApp = await adminGraphql({ esHost: ES_HOST });
  adminApp.applyMiddleware({
    app,
    path: "/admin"
  });

  app.listen(PORT, () =>
    console.log(`⚡️⚡️⚡️ Listening on port ${PORT} ⚡️⚡️⚡️`)
  );
};

start();
