import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ItemsList from './pages/ItemsList';
import CreateItem from './pages/CreateItem';
import ItemDetails from './pages/ItemDetails';
import Login from './pages/Login';
import Register from './pages/Register';
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
          <Route path="/items/:id" element={<ItemDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Other routes will be added in future stages */}
        </Routes>
      </main>
    </Router>
      </FiltersProvider>
    </AuthProvider>
  );
}

export default App;
