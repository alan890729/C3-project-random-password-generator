const characterSets = {
  lowercases: 'abcdefghijklmnopqrstuvwxyz',
  uppercases: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '1234567890',
  symbols: '`~!@#$%^&*()-_=+[{]}|;:\'\",.>/?'
}

function getCharacterSets(settings) {
  let charSets = []

  if (settings.lowercases) {
    charSets.push(characterSets.lowercases)
  }
  if (settings.uppercases) {
    charSets.push(characterSets.uppercases)
  }
  if (settings.numbers) {
    charSets.push(characterSets.numbers)
  }
  if (settings.symbols) {
    charSets.push(characterSets.symbols)
  }

  return charSets
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

module.exports = {
  characterSets,
  getCharacterSets,
  filteredCharacterSets,
  generateRawPassword,
  getPassword
}