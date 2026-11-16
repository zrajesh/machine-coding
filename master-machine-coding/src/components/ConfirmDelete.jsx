export default function ConfirmDelete({ product, deleting, error, onConfirm, onCancel }) {
  return (
    <div className="overlay">
      <div className="modal">
        <h2>Delete product?</h2>
        <p>
          Are you sure you want to delete <strong>{product.title}</strong>?
        </p>

        {error && <p className="error">{error}</p>}

        <div className="modal-buttons">
          <button onClick={onCancel} disabled={deleting}>
            Cancel
          </button>
          <button className="danger" onClick={onConfirm} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
