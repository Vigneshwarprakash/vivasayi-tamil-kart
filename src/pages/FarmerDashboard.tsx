import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductTable from "@/components/ProductTable";
import { Product } from "@/lib/types";
import { mockProducts } from "@/lib/mockData";
import { PlusCircle, Mic } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useVoiceCommand } from "@/lib/voiceRecognition";

const FarmerDashboard: React.FC = () => {
  const { language, currentUser } = useApp();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(
    mockProducts.filter(p => currentUser && p.farmerId === currentUser.id)
  );
  const [activeTab, setActiveTab] = useState("products");
  
  // Handle product deletion
  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };
  
  // Handle product edit
  const handleEditProduct = (product: Product) => {
    // In a real app, this would navigate to an edit form with the product data
    toast({
      title: language === "english" ? "Edit Product" : "தயாரிப்பைத் திருத்து",
      description: language === "english" 
        ? `Editing ${product.name}` 
        : `${product.name} திருத்துகிறது`,
    });
    // For now, we'll just log it
    console.log("Edit product:", product);
  };
  
  // Voice command handler
  const handleVoiceCommand = (command: string) => {
    if (command === "add product" || command === "new product") {
      navigate("/add-product");
    } else if (command === "show orders") {
      setActiveTab("orders");
    } else if (command === "show products") {
      setActiveTab("products");
    }
  };
  
  const { startListening } = useVoiceCommand(handleVoiceCommand);
  
  if (!currentUser || currentUser.role !== "farmer") {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {language === "english" ? "Access Denied" : "அணுகல் மறுக்கப்பட்டது"}
        </h2>
        <p>
          {language === "english" 
            ? "You need to be logged in as a farmer to view this dashboard." 
            : "இந்த டாஷ்போர்டைப் பார்க்க நீங்கள் விவசாயியாக உள்நுழைய வேண்டும்."}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {language === "english" ? "Farmer Dashboard" : "விவசாயி டாஷ்போர்டு"}
          </h1>
          <p className="text-gray-600">
            {language === "english" 
              ? `Welcome back, ${currentUser.name}` 
              : `மீண்டும் வரவேற்கிறோம், ${currentUser.name}`}
          </p>
        </div>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Button onClick={startListening} variant="outline" className="flex items-center gap-2">
            <Mic size={16} />
            {language === "english" ? "Voice Command" : "குரல் கட்டளை"}
          </Button>
          
          <Button 
            onClick={() => navigate("/add-product")}
            className="bg-vivasayi-green hover:bg-vivasayi-teal flex items-center gap-2"
          >
            <PlusCircle size={16} />
            {language === "english" ? "Add Product" : "தயாரிப்பைச் சேர்க்கவும்"}
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="products">
            {language === "english" ? "Products" : "தயாரிப்புகள்"}
          </TabsTrigger>
          <TabsTrigger value="orders">
            {language === "english" ? "Orders" : "ஆர்டர்கள்"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "english" ? "Your Products" : "உங்கள் தயாரிப்புகள்"}</CardTitle>
              <CardDescription>
                {language === "english" 
                  ? "Manage your product inventory, update details, and track stock levels." 
                  : "உங்கள் தயாரிப்பு சரக்குகளை நிர்வகிக்கவும், விவரங்களைப் புதுப்பிக்கவும் மற்றும் பங்கு அளவுகளைக் கண்காணிக்கவும்."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProductTable 
                products={products} 
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "english" ? "Recent Orders" : "சமீபத்திய ஆர்டர்கள்"}</CardTitle>
              <CardDescription>
                {language === "english" 
                  ? "View and manage orders from customers." 
                  : "வாடிக்கையாளர்களின் ஆர்டர்களைப் பார்க்கவும் மற்றும் நிர்வகிக்கவும்."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* This will be replaced with an OrderTable component in the future */}
              <div className="text-center py-10 text-gray-500">
                {language === "english" 
                  ? "No orders yet. Your orders will appear here when customers purchase your products." 
                  : "இதுவரை ஆர்டர்கள் இல்லை. வாடிக்கையாளர்கள் உங்கள் தயாரிப்புகளை வாங்கும்போது உங்கள் ஆர்டர்கள் இங்கே தோன்றும்."}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FarmerDashboard;
