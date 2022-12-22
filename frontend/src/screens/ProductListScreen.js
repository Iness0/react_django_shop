import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate, useSearchParams} from "react-router-dom";
import { Button, Table, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"
import Message from "../component/Message";
import Loader from "../component/Loader";
import {listProducts, deleteProduct, createProduct} from "../actions/productActions";
import { PRODUCT_CREATE_RESET} from "../constants/productConstants";
import Paginate from "../component/Paginate";

function ProductListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const productList = useSelector(state => state.productList)
    const {loading, error, products, pages, page} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} = userLogin

    const [searchParams, setSearchParams] = useSearchParams()
    const keyword = searchParams.get("keyword");
    const pagen = searchParams.get("page")

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})
    if (!userInfo.isAdmin) {
            navigate('/login')
        }
    if(successCreate){
        navigate(`/admin/product/${createdProduct._id}/edit`)
    } else {
        dispatch(listProducts(keyword, pagen))
    }
    }, [keyword, dispatch, navigate, userInfo, successDelete, createdProduct, pagen]);


    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you wanna delete this product?')){
        dispatch(deleteProduct(id))
    }}
    const createProductHandler = () => {
        dispatch(createProduct())
    };

    return (
        <div>
            <Row className={'align-items-center'}>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className={'text-right'}>
                    <Button className={'my-3'} onClick={createProductHandler}>
                        <i className={'fas fa-plus'}> New product</i>
                    </Button>
                </Col>
            </Row>
            { loadingDelete && <Loader/>}
            {errorDelete && <Message variant={'danger'}>{errorDelete}</Message>}

            { loadingCreate && <Loader/>}
            {errorCreate && <Message variant={'danger'}>{errorCreate}</Message>}

            {loading
             ? (<Loader/>)
             : error
               ? (<Message variant={'danger'}>{error}</Message>)
               : (
                   <div>
                   <Table striped bordered hover responsive className={'table-small'}>
                       <thead>
                       <tr>
                           <th>Id</th>
                           <th>Name</th>
                           <th>Price</th>
                           <th>Category</th>
                           <th>Brand</th>
                           <th></th>
                       </tr>
                       </thead>
                       <tbody>
                       {products.map((product) => (
                           <tr key={product._id}>
                               <td>{product._id}</td>
                               <td>{product.name}</td>
                               <td>{product.price}</td>
                               <td>{product.category}</td>
                               <td>{product.brand}</td>
                               <td>
                                   <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                       <Button variant={'light'} className={'btn-sm'}>
                                           <i className={'fas fa-edit'}></i>
                                       </Button>
                                   </LinkContainer>
                                   <Button variant={'light'} className={'btn-sm'}
                                           onClick={() => deleteHandler(product._id)}>
                                       <i className={'fas fa-trash'}></i>
                                   </Button>
                               </td>
                           </tr>
                       ))}
                       </tbody>
                   </Table>
                       <Paginate pages={pages} page={page} isAdmin={true} />
                   </div>
               )}
        </div>
    )
}

export default ProductListScreen