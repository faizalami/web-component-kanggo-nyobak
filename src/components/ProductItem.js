class ProductItem extends HTMLElement {
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

  render () {
    if (this._product) {
      this.innerHTML = `
        <div class="group text-left rounded-lg border border-gray-200">
          <div id="thumbnail-wrapper" class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img src="${this._product.picture || 'pictures/product-thumbnail.jpg'}" alt="${this._product.name}" class="w-full h-full object-center object-cover group-hover:opacity-75">
          </div>
          
          <div class="p-3">
            <div class="w-full text-center">
              <button type="button" class="rounded-full w-10 h-10 p-2 bg-blue-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              <button type="button" class="rounded-full w-10 h-10 p-2 bg-blue-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button type="button" class="rounded-full w-10 h-10 p-2 bg-red-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <h3 class="mt-2 text-lg text-gray-700">
              ${this._product.name}
            </h3>
            <p class="mt-1 text-lg font-medium text-gray-900">
              Rp ${this._product.price}
            </p>
          </div>
        </div>
      `
    }
  }
}

customElements.define('product-item', ProductItem)
