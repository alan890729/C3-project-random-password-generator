const generatorForm = document.querySelector('#generator-form')
const generatedPassword = document.querySelector('#generated-password')

const SETTINGS_STATUS = {
  lengthError: 'wrong length or no length entered',
  zeroCharacterSetSelected: '0 character set selected',
  verified: 'verified'
}

const model = {

  lowercases: 'abcdefghijklmnopqrstuvwxyz',
  uppercases: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '1234567890',
  symbols: '`~!@#$%^&*()-_=+[{]}|;:\'\",.>/?',

  generateSettings(eventTarget) {
    return {
      passwordLength: +eventTarget[0].value,
      hasLowercase: eventTarget[1].checked,
      hasUppercase: eventTarget[2].checked,
      hasNumbers: eventTarget[3].checked,
      hasSymbols: eventTarget[4].checked,
      excludeChars: eventTarget[5].value
    }
  },

  getCharacterSets(settings) {
    let characterSets = []

    if (settings.hasLowercase) {
      characterSets.push(this.lowercases)
    }
    if (settings.hasUppercase) {
      characterSets.push(this.uppercases)
    }
    if (settings.hasNumbers) {
      characterSets.push(this.numbers)
    } if (settings.hasSymbols) {
      characterSets.push(this.symbols)
    }

    return characterSets
  },

  generateRawPassword(settings, characterSets) {
    let rawPassword = []
    const passwordLength = settings.passwordLength

    characterSets.forEach(charSet => {
      const randomIndex = Math.floor(Math.random() * charSet.length)
      rawPassword.push(charSet[randomIndex])
    })

    const remainPasswordLength = passwordLength - rawPassword.length
    for (let i = 0; i < remainPasswordLength; i++) {
      const randomCharSet = Math.floor(Math.random() * characterSets.length)
      const selectedCharSet = characterSets[randomCharSet]
      const randomIndex = Math.floor(Math.random() * selectedCharSet.length)
      rawPassword.push(selectedCharSet[randomIndex])
    }

    return rawPassword
  },


}

const view = {
  renderErrorMessage(settingsStatus) {
    switch (settingsStatus) {
      case SETTINGS_STATUS.lengthError:
        generatedPassword.innerHTML = `
          <p class="mb-0 col-12">You must enter password length.</p>
        `
        return
      case SETTINGS_STATUS.zeroCharacterSetSelected:
        generatedPassword.innerHTML = `
          <p class="mb-0 col-12">You must select at least one character set.</p>
        `
        return
    }
  },

  renderGeneratedPassword(password) {
    generatedPassword.innerHTML = `
      <p class="mb-0 col-12">You're password is: <span>${password}</span></p>
    `
  }
}

const controller = {
  settingsStatus: '',

  verifySettings(settings) {
    if (!settings.passwordLength) {
      this.settingsStatus = SETTINGS_STATUS.lengthError
    } else if (
      !Object.values(settings).filter(value => typeof value === 'boolean').some(value => value === true)
    ) {
      this.settingsStatus = SETTINGS_STATUS.zeroCharacterSetSelected
    } else {
      this.settingsStatus = SETTINGS_STATUS.verified
    }
    return
  },
}

const utility = {
  shuffle(rawPassword) {
    for (let i = rawPassword.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1))
        ;[rawPassword[i], rawPassword[randomIndex]] = [rawPassword[randomIndex], rawPassword[i]]
    }

    let password = rawPassword.join('')
    return password
  }
}

generatorForm.addEventListener('submit', function onGeneratorFormSubmit(event) {
  event.preventDefault()

  const settings = model.generateSettings(event.target)
  console.log(settings)

  controller.verifySettings(settings)

  console.log(controller.settingsStatus)
  switch (controller.settingsStatus) {
    case SETTINGS_STATUS.lengthError:
    case SETTINGS_STATUS.zeroCharacterSetSelected:
      view.renderErrorMessage(controller.settingsStatus)
      return
    case SETTINGS_STATUS.verified:
      // view.renderGeneratedPassword('generated password')
      const rawPassword = model.generateRawPassword(settings, model.getCharacterSets(settings))
      console.log('rawPassword:', rawPassword)
      const password = utility.shuffle(rawPassword)
      console.log(password)
      view.renderGeneratedPassword(password)
      return
  }
})


