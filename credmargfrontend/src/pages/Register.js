import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap"
import Base from "../components/Base"
import { useState } from "react"
import { toast } from "react-toastify"
import { registerAdmin } from "../services/admin.service"
import { NavLink } from "react-router-dom"

const Register = () => {


    let [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',

    })

    const [errorData, setErrorData] = useState({
        isError: false,
        errorData: null
    })


    const [loading, setLoading] = useState(false)

    //handle change
    const handleChange = (event, property) => {
        setData({
            ...data,
            [property]: event.target.value
        })
    }


    //clear data
    const clearData = () => {
        setData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        })

        setErrorData({
            errorData: null,
            isError: false
        })
    }



    //do signup function
    const submitForm = (event) => {
        event.preventDefault();
        console.log(data)

        //validate client side 
        if (data.name === undefined || data.name.trim() === '') {
            toast.error("Name is required !!")
            return
        }

        if (data.email === undefined || data.email.trim() === '') {
            toast.error("Email is required !!")
            return
        }

        //basics...

        if (data.password === undefined || data.password.trim() === '') {
            toast.error("Password is required !!")
            return
        }

        if (data.confirmPassword === undefined || data.confirmPassword.trim() === '') {
            toast.error("Confirm Password is required !!")
            return
        }

        if (data.password !== data.confirmPassword) {
            toast.error("Password and Confirm password not matched !!")
            return
        }

        //all right:
        //call api
        setLoading(true)
        registerAdmin(data)
            .then(userData => {
                //success handler
                console.log(userData)
                toast.success("User created successfully !!");
                clearData()

            })
            .catch(error => {
                //error handler
                console.log(error)
                setErrorData({
                    isError: true,
                    errorData: error
                })
                toast.error("Duplicate Email ! Try again")
            })
            .finally(() => {
                setLoading(false)
            })

    }

    const registerForm = () => {
        return (


            <Container >
                <Row>
                    <Col sm={{ span: 8, offset: 2 }} >

                        <Card className="my-3 border-0 shadow p-4" style={
                            {
                                position: 'relative',
                                top: -40
                            }
                        } >
                            <Card.Body>

                                <Container className="text-center mb-3">
                                    <img src ="/assests/logo.png" alt="Store logo" width={60} height={60} />
                                </Container>

                                <h3 style={{color:"red"}} className="mb-4 text-center text-uppercase">Signup Here</h3>

                                <Form noValidate onSubmit={submitForm}>

                                    {/* name field  */}

                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label>Enter your name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter name"
                                            onChange={(event) => handleChange(event, 'name')}
                                            value={data.name}
                                            isInvalid={errorData.errorData?.response?.data?.name}


                                        />
                                        <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.name}</Form.Control.Feedback>


                                    </Form.Group>



                                    {/* email field      */}
                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label>Enter your email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            onChange={(event) => handleChange(event, 'email')}
                                            value={data.email}
                                            isInvalid={errorData.errorData?.response?.data?.email}
                                        />

                                        <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.email}</Form.Control.Feedback>



                                    </Form.Group>

                                    {/* password field  */}

                                    <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Label>Enter new password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter password"
                                            onChange={(event) => handleChange(event, 'password')}
                                            value={data.password}
                                            isInvalid={errorData.errorData?.response?.data?.password}

                                        />

                                        <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.password}</Form.Control.Feedback>


                                    </Form.Group>

                                    {/* confim password  */}


                                    <Form.Group className="mb-3" controlId="formConfigPassword">
                                        <Form.Label>Re enter  password</Form.Label>
                                        <Form.Control type="password" placeholder="Re Enter password"
                                            onChange={(event) => handleChange(event, 'confirmPassword')}
                                            value={data.confirmPassword}
                                        />

                                    </Form.Group>


                                    <Container>
                                        <p className="text-center">Already register !   <NavLink to="/login" >Login</NavLink></p>
                                    </Container>

                                    <Container className="text-center">
                                        <Button
                                            type="submit"
                                            className="text-uppercase"
                                            variant="success"
                                            disabled={loading}
                                        >


                                            <Spinner
                                                animation="border"
                                                size="sm"
                                                className="me-2"
                                                hidden={!loading}
                                            />
                                            <span hidden={!loading}>Wait...</span>
                                            <span hidden={loading}>Register</span>

                                        </Button>
                                        <Button className="ms-2 text-uppercase" variant="danger" onClick={clearData}>Reset</Button>

                                    </Container>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

    return (<Base title={null}
        description="Fill the form correctly to register with us.">
        {registerForm()}
    </Base>
    )
}

export default Register