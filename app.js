const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

const SETTING_STATUS = {
  wrongPasswordLength: 'no/wrong password length entered',
  noCharacterSet: 'no character set selected',
  verified: 'setting verified, match condition.',
  excludeCharactersConflict: 'excludeCharactersConflict'
}

const characterSets = {
  lowercases: 'abcdefghijklmnopqrstuvwxyz',
  uppercases: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '1234567890',
  symbols: '`~!@#$%^&*()-_=+[{]}|;:\'\",.>/?'
}

function getSettingStatus(settings, characterSets) {
  const excludeChars = settings.excludeCharacters.split('')

  if (
    !settings.passwordLength ||
    +settings.passwordLength < 4 ||
    +settings.passwordLength > 16
  ) {
    return SETTING_STATUS.wrongPasswordLength
  } else if (!characterSets.length) {
    return SETTING_STATUS.noCharacterSet
  } else if (
    characterSets.some(charSet =>
      charSet.split('').every(char => excludeChars.includes(char))
    )
  ) {
    return SETTING_STATUS.excludeCharactersConflict
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
    case SETTING_STATUS.excludeCharactersConflict:
      errorMessage = 'Exclude characters shouldn\'t includes all characters in any of the selected character set.'
      break
  }

  return errorMessage
}

function getCharacterSets(settingsCharacterSets) {
  let charSets = []

  if (typeof settingsCharacterSets === 'string') {
    charSets.push(characterSets[settingsCharacterSets])
  }
  if (typeof settingsCharacterSets === 'object') {
    settingsCharacterSets.forEach(charSet => {
      charSets.push(characterSets[charSet])
    })
  }

  return charSets
}

function getPreviousSelectedCheckbox(settingsCharacterSets) {
  const selectedCheckbox = {}

  if (typeof settingsCharacterSets === 'string') {
    selectedCheckbox[settingsCharacterSets] = true
  }
  if (typeof settingsCharacterSets === 'object') {
    settingsCharacterSets.forEach(charSet => {
      selectedCheckbox[charSet] = true
    })
  }

  return selectedCheckbox
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
  const msg = {}
  const passwordSettings = req.query
  const charSets = getCharacterSets(passwordSettings.characterSets)
  const previousSelectedCheckbox = getPreviousSelectedCheckbox(passwordSettings.characterSets)
  const settingStatus = getSettingStatus(passwordSettings, charSets)
  const errMsg = errorMessage(settingStatus)

  if (errMsg) {
    msg.isErrorMsg = true
    msg.content = errMsg
    res.render('generated', { passwordSettings, message: msg, previousSelectedCheckbox })
  } else {
    const filteredCharSets = filteredCharacterSets(passwordSettings, charSets)
    const rawPasswordArr = generateRawPassword(passwordSettings, filteredCharSets)
    const password = getPassword(rawPasswordArr)

    msg.isErrorMsg = false
    msg.content = password

    res.render('generated', { passwordSettings, message: msg, previousSelectedCheckbox })
  }

})

app.listen(port, () => {
  console.log(`express server running on http://localhost:${port}`)
})