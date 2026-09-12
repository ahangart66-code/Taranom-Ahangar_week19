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
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return handleResponse(res);
}

export async function loginUser(username, password) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return handleResponse(res);
}

export async function getProducts(page, name, limit = 6) {
  const params = new URLSearchParams();
  params.set("page", page);
  params.set("limit", String(limit));
  if (name) {
    params.set("name", name);
  }

  const res = await fetch("/api/products?" + params.toString());

  if (name && (res.status === 400 || res.status === 404)) {
    return {
      totalProducts: 0,
      page,
      limit,
      totalPages: 0,
      data: [],
    };
  }

  return handleResponse(res);
}

export async function createProduct(product) {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(product),
  });

  return handleResponse(res);
}

export async function updateProduct({ id, product }) {
  const res = await fetch("/api/products/" + id, {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(product),
  });

  return handleResponse(res);
}

export async function deleteProduct(id) {
  const res = await fetch("/api/products/" + id, {
    method: "DELETE",
    headers: authHeader(),
  });

  return handleResponse(res);
}
