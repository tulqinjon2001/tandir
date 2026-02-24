import './App.css';
import Header from './sections/Header';
import Hero from './sections/Hero';
import Tandirs from './sections/Tandirs';
import Process1000C from './sections/Process1000C';
import Komplektatsiya from './sections/Komplektatsiya';
import Benefits from './sections/Benefits';
import TandirGallery from './sections/TandirGallery';
import Testimonials from './sections/Testimonials';
import OrderForm from './sections/OrderForm';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-tandir-dark text-tandir-text overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Tandirs />
        <Process1000C />
        <Komplektatsiya />
        <Benefits />
        <TandirGallery />
        <Testimonials />
        <OrderForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
