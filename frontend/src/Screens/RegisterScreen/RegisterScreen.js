import React, { useEffect, useState } from 'react';
import MainScreen from "../../Component/MainScreen.js";
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMsg from '../../Component/ErrorMsg.js';
import Loading from '../../Component/Loading.js';
import {useDispatch, useSelector} from 'react-redux';
import { register } from '../../actions/userActions.js';

const RegisterScreen = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
  const [password, setPassword] = useState("");
  const [confirmpassword, setComfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const {loading, error, userInfo} = userRegister;

  useEffect(() => {
    if(userInfo){
      navigate("/MyNotes");
    }
  }, [navigate,userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if(password!==confirmpassword){
      setMessage('Passwords do not match')
    }else {
      dispatch(register(name,email,password,pic));
    }
  };

  const postDetails = (pics) => {
    if(!pics) {
      return setPicMessage("Please select an Image");
    }
    setPicMessage(null);

    if(pics.type === 'image/jpeg' || pics.type==='image/png' || pics.type==='image/jpg'){
      const data = new FormData();
      data.append('file',pics)
      data.append('upload_preset', 'NoteZipper')
      data.append('cloud_name', 'dpznvunon')
      fetch("https://api.cloudinary.com/v1_1/dpznvunon/image/upload", {
        method: "post",
        body: data,
      }).then((res) => res.json()).then((data) => {
        console.log(data);
        setPic(data.url.toString());
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      return setPicMessage("Please select an image");
    }
  };

  return (
    <MainScreen title="REGISTER">
      <div className='loginContainer'>
        {error && <ErrorMsg variant='danger'>{error}</ErrorMsg>}
        {message && <ErrorMsg variant="danger">{message}</ErrorMsg>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>

        <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group  className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" value={confirmpassword} onChange={(e) => setComfirmPassword(e.target.value)} />
          </Form.Group>

          {picMessage && (
            <ErrorMsg variant='danger'>{picMessage}</ErrorMsg>
          )}

          <Form.Group className="mb-3" controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control onChange={(e) => postDetails(e.target.files[0])} type="file" label="Upload Profile Picture" custom />
          </Form.Group>

          <Button className="mb-3" variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            Have an account ? <Link to='/login'>Login Here</Link></Col>
        </Row>
      </div>
    </MainScreen>
  )
}

export default RegisterScreen;