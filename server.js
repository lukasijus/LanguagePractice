const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('C:/Users/lukas.rimkus/LanguagePractice/finnish_english.db');

const corsOptions = {
    origin: 'http://localhost:3001', // React app is served from this origin
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());

// Add your API routes here...
app.post('/addPhrase', (req, res) => {
    const { finnish, english } = req.body;

    if (!finnish || !english) {
        return res.status(400).json({ error: 'Both Finnish and English fields are required.' });
    }

    // SQL query to insert data into the database with timestamps
    const query = 'INSERT INTO translations (finnish, english, created_at, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)';
    db.run(query, [finnish, english], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Phrase added successfully!', id: this.lastID });
    });
});


app.get('/getRandomPhrase', (req, res) => {
    const query = 'SELECT * FROM translations ORDER BY RANDOM() LIMIT 1';
    db.get(query, [], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(row);
    });
});



const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
