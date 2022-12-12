import {Container} from 'react-bootstrap'
import { Route, BrowserRouter, Routes  } from 'react-router-dom'
import Header from './component/Header';
import Footer from './component/Footer';
import HomeScreen from './screens/HomeScreen'
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";


function App() {
  return (
    <BrowserRouter>
        <Header />
        <main className="py-3">
            <Container>
                <Routes>
                    <Route path='/' element={<HomeScreen/>} />
                    <Route path='/product/:id' element={<ProductScreen/>} />
                    {['/cart', '/cart/:id'].map(path => (
                        <Route key={path} path={path} element={<CartScreen/>} />))}
                </Routes>
            </Container>
        </main>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
