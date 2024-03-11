import React, { useState, useEffect } from 'react';

import { useUser } from '../../context/UserContext';

import { useNavigate } from 'react-router-dom';

import MapComponent from '../../components/MapComponent/MapComponent';
import './DashboardPage.css'; 


function DashboardPage() {
  const [customers, setCustomers] = useState([]);
  const [filtredCustomers, setFiltredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCustomer, setNewCustomer] = useState({ nome: '', email: '', telefone: '' , location: {x: 0, y: 0}});
  const [editingId, setEditingId] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState({ nome: '', email: '', telefone: '', location: { x: 0, y: 0 } });
  const [route, setRoute] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

    
  useEffect(() => {
  
   

const fetchCustomers = async () => {
  if (user && user.token) {
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/customers/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': user.token
      }
    });

    if (!response.ok) {
    
      console.error("Failed to search for customers:", response.statusText);
  
      return;
    }

    const data = await response.json();
    console.log("Customers data:", data);
    setCustomers(data);
    setFiltredCustomers(data);
  } else {
    console.log("User token not available");
  
  }
};

    if (user) {
      fetchCustomers();
    }
  }, [user]);

  const validateCustomer = () => {
    // Verificar se todos os campos estão preenchidos
    if (!newCustomer.nome || !newCustomer.email || !newCustomer.telefone) {
      alert("Por favor, preencha todos os campos.");
      return false; // Falha na validação
    }
  
    // Regex para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newCustomer.email)) {
      alert("Por favor, insira um endereço de email válido.");
      return false; // Falha na validação
    }
  
    // Regex para validar telefone (Exemplo genérico, pode precisar de ajustes)
    const phoneRegex = /^\(?\d{2}\)?[\s-]?[\s9]?\d{4}-?\d{4}$/;
    if (!phoneRegex.test(newCustomer.telefone)) {
      alert("Por favor, insira um número de telefone válido.");
      return false; // Falha na validação
    }
  
    // Verificar se o email ou telefone já existe
    const emailExists = customers.some(customer => customer.email === newCustomer.email);
    const phoneExists = customers.some(customer => customer.telefone === newCustomer.telefone);
  
    if (emailExists) {
      alert("O email fornecido já está em uso.");
      return false; 
    }
  
    if (phoneExists) {
      alert("O telefone fornecido já está em uso.");
      return false; 
    }
  
   
    const latitude = parseFloat(newCustomer.location.x);
    const longitude = parseFloat(newCustomer.location.y);
  
    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
      alert("O valor de 'x' (latitude) é inválido. Deve estar entre -90 e 90.");
      return false; 
    }
  
    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
      alert("O valor de 'y' (longitude) é inválido. Deve estar entre -180 e 180.");
      return false;
    }
  
    return true; 
  };
  
  
  

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterCustomers(event.target.value);
};

