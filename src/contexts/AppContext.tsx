
import React, { createContext, useState, useContext, useEffect } from "react";
import { User, CartItem, Product } from "@/lib/types";
import { mockUsers, mockProducts } from "@/lib/mockData";
import { toast } from "@/components/ui/use-toast";
import { 
  getCurrentUser, 
  signIn, 
  signOut, 
  fetchProducts
} from "@/lib/supabase";

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
  refreshProducts: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState<Product[]>(mockProducts); // Start with mock data, will be replaced
  const [language, setLanguage] = useState<"english" | "tamil">("english");

  const initializeApp = async () => {
    // Check if user is already logged in
    const user = await getCurrentUser();
    if (user) {
      setCurrentUser(user);
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
    
    // Load real products from Supabase
    await refreshProducts();
  };

  useEffect(() => {
    initializeApp();
  }, []);

  useEffect(() => {
    // Save cart to localStorage when it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const refreshProducts = async () => {
    try {
      const data = await fetchProducts();
      if (data && data.length > 0) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error refreshing products:", error);
    }
  };

  const login = async (email: string, password: string) => {
    const result = await signIn(email, password);
    
    if (result.success && result.user) {
      setCurrentUser(result.user as User);
      setIsLoggedIn(true);
      localStorage.setItem("currentUser", JSON.stringify(result.user));
      toast({
        title: "Login Successful",
        description: `Welcome back, ${result.user.name || 'User'}!`,
      });
      return true;
    } else {
      toast({
        title: "Login Failed",
        description: result.error || "Invalid email or password",
        variant: "destructive",
      });
      return false;
    }
  };

  const registerUser = async (userData: Partial<User>, password: string) => {
    // This will be implemented with Supabase auth
    toast({
      title: "Registration Successful",
      description: "Your account has been created successfully",
    });
    return true;
  };

  const logout = async () => {
    await signOut();
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
      refreshProducts,
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
