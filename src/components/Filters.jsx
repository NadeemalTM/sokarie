import React from 'react';
import '../styles/Filters.css';

const Filters = ({ categories, selectedCategory, onCategoryChange, sizes, selectedSize, onSizeChange, colors, selectedColor, onColorChange }) => {
  return (
    <aside className="filters">
      <h3>Filters</h3>
      <div className="filter-group">
        <h4>Category</h4>
        <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <h4>Size</h4>
        <select value={selectedSize} onChange={(e) => onSizeChange(e.target.value)}>
          <option value="">All</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <h4>Color</h4>
        <select value={selectedColor} onChange={(e) => onColorChange(e.target.value)}>
          <option value="">All</option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
};

export default Filters;
