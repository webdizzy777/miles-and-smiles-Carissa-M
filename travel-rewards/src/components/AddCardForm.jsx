import { useState } from "react";
import { useNavigate } from "react-router";

function AddCardForm({userId}){

    const [newCardName, setNewCardName] = useState("Card Name");
    const [newGasPoints, setNewGasPoints] = useState(0);
    const [newRestaurantPoints, setNewRestaurantPoints] = useState(0);
    const [newSupermarketPoints, setNewSupermarketPoints] = useState(0);
    const [newCardDiscountPoints, setNewCardDiscountPoints] = useState(0);
    const [newCardWholesalePoints, setNewCardWholesalePoints] = useState(0);
    const [newCardOnlineShoppingPoints, setNewCardOnlineShoppingPoints] = useState(0);
    const [newCardUtilityPoints, setNewCardUtilityPoints] = useState(0);
    const [newCardInternetPoints, setNewCardInternetPoints] = useState(0);
    const [newCardPhonePoints, setNewCardPhonePoints] = useState(0);
    const [newCardTravelPoints, setNewCardTravelPoints] = useState(0);
    const [newCardOtherPoints, setNewCardOtherPoints] = useState(0);
    const [newCardExpiringRewardTitle, setNewCardExpiringRewardTitle] = useState("");
    const [newCardRewardExpirationDate, setNewCardRewardExpirationDate] = useState("2025-01-01");
    const [newCardExpiringRewardDetails, setNewCardExpiringRewardDetails] = useState("");
    const [newCardNotableBenefitTitle, setNewCardNotableBenefitTitle] = useState("");
    const [newCardNotableBenefitDescription, setNewCardNotableBenefitDescription] = useState("");
    const [newCardFee, setNewCardFee] = useState(0);
    const [newDateOpened, setNewDateOpened] = useState("2025-01-01");
    const [newApr, setNewApr] = useState(0.00);
    const [newLoc, setNewLoc] = useState(0);
    const [newCardBalance, setNewCardBalance] = useState(0);
    const [newCardDueDate, setNewCardDueDate] = useState("");
    const [error, setError] = useState(null);
 
    const navigate = useNavigate();

    async function handleAddCard(e){
        
        //Use preventDefault to stop the page from refreshing on submit
        e.preventDefault();
        setError(null);

        try{
            //Create the card object to send to the backend
            const newCard =
            {
                "userId": userId,
                "cardName": newCardName,
                "dateOpened": newDateOpened,
                "fee": newCardFee,
                "apr": newApr,
                "creditLimit": newLoc,
                "balance": newCardBalance,
                "dueDay": newCardDueDate
            };

            //Post the new card to the backend using stringify to convert the object to JSON
            const cardResponse = await fetch(`http://localhost:8080/cards`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCard)
            });

            if(cardResponse.ok){
                //Convert the response to JSON to get the cardId
                const savedCard = await cardResponse.json();
                const cardId = savedCard.cardId;

                //create the expiring reward object
                const newExpiringReward = {
                    cardId: cardId,
                    title: newCardExpiringRewardTitle,
                    details: newCardExpiringRewardDetails,
                    expirationDate: newCardRewardExpirationDate
                };

                //Post the new expiring reward to the backend
                const rewardResponse = await fetch(`http://localhost:8080/expiring-rewards`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newExpiringReward)
                });

                if(!rewardResponse.ok){
                    setError("Failed to add expiring reward.")
                }

                //create the notable benefit object
                const newNotableBenefit = {
                    title: newCardNotableBenefitTitle,        
                    description: newCardNotableBenefitDescription,  
                    cardId: cardId,
                    cardName: newCardName 
                }
                
                //Post the new notable benefit to the backend  
                const notableResponse = await fetch(`http://localhost:8080/notable-benefits`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newNotableBenefit)
                });

                if(!notableResponse.ok){
                    setError("Failed to add notable benefit.");
                }

                //Create an array of category objects with their id in the database and input values
                const categories = [
                { id: 1, value: newGasPoints },
                { id: 2, value: newRestaurantPoints },
                { id: 3, value: newSupermarketPoints },
                { id: 4, value: newCardDiscountPoints },
                { id: 5, value: newCardWholesalePoints },
                { id: 6, value: newCardOnlineShoppingPoints },
                { id: 7, value: newCardUtilityPoints },
                { id: 8, value: newCardInternetPoints },
                { id: 9, value: newCardPhonePoints },
                { id: 10, value: newCardTravelPoints },
                { id: 11, value: newCardOtherPoints }
            ];

                //For each category in our object, create a point earning object to send to the backend
                for (const cat of categories) {
                    const pointBody = {
                        cardId: cardId,
                        // Grab the category id from the list above
                        categoryId: cat.id,
                        // Get the input from the list above or default to 0
                        multiplier: parseFloat(cat.value) || 0
                    };

                    //Post the point earning to the backend
                    const pointResponse = await fetch("http://localhost:8080/point-earnings", {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(pointBody)
                    });

                    if (!pointResponse.ok) {
                        setError(`Failed to add points for category ID ${cat.id}`);
                    }
                }

                //Navigate to the dashboard after successfully adding all data
                await navigate("/dashboard");

            } else {
                setError("Failed to create card.");
            }
            
        // Catch any network errors
        }catch(err){
            setError("An error occurred: " + err.message);
        }
    } 

    //Create handler functions capturing input changes for each field
    function handleAddNewCardName(e){
        setNewCardName(e.target.value);
    }

    function handleAddNewGasPoints(e){
        setNewGasPoints(e.target.value);
    }

    function handleAddNewRestaurantPoints(e){
        setNewRestaurantPoints(e.target.value);
    }

    function handleAddNewSupermarketPoints(e){
        setNewSupermarketPoints(e.target.value);
    }

    function handleAddNewCardDiscountPoints(e){
        setNewCardDiscountPoints(e.target.value);
    }

    function handleAddNewCardWholesalePoints(e){
        setNewCardWholesalePoints(e.target.value);
    }

    function handleNewCardOnlineShoppingPoints(e){
        setNewCardOnlineShoppingPoints(e.target.value);
    }

    function handleAddNewCardUtilityPoints(e){
        setNewCardUtilityPoints(e.target.value);
    }

    function handleAddNewCardInternetPoints(e){
        setNewCardInternetPoints(e.target.value);
    }

    function handleNewCardPhonePoints(e){
        setNewCardPhonePoints(e.target.value);
    }

    function handleNewCardTravelPoints(e){
        setNewCardTravelPoints(e.target.value);
    }

    function handleAddOtherPoints(e){
        setNewCardOtherPoints(e.target.value);
    }

    function handleAddExpiringRewardTitle(e){
        setNewCardExpiringRewardTitle(e.target.value);
    }

    function handleAddNewCardRewardExpirationDate(e){
        setNewCardRewardExpirationDate(e.target.value);
    }

    function handleAddNewCardExpiringRewardDetails(e){
        setNewCardExpiringRewardDetails(e.target.value);
    }

    function handleAddNotableTitle(e){
        setNewCardNotableBenefitTitle(e.target.value);
    }

    function handleAddNotableBenefitDescription(e){ 
        setNewCardNotableBenefitDescription(e.target.value); 
    }

    function handleAddNewCardFee(e){
        setNewCardFee(e.target.value);
    }

    function handleAddNewDateOpened(e){
        setNewDateOpened(e.target.value);
    }

    function handleAddNewApr(e){
        setNewApr(e.target.value);
    }

    function handleAddNewLoc(e){
        setNewLoc(e.target.value);
    }

    function handleAddNewCardBalance(e){
        setNewCardBalance(e.target.value);
    }

    function handleAddNewCardDueDate(e){
        setNewCardDueDate(e.target.value);
    }

    return(
        <>
            <main>
                <div className="card">
                    <form>

                    <h3>Details</h3>

                    <label htmlFor="cardName"><b>Card Name</b></label>
                    <input type="text" className="addCardInput" id="cardName" value={newCardName} onChange={handleAddNewCardName} required />
                    
                    <div className="containerNoGap">
                        <div className="sideBySideCardMinPadding">
                            <label htmlFor="fee"><b>Annual Fee</b></label>
                            <input type="number" className="addCardInput" id="fee" value={newCardFee} onChange={handleAddNewCardFee} />
                        </div>
                        <div className="sideBySideCardMinPadding">
                            <label htmlFor="openDate"><b>Date Opened</b></label>
                            <input type="date" className="addCardInput" id="openDate" value={newDateOpened} onChange={handleAddNewDateOpened} />
                        </div>
                    </div>

                    <div className="containerNoGap">
                        <div className="sideBySideCardMinPadding">
                            <label htmlFor="apr"><b>APR</b></label>
                            <input type="number" step={0.01} className="addCardInput" id="apr" value={newApr} onChange={handleAddNewApr} />
                        </div>
                        <div className="sideBySideCardMinPadding">
                            <label htmlFor="loc"><b>Credit Limit</b></label>
                            <input type="number" className="addCardInput" id="loc" value={newLoc} onChange={handleAddNewLoc} />
                        </div>
                    </div>

                    <div className="containerNoGap">
                        <div className="sideBySideCardMinPadding">
                            <label htmlFor="bal"><b>Balance</b></label>
                            <input type="number" step={0.01} className="addCardInput" id="bal" value={newCardBalance} onChange={handleAddNewCardBalance} />
                        </div>
                        <div className="sideBySideCardMinPadding">
                            <label htmlFor="due"><b>Day of Month Due</b></label>
                            <input type="number" className="addCardInput" id="due" value={newCardDueDate} onChange={handleAddNewCardDueDate} />
                        </div>
                    </div>

                    <h3>Points Multipliers</h3>

                    <div className="threeCardRow">
                    <div className="sideBySideThreeCardForm">
                        <label htmlFor="gas"><b>Gas Points</b></label>
                        <input type="number" className="addCardInput" id="gas" value={newGasPoints} onChange={handleAddNewGasPoints} />
                    </div>
                    <div className="sideBySideThreeCardForm">
                        <label htmlFor="restaurant"><b>Restaurant Points</b></label>
                        <input type="number" className="addCardInput" id="restaurant" value={newRestaurantPoints} onChange={handleAddNewRestaurantPoints} />
                    </div>
                    <div className="sideBySideThreeCardForm">
                        <label htmlFor="supermarket"><b>Supermarket Points</b></label>
                        <input type="number" className="addCardInput" id="supermarket" value={newSupermarketPoints} onChange={handleAddNewSupermarketPoints} />
                    </div>
                    </div>

                    <div className="threeCardRow">
                    <div className="sideBySideThreeCardForm">
                        <label htmlFor="discount"><b>Discount Store Points</b></label>
                        <input type="number" className="addCardInput" id="discount" value={newCardDiscountPoints} onChange={handleAddNewCardDiscountPoints} />
                    </div>
                    <div className="sideBySideThreeCardForm">
                        <label htmlFor="wholesale"><b>Wholesale Store Points</b></label>
                        <input type="number" className="addCardInput" id="wholesale" value={newCardWholesalePoints} onChange={handleAddNewCardWholesalePoints} />
                    </div>
                    <div className="sideBySideThreeCardForm">
                        <label htmlFor="online"><b>Online Shopping Points</b></label>
                        <input type="number" className="addCardInput" id="online" value={newCardOnlineShoppingPoints} onChange={handleNewCardOnlineShoppingPoints} />
                    </div>
                    </div>

                    <div className="threeCardRow">
                        <div className="sideBySideThreeCardForm">
                            <label htmlFor="utilities"><b>Utility Points</b></label>
                            <input type="number" className="addCardInput" id="utilities" value={newCardUtilityPoints} onChange={handleAddNewCardUtilityPoints} />
                        </div>
                        <div className="sideBySideThreeCardForm">
                            <label htmlFor="internet"><b>Internet Points</b></label>
                            <input type="number" className="addCardInput" id="internet" value={newCardInternetPoints} onChange={handleAddNewCardInternetPoints} />
                        </div>
                        <div className="sideBySideThreeCardForm">
                            <label htmlFor="phone"><b>Phone Points</b></label>
                            <input type="number" className="addCardInput" id="phone" value={newCardPhonePoints} onChange={handleNewCardPhonePoints} />
                        </div>
                    </div>

                    <div className="threeCardRow">
                        <div className="sideBySideThreeCardForm">
                            <label htmlFor="travel"><b>Travel Points</b></label>
                            <input type="number" className="addCardInput" id="travel" value={newCardTravelPoints} onChange={handleNewCardTravelPoints} />
                        </div>
                        <div className="sideBySideThreeCardForm">
                            <label htmlFor="other"><b>Other Spend Points</b></label>
                            <input type="number" className="addCardInput" id="other" value={newCardOtherPoints} onChange={handleAddOtherPoints} />
                        </div>
                    </div>

                    <h3>Expiring Rewards</h3>
                    <div className="containerNoGap">
                        <div className="sideBySideCardMinPadding">
                            <label htmlFor="expTitle"><b>Title</b><br />
                                <input 
                                    type="text" 
                                    className="addCardInput" 
                                    id="expTitle" 
                                    value={newCardExpiringRewardTitle} 
                                    onChange={handleAddExpiringRewardTitle} 
                                />
                            </label>
                        </div>

                        <div className="sideBySideCardMinPadding">
                            <label htmlFor="expDate"><b>Use By Date</b><br />
                                <input 
                                    type="date" 
                                    className="addCardInput" 
                                    id="expDate" 
                                    value={newCardRewardExpirationDate} 
                                    onChange={handleAddNewCardRewardExpirationDate} 
                                />
                            </label>
                        </div>

                        <div className="sideBySideCardMinPadding">
                            <label htmlFor="expDetails"><b>Details</b><br />
                                <input 
                                    type="text" 
                                    className="addCardInput" 
                                    id="expDetails" 
                                    value={newCardExpiringRewardDetails} 
                                    onChange={handleAddNewCardExpiringRewardDetails} 
                                />
                            </label>
                        </div>
                    </div>

                    <h3>Notable Benefit</h3>
                    <div className="containerNoGap">
                        <div className="sideBySideCardMinPadding">
                            <label htmlFor="notableTitle"><b>Title for Notable Benefit</b><br />
                                <input 
                                    type="text" 
                                    className="addCardInput" 
                                    id="notableTitle" 
                                    value={newCardNotableBenefitTitle} 
                                    onChange={handleAddNotableTitle} 
                                />
                            </label>
                        </div>
                        <div className="sideBySideCardMinPadding">
                            <label htmlFor="notable"><b>Notable Benefit Description</b><br />
                                <input 
                                    type="text" 
                                    className="addCardInput" 
                                    id="notable" 
                                    value={newCardNotableBenefitDescription} 
                                    onChange={handleAddNotableBenefitDescription} 
                                />
                            </label>
                        </div>
                    </div>

                    {error && <p>{error}</p>}

                    <br /><br />
                    <button onClick={handleAddCard}>Add Card</button>

                    </form>
                </div>
            </main>
        </>
    )
}

export default AddCardForm;