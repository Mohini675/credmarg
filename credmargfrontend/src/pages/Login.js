import Base from "../components/Base";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { adminLogin } from "../services/admin.service";
import AdminContext from "../context/AdminContext";
const Login = () => {
  const redirect = useNavigate();
  const adminContext = useContext(AdminContext);
  const [loading, setLoading] = useState(false);

  let [data, setData] = useState({
    email: "",
    password: "",
  });
  let [error, setError] = useState({
    errorData: null,
    isError: false,
  });

  const handleChange = (event, property) => {
    setData({
      ...data,
      [property]: event.target.value,
    });
  };

  const handleReset = () => {
    setData({
      email: "",
      password: "",
    });

    setError({
      errorData: null,
      isError: false,
    });
  };

  //submit form

  const submitForm = (event) => {
    event.preventDefault();

    console.log(data);

    //client side validations

    if (data.email === undefined || data.email.trim() === "") {
      toast.error("Email required !!");
      return;
    }

    if (data.password === undefined || data.password.trim() === "") {
      toast.error("Password required !!");
      return;
    }

    //login api

    adminLogin(data)
      .then((admindata) => {
        console.log("admin", admindata);
        toast.success("Logged In");
        setError({
          errorData: null,
          isError: false,
        });

        adminContext.setIsLogin(true);
        adminContext.setAdminData(admindata);
        redirect("/dashboard");

      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message)
        setError({
          errorData: error,
          isError: true,
        });
      });
  };

  const loginForm = () => {
    return (
      <Container>
        <Row>
          <Col
            md={{
              span: 8,
              offset: 2,
            }}
          >
            <Card
              className="my-3 border-0 shadow"
              style={{
                position: "relative",
                top: -40,
              }}
            >
              <Card.Body>
                {/* {JSON.stringify(adminContext)} */}
                <Container className="text-center mb-3">
                  <img
                    src="/assests/logo.png"
                    alt=" logo"
                    width={60}
                    height={60}
                  />
                </Container>
                <h3 style={{color:"red"}} className="card-title text-uppercase text-center text-uppercase">
                  Admin Login
                </h3>

                <Form noValidate onSubmit={submitForm}>
                  {/* email login field */}

                  <Form.Group className="mb-3">
                    <Form.Label>Enter Email </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter here"
                      onChange={(event) => handleChange(event, "email")}
                      value={data.email}
                    />
                  </Form.Group>

                  {/* password login field */}

                  <Form.Group className="mb-3">
                    <Form.Label>Enter Password </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter here"
                      onChange={(event) => handleChange(event, "password")}
                      value={data.password}
                    />
                  </Form.Group>

                  <Container className="text-center">
                    {/* <p>Forget Password ! <a href="/forget">Click here</a></p> */}
                    <p>
                      If not registered !{" "}
                      <NavLink to="/register">Click here</NavLink>
                    </p>
                  </Container>

                  <Container className="text-center">
                    <Button type="submit" className="" variant="success">
                      <Spinner
                                                animation="border"
                                                size="sm"
                                                hidden={!loading}
                                                className={'me-2'}

                                            />
                                            <span hidden={!loading}>Please wait...</span>

                      <span> Login</span>
                    </Button>

                    <Button
                      onClick={handleReset}
                      className="ms-2"
                      variant="danger"
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Base title={null} description={null}>
      {loginForm()}
    </Base>
  );
};

export default Login;
