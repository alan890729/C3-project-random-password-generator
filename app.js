const express = require('express')
const { engine } = require('express-handlebars')
const passwordGenerator = require('./public/utils/password-generator')
const settingStatus = require('./public/controllers/setting-status')

const app = express()
const port = 3000

app.use(express.static('./public'))
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('views', './views')
app.set('view engine', '.hbs')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const previousSettings = req.body

  const msg = {}
  const charSets = passwordGenerator.getCharacterSets(previousSettings)
  const settingStat = settingStatus.getSettingStatus(previousSettings, charSets)
  const errMsg = settingStatus.errorMessage(settingStat)
  if (errMsg) {
    msg.isErrorMsg = true
    msg.content = errMsg
    
    res.render('index', { previousSettings, message: msg })
  } else {
    const filteredCharSets = passwordGenerator.filteredCharacterSets(previousSettings, charSets)
    const rawPasswordArr = passwordGenerator.generateRawPassword(previousSettings, filteredCharSets)
    const password = passwordGenerator.getPassword(rawPasswordArr)
    msg.isErrorMsg = false
    msg.content = password

    res.render('index', { previousSettings, message: msg })
  }
})

app.listen(port, () => {
  console.log(`express server running on http://localhost:${port}`)
})