const filterCustomers = (searchTerm) => {
    const filtered = customers.filter(customer =>
        customer.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltredCustomers(filtered);
};

const handleBackToLogin = () => {
    navigate('/');
};

const handleAddCustomer = async () => {
  if (!validateCustomer()) return;
  const customerToAdd = {
    ...newCustomer,
    location: {
      x: newCustomer.locationX, 
      y: newCustomer.locationY
    }
  };

 
  // Remove as propriedades 'locationX' e 'locationY' desnecessárias
  delete customerToAdd.locationX;
  delete customerToAdd.locationY;

  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/customers/add `, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': user.token, // Se necessário, inclua o token de autorização
      },
      body: JSON.stringify(customerToAdd)
    });

    const addedCustomer = await response.json();
   if (!newCustomer) {
    alert("Usuario ou dados ja existentes")
    throw new Error("Failed to add customer");
   }


    setCustomers(prevCustomers => [...prevCustomers, customerToAdd]);
    setFiltredCustomers(prevCustomers => [...prevCustomers, customerToAdd]);


    setNewCustomer({ nome: '', email: '', telefone: '', location: { x: 0, y: 0 }});

  } catch (error) {
    console.error("Failed to add customer:", error);
  }
};



const editCustomer = (id, updatedCustomer) => {
  const updatedCustomers = customers.map(customer => {
      if (customer.id === id) {
          // Replace the customer with its updated version
          return updatedCustomer;
      }
      return customer;
  });

  // Update state with the new customers array
  setCustomers(updatedCustomers);
  setFiltredCustomers(updatedCustomers); // Also update filtered customers if you're using this for display
};


const removeCustomer = async (id) => {
  try {
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/customers/${id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': user.token, // Include the authorization token if your API requires it
          }
      });

      if (!response.ok) {
          // Handle any errors, such as a 4XX or 5XX HTTP status code
          const errorText = await response.text();
          throw new Error(`Failed to delete customer: ${errorText}`);
      }

      // If the delete was successful, update the local state to remove the customer
      const updatedCustomers = customers.filter(customer => customer.id !== id);
      setCustomers(updatedCustomers);
      setFiltredCustomers(updatedCustomers); // Also update filtered customers if you're using this for display

  } catch (error) {
      console.error("Error deleting customer:", error);
      // Handle the error appropriately, perhaps by showing an error message to the user
  }
};


const startEdit = (customerId) => {
  setEditingId(customerId);
  const customer = customers.find(c => c.id === customerId);
  setEditingCustomer({ ...customer });
};

const handleEditChange = (e) => {
  const { name, value } = e.target;
  if (name === "locationX" || name === "locationY") {
    setEditingCustomer(prevState => ({
      ...prevState,
      location: {
        ...prevState.location,
        [name === "locationX" ? "x" : "y"]: value
      }
    }));
  } else {
    setEditingCustomer(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
};


const cancelEdit = () => {
  setEditingId(null);
};

const saveEdit = async () => {

  try {
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/customers/${editingId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': user.token, 
          },
          body: JSON.stringify(editingCustomer)
      });

      if (!response.ok) {
          // Handle response errors, such as a 4XX or 5XX status code
          const errorText = await response.text();
          throw new Error(`Failed to update customer: ${errorText}`);
      }

   // Inside your try block, after the fetch call
    editCustomer(editingId, editingCustomer);
    setEditingId(null); // Exit editing mode


  } catch (error) {
      console.error("Error updating customer:", error);
      // Handle the error, such as displaying a notification to the user
  }
};


const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewCustomer(prevState => ({
      ...prevState,
      [name]: value
  }));
};



const handleCalculateRoute = async () => {
  console.log('Selected customers:',filtredCustomers );
  const loja = {
    "id": 99999,
    "nome": "Loja 1",
    "email": "loja@email.com",
    "telefone": "000000",
    "location": {
        "id": 999999,
        "customer_id": 9999999,
        "x": -23.5505,
        "y": -46.6333
    }}

    let costumersRoute = [loja, ...filtredCustomers];


  try {
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/customers/calculaterouter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': user.token,
      },
      body: JSON.stringify(costumersRoute),
    });

    const route = await response.json();

    console.log('Response:', route);
    setRoute(route);

   
  } catch (error) {
    console.error('Error calculating route:', error);
  }
};







return (
  <div className="dashboard-container">
      <h1>Dashboard</h1>
      {user ? (
        
          <div>
           <button onClick={() => setShowForm(!showForm)}>
  {showForm ? 'Esconder Formulário' : 'Adicionar Clientes'}
</button>
  
              {/* Formulário para adicionar novo cliente */}
              {showForm && (
              <div>
                  <input
                      type="text"
                      placeholder="Name"
                      name="nome"
                      value={newCustomer.nome}
                      onChange={handleInputChange}
                  />
                  <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={newCustomer.email}
                      onChange={handleInputChange}
                  />
                  <input
                      type="text"
                      placeholder="Phone"
                      name="telefone"
                      value={newCustomer.telefone}
                      onChange={handleInputChange}
                  />
                  <input
                      
                      placeholder="Location X"
                      name="locationX"
                      onChange={handleInputChange}
                  />  
                  <input
                      placeholder="Location Y"
                      name="locationY"
                      onChange={handleInputChange}
                  />
                  <button onClick={handleAddCustomer}>Add Customer</button>
              </div>
                  )}

    
              <table>
                  <thead>
                      <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Location x</th>
                          <th>Location y</th>
                          <th>Actions</th>

                      </tr>
                  </thead>
                  <tbody>
                  <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
              />
          {filtredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>
                {editingId === customer.id ? (
                  <input type="text" name="nome" value={editingCustomer.nome} onChange={handleEditChange} />
                ) : (
                  customer.nome
                )}
              </td>
              <td>
                {editingId === customer.id ? (
                  <input type="text" name="email" value={editingCustomer.email} onChange={handleEditChange} />
                ) : (
                  customer.email
                )}
              </td>
              <td>
                {editingId === customer.id ? (
                  <input type="text" name="telefone" value={editingCustomer.telefone} onChange={handleEditChange} />
                ) : (
                  customer.telefone
                )}
              </td>
              <td>
      {editingId === customer.id ? (
        <input type="text" name="locationX" value={editingCustomer.location?.x} onChange={handleEditChange} />
      ) : (
        customer.location?.x || 'N/A'
      )}
    </td>
    <td>
      {editingId === customer.id ? (
        <input type="text" name="locationY" value={editingCustomer.location?.y} onChange={handleEditChange} />
      ) : (
        customer.location?.y || 'N/A'
      )}
    </td>
              
              
                  
              <td>
                {editingId === customer.id ? (
                  <>
                    <button onClick={saveEdit}>Salvar</button>
                    <button onClick={cancelEdit}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(customer.id)}>Editar</button>
                    <button onClick={() => removeCustomer(customer.id)}>Excluir</button>
                  </>
             
                )}
              </td>
            </tr>
          ))}
        </tbody>
              </table>
          
              <div className="route-and-map-container">
  <div className="route-list">
    <button onClick={handleCalculateRoute}>Calcular Rota</button>
    <p>Partindo dos pontos: x: -23.5505 y: -46.6333 - São Paulo</p>
    {route.length > 0 ? (
      <>
        {route.map((customer, index) => {
          if (customer.location && customer.location.x && customer.location.y) {
            return (
              <div key={index}>
                <h2>{index + 1} - {customer.nome}</h2>
                <p>Latitude: {customer.location.x}</p>
                <p>Longitude: {customer.location.y}</p>
              </div>
            );
          }
          return null;
        })}
      </>
    ) : <p>Calcule a rota...</p> }
  </div>
  <div className="map-container">
    <MapComponent route={route} />
  </div>
</div>



          </div>
      ) : (
          <>
              <p>You need to be logged in to view the products</p>
              <button onClick={handleBackToLogin} className="back-to-login-btn">Back To Login Page</button>
          </>
      )}
  </div>
);
}

export default DashboardPage;