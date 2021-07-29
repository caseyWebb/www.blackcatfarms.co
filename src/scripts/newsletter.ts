const $form = document.getElementById(
  'newsletter-sign-up-form'
) as HTMLFormElement
const $thankYou = document.getElementById('newsletter-thank-you') as HTMLElement
const $error = document.getElementById('newsletter-error') as HTMLElement
const $input = $form.querySelector('input[name=email]') as HTMLInputElement
const $button = $form.querySelector('button[type=submit]') as HTMLButtonElement

function setFormDisabledState(disabled: boolean): void {
  $form.style.opacity = disabled ? '0.5' : '1'
  $input.disabled = disabled
  $button.disabled = disabled
}

function onSubmit(event: Event): void {
  event.preventDefault()

  setFormDisabledState(true)

  fetch($form.action, {
    method: 'POST',
    body: new FormData($form),
    mode: 'cors',
  })
    .then(() => {
      $form.hidden = true
      $thankYou.hidden = false
      $error.hidden = true
    })
    .catch((e) => {
      $error.hidden = false
      console.error(e)
    })
    .finally(() => {
      setFormDisabledState(false)
    })
}

$form.addEventListener('submit', onSubmit)
