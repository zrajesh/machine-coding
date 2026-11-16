export default function Filters({ filters, categories, onChange }) {
  const { search, category, minPrice, maxPrice, sort } = filters;

  return (
    <div className="filters">
      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => onChange("search", e.target.value)}
      />

      <select value={category} onChange={(e) => onChange("category", e.target.value)}>
        <option value="">All categories</option>
        {categories.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <input
        type="number"
        min="0"
        placeholder="Min price"
        value={minPrice}
        onChange={(e) => onChange("minPrice", e.target.value)}
      />
      <input
        type="number"
        min="0"
        placeholder="Max price"
        value={maxPrice}
        onChange={(e) => onChange("maxPrice", e.target.value)}
      />

      <select value={sort} onChange={(e) => onChange("sort", e.target.value)}>
        <option value="">Sort by</option>
        <option value="low-high">Price: Low → High</option>
        <option value="high-low">Price: High → Low</option>
      </select>
    </div>
  );
}
