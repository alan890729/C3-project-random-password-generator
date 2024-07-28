const SETTING_STATUS = {
  wrongPasswordLength: 'no/wrong password length entered',
  noCharacterSet: 'no character set selected',
  verified: 'setting verified, match condition.',
  excludeCharactersConflict: 'excludeCharactersConflict'
}

function getSettingStatus(settings, characterSets) {
  const passwordLength = +settings.passwordLength
  const excludeChars = settings.excludeCharacters.split('')

  if (
    !passwordLength ||
    +passwordLength < 4 ||
    +passwordLength > 16
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

module.exports = {
  SETTING_STATUS,
  getSettingStatus,
  errorMessage
}