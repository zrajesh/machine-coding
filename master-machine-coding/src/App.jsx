import { useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "./api";
import useDebounce from "./useDebounce";
import Filters from "./components/Filters";
import ProductCard from "./components/ProductCard";
import ProductForm from "./components/ProductForm";
import ConfirmDelete from "./components/ConfirmDelete";

const emptyFilters = { search: "", category: "", minPrice: "", maxPrice: "", sort: "" };

export default function App() {
  // ---- data (fetch) ----
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---- search, filters, sort ----
  const [filters, setFilters] = useState(emptyFilters);
  const debouncedSearch = useDebounce(filters.search, 400);

  // ---- create / update / delete ----
  const [formProduct, setFormProduct] = useState(null); // product being added or edited
  const [deleteTarget, setDeleteTarget] = useState(null); // product waiting for delete confirm
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    setError("");
    try {
      setProducts(await getProducts());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const changeFilter = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  // ---- search + filter + sort, all together ----
  let visibleProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesMin = filters.minPrice === "" || product.price >= Number(filters.minPrice);
    const matchesMax = filters.maxPrice === "" || product.price <= Number(filters.maxPrice);
    return matchesSearch && matchesCategory && matchesMin && matchesMax;
  });

  if (filters.sort === "low-high") {
    visibleProducts = [...visibleProducts].sort((a, b) => a.price - b.price);
  } else if (filters.sort === "high-low") {
    visibleProducts = [...visibleProducts].sort((a, b) => b.price - a.price);
  }

  const categories = [...new Set(products.map((product) => product.category))];

  // ---- actions ----
  const openForm = (product) => {
    setActionError("");
    setFormProduct(product);
  };

  const openDelete = (product) => {
    setActionError("");
    setDeleteTarget(product);
  };

  const handleSave = async (product) => {
    setSaving(true);
    setActionError("");
    try {
      if (product.id) {
        const updated = await updateProduct(product);
        setProducts(products.map((item) => (item.id === updated.id ? updated : item)));
      } else {
        const created = await createProduct(product);
        setProducts([created, ...products]);
      }
      setFormProduct(null);
    } catch (err) {
      setActionError("Could not save the product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    setActionError("");
    try {
      await deleteProduct(deleteTarget.id);
      setProducts(products.filter((item) => item.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      setActionError("Could not delete the product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ---- what to show ----
  let content;
  if (loading) {
    content = <p className="message">Loading products...</p>;
  } else if (error) {
    content = (
      <div className="message">
        <p className="error">{error}</p>
        <button onClick={loadProducts}>Retry</button>
      </div>
    );
  } else if (visibleProducts.length === 0) {
    content = <p className="message">No products found.</p>;
  } else {
    content = (
      <div className="grid">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={openForm}
            onDelete={openDelete}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1>Products</h1>
        <button className="primary" onClick={() => openForm({})} disabled={loading || Boolean(error)}>
          + Add product
        </button>
      </header>

      <Filters filters={filters} categories={categories} onChange={changeFilter} />

      {content}

      {formProduct && (
        <ProductForm
          product={formProduct}
          categories={categories}
          saving={saving}
          error={actionError}
          onSave={handleSave}
          onCancel={() => setFormProduct(null)}
        />
      )}

      {deleteTarget && (
        <ConfirmDelete
          product={deleteTarget}
          deleting={saving}
          error={actionError}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
