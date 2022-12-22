import React, {useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../component/Product';
import Loader from "../component/Loader";
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from "../actions/productActions";
import Message from "../component/Message";
import {useSearchParams} from "react-router-dom";
import Paginate from "../component/Paginate";
import ProductCarousel from "../component/ProductCarousel";


function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages} = productList
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const pagen = searchParams.get("page")


    useEffect(() => {
        dispatch(listProducts(keyword, pagen))
    }, [dispatch, keyword, pagen])

    return (
        <div>
            {!keyword && <ProductCarousel/>}
            <h1>Latest Products</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                  <div>
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>
                      <Paginate page={page} pages={pages} keyword={keyword}/>
                  </div>
            }
        </div>
    )
}

export default HomeScreen;