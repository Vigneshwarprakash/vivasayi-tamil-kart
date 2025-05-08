
import { Product, User, Order } from "./types";

export const mockUsers: User[] = [
  {
    id: "f1",
    email: "farmer@example.com",
    name: "Ramu Velan",
    role: "farmer",
    phone: "9876543210",
    address: "123, Perur Main Road, Coimbatore",
    location: "Coimbatore",
    isVerified: true,
    profileImage: "/assets/farmer-profile.jpg"
  },
  {
    id: "c1",
    email: "consumer@example.com",
    name: "Priya Kumar",
    role: "consumer",
    phone: "9876543211",
    address: "456, Anna Nagar, Chennai",
    location: "Chennai",
    profileImage: "/assets/consumer-profile.jpg"
  }
];

export const mockProducts: Product[] = [
  {
    id: "p1",
    farmerId: "f1",
    farmerName: "Ramu Velan",
    name: "Organic Tomatoes",
    nameInTamil: "இயற்கை தக்காளி",
    description: "Fresh organic tomatoes harvested this week",
    category: "vegetables",
    price: 50,
    quantity: 100,
    unit: "kg",
    harvestDate: "2025-05-05",
    imageUrl: "/assets/tomato.jpg",
    rating: 4.5,
    location: "Coimbatore"
  },
  {
    id: "p2",
    farmerId: "f1",
    farmerName: "Ramu Velan",
    name: "Fresh Rice",
    nameInTamil: "புதிய அரிசி",
    description: "Organic rice from traditional farming",
    category: "grains",
    price: 80,
    quantity: 50,
    unit: "kg",
    harvestDate: "2025-05-03",
    imageUrl: "/assets/rice.jpg",
    rating: 4.8,
    location: "Coimbatore"
  },
  {
    id: "p3",
    farmerId: "f1",
    farmerName: "Ramu Velan",
    name: "Green Bananas",
    nameInTamil: "பச்சை வாழைப்பழம்",
    description: "Fresh green bananas",
    category: "fruits",
    price: 40,
    quantity: 200,
    unit: "dozen",
    harvestDate: "2025-05-06",
    imageUrl: "/assets/banana.jpg",
    rating: 4.3,
    location: "Coimbatore"
  },
  {
    id: "p4",
    farmerId: "f1",
    farmerName: "Ramu Velan",
    name: "Fresh Coconut",
    nameInTamil: "புதிய தேங்காய்",
    description: "Organic coconuts for drinking and cooking",
    category: "fruits",
    price: 35,
    quantity: 150,
    unit: "piece",
    harvestDate: "2025-05-07",
    imageUrl: "/assets/coconut.jpg",
    rating: 4.7,
    location: "Coimbatore"
  }
];

export const mockOrders: Order[] = [
  {
    id: "o1",
    customerId: "c1",
    orderDate: "2025-05-02",
    items: [
      {
        productId: "p1",
        productName: "Organic Tomatoes",
        quantity: 5,
        price: 50
      },
      {
        productId: "p2",
        productName: "Fresh Rice",
        quantity: 2,
        price: 80
      }
    ],
    totalAmount: 410,
    status: "delivered",
    paymentMethod: "cod",
    paymentStatus: "completed",
    deliveryAddress: "456, Anna Nagar, Chennai"
  },
  {
    id: "o2",
    customerId: "c1",
    orderDate: "2025-05-07",
    items: [
      {
        productId: "p3",
        productName: "Green Bananas",
        quantity: 2,
        price: 40
      },
      {
        productId: "p4",
        productName: "Fresh Coconut",
        quantity: 3,
        price: 35
      }
    ],
    totalAmount: 185,
    status: "shipped",
    paymentMethod: "cod",
    paymentStatus: "pending",
    deliveryAddress: "456, Anna Nagar, Chennai"
  }
];

// Tamil Voice Commands Dictionary
export const tamilVoiceCommands = {
  search: {
    "தக்காளி காண்பி": "search tomatoes",
    "அரிசி காண்பி": "search rice",
    "வாழைப்பழம் காண்பி": "search banana",
    "தேங்காய் காண்பி": "search coconut"
  },
  navigation: {
    "கார்ட்டை திற": "open cart",
    "முகப்புக்கு செல்": "go to home",
    "பக்கம் முன்னே செல்": "go back",
    "மேலே செல்": "scroll up",
    "கீழே செல்": "scroll down"
  },
  checkout: {
    "பணம் செலுத்து": "proceed to payment",
    "ஆர்டரை உறுதி செய்": "confirm order",
    "பட்டியலை காண்பி": "show invoice"
  }
};
