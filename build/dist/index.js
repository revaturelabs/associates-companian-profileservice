"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var profile_router_1 = require("./routers/profile-router");
var cors_filter_1 = require("./middleware/cors-filter");
var loggers_1 = require("./utils/loggers");
var app = express_1.default();
//our application from express
app.use(body_parser_1.default.json());
// app.use(cors());
// app.use("/profiles", profileRouter);
app.use(express_1.default.json());
app.use(cors_filter_1.corsFilter);
var basePath = process.env['PS_BASE_PATH'] || '/profile-service';
var basePathRouter = express_1.default.Router();
app.use(basePath, basePathRouter);
basePathRouter.use("/profiles", profile_router_1.profileRouter);
//health check! for load balancer and build
app.get('/health', function (req, res) {
    res.sendStatus(200);
});
app.use(function (err, req, res, next) {
    if (err.statusCode) {
        loggers_1.logger.debug(err);
        res.status(err.statusCode).send(err.message);
    }
    else { //if it wasn't one of our custom errors, send generic response
        loggers_1.logger.debug(err);
        loggers_1.errorLogger.error(err);
        res.status(500).send("Oops, something went wrong");
    }
});
//what port do we want?
app.listen(2007, function () {
    //start server on port 2007
    console.log("Server has started");
    loggers_1.logger.info("Server has started");
});
//# sourceMappingURL=index.js.map