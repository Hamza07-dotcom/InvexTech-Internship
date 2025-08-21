import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`Making request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export const verifyApiConnection = async () => {
  try {
    const startTime = Date.now();
    const response = await apiClient.get('/health-check');
    const endTime = Date.now();
    console.log(`API is connected (${endTime - startTime}ms)`);
    return {
      status: 'connected',
      latency: endTime - startTime,
      data: response.data
    };
  } catch (error) {
    console.error('API Connection Error:', {
      url: API_URL,
      error: error.message
    });
    return {
      status: 'error',
      message: error.message,
      suggestion: error.code === 'ECONNREFUSED' 
        ? 'Make sure your backend server is running'
        : 'Check your API configuration'
    };
  }
};

const fallbackPopularCars = [
  {
    id: 1,
    model: "BMW M5",
    brand: "BMW",
    year: 2023,
    price: 103500,
    image: "/images/cars/ferrari-f8.png",
    type: "Coupe",
    seats: "2 seat"
  },
  {
    id: 2,
    model: "Lamborghini Huracan",
    brand: "Lamborghini",
    year: 2023,
    price: 267292,
    image: "/images/cars/lamborghini.jpg",
    type: "Coupe",
    seats: "2 seat"
  },
  {
    id: 3,
    model: "Chevrolet Camaro",
    brand: "Chevrolet",
    year: 2023,
    price: 32495,
    image: "/images/cars/camaro.jpg",
    type: "Coupe",
    seats: "4 seat"
  },
  {
    id: 4,
    model: "Porsche 911 Turbo S",
    brand: "Porsche",
    year: 2023,
    price: 126484,
    image: "/images/cars/porsche-911.jpg",
    type: "Coupe",
    seats: "2 seat"
  },
  {
    id: 5,
    model: "BMW M8",
    brand: "BMW",
    year: 2023,
    price: 134500,
    image: "/images/cars/bmw-m8.jpg",
    type: "Coupe",
    seats: "4 seat"
  }
];

export const getPopularCars = async () => {
  try {
    const connectionStatus = await verifyApiConnection();
    if (connectionStatus.status === 'error') {
      console.log('Using fallback data for popular cars');
      return [
        {
          id: 1,
          model: "Ferrari F8 Tributo",
          brand: "Ferrari",
          year: 2023,
          price: 283950,
          image: "/images/cars/ferrari-f8.png",
          type: "Coupe",
          seats: "2 seat"
        },
        {
          id: 2,
          model: "Lamborghini Huracan",
          brand: "Lamborghini",
          year: 2023,
          price: 267292,
          image: "/images/cars/lamborghini.png",
          type: "Coupe",
          seats: "2 seat"
        },
        {
          id: 3,
          model: "Chevrolet Camaro",
          brand: "Chevrolet",
          year: 2023,
          price: 32495,
          image: "/images/cars/camaro.png",
          type: "Coupe",
          seats: "4 seat"
        },
        {
          id: 4,
          model: "Porsche 911 Turbo S",
          brand: "Porsche",
          year: 2023,
          price: 126484,
          image: "/images/cars/porshe-911.png",
          type: "Coupe",
          seats: "2 seat"
        },
        {
          id: 5,
          model: "BMW M8",
          brand: "BMW",
          year: 2023,
          price: 134500,
          image: "/images/cars/bmw-m5.jpg",
          type: "Coupe",
          seats: "4 seat"
        }
      ];
    }
    
    const { data } = await apiClient.get("/cars/popular");
    if (!data || !Array.isArray(data)) {
      console.warn('Invalid data format from API, using fallback data');
      return fallbackPopularCars;
    }
    return data;
  } catch (error) {
    console.warn('Error fetching popular cars:', error.message);
    return fallbackPopularCars;
  }
};

const fallbackCars = [
  {
    id: 1,
    model: 'BMW M5',
    brand: 'BMW',
    year: 2023,
    price: 103500,
    image: '/images/cars/ferrari-f8.png',
    description: 'Luxury sports sedan with outstanding performance',
  },
  {
    id: 2,
    model: 'Ferrari F8',
    brand: 'Ferrari',
    year: 2023,
    price: 276000,
    image: '/images/cars/ferrari-f8.png',
    description: 'Breathtaking supercar with incredible performance',
  },
  {
    id: 3,
    model: 'Camaro',
    brand: 'Chevrolet',
    year: 2023,
    price: 32495,
    image: '/images/cars/camaro.png',
    description: 'Iconic American muscle car',
  },
  {
    id: 3,
    model: 'Porsche 911',
    brand: 'Porsche',
    year: 2023,
    price: 126484,
    image: '/images/cars/porshe-911.png',
    description: 'Iconic sports car with perfect balance of luxury and performance',
  },
  {
    id: 4,
    model: 'Lamborghini',
    brand: 'Lamborghini',
    year: 2023,
    price: 417826,
    image: '/images/cars/lamborgini.png',
    description: 'Ultimate supercar with breathtaking design and performance',
  },
  {
    id: 5,
    model: 'Volvo XC90',
    brand: 'Volvo',
    year: 2023,
    price: 84100,
    image: '/images/cars/volvo.png',
    description: 'Luxury SUV with exceptional safety and comfort',
  }
];

export const getAllCars = async (filters = {}) => {
  try {
    const connectionStatus = await verifyApiConnection();
    if (connectionStatus.status === 'error') {
      console.log('Using fallback data due to API connection error');
      return fallbackCars;
    }
    
    const { data } = await apiClient.get("/cars", { params: filters });
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch cars: ${error.message}. ` +
      'Please check if the backend server is running and the API URL is correct.'
    );
  }
};

