import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { MapPin, Calendar, Tag, ArrowLeft, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';

export default function ItemDetails() {
  const { id } = useParams();
  const { data: item, loading, error } = useFetch(`/api/items/${id}`);

  if (loading) {
    return (
      <div className="pt-32 pb-16 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-primary">
        <Loader2 size={48} className="animate-spin mb-4" />
        <p className="font-data font-bold uppercase tracking-widest text-sm animate-pulse">Decrypting Metadata...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="pt-32 pb-16 px-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center">
        <div className="text-red-500/80 mb-4 bg-red-500/10 p-6 rounded-full">
          <AlertCircle size={64} />
        </div>
        <h3 className="text-3xl font-bold font-sans mb-4">Asset Not Found</h3>
        <p className="text-text-dark/60 font-data mb-8 max-w-md mx-auto">{error || 'This record may have been expunged from the network.'}</p>
        <Link to="/items" className="btn-magnetic bg-text-dark text-background px-8 py-3 rounded-full font-bold">
          Return to Database
        </Link>
      </div>
    );
  }

  const isLost = item.type === 'lost';

  return (
    <div className="pt-32 pb-24 px-8 md:px-16 max-w-5xl mx-auto min-h-screen">
      <Link to="/items" className="inline-flex items-center gap-2 text-primary/60 hover:text-primary font-bold mb-8 transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Database
      </Link>

      <div className="bg-background border border-primary/10 radius-sys shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Image Panel */}
        <div className="w-full md:w-2/5 bg-primary/5 flex flex-col relative isolate min-h-[300px] md:min-h-full">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.title} 
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/800x1200/2E4036/F2F0E9?text=${encodeURIComponent(item.title)}`;
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <ShieldCheck size={120} />
            </div>
          )}
          <div className="absolute top-6 left-6 flex gap-2">
            <span className={`px-4 py-1.5 text-sm font-bold rounded-full uppercase tracking-wider shadow-lg ${isLost ? 'bg-accent text-background' : 'bg-primary text-background'}`}>
              {item.type}
            </span>
            <span className={`px-4 py-1.5 text-sm font-bold font-data rounded-full shadow-lg ${item.status === 'resolved' ? 'bg-green-500 text-background' : 'bg-background text-text-dark'}`}>
              {item.status}
            </span>
          </div>
        </div>

        {/* Right Side: Data Panel */}
        <div className="w-full md:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col">
          <h1 className="text-4xl md:text-5xl font-bold font-sans mb-6">{item.title}</h1>
          
          <div className="flex flex-wrap gap-6 mb-10 border-y border-primary/10 py-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/5 rounded-xl text-primary">
                <Tag size={20} />
              </div>
              <div>
                <p className="text-xs font-data text-primary/60 uppercase tracking-widest">Category</p>
                <p className="font-bold">{item.category}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/5 rounded-xl text-primary">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs font-data text-primary/60 uppercase tracking-widest">Location</p>
                <p className="font-bold">{item.location}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/5 rounded-xl text-primary">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs font-data text-primary/60 uppercase tracking-widest">Date Logged</p>
                <p className="font-bold font-data">{new Date(item.date || item.dateLostFound).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="mb-12 flex-grow">
            <h3 className="text-sm font-bold mb-4 font-data text-primary/60 uppercase tracking-widest">Item Description</h3>
            <p className="text-lg leading-relaxed text-text-dark/80">{item.description}</p>
          </div>

          <div className="pt-8 border-t border-primary/10">
            <button className="w-full btn-magnetic bg-accent text-background py-5 rounded-full font-bold text-xl shadow-xl shadow-accent/20 flex items-center justify-center gap-3">
              {isLost ? 'I Found This Item' : 'This Is My Item'}
            </button>
            <p className="text-center text-xs font-data text-text-dark/40 mt-4">Initiating contact requires a verified account</p>
          </div>
        </div>
      </div>
    </div>
  );
}
