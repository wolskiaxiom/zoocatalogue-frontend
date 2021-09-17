import {Badge, Button, Container, Dropdown, FormControl, Nav, Navbar} from "react-bootstrap";
import {FaOpencart} from "react-icons/fa";
import {Link} from "react-router-dom";
import {CartState} from "../context/Context";
import {AiFillDelete} from "react-icons/all";

const Header = () => {

    const {
        state: { cart },
        dispatch
    } = CartState()

    return (
        <Navbar bg="dark" variant="dark" style={{height: 80}}>
            <Container>
                <Navbar.Brand>
                    <Link to={"/"}>Oferta katalogowa</Link>
                </Navbar.Brand>
                <Nav>
                    <Dropdown alignRight>
                        <Dropdown.Toggle variant={"success"}>
                            <FaOpencart color={"white"} fontSize={"30px"}/>
                            <Badge>
                                {cart.length}
                            </Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{minWidth: 370}}>
                            {cart.length > 0 ? (
                                <>
                                    {
                                        cart.map((prod) => (
                                            <span className={"cartItem"} key={prod.id}>
                                                <img
                                                    src={prod.image_url}
                                                    className={"cartItemImg"}
                                                    alt={prod.name}
                                                />

                                                <div className={"cartItemDetail"}>
                                                    <span>{prod.name}</span>
                                                    <span>{prod.price.toString().split(".")[0]}</span>
                                                </div>
                                                <AiFillDelete
                                                    fontSize={"20px"}
                                                    style={{ cursor: "pointer"}}
                                                    onClick={ ()=>
                                                    dispatch({
                                                        type: "REMOVE_FROM_CART",
                                                        payload: prod,
                                                    })}
                                                />
                                            </span>
                                        ))
                                    }
                                    <Link to={"/cart"}>
                                        <Button style={{ width: "95%", margin: "0 10px"}}>
                                            Do koszyka!
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <span style={{padding:10}}> Żaden zwierzak jeszcze nie jest przygarnięty... </span>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header