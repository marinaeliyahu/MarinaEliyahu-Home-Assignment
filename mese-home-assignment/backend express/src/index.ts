import express from 'express';

import cors from 'cors';


import { JobsController } from './controllers';


// const port: number = Number(process.env.PORT) || 3000;
const port = 3000;
const app = express()
// const app: express.Application = express();
// Define a JWT secret key. This should be isolated by using env variables for security


// Set up CORS and JSON middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors({
//     origin: '*'
// }));


app.use('/jobs', JobsController);


app.get('/', (req, res) => {
    res.send('service run!!!');
});
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});