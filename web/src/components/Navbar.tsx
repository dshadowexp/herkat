import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useAuth } from '../contexts/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    const navigate = useNavigate();
    const { isAuthenticated, isStylist } = useAuth();

    const handleSignout = async () => {
        try {
            await signOut(auth);
            navigate('/signin');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>  
            <Navbar fixed="top" className="bg-body-tertiary justify-content-between">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                        alt=""
                        src="/logo.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />{' '}
                        <span style={{ color: "#1570ef" }}>herkat</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
                    { 
                        isAuthenticated && 
                        <>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <NavDropdown
                                    title={"Menu"}
                                    id={`offcanvasNavbarDropdown-expand-false`}
                                >
                                    <NavDropdown.Item href={ isStylist ? "/stylist" : "/client"}>
                                        Home
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/stylist/availability">
                                        Availabilty
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleSignout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </>
                    }
                </Container>
            </Navbar>
        </>
    )
}
