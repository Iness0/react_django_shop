import {Container} from 'react-bootstrap'
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import Header from './component/Header';
import Footer from './component/Footer';
import HomeScreen from './screens/HomeScreen'
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen"
import ProfileScreen from "./screens/ProfileScreen"
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreens";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path='/' element={<HomeScreen/>}/>
                        <Route path='/login' element={<LoginScreen/>}/>
                        <Route path='/register' element={<RegisterScreen/>}/>
                        <Route path='/profile' element={<ProfileScreen/>}/>
                        <Route path='/shipping' element={<ShippingScreen/>}/>
                        <Route path='/payment' element={<PaymentScreen/>}/>
                        <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
                        <Route path='/order/:id' element={<OrderScreen/>}/>
                        <Route path='/product/:id' element={<ProductScreen/>}/>
                        <Route path='/admin/productlist' element={<ProductListScreen/>}/>
                        <Route path='/admin/userlist' element={<UserListScreen/>}/>
                        <Route path='/admin/user/:id/edit' element={<UserEditScreen/>}/>
                        {['/cart', '/cart/:id'].map(path => (
                            <Route key={path} path={path} element={<CartScreen/>}/>))}
                    </Routes>
                </Container>
            </main>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
