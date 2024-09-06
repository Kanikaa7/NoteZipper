import React, { useEffect, useState } from 'react';
import MainScreen from '../../Component/MainScreen';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMsg from '../../Component/ErrorMsg';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../actions/userActions';
import Loading from '../../Component/Loading';
import './ProfileScreen.css';

const ProfileScreen = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pic, setPic] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picMsg, setPicMsg] = useState();

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {loading, error, success} = userUpdate;

    useEffect(() => {
        if(!userInfo){
            navigate("/");
        }else{
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPic(userInfo.pic);
        }
    }, [navigate, userInfo]);

    const postDetails = (pics) => {
        if(!pics) {
          return setPicMsg("Please select an Image");
        }
        setPicMsg(null);
    
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
          return setPicMsg("Please select an image");
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if(password === confirmPassword)
        dispatch(updateProfile({name, email, password, pic}));
    }

  return (
    <MainScreen title="EDIT PROFILE">
        <div>
            <Row className='profileContainer'>
                <Col md={6}>
                    <Form onSubmit={submitHandler}>
                        {loading && <Loading />}
                        {success && <ErrorMsg variant='success'>Updated Successfully</ErrorMsg>}
                        {error && <ErrorMsg variant='danger'>{error}</ErrorMsg>}
                        <Form.Group className='mb-3' controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='text' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='confirmPassword'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                        </Form.Group>{" "}
                        {picMsg && (
                            <ErrorMsg variant='danger'>{picMsg}</ErrorMsg>
                        )}
                        <Form.Group className='mb-3' controlId='pic'>
                            <Form.Label>Change Profile Picture</Form.Label>
                            <Form.Control onChange={(e) => postDetails(e.target.files[0])} type="file" label="Upload Profile Picture" custom />
                        </Form.Group>
                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                </Col>
                <Col style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <img src={pic} alt={name} className='profilepic'/>
                </Col>
            </Row>
        </div>
    </MainScreen>
  )
}

export default ProfileScreen