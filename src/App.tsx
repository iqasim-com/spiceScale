import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      
      <footer className="bg-gray-800 text-gray-400 py-6 text-center text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p>SpiceScale - The perfect way to scale Pakistani & Indian recipes for any gathering</p>
          <p className="mt-2">© {new Date().getFullYear()} SpiceScale. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;