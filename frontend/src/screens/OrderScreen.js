import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Col, ListGroup, Image, Card, Row} from "react-bootstrap";
import {useNavigate, Link, useParams} from "react-router-dom";
import Message from "../component/Message";
import Loader from "../component/Loader";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import {ORDER_PAY_RESET} from "../constants/orderConstants";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function OrderScreen() {
    const {id} = useParams();
    const orderId = id;
    const orderDetails = useSelector(state => state.orderDetails);
    const {order, error, loading} = orderDetails

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay, success:successPay} = orderPay

    const dispatch = useDispatch()
    const [sdkReady, setSdkReady] = useState(false)





    //ASO_ewB25cMHAIRpHV2GfT7NULbgHlj_0gk80Aspcw4_BAtkrG9H4KMivEL3NwO8X24T6UlboQeAxd2V
    useEffect(() => {
        if(!order || successPay || order._id !== Number(orderId)){
            dispatch({type: ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId))
        } else {
            setSdkReady(true);
        }}, [order, orderId, userInfo, dispatch, successPay ])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }


    return loading ? (
        <Loader/>
    ) : error ? (
        <Message variant={'danger'}>{error}</Message>
    ) : (
        <div>
            <h1>Order: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant={'flush'}>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong>{order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city},
                                {'  '}
                                {order.shippingAddress.postalCode},
                                {'  '}
                                {order.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        {order.isDelivered ? (
                            <Message variant={'success'}>Delivered on {order.deliveredAt}</Message>
                        ) : (
                             <Message variant={'warning'}>Not Delivered</Message>
                         )}
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Shipping: </strong>
                                {order.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        {order.isPaid ? (
                            <Message variant={'success'}>Paid on {order.paidAt}</Message>
                        ) : (
                             <Message variant={'warning'}>Not paid</Message>
                         )}

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (<Message variant={'info'}>
                                Order is empty
                            </Message>) : (
                                <ListGroup variant={'flush'}>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col md={2}>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={4}>
                                        Item:
                                    </Col>
                                    <Col>${order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={4}>
                                        Shipping:
                                    </Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={4}>
                                        Tax:
                                    </Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={4}>
                                        Total:
                                    </Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                                {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                    {!sdkReady ? (
                        <Loader/>
                    ) : (
                         <PayPalScriptProvider options={{
                             "client-id": "ASO_ewB25cMHAIRpHV2GfT7NULbgHlj_0gk80Aspcw4_BAtkrG9H4KMivEL3NwO8X24T6UlboQeAxd2V"
                         }}>
                             <PayPalButtons
                                 style={{layout: "vertical"}}
                                 createOrder={(data, actions) => {
                                     return actions.order
                                         .create({
                                             purchase_units: [
                                                 {
                                                     amount: {
                                                         currency_code: "USD",
                                                         value: order.totalPrice,
                                                     },
                                                 },
                                             ],
                                         })
                                         .then((orderId) => {
                                             // Your code here after create the order
                                             return orderId;
                                         });
                                 }}
                                 onApprove={successPaymentHandler}

                             />
                         </PayPalScriptProvider>
                    )}
                </ListGroup.Item>
                                )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}




export default OrderScreen