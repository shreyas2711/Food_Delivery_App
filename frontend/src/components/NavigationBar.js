import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSignOutAction } from '../redux/actions/authAction';
import { useEffect } from 'react';
import SectionTwo from './SectionTwo';
import { useAuth } from "../AuthProvider";

function NavigationBar(){

  const {isAuthenticated} =   useSelector((state) => state.authtentication);
  const {token} =   useSelector((state) => state.authtentication);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useAuth();



  return (
    <>
 <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/myorders">My Orders</Nav.Link>
            {/* <Nav.Link href="#features">Login</Nav.Link> */}
          </Nav>
        <button onClick={() => auth.logOut()} >Log out</button>
        </Container>
      </Navbar>
      <SectionTwo/>
  </>
    );
}
export default NavigationBar;