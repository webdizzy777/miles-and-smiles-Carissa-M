import { Link } from "react-router-dom";

function AddCard(){

    return(
        <>
            <Link to={'/AddCardForm'}><button>Add Card</button></Link>
        </>
    )

}

export default AddCard;