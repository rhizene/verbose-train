import express from 'express';
import Certification from './certification.js';
import { setupDatabase } from './database.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const expressApp = express();
const port = 5000;
const CLIENT_PORT = 3000;


const allowedOrigins = [
    `http://127.0.0.1:${CLIENT_PORT}`,
    `http://localhost:${CLIENT_PORT}`
];

  

// function corsHandler(req, res, next) {
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//         res.setHeader('Access-Control-Allow-Origin', origin);
//         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     }
    
//     next();
// };

const corsOptionsDelegate = function (req, callback) {
        const origin = req.headers.origin;
    const corsOptions = {
        origin: allowedOrigins.includes(origin),
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
        allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
        
      }
    callback(null, corsOptions);
}

expressApp.use(cors(corsOptionsDelegate));
expressApp.use(bodyParser.urlencoded());
expressApp.use(express.json());

expressApp.get('/certification', async (req, res) => {
    const categories = await Certification.getAll()
        .catch(err => []);

    res.send(categories);
});

expressApp.post('/certification', async (req, res) => {
    Certification.create(req.body)
        .then(() => res.sendStatus(200))
        .catch(error => {
            console.error({message: 'Certificate creation failed', error})
            res.sendStatus(400);
        });
});

expressApp.put('/certification', async (req, res) => {
    Certification.update(req.body)
        .then(() => res.sendStatus(200))
        .catch(error => {
            console.error({message: 'Certificate update failed', error})
            res.sendStatus(400);
        });
});

setupDatabase()
.then(()=>{
    expressApp.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });
})
.catch(err => console.error('Database setup failed', err));

