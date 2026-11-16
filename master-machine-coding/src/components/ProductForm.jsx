import { useState } from "react";

// Used for both Add and Edit. If `product` has an id we are editing.
export default function ProductForm({ product, categories, saving, error, onSave, onCancel }) {
  const [title, setTitle] = useState(product.title || "");
  const [category, setCategory] = useState(product.category || "");
  const [price, setPrice] = useState(product.price ?? "");
  const [description, setDescription] = useState(product.description || "");
  const [formError, setFormError] = useState("");

  const isEditing = Boolean(product.id);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !category.trim() || price === "" || Number(price) < 0) {
      setFormError("Title, category and a valid price are required.");
      return;
    }

    setFormError("");
    onSave({
      ...product,
      title: title.trim(),
      category: category.trim(),
      price: Number(price),
      description: description.trim(),
    });
  };

  return (
    <div className="overlay">
      <form className="modal" onSubmit={handleSubmit}>
        <h2>{isEditing ? "Edit product" : "Add product"}</h2>

        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label>
          Category
          <input
            list="category-list"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <datalist id="category-list">
            {categories.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </label>

        <label>
          Price
          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <label>
          Description
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        {formError && <p className="error">{formError}</p>}
        {error && <p className="error">{error}</p>}

        <div className="modal-buttons">
          <button type="button" onClick={onCancel} disabled={saving}>
            Cancel
          </button>
          <button type="submit" className="primary" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
