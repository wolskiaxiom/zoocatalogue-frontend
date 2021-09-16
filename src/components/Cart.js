import {CartState} from "../context/Context";
import {Col, ListGroup, Row, Form, Image, Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import Rating from "./Rating";
import {AiFillDelete} from "react-icons/all";
import axios from "axios";

const Cart = () => {

    const {state: {cart}, dispatch} = CartState()

    const [email, setEmail] = useState("")
    const [nick, setNick] = useState("")
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [city, setCity] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [total, setTotal] = useState()
    // const [comment, setComment] = useState("")

    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0))
    }, [cart])

    return (
        <div className={"home"}>
            <div className={"productContainer"}>
                <ListGroup>
                    {
                        cart.map((prod) => (
                            <ListGroup.Item key={prod.id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={prod.image_url} alt={prod.name} fluid rounded/>
                                    </Col>
                                    <Col md={2}>
                                        <span>{prod.animal}</span>
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
                                            onClick={() =>
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
                <span style={{fontWeight: 700, fontSize: 20}}>Szacowana cena: {total} PLN</span>
                <span style={{fontWeight: 60, fontSize: 17}}>Wprowadź dane do zapytania</span>
                <>
                    <Form onSubmit={(event => {event.preventDefault()})}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email"
                                              onChange={(event) => {
                                                  console.log("changed val: ", event.target.value);
                                                  setEmail(event.target.value)
                                              }}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="nickname">
                                <Form.Label>Imię</Form.Label>
                                <Form.Control type="text" placeholder="Imię"
                                              onChange={(event) => {
                                                  console.log("changed val: ", event.target.value);
                                                  setNick(event.target.value);
                                              }}
                                />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Adres</Form.Label>
                            <Form.Control placeholder="Ulica i numer"
                                          onChange={(event) => {
                                              console.log("changed val: ", event.target.value);
                                              setAddress1(event.target.value);
                                          }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Adres</Form.Label>
                            <Form.Control placeholder="Dodatkowe informacje"
                                          onChange={(event) => {
                                              console.log("changed val: ", event.target.value);
                                              setAddress2(event.target.value);
                                          }}
                            />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Miasto</Form.Label>
                                <Form.Control
                                    onChange={(event) => {
                                        console.log("changed val: ", event.target.value);
                                        setCity(event.target.value);
                                    }}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Kod pocztowy</Form.Label>
                                <Form.Control
                                    onChange={(event) => {
                                        console.log("changed val: ", event.target.value);
                                        setZipcode(event.target.value);
                                    }}
                                />
                            </Form.Group>
                        </Row>

                        <Row className={"mb-2"}>
                            <Button
                                className="d-grid gap-2"
                                type={"submit"}
                                size={"lg"}
                                // disabled={cart.length < 1}
                                onClick={() => {
                                    const postOrders = async () => {
                                        let response = await axios.post('http://localhost:3333/order', {
                                            customer_email: email.toString(),
                                            customer_nick: nick.toString(),
                                            customer_address1: address1.toString(),
                                            customer_address2: address2.toString(),
                                            customer_city: city.toString(),
                                            customer_zipcode: zipcode.toString(),
                                            total_price: total,
                                            comments: 'commented',
                                            order_items: [...Array(cart.length).keys()]
                                                .map((i) => {
                                                    return {
                                                        item_id: cart[i].id,
                                                        item_num: cart[i].qty
                                                    }
                                            }),

                                    });
                                        if (response.status === 200) {
                                            dispatch({
                                                type: "CLEAN_CART",
                                                payload: {},
                                            })
                                        }
                                    };

                                    postOrders();
                                }}
                            >
                                Wyślij zapytanie o dostępność
                            </Button>
                        </Row>
                    </Form>
                </>
            </div>
        </div>
    )
}

export default Cart