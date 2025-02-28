import asyncHandler from "./utils/response/error.response.js";
import successResponse from "./utils/response/success.response.js";
import errorHandlingMiddleware from "./middlewares/errorHandling.middleware.js";
import limiter from "./utils/security/limiter.security.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import connect2db from "./db/connection.js";
import authController from "./modules/auth/auth.controller.js";
import userController from "./modules/user/user.controller.js";
import companyController from "./modules/company/company.controller.js";
import jobController from "./modules/job/job.controller.js";
import { createHandler } from "graphql-http/lib/use/express";

const bootstrap = (app, express) => {
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(limiter);
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.json());

  app.use("/api/auth", authController);
  app.use("/api/user", userController);
  app.use("/api/companies", companyController);
  app.use("/api/jobs", jobController);

  app.get("/", (req, res, next) => {
    successResponse({
      res,
      status: 200,
      message: "Welcome to JobQuest platform",
    });
  });

  app.all(
    "*",
    asyncHandler(async (req, res, next) => {
      return next(new Error("In-valid routing", { cause: 404 }));
    })
  );

  app.use(errorHandlingMiddleware);

  connect2db();
};

export default bootstrap;
