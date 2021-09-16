import {Button, Card} from "react-bootstrap";
import Rating from "./Rating";
import {CartState} from "../context/Context";

const SingleProduct = ( {prod} ) => {

    const {
        state: { cart },
        dispatch,
    } = CartState()

    return (
        <div className={"products"}>
            <Card>
                <Card.Img variant={"top"} src={prod.image_url} alt={prod.name}/>
                <Card.Body>
                    <Card.Title>{prod.animal}</Card.Title>
                    <Card.Subtitle style={{paddingBottom: 10}}>
                        <span> {prod.price.toString().split(".")[0]} PLN </span>
                        {prod.fast_delivery === 'true' ? (
                            <div> Natychmiastowa dostępność </div>
                        ) : (
                            <div> Zwiększony czas oczekiwania </div>
                        )}
                        <Rating rating = {prod.ratings}/>
                    </Card.Subtitle>

                    {
                        cart.some(p=>p.id===prod.id) ? (
                            <Button
                                onClick={()=> {
                                    dispatch({
                                        type: "REMOVE_FROM_CART",
                                        payload: prod,
                                    })
                                }}
                                variant={"danger"}>
                                Usuń z koszyka
                            </Button>
                        ) : (
                            <Button
                                onClick={()=> {
                                    dispatch({
                                        type: "ADD_TO_CART",
                                        payload: prod,
                                    })
                                }}
                                disabled={prod.in_stock<1}>
                                {prod.in_stock<1 ? "Obecnie brak na stanie" : "Dodaj do koszyka"}
                            </Button>
                        )
                    }

                </Card.Body>
            </Card>
        </div>
    )
}
export default SingleProduct