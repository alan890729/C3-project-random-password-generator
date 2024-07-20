const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

const SETTING_STATUS = {
  wrongPasswordLength: 'no/wrong password length entered',
  noCharacterSet: 'no character set selected',
  verified: 'setting verified, match condition.'
}

function getSettingStatus(settings) {
  if (
    !settings.passwordLength ||
    +settings.passwordLength < 4 ||
    +settings.passwordLength > 16
  ) {
    return SETTING_STATUS.wrongPasswordLength
  } else if (!Object.values(settings).some(value => value === 'selected')) {
    return SETTING_STATUS.noCharacterSet
  } else {
    return SETTING_STATUS.verified
  }
}

function errorMessage(settingStatus) {
  let errorMessage = ''

  switch (settingStatus) {
    case SETTING_STATUS.wrongPasswordLength:
      errorMessage = 'Password Length should between number 4 ~ 16.'
      break
    case SETTING_STATUS.noCharacterSet:
      errorMessage = 'You should select at least one character set.'
      break
  }

  return errorMessage
}



app.use(express.static('./public'))
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('views', './views')
app.set('view engine', '.hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/generated', (req, res) => {
  let msg = ''
  const passwordSettings = req.query
  console.log(passwordSettings)

  const settingStatus = getSettingStatus(passwordSettings)
  console.log(settingStatus)

  const errMsg = errorMessage(settingStatus)
  if (errMsg) {
    msg = errMsg
  }

  




  

  res.render('generated', { passwordSettings, message: msg })
})

app.listen(port, () => {
  console.log(`express server running on http://localhost:${port}`)
})