import { useState, useRef } from 'react';
import { 
  HiCheckCircle as Check, 
  HiClock as Clock, 
  HiCurrencyDollar as Money, 
  HiArrowUpTray as Upload, 
  HiArrowRight as ArrowRight, 
  HiXMark as XMark 
} from 'react-icons/hi2';

const ListServicePage = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter((file: File) => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      alert('Some files were rejected. Please ensure they are images under 5MB.');
    }

    setUploadedImages(prev => [...prev, ...validFiles].slice(0, 5));
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const serviceData = {
      id: Date.now().toString(),
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      duration: formData.get('duration') as string,
      price: formData.get('price') as string,
      description: formData.get('description') as string,
      images: uploadedImages.map(file => URL.createObjectURL(file)),
      createdAt: new Date().toISOString()
    };

    // Get existing services from localStorage
    const existingServices = JSON.parse(localStorage.getItem('services') || '[]');
    
    // Add new service
    const updatedServices = [...existingServices, serviceData];
    
    // Save to localStorage
    localStorage.setItem('services', JSON.stringify(updatedServices));
    
    // Show success message and redirect
    alert('Service submitted successfully!');
    
    // Reset form
    e.currentTarget.reset();
    setUploadedImages([]);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-8 flex items-center justify-center font-sans">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Branding & Guidelines */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-black mb-4">List a Service</h1>
            <p className="text-black leading-relaxed max-w-sm font-medium">
              Share your expertise with the Nordic community. Our marketplace values 
              craftsmanship, reliability, and Scandinavian simplicity.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 space-y-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-black">Guidelines</h2>
            
            <div className="flex gap-4 items-start">
              <div className="text-black mt-1">
                <Check size={24} />
              </div>
              <p className="text-sm text-black font-bold leading-snug">
                Provide a clear, high-quality description of your work environment or tools.
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <div className="text-black mt-1">
                <Clock size={24} />
              </div>
              <p className="text-sm text-black font-bold leading-snug">
                Be realistic about duration and preparation times.
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <div className="text-black mt-1">
                <Money size={24} />
              </div>
              <p className="text-sm text-black font-bold leading-snug">
                Transparent pricing helps build trust with local clients.
              </p>
            </div>
          </div>
          
          {/* Photo under guidelines removed as requested */}
        </div>

        {/* Right Column: Form */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Service Title</label>
              <input 
                type="text" 
                name="title"
                placeholder="e.g. Traditional Woodworking Workshop"
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-gray-300 outline-none transition-all text-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Category</label>
                <select name="category" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent outline-none appearance-none text-black">
                  <option>Crafts & Workshop</option>
                  <option>Digital Arts</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Duration</label>
                <div className="relative">
                  <select name="duration" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent outline-none appearance-none text-black">
                    <option>30 Minutes</option>
                    <option>1 Hour</option>
                    <option>2 Hours</option>
                  </select>
                  <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Price (USD)</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="price"
                  defaultValue="0.00"
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent outline-none text-black"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-black font-bold">$</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Description</label>
              <textarea 
                rows={3}
                name="description"
                placeholder="Describe the experience you are offering..."
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent outline-none resize-none text-black"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Service Gallery</label>
              <div className={`border-2 border-dashed rounded-3xl transition-colors ${
                uploadedImages.length > 0 ? 'p-6' : 'p-10'
              } ${
                isDragOver 
                  ? 'border-gray-400 bg-gray-50' 
                  : 'border-gray-200 hover:border-gray-400'
              }`}>
                
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    {uploadedImages.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <XMark size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div 
                  className="flex flex-col items-center justify-center text-center cursor-pointer"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={openFileDialog}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-black mb-3">
                    <Upload size={24} />
                  </div>
                  <p className="text-sm text-black font-bold">
                    {isDragOver ? 'Drop images here' : 'Drag & drop your images here'}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1 uppercase">
                    High resolution, JPG or PNG (max 5MB each, up to 5 images)
                  </p>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-black hover:bg-gray-800 text-white rounded-full font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              Submit Service <ArrowRight size={18} />
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ListServicePage;