import React, { useState } from 'react';

const AddProductMulti = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [dosage, setDosage] = useState('');
    const [usage, setUsage] = useState('');
    const [indications, setIndications] = useState('');
    
    // 📸 MULTIPLE IMAGES ARRAY STATE
    const [images, setImages] = useState([]);

    // 🚀 FIXED 1: Fakepath bypass karne ke liye e.target.files data hook layer setup kiya h
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImages([...e.target.files]); // Asli file array store hoga
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation check for strict fields
        if (!productName.trim() || !price) {
            alert("Please fill Product Name and Price fields!");
            return;
        }
        
        // Multi-part data package transmission setting
        const formData = new FormData();
        formData.append('name', productName.trim());
        formData.append('price', Number(price));
        formData.append('description', description ? description.trim() : "");
        formData.append('dosage', dosage ? dosage.trim() : "");
        formData.append('usage', usage ? usage.trim() : "");
        formData.append('indications', indications ? indications.trim() : "");
        
        // Safe Dynamic Category fallback logic
        const finalCategoryValue = category || "000000000000000000000000";
        formData.append('category', finalCategoryValue);
        
        // 🚀 FIXED 2: Loop images array and append dynamically inside FormData Mesh (Asli Binary Files upload)
        if (images.length > 0) {
            images.forEach((img) => {
                formData.append('images', img); // Content-stream upload matrix match strictly
            });
        } else {
            alert("Please select at least one image file from your desktop!");
            return;
        }

        try {
            // FIXED ABSOLUTE PATH for standard backend engine connectivity
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                body: formData, // Multi-part transfer activation
            });

            // JSON response parsing directly
            const data = await response.json();

            if (response.ok || data.success) {
                alert(`🎉 Product "${productName}" added with multiple images successfully!`);
                // Form states flush/reset mechanism
                setProductName('');
                setPrice('');
                setCategory('');
                setDescription('');
                setDosage('');
                setUsage('');
                setIndications('');
                setImages([]);
            } else {
                alert(data.message || 'Failed to parse dynamic data structure.');
            }
        } catch (error) {
            console.error("Backend Error Cluster:", error);
            alert("Connection error with server. Check terminal for diagnostics.");
        }
    };

    return (
        <div className="p-6 bg-[#f4f7f6] min-h-screen w-full">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-slate-100">
                
                <div className="mb-8 border-b pb-4">
                    <h2 className="text-2xl font-bold text-slate-800">Add Premium Product (Multi-Image Mode)</h2>
                    <p className="text-sm text-gray-500 mt-1">Insert advanced medicine specifications & multiple desktop photos into MongoDB collection</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Row 1: Name and Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">PRODUCT NAME</label>
                            <input 
                                type="text" 
                                value={productName}
                                placeholder="e.g., Swarnabhasmam capsule" 
                                onChange={(e) => setProductName(e.target.value)}
                                className="w-full border border-slate-200 p-3 rounded-lg focus:outline-none focus:border-[#005f60]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">PRICE (INR)</label>
                            <input 
                                type="number" 
                                value={price}
                                placeholder="e.g., 9475" 
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full border border-slate-200 p-3 rounded-lg focus:outline-none focus:border-[#005f60]"
                            />
                        </div>
                    </div>

                    {/* Row 2: Select Category (MATCHES YOUR SCHEMA BINDINGS) */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">SELECT CATEGORY</label>
                        <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border border-slate-200 p-3 rounded-lg bg-white focus:outline-none focus:border-[#005f60]"
                        >
                            <option value="">-- Choose Category --</option>
                            <option value="Capsules">Capsules</option>
                            <option value="Thailam">Thailam</option>
                            <option value="Yamakam">Yamakam</option>
                            <option value="Rasayanam">Rasayanam</option>
                        </select>
                    </div>

                    {/* 📸 DESKTOP FILE MULTI-SELECT DISPLAY CARD */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">PRODUCT IMAGE GALLERY</label>
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-[#005f60] transition-colors relative bg-slate-50 cursor-pointer">
                            {/* 🚀 FIXED 3: Input value tag strictly removed to ensure fake-path blocks get cleared */}
                            <input 
                                type="file" 
                                multiple 
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                            />
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-3xl text-slate-400 mb-2">📁</span>
                                <p className="font-bold text-slate-600">Click to browse multiple product photos</p>
                                <p className="text-xs text-slate-400 mt-1">Hold 'Ctrl' or 'Shift' key to select more than 1 image</p>
                                
                                {/* DYNAMIC PREVIEW ENGINE */}
                                {images.length > 0 && (
                                    <div className="grid grid-cols-5 gap-2 mt-4 w-full">
                                        {Array.from(images).map((img, index) => (
                                            <img 
                                                key={index} 
                                                src={URL.createObjectURL(img)} 
                                                alt={`Preview ${index}`} 
                                                className="w-16 h-16 object-cover rounded-lg border border-slate-200 shadow-sm"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Main Description */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">DESCRIPTION / BENEFITS</label>
                        <textarea 
                            rows="3"
                            value={description}
                            placeholder="Write short product descriptions..." 
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-slate-200 p-3 rounded-lg focus:outline-none focus:border-[#005f60]"
                        />
                    </div>

                    {/* Row 4: Advanced Ayurvedic Specs (OPTIONAL FIELDS) */}
                    <div className="space-y-4 bg-amber-50/40 p-4 rounded-xl border border-amber-100">
                        <h3 className="text-xs font-bold tracking-wider text-amber-800 uppercase">Ayurveda Product Attributes</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <input 
                                    type="text"
                                    value={dosage}
                                    placeholder="Dosage (Once/twice daily)"
                                    onChange={(e) => setDosage(e.target.value)}
                                    className="w-full border border-slate-200 p-2.5 bg-white text-sm rounded-lg focus:outline-none"
                                />
                            </div>
                            <div>
                                <input 
                                    type="text"
                                    value={usage}
                                    placeholder="Usage (Followed by water)"
                                    onChange={(e) => setUsage(e.target.value)}
                                    className="w-full border border-slate-200 p-2.5 bg-white text-sm rounded-lg focus:outline-none"
                                />
                            </div>
                            <div>
                                <input 
                                    type="text"
                                    value={indications}
                                    placeholder="Indications (e.g., Delays aging)"
                                    onChange={(e) => setIndications(e.target.value)}
                                    className="w-full border border-slate-200 p-2.5 bg-white text-sm rounded-lg focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-[#005f60] hover:bg-[#004d4e] text-white py-3 rounded-lg font-bold transition-colors shadow-md mt-6"
                    >
                        Save Advanced Product Structure
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddProductMulti;