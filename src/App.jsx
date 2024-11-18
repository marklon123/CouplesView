import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import GetStarted from './pages/GetStarted';
import Movies from './pages/Movies';
import Footer from './components/Footer/Footer';
import './index.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App
