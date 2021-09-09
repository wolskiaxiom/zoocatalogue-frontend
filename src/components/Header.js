import {Badge, Container, Dropdown, FormControl, Nav, Navbar} from "react-bootstrap";
import {FaOpencart} from "react-icons/fa";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" style={{height: 80}}>
            <Container>
                <Navbar.Brand>
                    <Link to={"/"}>Shopping Cart</Link>
                </Navbar.Brand>
                <Navbar.Text className={"search"}>
                    <FormControl style={{width: 500}}
                                 className={"m-auto"}
                                 placeholder={"Search an animal"}/>
                </Navbar.Text>
                <Nav>
                    <Dropdown alignRight>
                        <Dropdown.Toggle variant={"success"}>
                            <FaOpencart color={"white"} fontSize={"30px"}/>
                            <Badge>
                                {10}
                                {/*{cart.length}*/}
                            </Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{minWidth: 370}}>
                            <span style={{padding:10}}> You didn't choose any animals yet! </span>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header