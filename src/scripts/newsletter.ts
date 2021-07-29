const $form = document.getElementById(
  'newsletter-sign-up-form'
) as HTMLFormElement
const $thankYou = document.getElementById('newsletter-thank-you') as HTMLElement
const $error = document.getElementById('newsletter-error') as HTMLElement

function onSubmit(event: Event): void {
  event.preventDefault()

  fetch($form.action, {
    method: 'POST',
    body: new FormData($form),
    mode: 'cors',
  })
    .then((res) => {
      if (res.status !== 200) throw new Error(res.statusText)
      $form.hidden = true
      $thankYou.hidden = false
      $error.hidden = true
    })
    .catch((err) => {
      $error.hidden = false
      console.error(err)
    })
}

$form.addEventListener('submit', onSubmit)
