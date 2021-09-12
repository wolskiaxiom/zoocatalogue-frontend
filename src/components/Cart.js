import {CartState} from "../context/Context";
import {Col, ListGroup, Row, Form, Image, Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import Rating from "./Rating";
import {AiFillDelete} from "react-icons/all";

const Cart = () => {

    const { state: {cart}, dispatch } = CartState()

    const [total, setTotal] = useState()

    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc+Number(curr.price) * curr.qty, 0))
    }, [cart])

    return (
        <div className={"home"}>
            <div className={"productContainer"}>
                <ListGroup>
                    {
                        cart.map( (prod) => (
                            <ListGroup.Item key={prod.id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={prod.image_url} alt={prod.name} fluid rounded/>
                                    </Col>
                                    <Col md={2}>
                                        <span>{prod.name}</span>
                                    </Col>
                                    <Col md={2}> {prod.price} </Col>
                                    <Col md={2}>
                                        <Rating rating={prod.ratings}/>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as={"select"}
                                            value={prod.qty}
                                            onChange={(e) =>
                                                dispatch({
                                                    type: "CHANGE_CART_QTY",
                                                    payload: {
                                                        id: prod.id,
                                                        qty: e.target.value,
                                                    },
                                                })
                                            }
                                        >
                                            {[...Array(prod.in_stock).keys()].map((x) => (
                                                <option key={x + 1}>{x + 1}</option>
                                            ))}

                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type={"button"}
                                            variant={"light"}
                                            onClick={()=>
                                                dispatch({
                                                    type: "REMOVE_FROM_CART",
                                                    payload: prod,
                                                })
                                            }>
                                            <AiFillDelete fontSize={"20px"}/>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </div>

            <div className={"filters summary"}>
                <span className={"title"}>
                    Subtotal ({cart.length}) items
                </span>
                <span style={{ fontWeight: 700, fontSize: 20}}>Total: {total} PLN</span>
                <span style={{ fontWeight: 60, fontSize: 17}}>Enter Order Details</span>
                <>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="nickname">
                                <Form.Label>Nickname</Form.Label>
                                <Form.Control type="text" placeholder="Nickname" />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="1234 Main St" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control placeholder="Apartment, studio, or floor" />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control />
                            </Form.Group>
                        </Row>

                        <Row className={"mb-2"}>
                            <Button
                                className="d-grid gap-2"
                                type={"button"}
                                size={"lg"}
                                disabled={cart.length<1}
                            >
                                Order
                            </Button>
                        </Row>
                    </Form>
                </>
            </div>
        </div>
    )
}

export default Cart