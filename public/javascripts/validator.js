const form = document.querySelector('#generator-form')
const passwordLength = document.querySelector('#password-length')
const characterSetsField = document.querySelector('#character-sets-field')
const characterSetsCheckboxes = [...document.querySelectorAll('#character-sets-field input')]

form.addEventListener('submit', function onGeneratorFormSubmitted(event) {
  if (!form.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
  }
  if (!form.classList.contains('was-validated')) {
    form.classList.add('was-validated')
  }
})

// 我想要試著做做看，如果目前在passwordLength 的 input輸入框上，也會讓form套上was-validated的class，觸發驗證的效果
passwordLength.addEventListener('focus', function onPasswordLengthFocused(event) {
  if (!form.classList.contains('was-validated')) {
    form.classList.add('was-validated')
  }
})

characterSetsField.addEventListener('change', function onCharacterSetsFieldChanged(event) {
  console.log(event)
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