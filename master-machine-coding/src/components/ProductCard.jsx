export default function ProductCard({ product, onEdit, onDelete }) {
  const { title, category, price, description } = product;

  return (
    <div className="card">
      <span className="tag">{category}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="card-footer">
        <strong>${price}</strong>
        <div>
          <button onClick={() => onEdit(product)}>Edit</button>
          <button className="danger" onClick={() => onDelete(product)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
