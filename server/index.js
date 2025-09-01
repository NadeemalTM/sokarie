const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Sample product data
const products = [
  {
    id: 1,
    name: "Customized T-Shirt",
    category: "t-shirts",
    price: 25,
    colors: ["red", "blue", "black"],
    sizes: ["S", "M", "L", "XL"],
    image: "/images/tshirt1.jpg",
    rating: 4.5,
    description: "High quality customized t-shirt with breathable fabric."
  },
  {
    id: 2,
    name: "Yoga Pants",
    category: "yoga-pants",
    price: 40,
    colors: ["black", "gray", "navy"],
    sizes: ["S", "M", "L", "XL"],
    image: "/images/yogapants1.jpg",
    rating: 4.7,
    description: "Comfortable and flexible yoga pants for all workouts."
  },
  {
    id: 3,
    name: "Sport Wear Jacket",
    category: "sportswear",
    price: 60,
    colors: ["black", "white"],
    sizes: ["M", "L", "XL"],
    image: "/images/sportjacket1.jpg",
    rating: 4.3,
    description: "Lightweight sport wear jacket with water-resistant fabric."
  },
  {
    id: 4,
    name: "Running Shoes",
    category: "shoes",
    price: 80,
    colors: ["black", "white", "blue"],
    sizes: ["7", "8", "9", "10", "11"],
    image: "/images/runningshoes1.jpg",
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
    image: "/images/baseballcap1.jpg",
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
    image: "/images/sportswatch1.jpg",
    rating: 4.8,
    description: "Water-resistant sports watch with multiple features."
  }
];

// API endpoint to get products
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
