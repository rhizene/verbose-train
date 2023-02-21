import express from 'express';
import Certification from './certification.js';
import { setupDatabase } from './database.js';


const expressApp = express();
const port = 5000;
const CLIENT_PORT = 3000;
const allowedOrigins = [
    `http://127.0.0.1:${CLIENT_PORT}`,
    `http://localhost:${CLIENT_PORT}`
];
  

function corsHandler(req, res, next) {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    
    next();
};

expressApp.use(corsHandler);

expressApp.get('/certification', async (req, res) => {
    const categories = await Certification.getAll()
        .catch(err => []);

    res.send(categories);
});

setupDatabase()
.then(()=>{
    expressApp.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });
})
.catch(err => console.error('Database setup failed', err));

