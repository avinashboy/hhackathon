

**How to Run the Application**

1. Install the necessary packages:
   ```
   npm install
   ```

2. Add a `.env` file in the root directory containing the following variables:
   ```
   hhackathon/
   │
   ├── src/
   │   ├── index.js
   │   ├── models/
   │   ├── routes/
   │   └── controllers/
   │
   ├── .env   <--- Newly added
   ├── .eslintrc.cjs
   ├── .gitignore
   ├── .prettierignore
   ├── .prettierrc.json
   ├── README.md
   ├── package-lock.json
   └── package.json
   ```

- Inside of .env file
   ```
      MONGO_URI=<MONGODB-URL>
      PORT=4567
      JWT_SECRET=this-a-secret-okay
   ```

3. Start the server using the following command:
   ```
   npm run dev
   ```

**API Endpoints**

- **Register**: Access the registration endpoint at [http://localhost:4567/api/users/register](http://localhost:4567/api/users/register).
  
- **Login**: Access the login endpoint at [http://localhost:4567/api/users/login](http://localhost:4567/api/users/login).

---

