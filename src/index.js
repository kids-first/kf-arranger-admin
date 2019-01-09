import "babel-polyfill";
import adminGraphql from "@arranger/admin/dist";
import cors from "cors";
import express from "express";
import egoTokenMiddleware from "ego-token-middleware";

const ES_HOST = "http://localhost:9200";
const PORT = 9090;
const egoURL = "http://localhost:9090";

const start = async () => {
  const app = express();
  app.use(cors());

  app.use(
    egoTokenMiddleware({
      egoURL,
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
