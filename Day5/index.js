const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'JTDBackend',
    password: 'Vamsi@124',
    port: 5432,
});

const runQueries = async () => {
    try {
        await client.connect();

        // CREATE TABLE
        // await client.query(`
        //     CREATE TABLE student (
        //         id SERIAL PRIMARY KEY,
        //         name VARCHAR(100) NOT NULL,
        //         class VARCHAR(10) NOT NULL,
        //         phone VARCHAR(13) UNIQUE,
        //         email VARCHAR(30) UNIQUE NOT NULL
        //     );
        // `);
        // console.log('Table created successfully.');

        // INSERT DATA
        // const insertResult = await client.query(`
        //     INSERT INTO student (name,class,phone,email) 
        //     VALUES ('john','mca',1231231231,'john@gmail.com'),('user','mca',4564564564,'user@gmail.com'),('subramanyam','mca',7897897897,'sky@gmail.com')
        //     RETURNING *;
        // `);
        // console.log('Inserted Record:', insertResult.rows[0]);

        // READ DATA
        const selectResult = await client.query('SELECT * FROM student;');
        console.log('All students:', selectResult.rows);

        // UPDATE DATA
        const updateResult = await client.query(`
            UPDATE student 
            SET name = 'Suresh' 
            WHERE email = 'user@gmail.com' 
            RETURNING *;
        `);
        console.log('Updated Record:', updateResult.rows[0]);

        // DELETE DATA
        // const deleteResult = await client.query(`
        //     DELETE FROM student 
        //     WHERE name = 'a' 
        //     RETURNING *;
        // `);
        // console.log('Deleted Record:', deleteResult.rows[0]);

    } catch (err) {
        console.error('Error executing queries', err.stack);
    } finally {
        await client.end();
    }
};

runQueries();
