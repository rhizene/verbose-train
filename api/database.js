import Certification from './certification.js';
import SQLite3 from 'sqlite3';


const sqlite = SQLite3.verbose();

// export const Database = new sqlite.Database(':memory:');
export const getConnection = () => new sqlite.Database('./db.sqlite3');

export function setupDatabase() {
    return new Promise((resolve) => {
            getConnection().serialize(() => {
                Certification.seed()
                .then(()=>resolve());
            });

        
    });
}
