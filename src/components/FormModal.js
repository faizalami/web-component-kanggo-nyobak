import Products from '../services/Products'

class FormModal extends HTMLElement {
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

  show (mode = 'create') {
    this.setAttribute('show', 'true')
    this.setAttribute('mode', mode)
  }

  hide () {
    this.setAttribute('show', 'false')
  }

  toggle (mode) {
    const show = this.getAttribute('show') === 'true'
    this.setAttribute('show', show ? 'false' : 'true')
    this.setAttribute('mode', mode)
  }

  onSaveCompleted (handler) {
    this._onSaveCompleted = handler
    this.render()
  }

  _handleModal (open) {
    switch (open) {
      case 'true':
        this.querySelector('#form-modal-overlay').classList.replace('opacity-0', 'opacity-100')
        this.querySelectorAll('form-modal .h-0').forEach(item => {
          item.classList.replace('h-0', 'min-h-screen')
        })
        this.querySelector('#form-modal-panel').classList.remove(...('opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'.split(' ')))
        this.querySelector('#form-modal-panel').classList.add(...('opacity-100 translate-y-0 sm:scale-100'.split(' ')))
        break
      case 'false':
        this.querySelector('#form-modal-overlay').classList.replace('opacity-100', 'opacity-0')
        this.querySelectorAll('form-modal .min-h-screen').forEach(item => {
          item.classList.replace('min-h-screen', 'h-0')
        })
        this.querySelector('#form-modal-panel').classList.remove(...('opacity-100 translate-y-0 sm:scale-100'.split(' ')))
        this.querySelector('#form-modal-panel').classList.add(...('opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'.split(' ')))
        break
    }
  }

  _handleMode (mode) {
    switch (mode) {
      case 'create':
        this.querySelectorAll('input, textarea').forEach(item => {
          item.disabled = false
        })
        this.querySelectorAll('#picture-preview, #change-picture-label').forEach(item => {
          item.classList.replace('block', 'hidden')
        })
        this.querySelectorAll('#picture, #form-save-button').forEach(item => {
          item.classList.replace('hidden', 'block')
        })
        break
      case 'edit':
        this.querySelectorAll('input, textarea').forEach(item => {
          item.disabled = false
        })
        this.querySelectorAll('#picture, #picture-preview, #change-picture-label, #form-save-button').forEach(item => {
          item.classList.replace('hidden', 'block')
        })
        break
      case 'detail':
        this.querySelectorAll('input, textarea').forEach(item => {
          item.disabled = true
        })
        this.querySelectorAll('#picture, #change-picture-label, #form-save-button').forEach(item => {
          item.classList.replace('block', 'hidden')
        })
        this.querySelector('#picture-preview').classList.replace('hidden', 'block')
        break
    }
  }

  _payload () {
    let data = null
    this.querySelectorAll('input, textarea').forEach(item => {
      if (item.type !== 'file') {
        data = {
          ...data,
          [item.name]: item.value,
        }
      }
    })

    const upload = this.querySelector('[name=picture]')
    const form = new FormData()

    form.append('data', JSON.stringify(data))
    if (upload && upload.files.length) {
      const file = upload.files[0]
      form.append('files.picture', file, file.name)
    }

    return form
  }

  _initEvents () {
    this.querySelector('#form-cancel-button').addEventListener('click', () => {
      this.hide()
    })
    this.querySelector('#form-save-button').addEventListener('click', async () => {
      const mode = this.getAttribute('mode')
      if (['create', 'edit'].includes(mode)) {
        const response = mode === 'create'
          ? await Products.create(this._payload())
          : await Products.update(this._product.id, this._payload())

        if (this._onSaveCompleted) {
          this._onSaveCompleted(response)
        }
        this.hide()
      }
    })
  }

  render () {
    this.innerHTML = `
      <div class="fixed z-10 inset-0 h-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center h-0 pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div id="form-modal-overlay" class="transition-opacity ease-out duration-300 transform opacity-0 h-0 fixed inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
      
          <!-- This element is to trick the browser into centering the modal contents. -->
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          
          <div id="form-modal-panel" class="transition-all ease-out duration-300 transform opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 sm:mt-0 w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Product
                  </h3>
                  <div class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-text"
                        type="text"
                        id="name"
                        name="name"
                        value="${this._product?.name || ''}"
                      />
                    </div>
                    <div>
                      <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                      <input 
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-text"
                        type="text" 
                        name="category" 
                        id="category" 
                        value="${this._product?.category || ''}"
                      />
                    </div>
                    <div>
                      <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
                      <input 
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-text"
                        type="text" 
                        name="price" 
                        id="price" 
                        value="${this._product?.price || ''}"
                      />
                    </div>
                    <div>
                      <label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
                      <input 
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-text"
                        type="text" 
                        name="stock" 
                        id="stock" 
                        value="${this._product?.stock || ''}"
                      />
                    </div>
                    <div class="col-span-full">
                      <label for="about" class="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <div class="mt-1">
                        <textarea 
                          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-text"
                          id="description" 
                          name="description" 
                          rows="3" 
                        >${this._product?.description || ''}</textarea>
                      </div>
                    </div>
                    <div class="col-span-full">
                      <label for="picture" class="block text-sm font-medium text-gray-700">Picture</label>
                      <img id="picture-preview" src="${this._product?.picture || 'pictures/product-thumbnail.jpg'}" alt="${this._product?.name || ''}" class="hidden w-48 h-56 object-center object-cover">
                      <label id="change-picture-label" for="picture" class="block text-sm font-medium text-gray-700">Change Picture</label>
                      <input type="file" name="picture" id="picture" class="mt-1 w-full block w-full p-1 sm:text-sm border rounded-md shadow-sm text-black placeholder-gray-400 bg-white border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-text">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button id="form-save-button" type="button" class="block w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                Save
              </button>
              <button id="form-cancel-button" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
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
      this._handleModal(newValue)
    }
    if (name === 'mode') {
      this._handleMode(newValue)
    }
  }

  static get observedAttributes () {
    return ['show', 'mode']
  }
}

customElements.define('form-modal', FormModal)
