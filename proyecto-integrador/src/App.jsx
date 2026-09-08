import React, { useState } from 'react';

const flujoEstados = ['Pendiente', 'En revisión', 'Reparación', 'Prueba técnica', 'Listo para entrega'];

const ordenesIniciales = [
  { id: 'ORD-102', cliente: 'Ana García', equipo: 'Notebook Dell', servicio: 'Reparación', estado: 'En revisión', prioridad: 'Alta' },
  { id: 'ORD-103', cliente: 'Daniel Sosa', equipo: 'PC Gamer', servicio: 'Mejora', estado: 'Pendiente', prioridad: 'Media' },
  { id: 'ORD-104', cliente: 'Laura Ruiz', equipo: 'Impresora HP', servicio: 'Mantenimiento', estado: 'Listo para entrega', prioridad: 'Baja' }
];

function InicioCliente({ pedidos, setPedidos, onSeleccionarPedido }) {
  const [form, setForm] = useState({
    cliente: '',
    equipo: '',
    servicio: 'Reparación'
  });

  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(pedidos[0]?.id ?? '');

  const pedidoActual = pedidos.find((pedido) => pedido.id === pedidoSeleccionado) ?? pedidos[0];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.cliente.trim() || !form.equipo.trim()) {
      alert('Completá el nombre del cliente y el equipo para registrar el pedido.');
      return;
    }

    const nuevoPedido = {
      id: `ORD-${Math.floor(Math.random() * 900 + 100)}`,
      cliente: form.cliente,
      equipo: form.equipo,
      servicio: form.servicio,
      estado: 'Pendiente',
      prioridad: 'Media'
    };

    setPedidos((prev) => [nuevoPedido, ...prev]);
    setPedidoSeleccionado(nuevoPedido.id);
    onSeleccionarPedido(nuevoPedido.id);
    setForm({ cliente: '', equipo: '', servicio: 'Reparación' });
  };

  const progreso = pedidoActual
    ? ((flujoEstados.indexOf(pedidoActual.estado) + 1) / flujoEstados.length) * 100
    : 0;

  return (
    <section className="fade-in cliente-portal panel-seccion panel-inicio">
      <div className="hero-banner">
        <span className="eyebrow">Atención al cliente</span>
        <h2>Inicio al cliente</h2>
        <p>
          Podés registrar un pedido, consultar opciones de reparación o mejora, y seguir el avance
          del equipo en tiempo real desde una sola pantalla.
        </p>
      </div>

      <div className="cliente-grid">
        <div className="action-card">
          <div className="action-card-header">
            <span className="icon">📝</span>
            <h3>Agregar pedido</h3>
          </div>
          <form className="pedido-form" onSubmit={handleSubmit}>
            <label>
              Nombre del cliente
              <input
                type="text"
                name="cliente"
                value={form.cliente}
                onChange={handleInputChange}
                placeholder="Ej: Carlos Pérez"
              />
            </label>
            <label>
              Equipo a atender
              <input
                type="text"
                name="equipo"
                value={form.equipo}
                onChange={handleInputChange}
                placeholder="Ej: Notebook Lenovo"
              />
            </label>
            <label>
              Tipo de servicio
              <select name="servicio" value={form.servicio} onChange={handleInputChange}>
                <option value="Reparación">Reparación</option>
                <option value="Mejora">Mejora</option>
                <option value="Mantenimiento">Mantenimiento</option>
              </select>
            </label>
            <button type="submit" className="btn-primario">Registrar pedido</button>
          </form>
        </div>

        <div className="action-card">
          <div className="action-card-header">
            <span className="icon">🛠️</span>
            <h3>Reparar o mejorar equipo</h3>
          </div>
          <ul className="servicio-lista">
            <li><strong>Reparación</strong><span>Fallas de hardware o software.</span></li>
            <li><strong>Mejora</strong><span>Actualización de rendimiento y componentes.</span></li>
            <li><strong>Mantenimiento</strong><span>Diagnóstico preventivo y limpieza.</span></li>
          </ul>
          <button className="btn-secundario" onClick={() => alert('Se abrió la solicitud de diagnóstico técnico.')}>Solicitar diagnóstico</button>
        </div>

        <div className="action-card">
          <div className="action-card-header">
            <span className="icon">📦</span>
            <h3>Siga su pedido</h3>
          </div>

          {pedidos.length > 0 && (
            <>
              <label>
                Seleccionar pedido
                <select
                  value={pedidoSeleccionado}
                  onChange={(event) => {
                    setPedidoSeleccionado(event.target.value);
                    onSeleccionarPedido(event.target.value);
                  }}
                >
                  {pedidos.map((pedido) => (
                    <option key={pedido.id} value={pedido.id}>
                      {pedido.id} - {pedido.equipo}
                    </option>
                  ))}
                </select>
              </label>

              {pedidoActual && (
                <div className="seguimiento-box">
                  <div className="pedido-meta">
                    <strong>{pedidoActual.id}</strong>
                    <span>{pedidoActual.servicio}</span>
                  </div>

                  <div className="progress-bar">
                    <span style={{ width: `${progreso}%` }} />
                  </div>

                  <ul className="timeline">
                    {flujoEstados.map((estado, index) => (
                      <li key={estado} className={index <= flujoEstados.indexOf(pedidoActual.estado) ? 'activo' : ''}>
                        {estado}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function AccesoTecnico() {
  const handleLogin = (event) => {
    event.preventDefault();
    alert('¡Acceso técnico verificado correctamente!');
  };

  return (
    <section className="fade-in panel-seccion panel-acceso">
      <div className="section-header section-header-blue">
        <span className="eyebrow">Sistema interno</span>
        <h2>Acceso Técnico</h2>
      </div>
      <p>Ingrese sus credenciales para acceder a las funciones avanzadas del sistema.</p>
      <form onSubmit={handleLogin} className="form-sistema">
        <div className="form-group">
          <label>ID de Técnico:</label>
          <input type="text" placeholder="Ej: TEC-5400" required />
        </div>
        <div className="form-group">
          <label>Contraseña de Seguridad:</label>
          <input type="password" placeholder="••••••••" required />
        </div>
        <button type="submit" className="btn-primario">Verificar Identidad</button>
      </form>
    </section>
  );
}

function PanelOrdenes({ pedidos, setPedidos }) {
  const avanzarEstado = (id) => {
    setPedidos((prev) =>
      prev.map((pedido) => {
        if (pedido.id !== id) return pedido;

        const indexActual = flujoEstados.indexOf(pedido.estado);
        const siguienteEstado = flujoEstados[Math.min(indexActual + 1, flujoEstados.length - 1)];

        return {
          ...pedido,
          estado: siguienteEstado
        };
      })
    );
  };

  return (
    <section className="fade-in panel-seccion panel-ordenes">
      <div className="section-header section-header-purple">
        <span className="eyebrow">Operaciones</span>
        <h2>Panel de control de órdenes</h2>
      </div>
      <p>Actualizá el estado del pedido y el cliente lo verá reflejado en tiempo real en la pantalla de inicio.</p>

      <div className="tabla-contenedor">
        <table className="tabla-sistema">
          <thead>
            <tr>
              <th>ID Orden</th>
              <th>Cliente / Equipo</th>
              <th>Servicio</th>
              <th>Prioridad</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td><strong>{pedido.id}</strong></td>
                <td>
                  <div className="pedido-equipo">
                    <span>{pedido.cliente}</span>
                    <small>{pedido.equipo}</small>
                  </div>
                </td>
                <td>{pedido.servicio}</td>
                <td>
                  <span className={`badge ${pedido.prioridad.toLowerCase()}`}>{pedido.prioridad}</span>
                </td>
                <td>
                  <span className={`estado-badge estado-${pedido.estado.toLowerCase().replace(/\s+/g, '-')}`}>
                    {pedido.estado}
                  </span>
                </td>
                <td>
                  <button className="btn-secundario btn-chico" onClick={() => avanzarEstado(pedido.id)}>
                    Siguiente paso
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PanelStockAlertas() {
  const alertas = [
    { id: 1, tipo: 'critica', mensaje: 'CRÍTICO: Stock mínimo de AMD Ryzen 7 7800X3D. Quedan 3 unidades en depósito.' },
    { id: 2, tipo: 'advertencia', mensaje: 'ADVERTENCIA: Nvidia RTX 4070 Super en nivel bajo. Reposición recomendada esta semana.' },
    { id: 3, tipo: 'regular', mensaje: 'REGULAR: Memoria DDR5 32GB disponible, pero con demanda alta en laptops gaming.' }
  ];

  const inventario = [
    { nombre: 'Procesador AMD Ryzen 7 7800X3D', stock: 3, estado: 'critica', categoria: 'CPU' },
    { nombre: 'Procesador Intel Core i7-14700K', stock: 8, estado: 'advertencia', categoria: 'CPU' },
    { nombre: 'Placa de video NVIDIA RTX 4070 Super', stock: 5, estado: 'advertencia', categoria: 'GPU' },
    { nombre: 'Placa de video AMD Radeon RX 7800 XT', stock: 12, estado: 'regular', categoria: 'GPU' },
    { nombre: 'Memoria RAM DDR5 32GB (2x16)', stock: 18, estado: 'regular', categoria: 'RAM' },
    { nombre: 'SSD NVMe 2TB Gen4', stock: 9, estado: 'advertencia', categoria: 'Almacenamiento' },
    { nombre: 'Motherboard B650', stock: 4, estado: 'critica', categoria: 'Motherboard' },
    { nombre: 'Fuente 750W 80 Plus Gold', stock: 14, estado: 'regular', categoria: 'Power' }
  ];

  const distribuidores = [
    'MERCADO LIBRE - componentes de PC y notebook',
    'PC Factory / Hardware tienda especializada',
    'TechPower Argentina',
    'Microland / distribuidores de tecnología',
    'Bazar PC / repuestos y accesorios',
    'Notebook Store / repuestos para notebooks'
  ];

  return (
    <section className="fade-in panel-seccion panel-stock">
      <div className="section-header section-header-green">
        <span className="eyebrow">Inventario</span>
        <h2>Panel de control de stock y alertas</h2>
      </div>

      <div className="alertas-contenedor">
        <h3>Alertas del sistema</h3>
        {alertas.map((alerta) => (
          <div key={alerta.id} className={`alerta-box ${alerta.tipo}`}>
            <p>{alerta.mensaje}</p>
          </div>
        ))}
      </div>

      <div className="resumen-stock">
        <h3>Resumen de inventario de componentes</h3>
        <div className="inventario-grid">
          {inventario.map((item) => (
            <div key={item.nombre} className={`stock-item ${item.estado}`}>
              <div className="stock-header">
                <span className="categoria">{item.categoria}</span>
                <span className={`stock-tag ${item.estado}`}>{item.estado}</span>
              </div>
              <strong>{item.nombre}</strong>
              <p>Unidades disponibles: {item.stock}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="distribuidores-box">
        <h3>Distribuidores sugeridos para encargar más stock</h3>
        <ul>
          {distribuidores.map((distribuidor) => (
            <li key={distribuidor}>{distribuidor}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function App() {
  const [seccionActiva, setSeccionActiva] = useState('inicio');
  const [pedidos, setPedidos] = useState(ordenesIniciales);

  return (
    <div className="app-wrapper">
      <header className="navbar-sistema">
        <div className="logo">
          <h1>Sistema de Gestión <span className="sublogo">24hs</span></h1>
        </div>
        <nav className="menu-opciones">
          <button className={seccionActiva === 'inicio' ? 'active' : ''} onClick={() => setSeccionActiva('inicio')}>
            Inicio al Cliente
          </button>
          <button className={seccionActiva === 'acceso' ? 'active' : ''} onClick={() => setSeccionActiva('acceso')}>
            Acceso Técnico
          </button>
          <button className={seccionActiva === 'ordenes' ? 'active' : ''} onClick={() => setSeccionActiva('ordenes')}>
            Control de Órdenes
          </button>
          <button className={seccionActiva === 'stock' ? 'active' : ''} onClick={() => setSeccionActiva('stock')}>
            Stock y Alertas
          </button>
        </nav>
      </header>

      <main className="panel-principal">
        {seccionActiva === 'inicio' && (
          <InicioCliente pedidos={pedidos} setPedidos={setPedidos} onSeleccionarPedido={() => {}} />
        )}
        {seccionActiva === 'acceso' && <AccesoTecnico />}
        {seccionActiva === 'ordenes' && <PanelOrdenes pedidos={pedidos} setPedidos={setPedidos} />}
        {seccionActiva === 'stock' && <PanelStockAlertas />}
      </main>

      <footer className="footer-sistema">
        <p>Proyecto Integrador - Tecnicatura Superior en Redes e Informática</p>
      </footer>
    </div>
  );
}