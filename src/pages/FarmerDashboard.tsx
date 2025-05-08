
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bell, FileText, Package, Plus, Settings, Truck } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { mockProducts, mockOrders } from "@/lib/mockData";

const FarmerDashboard: React.FC = () => {
  const { currentUser, language } = useApp();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Filter for this farmer's products and orders
  const farmerProducts = mockProducts.filter(p => p.farmerId === currentUser?.id);
  const farmerOrders = mockOrders.filter(order => 
    order.items.some(item => 
      farmerProducts.some(p => p.id === item.productId)
    )
  );
  
  if (!currentUser || currentUser.role !== "farmer") {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {language === "english" ? "Access Denied" : "அணுகல் மறுக்கப்பட்டது"}
        </h2>
        <p>
          {language === "english" 
            ? "You need to be logged in as a farmer to view this page." 
            : "இந்தப் பக்கத்தைப் பார்க்க நீங்கள் விவசாயியாக உள்நுழைய வேண்டும்."}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            {language === "english" ? "Farmer Dashboard" : "விவசாயி டாஷ்போர்டு"}
          </h1>
          <p className="text-gray-600">
            {language === "english" ? "Welcome back" : "மீண்டும் வரவேற்கிறோம்"}, {currentUser.name}
          </p>
        </div>
        
        <div className="flex mt-4 md:mt-0">
          <Button variant="outline" className="mr-2" size="icon">
            <Bell size={18} />
          </Button>
          <Button variant="outline" size="icon">
            <Settings size={18} />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="overview">
            {language === "english" ? "Overview" : "கண்ணோட்டம்"}
          </TabsTrigger>
          <TabsTrigger value="products">
            {language === "english" ? "Products" : "தயாரிப்புகள்"}
          </TabsTrigger>
          <TabsTrigger value="orders">
            {language === "english" ? "Orders" : "ஆர்டர்கள்"}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {language === "english" ? "Analytics" : "பகுப்பாய்வு"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {language === "english" ? "Total Products" : "மொத்த தயாரிப்புகள்"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{farmerProducts.length}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {language === "english" ? "Active in marketplace" : "சந்தையில் செயலில் உள்ளது"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {language === "english" ? "Pending Orders" : "நிலுவையில் உள்ள ஆர்டர்கள்"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {farmerOrders.filter(o => o.status === "pending").length}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {language === "english" ? "Needs your attention" : "உங்கள் கவனம் தேவை"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {language === "english" ? "Total Revenue" : "மொத்த வருவாய்"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₹{farmerOrders.reduce((total, order) => total + order.totalAmount, 0)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === "english" ? "Lifetime earnings" : "வாழ்நாள் வருவாய்"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {language === "english" ? "Low Stock Items" : "குறைந்த ஸ்டாக் பொருட்கள்"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {farmerProducts.filter(p => p.quantity < 20).length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === "english" ? "Needs restocking" : "மீண்டும் நிரப்ப வேண்டும்"}
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>{language === "english" ? "Recent Orders" : "சமீபத்திய ஆர்டர்கள்"}</CardTitle>
            </CardHeader>
            <CardContent>
              {farmerOrders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">
                          {language === "english" ? "Order ID" : "ஆர்டர் ஐடி"}
                        </th>
                        <th className="text-left py-3 px-4">
                          {language === "english" ? "Date" : "தேதி"}
                        </th>
                        <th className="text-left py-3 px-4">
                          {language === "english" ? "Amount" : "தொகை"}
                        </th>
                        <th className="text-left py-3 px-4">
                          {language === "english" ? "Status" : "நிலை"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {farmerOrders.slice(0, 5).map(order => (
                        <tr key={order.id} className="border-b">
                          <td className="py-3 px-4">{order.id}</td>
                          <td className="py-3 px-4">{order.orderDate}</td>
                          <td className="py-3 px-4">₹{order.totalAmount}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              order.status === "delivered" ? "bg-green-100 text-green-800" :
                              order.status === "shipped" ? "bg-blue-100 text-blue-800" :
                              order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                              "bg-gray-100 text-gray-800"
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  {language === "english" ? "No orders yet" : "இதுவரை ஆர்டர்கள் எதுவும் இல்லை"}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "english" ? "AI Recommendations" : "AI பரிந்துரைகள்"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
                  <h4 className="font-semibold text-blue-700 mb-1">
                    {language === "english" ? "Market Trend" : "சந்தை போக்கு"}
                  </h4>
                  <p className="text-sm text-gray-700">
                    {language === "english" 
                      ? "Tomato prices are trending higher due to seasonal changes. Consider increasing your inventory." 
                      : "பருவகால மாற்றங்கள் காரணமாக தக்காளி விலைகள் அதிகரிக்கின்றன. உங்கள் இருப்பை அதிகரிக்க பரிசீலிக்கவும்."}
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-md border border-green-100">
                  <h4 className="font-semibold text-green-700 mb-1">
                    {language === "english" ? "Pricing Suggestion" : "விலை பரிந்துரை"}
                  </h4>
                  <p className="text-sm text-gray-700">
                    {language === "english" 
                      ? "Your Rice product is priced 10% lower than market average. Consider a price adjustment." 
                      : "உங்கள் அரிசி தயாரிப்பு சந்தை சராசரியை விட 10% குறைவாக விலையிடப்பட்டுள்ளது. விலை சரிசெய்தலைக் கருத்தில் கொள்ளுங்கள்."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-end">
            <Button className="bg-vivasayi-green hover:bg-vivasayi-teal">
              <Plus size={16} className="mr-2" />
              {language === "english" ? "Add New Product" : "புதிய தயாரிப்பைச் சேர்க்கவும்"}
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "english" ? "Manage Products" : "தயாரிப்புகளை நிர்வகிக்க"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {farmerProducts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">
                          {language === "english" ? "Product" : "தயாரிப்பு"}
                        </th>
                        <th className="text-left py-3 px-4">
                          {language === "english" ? "Price" : "விலை"}
                        </th>
                        <th className="text-left py-3 px-4">
                          {language === "english" ? "Stock" : "ஸ்டாக்"}
                        </th>
                        <th className="text-left py-3 px-4">
                          {language === "english" ? "Harvest Date" : "அறுவடை தேதி"}
                        </th>
                        <th className="text-left py-3 px-4">
                          {language === "english" ? "Actions" : "செயல்கள்"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {farmerProducts.map(product => (
                        <tr key={product.id} className="border-b">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-gray-100 rounded flex-shrink-0">
                                <img 
                                  src={product.imageUrl} 
                                  alt={product.name}
                                  className="h-full w-full object-cover rounded"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/placeholder.svg";
                                  }}
                                />
                              </div>
                              <div className="ml-3">
                                <p className="font-medium">{product.name}</p>
                                <p className="text-xs text-gray-500">{product.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">₹{product.price}</td>
                          <td className="py-3 px-4">
                            <span className={product.quantity < 20 ? "text-red-600" : "text-green-600"}>
                              {product.quantity} {product.unit}
                            </span>
                          </td>
                          <td className="py-3 px-4">{product.harvestDate || "N/A"}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                {language === "english" ? "Edit" : "திருத்த"}
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                                {language === "english" ? "Delete" : "நீக்க"}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">
                    {language === "english" ? "No Products Yet" : "இன்னும் தயாரிப்புகள் இல்லை"}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {language === "english" 
                      ? "Start adding your products to sell them on VivasayiKart" 
                      : "விவசாயி கார்ட்டில் விற்பதற்கு உங்கள் தயாரிப்புகளைச் சேர்க்கத் தொடங்குங்கள்"}
                  </p>
                  <Button className="bg-vivasayi-green hover:bg-vivasayi-teal">
                    <Plus size={16} className="mr-2" />
                    {language === "english" ? "Add First Product" : "முதல் தயாரிப்பைச் சேர்க்கவும்"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <Button variant="outline" size="sm" className="border-2 border-vivasayi-green">
                {language === "english" ? "All Orders" : "அனைத்து ஆர்டர்களும்"}
              </Button>
              <Button variant="outline" size="sm">
                {language === "english" ? "Pending" : "நிலுவையில் உள்ளது"}
              </Button>
              <Button variant="outline" size="sm">
                {language === "english" ? "Shipped" : "அனுப்பப்பட்டது"}
              </Button>
              <Button variant="outline" size="sm">
                {language === "english" ? "Delivered" : "வழங்கப்பட்டது"}
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              {farmerOrders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="text-left py-4 px-6">
                          {language === "english" ? "Order Details" : "ஆர்டர் விவரங்கள்"}
                        </th>
                        <th className="text-left py-4 px-6">
                          {language === "english" ? "Customer" : "வாடிக்கையாளர்"}
                        </th>
                        <th className="text-left py-4 px-6">
                          {language === "english" ? "Amount" : "தொகை"}
                        </th>
                        <th className="text-left py-4 px-6">
                          {language === "english" ? "Status" : "நிலை"}
                        </th>
                        <th className="text-left py-4 px-6">
                          {language === "english" ? "Actions" : "செயல்கள்"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {farmerOrders.map(order => (
                        <tr key={order.id} className="border-b">
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-medium">#{order.id}</p>
                              <p className="text-xs text-gray-500">{order.orderDate}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <p>Customer #{order.customerId}</p>
                              <p className="text-xs text-gray-500">{order.deliveryAddress.substring(0, 30)}...</p>
                            </div>
                          </td>
                          <td className="py-4 px-6">₹{order.totalAmount}</td>
                          <td className="py-4 px-6">
                            <span className={`px-2 py-1 rounded text-xs ${
                              order.status === "delivered" ? "bg-green-100 text-green-800" :
                              order.status === "shipped" ? "bg-blue-100 text-blue-800" :
                              order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                              "bg-gray-100 text-gray-800"
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="flex items-center">
                                <FileText size={14} className="mr-1" />
                                {language === "english" ? "Details" : "விவரங்கள்"}
                              </Button>
                              {order.status === "pending" && (
                                <Button size="sm" className="flex items-center bg-vivasayi-green hover:bg-vivasayi-teal">
                                  <Truck size={14} className="mr-1" />
                                  {language === "english" ? "Process" : "செயலாக்க"}
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">
                    {language === "english" ? "No Orders Yet" : "இன்னும் ஆர்டர்கள் இல்லை"}
                  </h3>
                  <p className="text-gray-500">
                    {language === "english" ? "Orders will appear here when customers make purchases" : "வாடிக்கையாளர்கள் வாங்கும் போது ஆர்டர்கள் இங்கே தோன்றும்"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "english" ? "Sales Analytics" : "விற்பனை பகுப்பாய்வுகள்"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">
                  {language === "english" ? "Analytics Feature Coming Soon" : "பகுப்பாய்வு அம்சம் விரைவில் வருகிறது"}
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {language === "english" 
                    ? "We're working on advanced analytics to help you make better decisions for your farming business." 
                    : "உங்கள் விவசாய வணிகத்திற்கு சிறந்த முடிவுகளை எடுக்க உதவும் மேம்பட்ட பகுப்பாய்வுகளில் நாங்கள் பணியாற்றி வருகிறோம்."}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FarmerDashboard;