const fallbackCarDetails = {
  1: {
    id: 1,
    model: 'BMW M5',
    brand: 'BMW',
    year: 2023,
    price: 103500,
    image: '/images/cars/ferrari-f8.png',
    description: 'Luxury sports sedan with outstanding performance',
    mileage: '0',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    type: 'Sedan',
    engineCapacity: '4395',
    seats: '5',
    horsePower: '627',
    driveType: 'AWD',
    variants: [
      { name: 'Base', price: '$103,500', status: 'Available' },
      { name: 'Competition', price: '$111,100', status: 'Available' }
    ],
    specifications: {
      Mechanical: [
        '4.4L BMW M TwinPower Turbo V-8',
        '8-speed M STEPTRONIC transmission',
        'M xDrive all-wheel-drive system'
      ],
      Exterior: [
        'Adaptive LED headlights',
        '20" M Double-spoke bi-color wheels',
        'M rear spoiler'
      ],
      Interior: [
        'Extended Merino leather upholstery',
        'M Sport seats with illuminated M5 logo',
        '12.3" digital instrument cluster'
      ],
      Safety: [
        'Active Protection System',
        'Active Driving Assistant',
        'Parking Assistant Plus'
      ]
    }
  },
  2: {
    id: 2,
    model: 'Ferrari F8',
    brand: 'Ferrari',
    year: 2023,
    price: 276000,
    image: '/images/cars/ferrari-f8.png',
    description: 'Breathtaking supercar with incredible performance',
    mileage: '0',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    type: 'Supercar',
    engineCapacity: '3902',
    seats: '2',
    horsePower: '710',
    driveType: 'RWD',
    variants: [
      { name: 'Tributo', price: '$276,000', status: 'Available' },
      { name: 'Spider', price: '$302,500', status: 'Limited' }
    ],
    specifications: {
      Mechanical: [
        '3.9L Twin-Turbo V8 Engine',
        '7-speed F1 dual-clutch transmission',
        'Electronic limited-slip differential'
      ],
      Exterior: [
        'LED headlights',
        'S-Duct front design',
        'Blown spoiler'
      ],
      Interior: [
        'Carbon fiber racing seats',
        'Ferrari steering wheel with LED shift lights',
        '8.5" passenger touchscreen display'
      ],
      Safety: [
        'Ferrari Dynamic Enhancer',
        'SSC 6.1 vehicle dynamics control',
        'Carbon ceramic brakes'
      ]
    }
  },
  3: {
    id: 3,
    model: 'Camaro',
    brand: 'Chevrolet',
    year: 2023,
    price: 32495,
    image: '/images/cars/camaro.png',
    description: 'Iconic American muscle car',
    mileage: '0',
    fuelType: 'Gasoline',
    transmission: 'Manual',
    type: 'Muscle Car',
    engineCapacity: '6162',
    seats: '4',
    horsePower: '455',
    driveType: 'RWD',
    variants: [
      { name: '1LT', price: '$32,495', status: 'Available' },
      { name: '2SS', price: '$42,495', status: 'Available' },
      { name: 'ZL1', price: '$63,000', status: 'Limited' }
    ],
    specifications: {
      Mechanical: [
        '6.2L LT1 V8 engine',
        '6-speed manual transmission',
        'Magnetic ride control'
      ],
      Exterior: [
        'LED headlamps',
        '20" aluminum wheels',
        'Rear stanchion spoiler'
      ],
      Interior: [
        'RECARO® performance seats',
        'Head-Up Display',
        'Leather-wrapped flat-bottom steering wheel'
      ],
      Safety: [
        'Forward Collision Alert',
        'Rear Cross Traffic Alert',
        'Lane Change Alert with Side Blind Zone Alert'
      ]
    }
  }
};

