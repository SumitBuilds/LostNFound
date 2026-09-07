import React, { useState } from 'react';
import ItemCard from '../components/ItemCard';
import useFetch from '../hooks/useFetch';
import { Search, Filter, Loader2, AlertCircle } from 'lucide-react';

export default function ItemsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const { data: items, loading, error } = useFetch('/api/items');

  const filteredItems = (items || []).filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="pt-24 pb-16 px-8 md:px-16 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold font-sans mb-4">Database</h1>
          <p className="text-text-dark/70 font-outfit max-w-xl">Search the network for lost and found items. Metadata is logged securely.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={20} />
            <input 
              type="text" 
              placeholder="Search database..." 
              className="pl-12 pr-4 py-3 bg-background border border-primary/20 radius-sys w-full sm:w-64 focus:outline-none focus:border-accent transition-colors font-data text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={20} />
            <select 
              className="pl-12 pr-10 py-3 bg-background border border-primary/20 radius-sys w-full sm:w-auto focus:outline-none focus:border-accent transition-colors font-sans font-medium appearance-none"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="lost">Lost Only</option>
              <option value="found">Found Only</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-32 flex flex-col items-center justify-center text-primary">
          <Loader2 size={48} className="animate-spin mb-4" />
          <p className="font-data font-bold uppercase tracking-widest text-sm animate-pulse">Syncing Database...</p>
        </div>
      ) : error ? (
        <div className="py-20 text-center flex flex-col items-center">
          <div className="text-red-500/80 mb-4 bg-red-500/10 p-4 rounded-full">
            <AlertCircle size={48} />
          </div>
          <h3 className="text-2xl font-bold mb-2">Connection Error</h3>
          <p className="text-text-dark/60 font-data max-w-md mx-auto">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center flex flex-col items-center">
              <div className="text-primary/20 mb-4">
                <Search size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-2">No matching records</h3>
              <p className="text-text-dark/60 font-data">Try adjusting your search parameters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
