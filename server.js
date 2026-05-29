// BOILERPLATE //
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running')
})
// BOILERPLATE //

const Database = require('better-sqlite3') //works similar to includes in c, will only be available in the scope of the function
const db = new Database('drpepper.db')
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/drinks', (req, res) => {
    res.json({ message: 'drinks route works!' })
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

db.exec(`
    CREATE TABLE IF NOT EXISTS drinks (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp INTEGER NOT NULL
    )
`)