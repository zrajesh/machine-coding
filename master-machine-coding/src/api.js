// Change this to a real URL like "https://example.com/products" when you have one.
// For now it reads the dummy file inside the public folder.
const PRODUCTS_URL = "/products.json";

// A real server would save data. Our JSON file can't be changed,
// so create/update/delete only pretend to call a server (wait 500ms).
const fakeServerDelay = () => new Promise((resolve) => setTimeout(resolve, 500));

export async function getProducts() {
  const response = await fetch(PRODUCTS_URL);
  if (!response.ok) {
    throw new Error("Could not load products");
  }
  return response.json();
}

export async function createProduct(product) {
  await fakeServerDelay();
  return { ...product, id: Date.now() };
}

export async function updateProduct(product) {
  await fakeServerDelay();
  return product;
}

export async function deleteProduct(id) {
  await fakeServerDelay();
  return id;
}
