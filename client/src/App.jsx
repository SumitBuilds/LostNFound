import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ItemsList from './pages/ItemsList';
import CreateItem from './pages/CreateItem';
import { AuthProvider } from './context/AuthContext';
import { FiltersProvider } from './context/FiltersContext';

function App() {
  return (
    <AuthProvider>
      <FiltersProvider>
        <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<ItemsList />} />
          <Route path="/items/new" element={<CreateItem />} />
          {/* Other routes will be added in future stages */}
        </Routes>
      </main>
    </Router>
      </FiltersProvider>
    </AuthProvider>
  );
}

export default App;
