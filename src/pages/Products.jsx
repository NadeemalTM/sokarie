import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductGrid from '../components/ProductGrid';
import Filters from '../components/Filters';
import '../styles/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }
    if (selectedSize) {
      filtered = filtered.filter((product) => product.sizes.includes(selectedSize));
    }
    if (selectedColor) {
      filtered = filtered.filter((product) => product.colors.includes(selectedColor));
    }
    setFilteredProducts(filtered);
  }, [products, selectedCategory, selectedSize, selectedColor]);

  const categories = [...new Set(products.map((p) => p.category))];
  const sizes = [...new Set(products.flatMap((p) => p.sizes))];
  const colors = [...new Set(products.flatMap((p) => p.colors))];

  return (
    <div className="products">
      <h1>Our Products</h1>
      <div className="products-content">
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sizes={sizes}
          selectedSize={selectedSize}
          onSizeChange={setSelectedSize}
          colors={colors}
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
        />
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default Products;
