import React, { useState } from 'react'; // Added useState
import { HiTrash as TrashIcon, HiCurrencyDollar as MoneyIcon, HiOutlineCloudArrowUp as UploadIcon } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removeProductFromTheCart } from "../features/cart/cartSlice";
import customFetch from "../axios/custom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { checkCheckoutFormData } from "../utils/checkCheckoutFormData";

const Checkout = () => {
  const { productsInCart, subtotal } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // --- DRAG AND DROP STATE ---
  const [files, setFiles] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow a drop
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    // Filter for images only
    const imageFiles = droppedFiles.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      setFiles((prev) => [...prev, ...imageFiles]);
      toast.success(`${imageFiles.length} image(s) added`);
    } else {
      toast.error("Please drop valid image files (JPG/PNG)");
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Append the dropped files to the form data
    files.forEach((file, index) => {
      formData.append(`gallery_image_${index}`, file);
    });

    const data = Object.fromEntries(formData);
    const checkoutData = { data, products: productsInCart, subtotal };

    if (!checkCheckoutFormData(checkoutData)) return;

    // ... rest of your existing submit logic
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex justify-center py-10 px-5 font-serif">
      <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-xl p-10">
        <form onSubmit={handleCheckoutSubmit} className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          
          {/* LEFT SIDE */}
          <div>
            {/* CONTACT & SHIPPING (Keep your existing code here) */}
            <div className="mb-10">
                <h2 className="text-black text-xl font-semibold">Contact Information</h2>
                <div className="mt-4">
                    <label className="block text-black uppercase text-xs font-bold mb-2">Email</label>
                    <input type="email" name="emailAddress" className="input" required />
                </div>
            </div>

            {/* DRAG AND DROP SECTION */}
            <div className="mt-10 border-t pt-10">
              <h2 className="text-black text-xl font-semibold mb-4">Service Gallery</h2>
              
              <div 
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-300 rounded-[2rem] p-10 flex flex-col items-center justify-center bg-[#F9FAFB] hover:border-black transition-colors cursor-pointer"
              >
                <UploadIcon className="text-4xl text-gray-400 mb-2" />
                <p className="text-sm font-bold text-black">Drag & drop your images here</p>
                <p className="text-xs text-gray-400 mt-1 uppercase">High resolution JPG or PNG (max 5MB)</p>
                
                {/* Hidden File Input for clicking */}
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  className="hidden" 
                  id="fileInput"
                  onChange={(e) => setFiles([...files, ...Array.from(e.target.files)])}
                />
                <label htmlFor="fileInput" className="mt-4 text-xs text-blue-500 underline cursor-pointer">
                  or click to browse
                </label>
              </div>

              {/* IMAGE PREVIEWS */}
              {files.length > 0 && (
                <div className="mt-6 grid grid-cols-4 gap-4">
                  {files.map((file, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt="preview" 
                        className="w-full h-20 object-cover rounded-xl border"
                      />
                      <button 
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <TrashIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* PAYMENT BOX (Keep your existing code here) */}
            <div className="mt-10 border-t pt-10">
               <div style={{ backgroundColor: '#c9c5c58c', padding: '24px', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '20px' }}>
                 <MoneyIcon style={{ fontSize: '32px', color: '#000000' }} />
                 <div style={{ color: '#000000' }}>
                   <h3 style={{ margin: '0', fontSize: '18px', fontWeight: 'bold' }}>Payment: Cash on Delivery</h3>
                   <p style={{ margin: '4px 0 0 0', fontSize: '14px', lineHeight: '1.5' }}>Pay safely at your doorstep.</p>
                 </div>
               </div>
            </div>
          </div>

          {/* RIGHT SIDE - ORDER SUMMARY (Keep your existing code here) */}
          <div className="mt-10 lg:mt-0">
             <h2 className="text-black text-xl font-semibold">Order Summary</h2>
             <div className="mt-4 bg-white rounded-[30px] shadow-lg border p-8">
               {/* ... Your product mapping and totals ... */}
               <div className="mt-10">
                 <button type="submit" className="w-full bg-[#e5e7eb] py-4 rounded-full font-bold text-black hover:bg-gray-300">
                    Confirm Order
                 </button>
               </div>
             </div>
          </div>

        </form>
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 15px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          outline: none;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default Checkout;