import { Link } from "react-router-dom";

function AddCard(){

    return(
        <>
            <Link to={'/add-card-form'}><button>Add Card</button></Link>
        </>
    )

}

export default AddCard;