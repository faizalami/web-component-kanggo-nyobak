import Products from '../services/Products'

class DeleteModal extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  set product (product) {
    this._product = product
    this.render()
  }

  get product () {
    return this._product
  }

  show () {
    this.setAttribute('show', 'true')
  }

  hide () {
    this.setAttribute('show', 'false')
  }

  toggle () {
    const show = this.getAttribute('show') === 'true'
    this.setAttribute('show', show ? 'false' : 'true')
  }

  onDeleteCompleted (handler) {
    this._onDeleteCompleted = handler
    this.render()
  }

  _initEvents () {
    this.querySelector('#delete-cancel-button').addEventListener('click', () => {
      this.hide()
    })
    this.querySelector('#delete-process-button').addEventListener('click', async () => {
      if (this._product) {
        const response = await Products.delete(this._product.id)

        if (this._onDeleteCompleted) {
          this._onDeleteCompleted(response)
        }
        this.hide()
      }
    })
  }

  render () {
    this.innerHTML = `
      <div class="fixed z-10 inset-0 h-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center h-0 pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div id="delete-modal-overlay" class="transition-opacity ease-out duration-300 transform opacity-0 h-0 fixed inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
      
          <!-- This element is to trick the browser into centering the modal contents. -->
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          
          <div id="delete-modal-panel" class="transition-all ease-out duration-300 transform opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <!-- Heroicon name: outline/exclamation -->
                  <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Delete
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Are you sure you want to delete ${this._product?.name}?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button id="delete-process-button" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                Delete
              </button>
              <button id="delete-cancel-button" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    `
    this._initEvents()
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'show') {
      switch (newValue) {
        case 'true':
          this.querySelector('#delete-modal-overlay').classList.replace('opacity-0', 'opacity-100')
          this.querySelectorAll('delete-modal .h-0').forEach(item => {
            item.classList.replace('h-0', 'min-h-screen')
          })
          this.querySelector('#delete-modal-panel').classList.remove(...('opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'.split(' ')))
          this.querySelector('#delete-modal-panel').classList.add(...('opacity-100 translate-y-0 sm:scale-100'.split(' ')))
          break
        case 'false':
          this.querySelector('#delete-modal-overlay').classList.replace('opacity-100', 'opacity-0')
          this.querySelectorAll('delete-modal .min-h-screen').forEach(item => {
            item.classList.replace('min-h-screen', 'h-0')
          })
          this.querySelector('#delete-modal-panel').classList.remove(...('opacity-100 translate-y-0 sm:scale-100'.split(' ')))
          this.querySelector('#delete-modal-panel').classList.add(...('opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'.split(' ')))
          break
      }
    }
  }

  static get observedAttributes () {
    return ['show']
  }
}

customElements.define('delete-modal', DeleteModal)
