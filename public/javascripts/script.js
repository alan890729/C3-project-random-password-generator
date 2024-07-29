const generatorForm = document.querySelector('#generator-form')
const generatedPassword = document.querySelector('#generated-password')
const characterSetsField = document.querySelector('#character-sets-field')
const characterSetsCheckboxes = [...document.querySelectorAll('#character-sets-field input')]

const SETTINGS_STATUS = {
  lengthError: 'wrong length or no length entered',
  zeroCharacterSetSelected: '0 character set selected',
  verified: 'verified',
  excludeCharactersConflict: 'excludeCharactersConflict'
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

  getFilteredCharacterSets(settings, characterSets) {
    const excludeChars = settings.excludeChars.split('')

    let filteredCharSets = characterSets.map(charSet => 
      charSet.split('').filter(char => !excludeChars.includes(char))
    )

    return filteredCharSets
  },

  generateRawPassword(settings, filteredCharacterSets) {
    let rawPassword = []
    const passwordLength = settings.passwordLength

    filteredCharacterSets.forEach(charSet => {
      const randomIndex = Math.floor(Math.random() * charSet.length)
      rawPassword.push(charSet[randomIndex])
    })

    const remainPasswordLength = passwordLength - rawPassword.length
    for (let i = 0; i < remainPasswordLength; i++) {
      const randomCharSet = Math.floor(Math.random() * filteredCharacterSets.length)
      const selectedCharSet = filteredCharacterSets[randomCharSet]
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
          <div class="col-sm-12">
            <div class="alert alert-danger">
              Password Length should between number 4 ~ 16.
            </div>
          </div>
        `
        return
      case SETTINGS_STATUS.zeroCharacterSetSelected:
        generatedPassword.innerHTML = `
          <div class="col-sm-12">
            <div class="alert alert-danger">
              You should select at least one character set.
            </div>
          </div>
        `
        return
      case SETTINGS_STATUS.excludeCharactersConflict:
        generatedPassword.innerHTML = `
          <div class="col-sm-12">
            <div class="alert alert-danger">
              Exclude characters shouldn\'t includes all characters in any of the selected character set.
            </div>
          </div>
        `
    }
  },

  renderGeneratedPassword(password) {
    generatedPassword.innerHTML = `
      <div class="col-sm-12">
        <div class="alert alert-success">
          <span class="me-2">You're password is:</span>
          <span class="text-danger">${password}</span>
        </div>
      </div>
    `
  }
}

const controller = {
  settingsStatus: '',

  deployListenerOnGeneratorForm() {
    generatorForm.addEventListener('submit', (event) => {
      this.onGeneratorFormSubmit(event)
    })

    characterSetsField.addEventListener('change', function onCharacterSetsFieldChanged(event) {
      if (characterSetsCheckboxes.some(element => element.checked)) {
        characterSetsCheckboxes.forEach(element => {
          element.removeAttribute('required')
        })
      } else {
        characterSetsCheckboxes.forEach(element => {
          element.setAttribute('required', '')
        })
      }
    })
  },

  dispatchRenderAction(settings, characterSets) {
    switch (this.settingsStatus) {
      case SETTINGS_STATUS.lengthError:
      case SETTINGS_STATUS.zeroCharacterSetSelected:
      case SETTINGS_STATUS.excludeCharactersConflict:
        view.renderErrorMessage(this.settingsStatus)
        return
      case SETTINGS_STATUS.verified:
        const filteredCharSets = model.getFilteredCharacterSets(settings, characterSets)
        const rawPassword = model.generateRawPassword(settings, filteredCharSets)
        const password = utility.shuffle(rawPassword)
        view.renderGeneratedPassword(password)
        return
    }
  },

  onGeneratorFormSubmit(event) {
    event.preventDefault()
    console.log(event)

    generatorForm.classList.add('was-validated')

    const settings = model.generateSettings(event.target)
    const characterSets = model.getCharacterSets(settings)
    this.verifySettings(settings, characterSets)
    this.dispatchRenderAction(settings, characterSets)
  },

  verifySettings(settings, characterSets) {
    const excludeChars = settings.excludeChars.split('')

    if (
      !settings.passwordLength ||
      settings.passwordLength < 4 ||
      settings.passwordLength > 16
    ) {
      this.settingsStatus = SETTINGS_STATUS.lengthError
    } else if (
      !characterSets.length
    ) {
      this.settingsStatus = SETTINGS_STATUS.zeroCharacterSetSelected
    } else if (
      characterSets.some(charSet => 
        charSet.split('').every(char => excludeChars.includes(char))
      )
    ) {
      this.settingsStatus = SETTINGS_STATUS.excludeCharactersConflict
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

// entry point
controller.deployListenerOnGeneratorForm()


