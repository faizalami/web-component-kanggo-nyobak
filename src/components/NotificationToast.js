class NotificationToast extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  show (mode, message) {
    this.setAttribute('mode', mode)
    this.setAttribute('message', message)
    this.setAttribute('show', 'true')
    setTimeout(() => {
      this.setAttribute('show', 'false')
    }, 5000)
  }

  render () {
    const mode = this.getAttribute('mode') || 'success'
    const message = this.getAttribute('message') || ''
    let icon = ''
    if (mode === 'success') {
      icon = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `
    } else if (mode === 'failed') {
      icon = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `
    }
    this.innerHTML = `
      <div class="flex fixed z-10 inset-0 h-0">
        <div id="notification" class="hidden mx-auto mt-2">
          <div class="bg-white rounded-lg border-gray-300 border p-3 shadow-lg">
            <div class="flex flex-row">
              <div class="px-2 ${mode === 'success' ? 'text-indigo-600' : 'text-red-600'}">
                ${icon}
              </div>
              <div class="ml-2 mr-6">
                <span class="font-semibold">${message}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'show') {
      switch (newValue) {
        case 'true':
          this.querySelector('#notification').classList.replace('hidden', 'block')
          break
        case 'false':
          this.querySelector('#notification').classList.replace('block', 'hidden')
          break
      }
    } else {
      this.render()
    }
  }

  static get observedAttributes () {
    return ['show', 'mode', 'message']
  }
}

customElements.define('notification-toast', NotificationToast)
