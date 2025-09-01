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
    image: "https://picsum.photos/300/300?random=1",
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
    image: "https://picsum.photos/300/300?random=2",
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
    image: "https://picsum.photos/300/300?random=3",
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
