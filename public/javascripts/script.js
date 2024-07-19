const generatorForm = document.querySelector('#generator-form')
const generatedPassword = document.querySelector('#generated-password')

const SETTINGS_STATUS = {
  lengthError: 'wrong length or no length entered',
  zeroCharacterSetSelected: '0 character set selected',
  verified: 'verified'
}

const model = {
  codeChars: '',
  lowercases: 'abcdefghijklmnopqrstuvwxyz',
  uppercases: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '1234567890',
  symbols: '`~!@#$%^&*()-_=+[{]}|;:\'\",<.>/?',

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

  generatePassword() {

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

// const utility = {
//   shuffleCodeChars(codeChars) {
//     let passwordArr = codeChars.split('')
//     let password = ''

//     for (let i = passwordArr.length - 1; i > 0; i--) {
//       let randomIndex = Math.floor(Math.random() * (i + 1))
//         ;[passwordArr[i], passwordArr[randomIndex]] = [passwordArr[randomIndex], passwordArr[i]]
//     }

//     password = passwordArr.join('')
//     return password
//   }
// }

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
      view.renderGeneratedPassword('generated password')
      return
  }
})

