import React, {useState} from 'react'
import { Button, Form} from 'react-bootstrap'
import {createSearchParams, useLocation, useNavigate, useSearchParams} from "react-router-dom";


function SearchBox() {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate();
    const location = useLocation();


    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword) {
            navigate({
                pathname: '/',
                search: `?keyword=${keyword}&page=1`,
            })} else {
                navigate(location.pathname)
            }
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            className='mr-sm-2 ml-sm-5'>

            </Form.Control>
            <Button
            type='submit'
            variant='outlined-success'
            className='p-2'>
                Submit
            </Button>
        </Form>

    )
}

export default SearchBox