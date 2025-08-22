import Checkout from '../src/pages/Checkout'
import Thankyou from '../src/pages/Thankyou'
import Hero from '../src/components/Hero'
import Problem from '../src/components/Problem'
import Product from '../src/components/Product'
import How from '../src/components/How'
import Lifestyle from '../src/components/Lifestyle'
import Review from '../src/components/Reviews'
import FAQ from '../src/components/FAQ'
import Navbar from '../src/components/Navbar'
import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer'

function Home() {
  return (
    <div className='overflow-hidden'>
      <Hero />
      <Problem />
      <Product />
      <How />
      <Lifestyle />
      <Review />
      <FAQ />
    </div>
  );
}

function App() {
  return (
    <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/thankyou' element={<Thankyou />} />
        </Routes>
        <Footer />
    </div>
  );
}


export default App;
