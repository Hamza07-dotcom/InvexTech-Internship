// src/features/cars/carsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCars, getCarById, getPopularCars } from "@/services/api";

export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
  const cars = await getAllCars();
  // Map backend fields to frontend naming, including all filterable fields
  return cars.map((car) => ({
    id: car.id,
    model: car.model,
    brand: car.brand,
    year: car.year,
    price: car.price,
    image: car.image,
    description: car.description,
    sold: car.sold || false,
    created: car.created,
    updated: car.updated,
    transmission: car.transmission || car.transmissionType || car.transmission_type,
    fuel: car.fuel || car.fuelType || car.fuel_type,
    engineCapacity: car.engineCapacity || car.engine_capacity,
    type: car.type,
    seats: car.seats,
    installment: car.installment,
    mileage: car.mileage,
    horsePower: car.horsePower,
    driveType: car.driveType
  }));
});

export const fetchCarById = createAsyncThunk("cars/fetchCarById", async (id) => {
  const car = await getCarById(id);
  return {
    id: car.id,
    model: car.model,
    price: car.price,
    image: car.image,
    brand: car.brand,
    year: car.year,
    description: car.description,
    km: car.mileage,
    fuel: car.fuelType,
    transmission: car.transmission,
  };
});

export const fetchNewestCars = createAsyncThunk("cars/fetchNewestCars", async () => {
  const cars = await getAllCars();
  // Sort cars by year in descending order and take the newest ones
  const newestCars = [...cars].sort((a, b) => b.year - a.year).slice(0, 6);
  
  return newestCars.map((car) => {
    const imageMap = {
      'BMW': '/images/cars/ferrari-f8.png', 
      'Ferrari': '/images/cars/ferrari-f8.png',
      'Chevrolet': '/images/cars/camaro.png',
      'Porsche': '/images/cars/porshe-911.png',
      'Lamborghini': '/images/cars/lamborgini.png',
      'Volvo': '/images/cars/volvo.png'
    };

    const imagePath = imageMap[car.brand] || car.image || '/images/img.png';

    return {
      id: car.id,
      name: car.model,
      price: `$${new Intl.NumberFormat('en-US').format(car.price)}`,
      img: imagePath,
      year: car.year,
      brand: car.brand,
      description: car.description
    };
  });
});

