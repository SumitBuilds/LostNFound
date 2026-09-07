import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle2 } from 'lucide-react';

export default function CreateItem() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    type: 'lost',
    title: '',
    description: '',
    category: '',
    location: '',
    dateLostFound: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for Stage 1 dummy data
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/items');
      }, 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="pt-32 pb-16 px-8 flex items-center justify-center min-h-screen">
        <div className="bg-background border border-primary/10 radius-sys p-12 text-center shadow-2xl max-w-md w-full">
          <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold font-sans mb-4">Report Logged</h2>
          <p className="text-text-dark/70 font-data mb-8">Asset tracked successfully in the network.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-8 md:px-16 max-w-3xl mx-auto min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-sans mb-4">Intake Form</h1>
        <p className="text-text-dark/70 font-outfit">Log a missing or found asset. Precision metadata increases recovery probability.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-background border border-primary/10 radius-sys p-8 md:p-12 shadow-xl">
        <div className="flex gap-4 mb-8">
          <label className={`flex-1 text-center py-4 rounded-xl cursor-pointer font-bold transition-colors ${formData.type === 'lost' ? 'bg-accent text-background' : 'bg-primary/5 text-primary hover:bg-primary/10'}`}>
            <input type="radio" name="type" value="lost" checked={formData.type === 'lost'} onChange={handleChange} className="hidden" />
            I Lost Something
          </label>
          <label className={`flex-1 text-center py-4 rounded-xl cursor-pointer font-bold transition-colors ${formData.type === 'found' ? 'bg-primary text-background' : 'bg-primary/5 text-primary hover:bg-primary/10'}`}>
            <input type="radio" name="type" value="found" checked={formData.type === 'found'} onChange={handleChange} className="hidden" />
            I Found Something
          </label>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 font-data text-primary/80 uppercase tracking-widest">Asset Title</label>
            <input 
              required
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Blue Hydroflask" 
              className="w-full bg-transparent border-b-2 border-primary/20 py-3 focus:outline-none focus:border-accent text-lg font-sans transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 font-data text-primary/80 uppercase tracking-widest">Description</label>
            <textarea 
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Unique identifiers, contents, etc..." 
              rows="3"
              className="w-full bg-primary/5 border border-transparent radius-sys p-4 focus:outline-none focus:border-accent focus:bg-background transition-colors resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 font-data text-primary/80 uppercase tracking-widest">Category</label>
              <select 
                required
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-primary/5 border border-transparent radius-sys p-4 focus:outline-none focus:border-accent focus:bg-background transition-colors appearance-none font-sans"
              >
                <option value="" disabled>Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Water Bottle">Water Bottle</option>
                <option value="Books">Books</option>
                <option value="Keys">Keys</option>
                <option value="Clothing">Clothing</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold mb-2 font-data text-primary/80 uppercase tracking-widest">Date</label>
              <input 
                required
                type="date" 
                name="dateLostFound"
                value={formData.dateLostFound}
                onChange={handleChange}
                className="w-full bg-primary/5 border border-transparent radius-sys p-4 focus:outline-none focus:border-accent focus:bg-background transition-colors font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 font-data text-primary/80 uppercase tracking-widest">Location</label>
            <input 
              required
              type="text" 
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Main Library, 2nd Floor" 
              className="w-full bg-transparent border-b-2 border-primary/20 py-3 focus:outline-none focus:border-accent text-lg font-sans transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 font-data text-primary/80 uppercase tracking-widest">Upload Image</label>
            <div className="w-full border-2 border-dashed border-primary/20 radius-sys p-8 text-center cursor-pointer hover:border-accent transition-colors hover:bg-primary/5 flex flex-col items-center justify-center group">
              <Upload size={32} className="text-primary/40 mb-4 group-hover:text-accent transition-colors" />
              <p className="font-bold text-sm">Click to upload or drag and drop</p>
              <p className="text-xs text-text-dark/50 mt-1 font-data">PNG, JPG up to 5MB (Stage 1 dummy only)</p>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full mt-12 btn-magnetic bg-text-dark text-background py-5 rounded-full font-bold text-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isSubmitting ? 'Logging to Database...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
}
