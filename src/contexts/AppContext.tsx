
import React, { createContext, useState, useContext, useEffect } from "react";
import { User, CartItem, Product } from "@/lib/types";
import { mockUsers, mockProducts } from "@/lib/mockData";
import { toast } from "@/components/ui/use-toast";

interface AppContextType {
  currentUser: User | null;
  cart: CartItem[];
  isLoggedIn: boolean;
  products: Product[];
  language: "english" | "tamil";
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleLanguage: () => void;
  getCartTotal: () => number;
  registerUser: (userData: Partial<User>, password: string) => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [language, setLanguage] = useState<"english" | "tamil">("english");

  useEffect(() => {
    // Check if user is already logged in (using localStorage for demo)
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }

    // Load cart from localStorage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    
    // Load language preference
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage && (storedLanguage === "english" || storedLanguage === "tamil")) {
      setLanguage(storedLanguage as "english" | "tamil");
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage when it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call
    // For demo, we're using mockUsers
    const user = mockUsers.find(user => user.email === email);
    
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });
      return true;
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      return false;
    }
  };

  const registerUser = async (userData: Partial<User>, password: string) => {
    // In a real app, this would make an API call
    // For demo, we just pretend it was successful
    toast({
      title: "Registration Successful",
      description: "Your account has been created successfully",
    });
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("currentUser");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prevCart, { product, quantity }];
      }
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} added to your cart`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    
    toast({
      title: "Removed from Cart",
      description: "Item removed from your cart",
    });
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const toggleLanguage = () => {
    const newLanguage = language === "english" ? "tamil" : "english";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      cart,
      isLoggedIn,
      products,
      language,
      login,
      logout,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      clearCart,
      toggleLanguage,
      getCartTotal,
      registerUser,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
