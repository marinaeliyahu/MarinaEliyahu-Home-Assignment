"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const controllers_1 = require("./controllers");
// const port: number = Number(process.env.PORT) || 3000;
const port = 3000;
const app = (0, express_1.default)();
// const app: express.Application = express();
// Define a JWT secret key. This should be isolated by using env variables for security
// Set up CORS and JSON middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(cors({
//     origin: '*'
// }));
app.use('/jobs', controllers_1.JobsController);
app.get('/', (req, res) => {
    res.send('server run!!!');
});
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
//# sourceMappingURL=index.js.map