import express from 'express';
import Certification from './certification.js';
import { setupDatabase } from './database.js';


const expressApp = express();
const port = 5000;

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

