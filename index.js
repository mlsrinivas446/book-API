const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const app = express()

const dbPath = path.join(__dirname, 'goodreads.db')
let db = null
const instalizeDBandServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server running at http://localhost:3000/')
    })
  } catch (error) {
    console.log(`DB ERROR: ${error.message}`)
    process.exit(1)
  }
}
instalizeDBandServer()

app.get('/books/', async (request, response) => {
  const getBooksQuery = `SELECT
                        *
                        FROM
                        book
                        ORDER BY
                        book_id
                        `
  const booksArray = await db.all(getBooksQuery)
  response.send(booksArray)
})
