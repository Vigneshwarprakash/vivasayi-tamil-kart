
import React from "react";
import { useApp } from "@/contexts/AppContext";
import AddProductForm from "@/components/AddProductForm";

const AddProduct: React.FC = () => {
  const { currentUser, language } = useApp();

  if (!currentUser || currentUser.role !== "farmer") {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {language === "english" ? "Access Denied" : "அணுகல் மறுக்கப்பட்டது"}
        </h2>
        <p>
          {language === "english" 
            ? "You need to be logged in as a farmer to add products." 
            : "தயாரிப்புகளைச் சேர்க்க நீங்கள் விவசாயியாக உள்நுழைய வேண்டும்."}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {language === "english" ? "Add New Product" : "புதிய தயாரிப்பைச் சேர்க்கவும்"}
        </h1>
        <p className="text-gray-600">
          {language === "english" 
            ? "List your farm products for consumers to purchase" 
            : "நுகர்வோர் வாங்குவதற்கு உங்கள் பண்ணை தயாரிப்புகளைப் பட்டியலிடுங்கள்"}
        </p>
      </div>
      
      <AddProductForm />
    </div>
  );
};

export default AddProduct;
