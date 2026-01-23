import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Sections
import Hero from './components/sections/Hero';
import Fleet from './components/sections/Fleet';
import Packages from './components/sections/Packages';
import Services from './components/sections/Services';
import Testimonials from './components/sections/Testimonials';
import Booking from './components/sections/Booking';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#fffef2]">
      <Header />
      <main>
        <Hero />
        <Fleet />
        <Packages />
        <Services />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: '#fffef2',
              border: '1px solid #bcbbb4',
              color: '#333333',
            },
          }}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;