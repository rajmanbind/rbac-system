# RBAC System

A simple Role-Based Access Control (RBAC) system with separate backend and frontend components.

## Getting Started

Follow the steps below to set up and run the project.

---

### Backend (API)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-name>/backend
   ```
2. **Install dependencies**

   ```bash
   npm install

   ```

3. **Start the server**
   ```bash
   npm start
   ```

The server will start at: [http://localhost:5000](http://localhost:5000)

### Frontend (Client)

1. **Navigate to the client directory**

```bash
cd client
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the client**

```bash
npm start
```

The frontend will start and can be accessed at: [http://localhost:3000](http://localhost:3000)

```

```

### **Core Requirements**

## Features

### Authentication System

The application includes a secure authentication system where users can:

- **Register**: Create a new account with name, email, password, and role(Admin,Managar,User(default)).
- **Login**: Authenticate using email and password, with session management handled through cookies for enhanced security.
- **Logout**: Securely log out and clear session cookies.
- **Get Current Logger User**: Securely get logged user after successfull login.
- **Get All User**: Securely get All User protect based on role and cookie.

### Flow of the Authentication API

1. When a user opens the project, they are redirected to the **Login page** if not already registered.
2. After a successful registration, the user can log in.
3. Upon logging in, a session cookie is sent for session management.
4. The user is redirected to the **Home (Dashboard) page** after successful login.

For managing the application's state, **React-Redux** and **context api** is used.

#### APIs

- **Register API**  
  Endpoint: `/api/auth/register`  
  Payload: `{ name, email, password, role }`
- **Login API**  
  Endpoint: `/api/auth/login`  
  Payload: `{ email, password }`
- **Logout API**  
  Endpoint: `/api/auth/logout`
- **get current user API**  
  Endpoint: `/api/user/current-user`
- **all User API**  
  Endpoint: `/api/user/getAll-user`

---

### Authorization and Role-Based Access Control (RBAC)

- **Role-Based Access Control (RBAC)** ensures that access to resources and functionalities is restricted based on user roles.
- Roles supported: **User**, **Manager**, **Admin**.

#### Permissions

- **User**: Has limited permissions.
- **Manager**: Can perform more tasks than a User.
- **Admin**: Has full access to all functionalities in the project.

#### Protected Routes

Certain routes are accessible only to authorized roles:

- **Admin and Manager**: `/team`, `/form`
- **Admin**: `/contacts` (with permissions to edit, delete, and update contact details)

Users with restricted roles will see only the pages and functionality they are authorized to access.

---

### Security

- **JWT (JSON Web Tokens)** is used for secure user authentication and session management.
- Cookies are implemented to securely store session data.

### Examples of Role-Based Permissions

- **Contacts Page**:
  - **Admin**: Can edit, delete, and update contact details.
  - **Manager/User**: Read-only access.
- Other protected tasks are assigned similarly based on roles.

---

This system ensures a secure, role-specific experience for all users, enabling smooth authentication, session management, and access control.
