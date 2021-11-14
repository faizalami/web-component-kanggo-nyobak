import './ProductItem'

class ProductList extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  set products (products) {
    this._products = products
    this.render()
  }

  get products () {
    return this._products
  }

  render () {
    this.innerHTML = ''
    if (Array.isArray(this._products) && this._products.length) {
      this._products.forEach(product => {
        const productItem = document.createElement('product-item')
        productItem.product = product

        this.appendChild(productItem)
      })
    } else {
      this.innerHTML = `
        <p class="text-center my-4 col-span-full text-gray-700 font-bold">There is no product stored.</p>
      `
    }
  }
}

customElements.define('product-list', ProductList)
