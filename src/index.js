import 'tailwindcss/tailwind.css'
import './layout/AppLayout'
import './components/ProductList'
import './components/FormModal'
import Products from './services/Products'

class App {
  constructor () {
    this._productService = new Products()
  }

  init () {
    this.render()
    this._initModal()
    this._initEvents()
    this.loadProduct()
  }

  _initModal () {
    if (!document.body.querySelector('form-modal')) {
      this._formModal = document.createElement('form-modal')
      document.body.appendChild(this._formModal)
    }
  }

  _initEvents () {
    document.body.querySelector('#create-button').addEventListener('click', () => {
      this._formModal.show()
    })
  }

  async loadProduct () {
    await this._productService.getAll()
    const productList = document.createElement('product-list')
    productList.setAttribute('class', 'w-full grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8')
    productList.products = this._productService.data.map(product => ({
      ...product,
      picture: product.picture ? `${process.env.API_BASE_URL}${product.picture.formats.thumbnail.url}` : null,
    }))
    productList.onItemShowClick(() => {
      this._formModal.show()
    })
    document.body.querySelector('#product-list').appendChild(productList)
  }

  render () {
    document.body.innerHTML = `
      <app-layout>
        <div class="py-3 text-right">
          <button id="create-button" type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Product
          </button>
        </div>
        <div id="product-list" class="p-4 border-4 border-dashed border-gray-200 rounded-lg min-h-full"></div>
      </app-layout>
    `
  }
}

new App().init()
