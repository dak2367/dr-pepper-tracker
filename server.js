const express = require('express')
const cors = require('cors')
const path = require('path')
const Database = require('better-sqlite3')

const app = express()
const db = new Database('drpepper.db')

db.exec(`
    CREATE TABLE IF NOT EXISTS drinks (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp INTEGER NOT NULL
    )
`)

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/drinks', (req, res) => {
    const drinks = db.prepare('SELECT * FROM drinks ORDER BY timestamp ASC').all()
    res.json(drinks)
})

app.post('/api/drinks', (req, res) => {
    const timestamp = Date.now()
    db.prepare('INSERT INTO drinks (timestamp) VALUES (?)').run(timestamp)
    res.json({ status: 'ok' })
})

app.delete('/api/drinks/:id', (req, res) => {
    db.prepare('DELETE FROM drinks WHERE id = ?').run(req.params.id)
    res.json({ status: 'deleted' })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running')
})