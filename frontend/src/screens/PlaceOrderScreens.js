import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Form, Button, Col, ListGroup, Image, Card, Row} from "react-bootstrap";
import FormContainer from "../component/FormContainer";
import {useNavigate, Link } from "react-router-dom";
import CheckoutSteps from '../component/CheckoutComponent'
import { savePaymentMethod } from '../actions/cartActions'
import Message from "../component/Message";
import product from "../component/Product";

function PlaceOrderScreen() {

    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = ((0.17) * cart.itemsPrice).toFixed(2)
    cart.totalPrice = (Number(cart.shippingPrice) + Number(cart.taxPrice) + Number(cart.itemsPrice)).toFixed(2)

    const placeOrder = () => {
        console.log("Place Order")
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant={'flush'}>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                {'  '}
                                {cart.shippingAddress.postalCode},
                                {'  '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Shipping: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message variant={'info'}>
                                Your cart is empty
                            </Message> : (
                                <ListGroup variant={'flush'}>
                                    {cart.cartItems.map((item, index) => (
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
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={4}>
                                        Shipping:
                                    </Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={4}>
                                        Tax:
                                    </Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={4}>
                                        Total:
                                    </Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    class="btn-block"
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}>
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>

                    </Card>

                </Col>
            </Row>
        </div>
    )
}




export default PlaceOrderScreen