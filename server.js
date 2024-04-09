const express = require('express');
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
const path = require('path');

app.use(cors());
app.use(bodyParser.json());

let currentUserId = null;

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'emergency',
    password: 'Neym@rJr11',
    port: 5433,
});

pool.connect()
    .then(() => console.log('Successfully connected to the PostgreSQL database'))
    .catch(err => console.error('Error connecting to the PostgreSQL database', err));

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM Users WHERE Username = $1';

    pool.query(query, [username], (error, results) => {
        if (error) {
            console.error('Error on the server:', error);
            return res.status(500).send('Error on the server.');
        }

        if (results.rows.length > 0) {
            const user = results.rows[0];

            if (password === user.password) {
                currentUserId = user.userid;
                return res.send('Login successful');
            } else {
                return res.status(401).send('Invalid username or password');
            }
        } else {
            return res.status(401).send('Invalid username or password');
        }
    });
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    const insertQuery = 'INSERT INTO Users (Username, Password) VALUES ($1, $2)';

    pool.query(insertQuery, [username, password], (error) => {
        if (error) {
            console.error('Error creating new user:', error);
            return res.status(500).send('Error creating new user');
        }
        res.send('Account created successfully');
    });
});

app.post('/submit-patient-form', (req, res) => {
    const { patientName, patientAge, dob, gender, condition, severity } = req.body;
    const initialWaitTime = getInitialWaitTime(severity);

    const query = `INSERT INTO PatientInfo (UserID, Name, PatientCondition, Severity, Age, Gender, DateOfBirth, WaitTime) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

    pool.query(query, [currentUserId, patientName, condition, severity, patientAge, gender, dob, initialWaitTime], (error) => {
        if (error) {
            console.error('Error inserting patient data:', error);
            return res.status(500).send('Error inserting patient data');
        }
        res.send('Patient data inserted successfully');
    });
});

function getInitialWaitTime(severity) {
    severity = parseInt(severity);

    switch (severity) {
        case 1:
            return 15;
        case 2:
            return 12;
        case 3:
            return 9;
        case 4:
            return 7;
        case 5:
            return 5;
        default:
            return 0;
    }
}

app.get('/get-patient-records', (req, res) => {
    const query = `
    SELECT *
    FROM PatientInfo
    ORDER BY Severity DESC, EntryTime ASC`;

    pool.query(query, (error, results) => {
        if (error) {
            return res.status(500).send('Error retrieving patient records');
        }
        res.json(results.rows);
    });
});

function updateWaitTimes() {
    const updateQuery = `
        UPDATE PatientInfo
        SET WaitTime = GREATEST(WaitTime - 1, 0)  
        WHERE WaitTime > 0
    `;

    pool.query(updateQuery, (error) => {
        if (error) {
            console.error('Error updating wait times:', error);
        }
    });
}

setInterval(updateWaitTimes, 60000);