export const getCarById = async (id) => {
  try {
    const connectionStatus = await verifyApiConnection();
    if (connectionStatus.status === 'error') {
      console.log('Using fallback data for car details');
      const fallbackCar = fallbackCarDetails[id];
      if (!fallbackCar) {
        throw new Error('Car not found in fallback data');
      }
      return fallbackCar;
    }

    const { data } = await apiClient.get(`/cars/${id}`);
    return data;
  } catch (error) {
    if (error.message === 'Car not found in fallback data') {
      throw error;
    }
    throw new Error(`Failed to fetch car with ID ${id}: ${error.message}`);
  }
};

export const getCarsByBrand = async (brand) => {
  const { data } = await apiClient.get(`/cars/brand/${brand}`);
  return data;
};

export const login = async (credentials) => {
  const { data } = await apiClient.post("/auth/login", credentials);
  return data;
};

export const register = async (userData) => {
  const { data } = await apiClient.post("/auth/register", userData);
  return data;
};

export const forgotPassword = async (email) => {
  const { data } = await apiClient.post("/auth/forgot-password", { email });
  return data;
};

export const getAllBrands = async () => {
  try {
    const connectionStatus = await verifyApiConnection();
    if (connectionStatus.status === 'error') {
      console.log('Using fallback data for brands');
      return [
        { id: 1, name: 'BMW', logo: '/images/brands/bmw-logo.png' },
        { id: 2, name: 'Chevrolet', logo: '/images/brands/chevrolet-logo.png' },
        { id: 3, name: 'Land Rover', logo: '/images/brands/land-rover-logo.png' },
        { id: 4, name: 'Maserati', logo: '/images/brands/maserati-logo.png' },
        { id: 5, name: 'Porsche', logo: '/images/brands/porsche-logo.png' },
        { id: 6, name: 'Volvo', logo: '/images/brands/volvo-logo.png' }
      ];
    }
    const { data } = await apiClient.get("/brands");
    if (!data || !Array.isArray(data)) {
      console.warn('Invalid data format from API, using fallback data');
      return [
        { id: 1, name: 'BMW', logo: '/images/brands/bmw-logo.png' },
        { id: 2, name: 'Chevrolet', logo: '/images/brands/chevrolet-logo.png' },
        { id: 3, name: 'Land Rover', logo: '/images/brands/land-rover-logo.png' },
        { id: 4, name: 'Maserati', logo: '/images/brands/maserati-logo.png' },
        { id: 5, name: 'Porsche', logo: '/images/brands/porsche-logo.png' },
        { id: 6, name: 'Volvo', logo: '/images/brands/volvo-logo.png' }
      ];
    }
    return data;
  } catch (error) {
    console.warn('Error fetching brands:', error.message);
    return [
      { id: 1, name: 'BMW', logo: '/images/brands/bmw-logo.png' },
      { id: 2, name: 'Chevrolet', logo: '/images/brands/chevrolet-logo.png' },
      { id: 3, name: 'Land Rover', logo: '/images/brands/land-rover-logo.png' },
      { id: 4, name: 'Maserati', logo: '/images/brands/maserati-logo.png' },
      { id: 5, name: 'Porsche', logo: '/images/brands/porsche-logo.png' },
      { id: 6, name: 'Volvo', logo: '/images/brands/volvo-logo.png' }
    ];
  }
};

export const submitContactForm = async (formData) => {
  const { data } = await apiClient.post("/contact", formData);
  return data;
};

export const submitTradeIn = async (tradeInData) => {
  const { data } = await apiClient.post("/trade-in", tradeInData);
  return data;
};
