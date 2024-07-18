const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

app.use(express.static('./public'))
app.engine('.hbs', engine({extname: '.hbs'}))
app.set('views', './views')
app.set('view engine', '.hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`express server running on http://localhost:${port}`)
})