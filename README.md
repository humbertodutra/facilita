# facilita-juridico

You can see it alive at:
https://facilita-client.vercel.app/ - CLIENT

https://facilita-server.vercel.app/ - SERVER (API)

## BACKEND

### 1. Description
A brief description of what the application does and the problem it solves. This backend serves as the core of the `facilita-juridico`, handling user authentication, customer management, and more, providing a robust API for the frontend to interact with.

### 2. Technologies Used
- Node.js
- Express
- Vercel Postgres
- Sequelize
- JWT for authentication
- bcrypt

### 3. Setup Instructions

Clone the repository:

```bat
git clone git@github.com:humbertodutra/facilita.git
cd facilita
cd server
npm install
```

#### Database Configuration
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_HOST=your_host
POSTGRES_DATABASE="verceldb"

#### JWT Token Secret
MY_SECRET=your_jwt_secret


## 4. Starting the Server

Inside the server (backend) folder, start the server with:

```bat
npm start
```


## 5. How to Use

### 5.1 -  Authentication:: 

Use this endpoint to register a new account.

POST - /api/users/register

Request Body:
{
  "email": "example@example.com",
  "password": "example123"
}

Successful Response (Status: 201):

{
    "id": 12,
    "email": "example@example.com",
    "password": "$2b$10$I7hswiWbOf8hp5TpuOwnEejxVS8hCrqUKpRak1XwLtMc4kVbW0GGK",
    "updatedAt": "2024-03-06T16:55:05.128Z",
    "createdAt": "2024-03-06T16:55:05.128Z"
}

### 5.2 - Login:

POST - /api/users/login

Request Body:


{
  "email": "example@example.com",
  "password": "example123"
}

Successful Response (Status: 200):

{
    "email": "example@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE3MDk3NDQxNzQsImV4cCI6MTcwOTc1MTM3NH0.sTrxQM7emrZJUv2QxEc7WvyXfhblQLq2T6KpYiR-q4I"
}

### 5.3 - Working with Customers Routes:


Add the following field to your request header, using the token received above: 

authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE3MDk3NDQxNzQsImV4cCI6MTcwOTc1MTM3NH0.sTrxQM7emrZJUv2QxEc7WvyXfhblQLq2T6KpYiR-q4

#### 5.3.1 - List All Customers

GET - /api/customers

#### 5.3.2 - Find Customers by ID:

GET - /api/customers/:id'

#### 5.3.3 - Adding Customers:

POST - /customers/add

Request Body Examples:

{
        "nome": "Exemplo Um",
        "email": "exemplo@example.com",
        "telefone": "31000000000",
        "location": {
            "x": 50.7338,
            "y": -75.0516
        }
 }

#### 5.3.4 - Editing Customer:

PUT - /api/customers/:id

*You can get the customer ID from item 5.3.1.

Request Body Examples:

{
        "id": 1,
        "nome": "João Silva",
        "email": "joao.silva@email.com",
        "telefone": "11999887766",
        "location": {
            "id": 1,
            "customer_id": 1,
            "x": 35.6895,
            "y": 139.6917
        }
}

#### 5.3.5 - Deleting a Customer:

DELETE - /api/customers/:id
Successful Response:
{
    "message": "Customer deleted successfully"
}


#### 5.3.5 - Calculate Route:

POST - /api/customers/calculaterouter


Position 0 of the array must be the store location (departure and return)
Example:



[
    {
        "nome": "mystore",
        "location":{
             "x": -23.5505, 
             "y": -46.6333
        }
    },
    
    {
        "id": 1,
        "nome": "João Silva",
        "email": "joao.silva@email.com",
        "telefone": "11999887766",
        "location": {
            "id": 1,
            "customer_id": 1,
            "x": -3.119028,
            "y": -60.021731
        }
    },
    {
        "id": 2,
        "nome": "Maria Oliveira",
        "email": "maria.oliveira@email.com",
        "telefone": "21988776655",
        "location": {
            "id": 2,
            "customer_id": 2,
            "x": -12.9714,
            "y": -38.5014
        }
    },
    {
        "id": 41,
        "nome": "Pedro Pereirera",
        "email": "pedrop@example.com",
        "telefone": "11957766",
        "location": {
            "id": 30,
            "customer_id": 41,
            "x": -22.9068,
            "y": -43.1729
        }
    },
    {
        "id": 62,
        "nome": "Humberto Dutra",
        "email": "humberto@example.com",
        "telefone": "312192819",
        "location": {
            "id": 44,
            "customer_id": 62,
            "x": -13.9714,
            "y": -40.5023
        }
    }
]


Return Example:


[
    {
        "nome": "mystore",
        "location": {
            "x": -23.5505,
            "y": -46.6333
        }
    },
    {
        "id": 41,
        "nome": "Pedro Pereirera",
        "email": "pedrop@example.com",
        "telefone": "11957766",
        "location": {
            "id": 30,
            "customer_id": 41,
            "x": -22.9068,
            "y": -43.1729
        }
    },
    {
        "id": 62,
        "nome": "Humberto Dutra",
        "email": "humberto@example.com",
        "telefone": "312192819",
        "location": {
            "id": 44,
            "customer_id": 62,
            "x": -13.9714,
            "y": -40.5023
        }
    },
    {
        "id": 2,
        "nome": "Maria Oliveira",
        "email": "maria.oliveira@email.com",
        "telefone": "21988776655",
        "location": {
            "id": 2,
            "customer_id": 2,
            "x": -12.9714,
            "y": -38.5014
        }
    },
    {
        "id": 1,
        "nome": "João Silva",
        "email": "joao.silva@email.com",
        "telefone": "11999887766",
        "location": {
            "id": 1,
            "customer_id": 1,
            "x": -3.119028,
            "y": -60.021731
        }
    },
    {
        "nome": "mystore",
        "location": {
            "x": -23.5505,
            "y": -46.6333
        }
    }
]





# FRONTEND


### 1. Technologies Used
- React.js
- JS
- react-leaflet (map)

### 2. Setup Instructions

Clone the repository:

```bat
git clone git@github.com:humbertodutra/facilta.git
cd facilita
cd client
npm install
```
### 3. Start the server

```bat
npm start
```
# DB-DIAGRAM

db_diagram.png