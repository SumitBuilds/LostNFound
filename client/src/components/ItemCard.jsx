import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Tag } from 'lucide-react';

export default function ItemCard({ item }) {
  const isLost = item.type === 'lost';
  
  return (
    <div className="bg-background border border-primary/10 radius-sys p-6 shadow-sm hover:shadow-md transition-shadow hover-lift flex flex-col h-full group relative isolate overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none"></div>

      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${isLost ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'}`}>
          {item.type}
        </span>
        <span className={`text-xs font-data px-2 py-1 rounded-full ${item.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
          {item.status}
        </span>
      </div>
      
      {item.image && (
        <div className="w-full h-48 mb-4 rounded-3xl overflow-hidden bg-primary/5">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      )}

      <h3 className="text-xl font-bold font-sans text-text-dark mb-2 line-clamp-1">{item.title}</h3>
      <p className="text-sm text-text-dark/70 mb-6 line-clamp-2 flex-grow">{item.description}</p>
      
      <div className="flex flex-col gap-2 mt-auto">
        <div className="flex items-center gap-2 text-xs text-text-dark/60 font-medium">
          <Tag size={14} className="text-primary/50" />
          <span>{item.category}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-dark/60 font-medium">
          <MapPin size={14} className="text-primary/50" />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-dark/60 font-medium">
          <Calendar size={14} className="text-primary/50" />
          <span className="font-data">{new Date(item.dateLostFound).toLocaleDateString()}</span>
        </div>
      </div>
      
      <Link to={`/items/${item._id || item.id}`} className="mt-6 w-full btn-magnetic border border-primary/20 text-primary py-2.5 rounded-full text-center font-medium hover:bg-primary hover:text-background transition-colors block">
        View Details
      </Link>
    </div>
  );
}
