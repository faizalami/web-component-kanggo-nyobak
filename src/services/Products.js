import axios from '../plugins/axios'

class Products {
  constructor () {
    this._data = []
  }

  set data (data) {
    this._data = [...data]
  }

  get data () {
    return [...this._data]
  }

  async getAll () {
    try {
      const { status, data } = await axios.get('/products')

      this.data = data
      return {
        success: status === 200,
        error: null,
      }
    } catch (e) {
      this.data = []

      return {
        success: false,
        error: 'Failed to load data.',
      }
    }
  }

  async create (context, payload) {
    try {
      const { status, data } = await axios.post('/products', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      this.getAll()

      return {
        success: status === 200,
        data,
        error: null,
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        error: 'Failed to create.',
      }
    }
  }

  async update (context, { id, payload }) {
    try {
      const { status, data } = await axios.put(`/products/${id}`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      this.getAll()

      return {
        success: status === 200,
        data,
        error: null,
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        error: 'Failed to update.',
      }
    }
  }

  async delete ({ dispatch }, id) {
    try {
      const { status, data } = await axios.delete(`/products/${id}`)
      this.getAll()

      return {
        success: status === 200,
        data,
        error: null,
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        error: 'Failed to delete.',
      }
    }
  }
}

export default Products
