import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Upload, CheckCircle2 } from 'lucide-react';

export default function CreateItem() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      type: 'lost',
      title: '',
      description: '',
      category: '',
      location: '',
      dateLostFound: ''
    }
  });

  const typeValue = watch('type');

  const onSubmit = async (data) => {
    setApiError(null);
    try {
      const payload = {
        ...data,
        date: data.dateLostFound // map to backend schema
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit report');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/items');
      }, 2000);
    } catch (err) {
      setApiError(err.message);
    }
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

      <form onSubmit={handleSubmit(onSubmit)} className="bg-background border border-primary/10 radius-sys p-8 md:p-12 shadow-xl">
        <div className="flex gap-4 mb-8">
          <label className={`flex-1 text-center py-4 rounded-xl cursor-pointer font-bold transition-colors ${typeValue === 'lost' ? 'bg-accent text-background' : 'bg-primary/5 text-primary hover:bg-primary/10'}`}>
            <input type="radio" value="lost" {...register('type')} className="hidden" />
            I Lost Something
          </label>
          <label className={`flex-1 text-center py-4 rounded-xl cursor-pointer font-bold transition-colors ${typeValue === 'found' ? 'bg-primary text-background' : 'bg-primary/5 text-primary hover:bg-primary/10'}`}>
            <input type="radio" value="found" {...register('type')} className="hidden" />
            I Found Something
          </label>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 font-data text-primary/80 uppercase tracking-widest">Asset Title</label>
            <input 
              type="text" 
              {...register('title', { required: 'Title is required' })}
              placeholder="e.g. Blue Hydroflask" 
              className={`w-full bg-transparent border-b-2 py-3 focus:outline-none text-lg font-sans transition-colors ${errors.title ? 'border-red-500 focus:border-red-500' : 'border-primary/20 focus:border-accent'}`}
            />
            {errors.title && <span className="text-red-500 text-xs font-bold mt-2 block">{errors.title.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 font-data text-primary/80 uppercase tracking-widest">Description</label>
            <textarea 
              {...register('description', { 
                required: 'Description is required',
                minLength: { value: 10, message: 'Description must be at least 10 characters' }
              })}
              placeholder="Unique identifiers, contents, etc..." 
              rows="3"
              className={`w-full bg-primary/5 border radius-sys p-4 focus:outline-none focus:bg-background transition-colors resize-none ${errors.description ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-accent'}`}
            ></textarea>
            {errors.description && <span className="text-red-500 text-xs font-bold mt-2 block">{errors.description.message}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 font-data text-primary/80 uppercase tracking-widest">Category</label>
              <select 
                {...register('category', { required: 'Category is required' })}
                className={`w-full bg-primary/5 border radius-sys p-4 focus:outline-none focus:bg-background transition-colors appearance-none font-sans ${errors.category ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-accent'}`}
              >
                <option value="" disabled>Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Water Bottle">Water Bottle</option>
                <option value="Books">Books</option>
                <option value="Keys">Keys</option>
                <option value="Clothing">Clothing</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && <span className="text-red-500 text-xs font-bold mt-2 block">{errors.category.message}</span>}
            </div>
            
            <div>
              <label className="block text-sm font-bold mb-2 font-data text-primary/80 uppercase tracking-widest">Date</label>
              <input 
                type="date" 
                {...register('dateLostFound', { required: 'Date is required' })}
                className={`w-full bg-primary/5 border radius-sys p-4 focus:outline-none focus:bg-background transition-colors font-sans ${errors.dateLostFound ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-accent'}`}
              />
              {errors.dateLostFound && <span className="text-red-500 text-xs font-bold mt-2 block">{errors.dateLostFound.message}</span>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 font-data text-primary/80 uppercase tracking-widest">Location</label>
            <input 
              type="text" 
              {...register('location', { required: 'Location is required' })}
              placeholder="e.g. Main Library, 2nd Floor" 
              className={`w-full bg-transparent border-b-2 py-3 focus:outline-none text-lg font-sans transition-colors ${errors.location ? 'border-red-500 focus:border-red-500' : 'border-primary/20 focus:border-accent'}`}
            />
            {errors.location && <span className="text-red-500 text-xs font-bold mt-2 block">{errors.location.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 font-data text-primary/80 uppercase tracking-widest">Upload Image</label>
            <div className="w-full border-2 border-dashed border-primary/20 radius-sys p-8 text-center cursor-pointer hover:border-accent transition-colors hover:bg-primary/5 flex flex-col items-center justify-center group">
              <Upload size={32} className="text-primary/40 mb-4 group-hover:text-accent transition-colors" />
              <p className="font-bold text-sm">Click to upload or drag and drop</p>
              <p className="text-xs text-text-dark/50 mt-1 font-data">PNG, JPG up to 5MB</p>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full mt-12 btn-magnetic bg-text-dark text-background py-5 rounded-full font-bold text-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isSubmitting ? 'Validating & Submitting...' : 'Submit Report'}
        </button>

        {apiError && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 radius-sys text-center">
            <p className="text-red-500 font-bold">{apiError}</p>
          </div>
        )}
      </form>
    </div>
  );
}
