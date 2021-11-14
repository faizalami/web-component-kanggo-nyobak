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
          <section class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <!-- Replace with your content -->
            <div class="px-4 py-6 sm:px-0">
              ${this.innerHTML}
            </div>
            <!-- /End replace -->
          </section>
        </main>
      </div>
    `
  }
}

customElements.define('app-layout', AppLayout)
