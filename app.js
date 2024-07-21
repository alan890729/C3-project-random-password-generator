const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

const SETTING_STATUS = {
  wrongPasswordLength: 'no/wrong password length entered',
  noCharacterSet: 'no character set selected',
  verified: 'setting verified, match condition.'
}

const lowercases = 'abcdefghijklmnopqrstuvwxyz'
const uppercases = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '1234567890'
const symbols = '`~!@#$%^&*()-_=+[{]}|;:\'\",.>/?'

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

function getCharacterSets(settings) {
  let characterSets = []

  if (settings.hasLowercase) {
    characterSets.push(lowercases)
  }
  if (settings.hasUppercase) {
    characterSets.push(uppercases)
  }
  if (settings.hasNumbers) {
    characterSets.push(numbers)
  }
  if (settings.hasSymbols) {
    characterSets.push(symbols)
  }

  return characterSets
}

function filteredCharacterSets(settings, characterSets) {
  const excludeCharacters = settings.excludeCharacters.split('')
  let filteredCharacterSets = []

  characterSets.forEach(charSet => {
    const filteredCharSet = charSet.split('').filter(char => {
      if (excludeCharacters.includes(char)) {
        return false
      }
      return true
    }).join('')

    if (filteredCharSet) {
      filteredCharacterSets.push(filteredCharSet)
    }
  })

  return filteredCharacterSets
}

function generateRawPassword(settings, filteredCharacterSets) {
  let rawPasswordArr = []
  const passwordLength = settings.passwordLength

  filteredCharacterSets.forEach(charSet => {
    const randomIndex = Math.floor(Math.random() * charSet.length)
    rawPasswordArr.push(charSet[randomIndex])
  })

  const remainPasswordLength = passwordLength - rawPasswordArr.length
  for (let i = 0; i < remainPasswordLength; i++) {
    const randomCharSet = Math.floor(Math.random() * filteredCharacterSets.length)
    const charSet = filteredCharacterSets[randomCharSet]
    const randomIndex = Math.floor(Math.random() * charSet.length)
    rawPasswordArr.push(charSet[randomIndex])
  }

  return rawPasswordArr
}

function getPassword(rawPasswordArr) {
  for (let i = rawPasswordArr.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
      ;[rawPasswordArr[i], rawPasswordArr[randomIndex]] = [rawPasswordArr[randomIndex], rawPasswordArr[i]]
  }
  const password = rawPasswordArr.join('')
  return password
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
  const settingStatus = getSettingStatus(passwordSettings)
  const errMsg = errorMessage(settingStatus)

  if (errMsg) {
    msg = errMsg
    res.render('generated', { passwordSettings, message: msg })
  } else {
    const charSets = getCharacterSets(passwordSettings)
    const filteredCharSets = filteredCharacterSets(passwordSettings, charSets)
    const rawPasswordArr = generateRawPassword(passwordSettings, filteredCharSets)
    const password = getPassword(rawPasswordArr)
    console.log(charSets)
    console.log(filteredCharSets)
    console.log(rawPasswordArr)
    console.log(password)

    msg = `You're password is: ${password}`

    res.render('generated', { passwordSettings, message: msg })
  }

})

app.listen(port, () => {
  console.log(`express server running on http://localhost:${port}`)
})