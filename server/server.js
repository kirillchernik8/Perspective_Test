
const express = require('express');
const path = require('path');
const cors = require('cors')
const saveResult = require('../db.js').saveResult
const app = express();
const parser = require('body-parser')

app.use(cors())
app.use(parser.json())
app.use(express.static(path.join(__dirname, '../public')))

app.post('/results', (req, res)=>{
  saveResult(req.body, (err) => {
    if (err) {
      console.error(err, ' <-- Error occured during saving the result');
      res.sendStatus(500)
    } else {
      res.sendStatus(201)
    }
  })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`server running at: http://localhost:${PORT}`)
});

