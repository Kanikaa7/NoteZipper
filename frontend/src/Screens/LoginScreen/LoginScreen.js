import { useEffect, useState } from 'react';
import MainScreen from '../../Component/MainScreen';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './LoginScreen.css'
import Loading from '../../Component/Loading';
import ErrorMsg from '../../Component/ErrorMsg';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const {loading, error, userInfo} = userLogin;

  useEffect(() => {
    if(userInfo){
      navigate("/MyNotes");
    }
  }, [navigate,userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  
  return (
    <MainScreen title='LOGIN'>
      <div className='loginContainer'>
        {error && <ErrorMsg variant='danger'>{error}</ErrorMsg>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
          New Customer ? <Link to='/register'>Register Here</Link></Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default LoginScreen;