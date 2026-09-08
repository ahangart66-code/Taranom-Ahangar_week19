async function handleResponse(res) {
  if (!res.ok) {
    const error = new Error("Request failed");
    error.status = res.status;
    throw error;
  }

  const text = await res.text();
  if (!text) return null;
  return JSON.parse(text);
}

function authHeader() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
}

export async function registerUser(username, password) {
  const res = await fetch("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return handleResponse(res);
}

export async function loginUser(username, password) {
  const res = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return handleResponse(res);
}

export async function getProducts(page, name) {
  const params = new URLSearchParams();
  params.set("page", page);
  params.set("limit", "6");
  if (name) {
    params.set("name", name);
  }

  const res = await fetch("/products?" + params.toString());
  return handleResponse(res);
}

export async function createProduct(product) {
  const res = await fetch("/products", {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(product),
  });

  return handleResponse(res);
}

export async function updateProduct({ id, product }) {
  const res = await fetch("/products/" + id, {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(product),
  });

  return handleResponse(res);
}
