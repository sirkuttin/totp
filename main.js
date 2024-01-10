/* eslint-env browser */

const totp = require('totp-generator')

const form = document.getElementById('form')
const formDetails = document.getElementById('form-details')
const result = document.getElementById('result')
const resultCode = document.getElementById('code')
const { username, password } = form.elements
const { secret, algorithm, digits, period, authyMode, resetDefaults } = formDetails.elements

function updatePasswordFromDetails () {
  const uri = new URL(password.value.startsWith('otpauth://') ? password.value : `otpauth://totp/${encodeURIComponent(username.value)}`)
  const search = new URLSearchParams(uri.search)

  search.set('secret', secret.value)
  search.set('algorithm', algorithm.value)
  search.set('digits', digits.value)
  search.set('period', period.value)

  uri.search = search
  password.value = uri.toString()
}

function updateDetailsFromPassword () {
  if (!password.value.startsWith('otpauth://')) {
    secret.value = password.value
    algorithm.value = 'SHA-1'
    digits.value = 6
    period.value = 30
    return
  }

  const search = new URLSearchParams(new URL(password.value).search)

  secret.value = search.get('secret')
  algorithm.value = (search.get('algorithm') || 'SHA-1').replace(/^SHA(\d+)$/i, 'SHA-$1')
  digits.value = search.get('digits') || 6
  period.value = search.get('period') || 30
}

function totpFromUriOrSecret (value) {
  if (!value.startsWith('otpauth://')) {
    // Directly the secret, use default options.
    return totp(value)
  }

  const search = new URLSearchParams(new URL(value).search)
  let { secret, algorithm, digits, period } = Object.fromEntries(search)

  if (algorithm) {
    // Some providers give `SHA1` but `jssha` expects `SHA-1`.
    algorithm = algorithm.replace(/^SHA(\d+)$/i, 'SHA-$1')
  }

  return totp(secret, { algorithm, digits, period })
}

function generateCode () {
  const code = totpFromUriOrSecret(password.value)
  result.classList.remove('is-hidden')
  result.style.lineHeight = `${resultCode.offsetHeight}px`
  resultCode.size = code.length - 2 // Not sure why but this fits perfectly.
  resultCode.value = code
  resultCode.select()
  navigator.clipboard.writeText(code)
}

form.addEventListener('submit', e => {
  e.preventDefault()
  generateCode()
})

password.addEventListener('change', updateDetailsFromPassword)

resultCode.addEventListener('click', e => {
  resultCode.select()
})

secret.addEventListener('change', updatePasswordFromDetails)
algorithm.addEventListener('change', updatePasswordFromDetails)
digits.addEventListener('change', updatePasswordFromDetails)
period.addEventListener('change', updatePasswordFromDetails)

authyMode.addEventListener('click', e => {
  algorithm.value = 'SHA-1'
  digits.value = 7
  period.value = 10
  updatePasswordFromDetails()
})

resetDefaults.addEventListener('click', e => {
  algorithm.value = 'SHA-1'
  digits.value = 6
  period.value = 30
  updatePasswordFromDetails()
})

addEventListener('paste', e => {
  if (e.clipboardData.items.length <= 0) {
    return
  }

})
