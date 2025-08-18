const express = require('express');
const cors = require('cors');
const path = require('path');

// Load environment variables
require('dotenv').config();

// Create Express app
const app = express();
const port = process.env.PORT || 8080;

// Error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

// Enable CORS for your frontend
// Enable CORS for all origins in development
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files from the frontend's public directory
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Health check endpoint
app.get('/health-check', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Sample car data
const carTemplates = [
  {
    model: 'BMW M5', brand: 'BMW', image: '/images/cars/ferrari-f8.png', description: 'Luxury sports sedan with outstanding performance', price: 103500, type: 'Sedan', year: 2023
  },
  {
    model: 'Chevrolet Camaro', brand: 'Chevrolet', image: '/images/cars/camaro.png', description: 'Iconic American muscle car', price: 32495, type: 'Coupe', year: 2023
  },
  {
    model: 'Ferrari F8', brand: 'Ferrari', image: '/images/cars/ferrari-f8.png', description: 'Breathtaking supercar with incredible performance', price: 276000, type: 'Coupe', year: 2023
  },
  {
    model: 'Porsche 911', brand: 'Porsche', image: '/images/cars/porshe-911.png', description: 'Iconic sports car with perfect balance of luxury and performance', price: 126484, type: 'Coupe', year: 2023
  },
  {
    model: 'Lamborghini Aventador', brand: 'Lamborghini', image: '/images/cars/lamborgini.png', description: 'Ultimate supercar with breathtaking design and performance', price: 417826, type: 'Coupe', year: 2023
  },
  {
    model: 'Volvo XC90', brand: 'Volvo', image: '/images/cars/volvo.png', description: 'Luxury SUV with exceptional safety and comfort', price: 84100, type: 'SUV', year: 2023
  }
];

const cars = Array.from({ length: 80 }, (_, i) => {
  const template = carTemplates[i % carTemplates.length];
  // Add default values for transmission, fuel, engineCapacity
  const defaultTransmissions = ['Automatic', 'Manual'];
  const defaultFuels = ['Gas', 'Electric', 'Hybrid', 'Diesel'];
  const defaultEngineCapacities = [900, 1500, 2500, 3500];
  return {
    id: i + 1,
    model: template.model + (i > 5 ? ` ${i + 1}` : ''),
    brand: template.brand,
    year: template.year - (i % 3),
    price: template.price + (i * 1000),
    image: template.image,
    description: template.description,
    type: template.type,
    transmission: defaultTransmissions[i % defaultTransmissions.length],
    fuel: defaultFuels[i % defaultFuels.length],
    engineCapacity: defaultEngineCapacities[i % defaultEngineCapacities.length]
  };
});

// Get all cars
app.get('/cars', (req, res) => {
  res.json(cars);
});

// Get car by ID
app.get('/cars/:id', (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ message: 'Car not found' });
  res.json(car);
});

// Get cars by brand
app.get('/cars/brand/:brand', (req, res) => {
  const brandCars = cars.filter(c => c.brand.toLowerCase() === req.params.brand.toLowerCase());
  res.json(brandCars);
});

// Get popular cars
app.get('/cars/popular', (req, res) => {
  // For now, return all cars as popular
  const popularCars = cars.map(car => ({
    id: car.id,
    model: car.model,
    brand: car.brand,
    year: car.year,
    price: car.price,
    image: car.image,
    type: car.brand === 'Volvo' ? 'SUV' : 'Coupe',
    seats: car.brand === 'Volvo' ? '7 seat' : '2 seat',
    description: car.description
  }));
  res.json(popularCars);
});

// Sample brands data
const brands = [
  {
    id: 1,
    name: 'BMW',
    logo: '/images/brands/bmw-logo.png'
  },
  {
    id: 2,
    name: 'Chevrolet',
    logo: '/images/brands/chevrolet-logo.png'
  },
  {
    id: 3,
    name: 'Land Rover',
    logo: '/images/brands/land-rover-logo.png'
  },
  {
    id: 4,
    name: 'Maserati',
    logo: '/images/brands/maserati-logo.png'
  },
  {
    id: 5,
    name: 'Porsche',
    logo: '/images/brands/porsche-logo.png'
  },
  {
    id: 6,
    name: 'Volvo',
    logo: '/images/brands/volvo-logo.png'
  }
];

// Get all brands
app.get('/brands', (req, res) => {
  res.json(brands);
});

// Add a root route
app.get('/', (req, res) => {
  res.json({ message: 'CarVista API is running' });
});

// Start the server
const server = app.listen(port, () => {
  console.log('=================================');
  console.log(`🚀 Server is running on port ${port}`);
  console.log('Available endpoints:');
  console.log(`➜ Root: http://localhost:${port}/`);
  console.log(`➜ Health check: http://localhost:${port}/health-check`);
  console.log(`➜ Cars: http://localhost:${port}/cars`);
  console.log(`➜ Brands: http://localhost:${port}/brands`);
  console.log('=================================');
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`⛔ Port ${port} is already in use. Please try a different port.`);
    process.exit(1);
  } else {
    console.error('Server error:', error);
  }
});
