import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from "../../actions/userActions";

const Header = ({setSearch}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  }

  return (
    <Navbar expand="lg" bg='primary' variant='dark'>
      <Container>
        <Navbar.Brand>
          <Link to='/'>Note Zipper</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

            <Nav className='m-auto'>
                <Form>
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-sm-2"
                    onChange={(e) => setSearch(e.target.value)}
                    />
                </Form>
            </Nav>

          {userInfo ? <Nav>
            <Nav.Link href='/MyNotes'>
              My Notes
            </Nav.Link>
            <NavDropdown title={userInfo?.name} id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={logoutHandler}>
                LogOut
              </NavDropdown.Item>
            </NavDropdown>
            
            </Nav>:
            <Nav>
              <Nav.Link href='/login'>
                Login
              </Nav.Link>
            </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header