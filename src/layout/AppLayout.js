import '../components/AppNavigation'
import '../components/AppHeader'

class AppLayout extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = `
      <div class="min-h-full">
        <app-navigation></app-navigation>
      
        <app-header>Products</app-header>
        <main>
          <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <!-- Replace with your content -->
            <div class="px-4 py-6 sm:px-0">
              <div class="border-4 border-dashed border-gray-200 rounded-lg h-96">
                ${this.innerHTML}
              </div>
            </div>
            <!-- /End replace -->
          </div>
        </main>
      </div>
    `
  }
}

customElements.define('app-layout', AppLayout)
