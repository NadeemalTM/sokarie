const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Sample user data
const users = [
  { id: 1, email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { id: 2, email: 'user@example.com', password: 'user123', role: 'user' },
];

// Sample product data
const products = [
  {
    id: 1,
    name: "Sokari Traditional Mask",
    category: "masks",
    price: 120,
    colors: ["red", "gold", "black"],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80",
    rating: 4.8,
    description: "Handcrafted traditional Sokari mask used in Sri Lankan dance rituals."
  },
  {
    id: 2,
    name: "Traditional Dance Costume",
    category: "costumes",
    price: 250,
    colors: ["red", "white", "gold"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
    rating: 4.9,
    description: "Authentic costume worn by Sokari dancers, featuring intricate designs."
  },
  {
    id: 3,
    name: "Handmade Drum",
    category: "instruments",
    price: 180,
    colors: ["brown", "black"],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=300&q=80",
    rating: 4.7,
    description: "Traditional drum used in Sokari dance performances."
  },
  {
    id: 4,
    name: "Running Shoes",
    category: "shoes",
    price: 80,
    colors: ["black", "white", "blue"],
    sizes: ["7", "8", "9", "10", "11"],
    image: "https://picsum.photos/300/300?random=4",
    rating: 4.6,
    description: "Lightweight running shoes with excellent cushioning."
  },
  {
    id: 5,
    name: "Baseball Cap",
    category: "accessories",
    price: 15,
    colors: ["red", "blue", "black"],
    sizes: ["One Size"],
    image: "https://picsum.photos/300/300?random=5",
    rating: 4.2,
    description: "Adjustable baseball cap with breathable fabric."
  },
  {
    id: 6,
    name: "Sports Watch",
    category: "accessories",
    price: 120,
    colors: ["black", "gray"],
    sizes: ["One Size"],
    image: "https://picsum.photos/300/300?random=6",
    rating: 4.8,
    description: "Water-resistant sports watch with multiple features."
  },
  {
    id: 7,
    name: "Hiking Boots",
    category: "shoes",
    price: 150,
    colors: ["brown", "black", "green"],
    sizes: ["8", "9", "10", "11", "12"],
    image: "https://picsum.photos/300/300?random=7",
    rating: 4.7,
    description: "Durable hiking boots with excellent grip and comfort."
  },
  {
    id: 8,
    name: "Swim Trunks",
    category: "swimwear",
    price: 35,
    colors: ["blue", "red", "black"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://picsum.photos/300/300?random=8",
    rating: 4.4,
    description: "Quick-dry swim trunks with UV protection."
  },
  {
    id: 9,
    name: "Gym Gloves",
    category: "accessories",
    price: 20,
    colors: ["black", "red", "blue"],
    sizes: ["S", "M", "L"],
    image: "https://picsum.photos/300/300?random=9",
    rating: 4.5,
    description: "Protective gym gloves for better grip during workouts."
  },
  {
    id: 10,
    name: "Cycling Jersey",
    category: "sportswear",
    price: 65,
    colors: ["yellow", "green", "blue"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://picsum.photos/300/300?random=10",
    rating: 4.6,
    description: "Breathable cycling jersey with moisture-wicking fabric."
  },
  {
    id: 11,
    name: "Sunglasses",
    category: "accessories",
    price: 45,
    colors: ["black", "silver", "gold"],
    sizes: ["One Size"],
    image: "https://picsum.photos/300/300?random=11",
    rating: 4.3,
    description: "Stylish sunglasses with UV400 protection."
  },
  {
    id: 12,
    name: "Basketball Shorts",
    category: "sportswear",
    price: 40,
    colors: ["black", "white", "red"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://picsum.photos/300/300?random=12",
    rating: 4.5,
    description: "Comfortable basketball shorts with built-in compression."
  }
];

// API endpoint to get products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// API endpoint for login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// API endpoint to add product (admin only)
app.post('/api/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// API endpoint to get product by id
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// API endpoint to add review to product
app.post('/api/products/:id/reviews', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    if (!product.reviews) {
      product.reviews = [];
    }
    const newReview = {
      id: product.reviews.length + 1,
      ...req.body,
      date: new Date().toISOString(),
    };
    product.reviews.push(newReview);
    res.status(201).json(newReview);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
