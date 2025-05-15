import React, { useState, useEffect } from 'react';
import '../styles/user.css';

const User = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usuariosPorPagina] = useState(5);

  const API_URL = 'https://jsonplaceholder.typicode.com/users'; /** Aquí va la URL de tu API */

  useEffect(() => {
    fetchUsuarios(); /** Aquí va la función para cargar los usuarios */
  }, []);

  const fetchUsuarios = async () => { 
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Error al cargar los usuarios');
      }
      const data = await response.json();
      const usuariosFormateados = data.map(user => ({
        id: user.id,
        nombre: user.name,
        email: user.email,
        rol: asignarRolAleatorio(),
        estado: asignarEstadoAleatorio(),
        ultimoAcceso: generarFechaAcceso()
      }));
      setUsuarios(usuariosFormateados);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const asignarRolAleatorio = () => {
    const roles = ['Administrador', 'Vendedor', 'Inventario', 'Supervisor', 'Contabilidad', 'Marketing'];
    return roles[Math.floor(Math.random() * roles.length)];
  };

  const asignarEstadoAleatorio = () => {
    const estados = ['Activo', 'Inactivo', 'Suspendido'];
    return estados[Math.floor(Math.random() * estados.length)];
  };

  const generarFechaAcceso = () => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - Math.floor(Math.random() * 7));
    return fecha.toISOString().split('T')[0];
  };

  const handleAddUser = async (userData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Error al crear usuario');
      const data = await response.json();
      setUsuarios(prev => [...prev, {
        ...data,
        rol: asignarRolAleatorio(),
        estado: 'Activo',
        ultimoAcceso: generarFechaAcceso()
      }]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditUser = async (id, userData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Error al actualizar usuario');
      setUsuarios(prev =>
        prev.map(user => user.id === id ? { ...user, ...userData } : user)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar usuario');
      setUsuarios(prev => prev.filter(user => user.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  // Lógica de paginación
  const indexOfLastUser = currentPage * usuariosPorPagina;
  const indexOfFirstUser = indexOfLastUser - usuariosPorPagina;
  const usuariosFiltrados = usuarios.filter(usuario => 
    usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const usuariosActuales = usuariosFiltrados.slice(indexOfFirstUser, indexOfLastUser);
  const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="loading">Cargando usuarios...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="users-container">
      <div className="users-content">
        <h1 className="users-title">Gestión de Usuarios</h1>
        
        <div className="admin-controls">
          <button className="btn-add" onClick={() => handleAddUser()}>
            <i className="fas fa-user-plus"></i> Añadir Usuario
          </button>
          
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Buscar usuario..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Último Acceso</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosActuales.map(usuario => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.rol}</td>
                  <td>
                    <span className={`status ${usuario.estado.toLowerCase()}`}>
                      {usuario.estado}
                    </span>
                  </td>
                  <td>{usuario.ultimoAcceso}</td>
                  <td className="actions">
                    <button 
                      className="btn-edit"
                      onClick={() => handleEditUser(usuario.id)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDeleteUser(usuario.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          {totalPaginas > 1 && (
            <>
              <button 
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Anterior
              </button>
              
              {[...Array(totalPaginas)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPaginas}
                className="pagination-btn"
              >
                Siguiente
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;