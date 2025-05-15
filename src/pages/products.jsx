import React, { useState } from 'react'

const Products = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos')
  const [search, setSearch] = useState('')

  const productos = [
    {
      id: 1,
      nombre: 'Tensiómetro Digital',
      descripcion: 'Tensiómetro digital automático de brazo con pantalla LCD',
      categoria: 'diagnostico',
      precio: 120000
    },
    {
      id: 2,
      nombre: 'Nebulizador Portátil',
      descripcion: 'Nebulizador ultrasónico portátil para uso doméstico',
      categoria: 'respiratorio',
      precio: 85000
    },
    {
      id: 3,
      nombre: 'Glucómetro Digital',
      descripcion: 'Monitor de glucosa en sangre con tiras reactivas',
      categoria: 'diagnostico',
      precio: 95000
    }
  ]

  const categorias = [
    { id: 'todos', nombre: 'Todos los Productos' },
    { id: 'diagnostico', nombre: 'Diagnóstico' },
    { id: 'respiratorio', nombre: 'Respiratorio' },
  ]

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const productosFiltrados = categoriaSeleccionada === 'todos'
    ? productos
    : productos.filter(producto => producto.categoria === categoriaSeleccionada)

  const filteredProducts = productosFiltrados.filter(product =>
    product.nombre.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="products-container">
      <h2 className="products-title">Gestión de Productos</h2>
      
      <div className="admin-controls">
        <button className="btn-add">
          <i className="fas fa-plus-circle"></i> Añadir Producto
        </button>
        
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="categorias-filter">
        {categorias.map(categoria => (
          <button
            key={categoria.id}
            className={`categoria-btn ${categoriaSeleccionada === categoria.id ? 'activo' : ''}`}
            onClick={() => setCategoriaSeleccionada(categoria.id)}
          >
            {categoria.nombre}
          </button>
        ))}
      </div>

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((producto, i) => (
              <tr key={producto.id}>
                <td>{i + 1}</td>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.categoria}</td>
                <td>${producto.precio.toLocaleString()}</td>
                <td className="actions">
                  <button className="btn-edit">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="btn-delete">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Products