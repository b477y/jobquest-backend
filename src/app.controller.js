import asyncHandler from "./utils/response/error.response.js";
import successResponse from "./utils/response/success.response.js";
import errorHandlingMiddlware from "./middlewares/errorHandling.middleware.js";
import limiter from "./utils/security/limiter.security.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

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

  app.use(errorHandlingMiddlware);
};

export default bootstrap;
