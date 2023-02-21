import { getConnection } from "./database.js";


const TABLE_NAME = 'certification';
const CREATE_QUERY = `INSERT INTO ${TABLE_NAME} ('name', 'description', 'reason', 'from', 'to')
    VALUES ($name, $description, $reason, $from, $to)`;
const UPDATE_QUERY = `UPDATE ${TABLE_NAME} SET
    'name'        = $name,
    'description' = $description,
    'reason'      = $reason,
    'from'        = $from,
    'to'          = $to
    WHERE id = $id`;

function Certification ({name, description, reason, from, to}) {
    this.name        = name;
    this.description = description;
    this.reason      = reason;
    this.from        = from;
    this.to          = to;
}

Certification.seed = async ()=>{
    const tableExists = await new Promise(resolve=>{
        getConnection().all(`SELECT COUNT(name) AS has_table FROM sqlite_master WHERE name = '${TABLE_NAME}'`,
        (_err, [{has_table}])=>{
            resolve(has_table);
        });
    }) === 1;
    
    if(!tableExists) {
        const tableQuery = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
            'id'          INTEGER PRIMARY KEY,
            'name'        TEXT,
            'description' TEXT,
            'reason'      TEXT,
            'from'        TEXT,
            'to'          TEXT
        )`;
        const initialData = [
            {
                $name: 'Agile Engineering and Java Best Practices',
                $description: 'A 5-day training by Orange and Bronze Software Labs, inc. that teaches about Agile Methodologies and Java Best Practices.',
                $reason: 'To prepare for the upcoming tasks as a Java developer backend',
                $from: 'November 25 2019',
                $to: 'November 29, 2019',
                
            },
            {
                $name: 'UX+ 2019: an Experience conference',
                $description: 'a 3-day conference by 8020 and Graphika Manila that talk about the current trends and practices in developing front end websites.',
                $reason: 'To connect with the front-end community and get familiar with the current front-end trends and practices. ',
                $from: 'August 24, 2019',
                $to: 'August 24, 2019',
                
            },
            {
                $name: 'SQL Fundamentals',
                $description: 'a 2-day course by Orange and Bronze Software Labs that teaches how business requirements become database designs, and the basics of reading and writing to a relational database using SQL (Structured Query Language)',
                $reason: 'As recommended',
                $from: 'November 19, 2018',
                $to: 'November 20, 2018',
                
            },
        ];

        const connection = getConnection();
        connection.serialize(()=>{
            connection.run(tableQuery);
            console.log('table created');
            const createStatement = connection.prepare(CREATE_QUERY);
            initialData.forEach(data => {
                createStatement.run(data);
            });
        })
        
    }
    

} 

Certification.getAll = () => {
    return new Promise((resolve, reject)=>{
        getConnection().all(`SELECT * FROM ${TABLE_NAME}`, (error, rows) => {
            if(error) return reject({message: 'Problem in retrieving Certifications', error})
            resolve(rows);
        })
        .close();

    });
};
Certification.create = ({name, description, reason, from, to}) => {    
    return new Promise((resolve, reject)=>{
        getConnection().prepare(CREATE_QUERY).run({
            $name: name,
            $description: description,
            $reason: reason,
            $from: from,
            $to: to,
        }, (error, result)=>{
            if(error) return reject({message: 'Problem making Certification', error});
            resolve(result);
        })
        .finalize();

    })
}

Certification.update = ({id, name, description, reason, from, to}) => {    
    return new Promise((resolve, reject)=>{
        getConnection().prepare(UPDATE_QUERY).run({
            $name: name,
            $description: description,
            $reason: reason,
            $from: from,
            $to: to,
            $id: id,
        }, (error, result)=>{
            if(error) return reject({message: 'Problem updating Certification', error});
            resolve(result);
        })
        .finalize();

    })
}

export default Certification;
