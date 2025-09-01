import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import '../styles/Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setFeaturedProducts(response.data.slice(0, 3)); // Show first 3 as featured
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home">
      <Hero />
      <section className="featured-products">
        <h2>Featured Products</h2>
        <ProductGrid products={featuredProducts} />
      </section>
    </div>
  );
};

export default Home;
