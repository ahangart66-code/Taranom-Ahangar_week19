# Product Management

A Persian RTL product dashboard built from the Botostart bootcamp Figma design. Users can register, log in, and manage warehouse products (create, edit, delete, search, paginate).

## Features

- Register and login with JWT (`token` saved in `localStorage`)
- Protected products page
- Product CRUD (add, edit, delete)
- Search with 300ms debounce
- Client-side pagination (6 items per page, newest first)
- Query error state with retry when the API is down

## Getting started

You need **two servers**: the backend API and this frontend.

### 1. Start the API

Run the Warehouse Products API on port **3000**.

Swagger: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### 2. Start the frontend

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

Vite proxies `/api` to `http://localhost:3000`, so refresh on `/products` still shows the React page, not JSON.

## Routes

| Path        | Page                         |
| ----------- | ---------------------------- |
| `/`         | Redirects to register        |
| `/register` | Sign up                      |
| `/login`    | Sign in                      |
| `/products` | Product list (needs a token) |

## Scripts

```bash
npm run dev      # development
npm run build    # production build
npm run preview  # preview the build
```

## Project structure

```text
src/
  api.js                 # fetch helpers
  App.jsx                # routes
  main.jsx               # React Query provider
  pages/
    Login.jsx
    Register.jsx
    Products.jsx
  assets/
```