export const fetchPopularCars = createAsyncThunk("cars/fetchPopularCars", async () => {
  const cars = await getPopularCars();
  return cars.map((car) => {
    const imageMap = {
      'BMW': '/images/cars/ferrari-f8.png',  
      'Ferrari': '/images/cars/ferrari-f8.png',
      'Chevrolet': '/images/cars/camaro.png',
      'Porsche': '/images/cars/porshe-911.png',
      'Lamborghini': '/images/cars/lamborgini.png',
      'Volvo': '/images/cars/volvo.png'
    };

    const imagePath = imageMap[car.brand] || car.image || '/images/img.png';

    return {
      id: car.id,
      name: car.model,
      price: `$${new Intl.NumberFormat('en-US').format(car.price)}`,
      img: imagePath,
      tags: [car.type, car.seats].filter(Boolean),
      installment: `$${(car.price * 0.015).toFixed(2)}/month`,
      brand: car.brand,
      description: car.description
    };
  });
});

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    popularCars: [],
    newestCars: [],
    selectedCar: null,
    status: "idle",
    popularStatus: "idle",
    newestStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCarById.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.currentCar = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.status = "succeeded";
        
        const brandImageMap = {
          'BMW': [
            '/images/cars/bmw-m5.jpg',
            '/images/cars/ferrari-f8.png', 
            '/images/cars/camaro.png',
            '/images/cars/porshe-911.png'
          ],
          'Ferrari': [
            '/images/cars/ferrari-f8.png',
            '/images/cars/porshe-911.png',
            '/images/cars/lamborgini.png',
            '/images/cars/camaro.png'
          ],
          'Chevrolet': [
            '/images/cars/camaro.png',
            '/images/cars/volvo.png',
            '/images/cars/ferrari-f8.png',
            '/images/cars/porshe-911.png'
          ],
          'Porsche': [
            '/images/cars/porshe-911.png',
            '/images/cars/ferrari-f8.png',
            '/images/cars/lamborgini.png',
            '/images/cars/volvo.png'
          ],
          'Lamborghini': [
            '/images/cars/lamborgini.png',
            '/images/cars/ferrari-f8.png',
            '/images/cars/porshe-911.png',
            '/images/cars/camaro.png'
          ],
          'Volvo': [
            '/images/cars/volvo.png',
            '/images/cars/camaro.png',
            '/images/cars/porshe-911.png',
            '/images/cars/ferrari-f8.png'
          ]
        };

        const carImages = brandImageMap[action.payload.brand] || [
          '/images/cars/ferrari-f8.png',
          '/images/cars/camaro.png',
          '/images/cars/porshe-911.png',
          '/images/cars/volvo.png'
        ];

        state.currentCar = {
          ...action.payload,
          images: action.payload.image ? 
            [action.payload.image, ...carImages.slice(0, 3)] : 
            carImages,
          specifications: {
            Mechanical: [
              `${action.payload.engineCapacity}cc engine`,
              `${action.payload.transmission} transmission`,
              `${action.payload.horsePower || '450'} HP`,
              `${action.payload.driveType || 'RWD'} drive system`
            ],
            Exterior: [
              'LED headlights',
              'Power moonroof',
              'Alloy wheels',
              'Heated mirrors'
            ],
            Interior: [
              'Leather seats',
              'Power adjustable seats',
              'Climate control',
              'Premium sound system'
            ],
            Safety: [
              'Multiple airbags',
              'ABS with EBD',
              'Traction control',
              'Lane departure warning'
            ]
          },
          variants: [
            {
              name: 'Base',
              price: `$${new Intl.NumberFormat('en-US').format(action.payload.price)}`,
              status: 'Available'
            },
            {
              name: 'Sport',
              price: `$${new Intl.NumberFormat('en-US').format(action.payload.price * 1.2)}`,
              status: 'Available'
            },
            {
              name: 'Premium',
              price: `$${new Intl.NumberFormat('en-US').format(action.payload.price * 1.4)}`,
              status: 'Limited'
            }
          ],
          recommendations: [
            {
              name: 'Similar Model 1',
              price: `$${new Intl.NumberFormat('en-US').format(action.payload.price * 0.9)}`,
              img: '/images/cars/camaro.png',
              type: action.payload.type || 'Sedan',
              seats: action.payload.seats || '5'
            },
            {
              name: 'Similar Model 2',
              price: `$${new Intl.NumberFormat('en-US').format(action.payload.price * 1.1)}`,
              img: '/images/cars/ferrari-f8.png',
              type: action.payload.type || 'Coupe',
              seats: action.payload.seats || '2'
            },
            {
              name: 'Similar Model 3',
              price: `$${new Intl.NumberFormat('en-US').format(action.payload.price * 1.2)}`,
              img: '/images/cars/porshe-911.png',
              type: action.payload.type || 'Sports',
              seats: action.payload.seats || '2'
            },
            {
              name: 'Similar Model 4',
              price: `$${new Intl.NumberFormat('en-US').format(action.payload.price * 0.8)}`,
              img: '/images/cars/volvo.png',
              type: action.payload.type || 'Sedan',
              seats: action.payload.seats || '5'
            }
          ]
        };
        state.error = null;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.currentCar = null;
      })
      .addCase(fetchPopularCars.pending, (state) => {
        state.popularStatus = "loading";
      })
      .addCase(fetchPopularCars.fulfilled, (state, action) => {
        state.popularStatus = "succeeded";
        state.popularCars = action.payload;
      })
      .addCase(fetchPopularCars.rejected, (state, action) => {
        state.popularStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchNewestCars.pending, (state) => {
        state.newestStatus = "loading";
      })
      .addCase(fetchNewestCars.fulfilled, (state, action) => {
        state.newestStatus = "succeeded";
        state.newestCars = action.payload;
      })
      .addCase(fetchNewestCars.rejected, (state, action) => {
        state.newestStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default carsSlice.reducer;
