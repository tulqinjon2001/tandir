import './App.css';
import { lazy, Suspense } from 'react';
import Header from './sections/Header';
import Hero from './sections/Hero';

const Tandirs = lazy(() => import('./sections/Tandirs'));
const Process1000C = lazy(() => import('./sections/Process1000C'));
const Komplektatsiya = lazy(() => import('./sections/Komplektatsiya'));
const Benefits = lazy(() => import('./sections/Benefits'));
const TandirGallery = lazy(() => import('./sections/TandirGallery'));
const Testimonials = lazy(() => import('./sections/Testimonials'));
const OrderForm = lazy(() => import('./sections/OrderForm'));
const Footer = lazy(() => import('./sections/Footer'));

function App() {
  return (
    <div className="min-h-screen bg-tandir-dark text-tandir-text overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Tandirs />
          <Process1000C />
          <Komplektatsiya />
          <Benefits />
          <TandirGallery />
          <Testimonials />
          <OrderForm />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
