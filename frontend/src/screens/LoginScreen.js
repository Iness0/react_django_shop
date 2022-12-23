import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../component/Message";
import Loader from "../component/Loader";
import { login} from "../actions/userActions";
import FormContainer from "../component/FormContainer";


function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirection = searchParams.get('redirect')

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate({
                pathname: `/${redirection}`
            })
        }
    }, [userInfo, redirection, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }


    return (
        <FormContainer>
            <h1>Sign in</h1>
            { error && <Message varian={'danger'}>{error}</Message> }
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type={'email'}
                        placeholder={'Enter email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type={'password'}
                        placeholder={'Enter password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button type={'submit'} variant={'primary'} className={'mt-3'}>Sign in</Button>
            </Form>
            <Row className={'py-3'}>
                <Col>
                    New Customer? <Link to={redirection ? `/register?redirect=${redirection}` : '/register'}>
                    Register</Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default LoginScreen