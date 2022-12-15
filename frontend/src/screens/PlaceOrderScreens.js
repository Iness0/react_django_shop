import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Form, Button, Col, ListGroup, Image, Card} from "react-bootstrap";
import FormContainer from "../component/FormContainer";
import {useNavigate, Link, } from "react-router-dom";
import CheckoutSteps from '../component/CheckoutComponent'
import { savePaymentMethod} from '../actions/cartActions'
import Message from "../component/Message";

function PlaceOrderScreen() {

    const cart = useSelector(state => state.cart)

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
        </div>
    )
}




export default PlaceOrderScreen()