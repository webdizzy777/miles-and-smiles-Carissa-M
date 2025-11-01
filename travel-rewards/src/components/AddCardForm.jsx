import { useState } from "react";
import { Link } from "react-router";

function AddCardForm({userId}){

    //creating variable and setter function for state to remember the variable data
    const [cardNm, setCardNm] = useState("Card Name");
    const [cardGs, setCardGs] = useState(0);
    const [cardRs, setCardRs] = useState(0);
    const [cardSp, setCardSp] = useState(0);
    const [cardDs, setCardDs] = useState(0);
    const [cardWh, setCardWh] = useState(0);
    const [cardOn, setCardOs] = useState(0);
    const [cardUt, setCardUt] = useState(0);
    const [cardIn, setCardIn] = useState(0);
    const [cardPh, setCardPh] = useState(0);
    const [cardTr, setCardTr] = useState(0);
    const [cardOh, setCardOh] = useState(0);
    const [cardExp, setCardExp] = useState("");
    const [cardExD, setCardExD] = useState("2025-01-01");
    const [cardNbT, setCardNbT] = useState("");
    const [cardNble, setCardNble] = useState("");
    const [cardFee, setCardFee] = useState(0);
    const [cardDate, setCardDate] = useState("2025-01-01");
    const [cardApr, setCardApr] = useState(0.00);
    const [cardLoc, setCardLoc] = useState(0);
    const [cardBal, setCardBal] = useState(0);
    const [cardDue, setCardDue] = useState("");
 
    //creating function to fill the new card with the initial card data plus the new values we set.
    function handleAddCard(e){
        // const idN = (cards.length) + 1;
        // const newCard = {
        //     id: idN,
        //     cardName: cardNm,
        //     gas: cardGs,
        //     restaurant: cardRs,
        //     supermarket: cardSp,
        //     discount: cardDs,
        //     wholesale: cardWh,
        //     onlineShopping: cardOn,
        //     utilities: cardUt,
        //     internet: cardIn,
        //     phone: cardPh,
        //     travel: cardTr,
        //     other: cardOh,
        //     expiringRewards: cardExp,
        //     expiringDate: cardExD,
        //     notableBenefitTitle: cardNbT,
        //     notableBenefit: cardNble,
        //     fee: cardFee, 
        //     dateOpened: cardDate,
        //     apr: cardApr,
        //     creditLimit: cardLoc,
        //     balance: cardBal,
        //     dueDate: cardDue
        //     }
        // setCards([...cards, newCard]);

    }

    //  using e.target.value to set the variables on each by capturing the value of the event input change. 
    function handleAddName(e){
        setCardNm(e.target.value);
    }

    function handleAddGas(e){
        setCardGs(e.target.value);
    }

    function handleAddRestaurant(e){
        setCardRs(e.target.value);
    }

    function handleAddSupermarket(e){
        setCardSp(e.target.value);
    }

    function handleAddDiscount(e){
        setCardDs(e.target.value);
    }

    function handleAddWholesale(e){
        setCardWh(e.target.value);
    }

    function handleAddOnlineShopping(e){
        setCardOs(e.target.value);
    }

    function handleAddUtilities(e){
        setCardUt(e.target.value);
    }

    function handleAddInternet(e){
        setCardIn(e.target.value);
    }

    function handleAddPhone(e){
        setCardPh(e.target.value);
    }

    function handleAddTravel(e){
        setCardTr(e.target.value);
    }

    function handleAddOther(e){
        setCardOh(e.target.value);
    }

    function handleAddExpiringRewards(e){
        setCardExp(e.target.value);
    }

    function handleAddExpiringDate(e){
        setCardExD(e.target.value);
    }

    function handleAddNotableTitle(e){
        setCardNbT(e.target.value);
    }

    function handleAddNotableBenefit(e){
        setCardNble(e.target.value);
    }

    function handleAddFee(e){
        setCardFee(e.target.value);
    }

    function handleAddDate(e){
        setCardDate(e.target.value);
    }

    function handleAddApr(e){
        setCardApr(e.target.value);
    }

    function handleAddLoc(e){
        setCardLoc(e.target.value);
    }

    function handleAddBal(e){
        setCardBal(e.target.value);
    }

    function handleAddDue(e){
        setCardDue(e.target.value);
    }

    return(
        <>
            <main>
                <div className="card">
                    <form>

                    <h3>Details</h3>

                    <label htmlFor="cardName"><b>Card Name</b></label>
                    <input type="text" className="addCardInput" id="cardName" value={cardNm} onChange={handleAddName} required />
                    
                    <div className="containerNoGap">
                        <div className="sideBySideCardMinPadding">
                            <label htmlFor="fee"><b>Annual Fee</b></label>
                            <input type="number" className="addCardInput" id="fee" value={cardFee} onChange={handleAddFee} />
                        </div>
                        <div className="sideBySideCardMinPadding">
                            <label htmlFor="openDate"><b>Date Opened</b></label>
                            <input type="date" className="addCardInput" id="openDate" value={cardDate} onChange={handleAddDate} />
                        </div>
                    </div>

                    <div className="containerNoGap">
                        <div className="sideBySideCardMinPadding">
                            <label htmlFor="apr"><b>APR</b></label>
                            <input type="number" step={0.01} className="addCardInput" id="apr" value={cardApr} onChange={handleAddApr} />
                        </div>
                        <div className="sideBySideCardMinPadding">
                            <label htmlFor="loc"><b>Credit Limit</b></label>
                            <input type="number" className="addCardInput" id="loc" value={cardLoc} onChange={handleAddLoc} />
                        </div>
                    </div>

                    <div className="containerNoGap">
                        <div className="sideBySideCardMinPadding">
                            <label htmlFor="bal"><b>Balance</b></label>
                            <input type="number" step={0.01} className="addCardInput" id="bal" value={cardBal} onChange={handleAddBal} />
                        </div>
                        <div className="sideBySideCardMinPadding">
                            <label htmlFor="due"><b>Day of Month Due</b></label>
                            <input type="number" className="addCardInput" id="due" value={cardDue} onChange={handleAddDue} />
                        </div>
                    </div>

                    <h3>Points Multipliers</h3>

                    <div className="threeCardRow">
                    <div className="sideBySideThreeCardForm">
                        <label htmlFor="gas"><b>Gas Points</b></label>
                        <input type="number" className="addCardInput" id="gas" value={cardGs} onChange={handleAddGas} />
                    </div>
                    <div className="sideBySideThreeCardForm">
                        <label htmlFor="restaurant"><b>Restaurant Points</b></label>
                        <input type="number" className="addCardInput" id="restaurant" value={cardRs} onChange={handleAddRestaurant} />
                    </div>
                    <div className="sideBySideThreeCardForm">
                        <label htmlFor="supermarket"><b>Supermarket Points</b></label>
                        <input type="number" className="addCardInput" id="supermarket" value={cardSp} onChange={handleAddSupermarket} />
                    </div>
                    </div>

                    <div className="threeCardRow">
                    <div className="sideBySideThreeCardForm">
                        <label htmlFor="discount"><b>Discount Store Points</b></label>
                        <input type="number" className="addCardInput" id="discount" value={cardDs} onChange={handleAddDiscount} />
                    </div>
                    <div className="sideBySideThreeCardForm">
                        <label htmlFor="wholesale"><b>Wholesale Store Points</b></label>
                        <input type="number" className="addCardInput" id="wholesale" value={cardWh} onChange={handleAddWholesale} />
                    </div>
                    <div className="sideBySideThreeCardForm">
                        <label htmlFor="online"><b>Online Shopping Points</b></label>
                        <input type="number" className="addCardInput" id="online" value={cardOn} onChange={handleAddOnlineShopping} />
                    </div>
                    </div>

                    <div className="threeCardRow">
                        <div className="sideBySideThreeCardForm">
                            <label htmlFor="utilities"><b>Utility Points</b></label>
                            <input type="number" className="addCardInput" id="utilities" value={cardUt} onChange={handleAddUtilities} />
                        </div>
                        <div className="sideBySideThreeCardForm">
                            <label htmlFor="internet"><b>Internet Points</b></label>
                            <input type="number" className="addCardInput" id="internet" value={cardIn} onChange={handleAddInternet} />
                        </div>
                        <div className="sideBySideThreeCardForm">
                            <label htmlFor="phone"><b>Phone Points</b></label>
                            <input type="number" className="addCardInput" id="phone" value={cardPh} onChange={handleAddPhone} />
                        </div>
                    </div>

                    <div className="threeCardRow">
                        <div className="sideBySideThreeCardForm">
                            <label htmlFor="travel"><b>Travel Points</b></label>
                            <input type="number" className="addCardInput" id="travel" value={cardTr} onChange={handleAddTravel} />
                        </div>
                        <div className="sideBySideThreeCardForm">
                            <label htmlFor="other"><b>Other Spend Points</b></label>
                            <input type="number" className="addCardInput" id="other" value={cardOh} onChange={handleAddOther} />
                        </div>
                    </div>

                    <h3>Expiring Rewards</h3>
                    <div className="containerNoGap">
                        <div className="sideBySideCardMinPadding">
                        <label htmlFor="expiring"><b>Reward That Expires</b>
                            <br />
                            <input type="text" className="addCardInput" id="expiring" value={cardExp} onChange={handleAddExpiringRewards} />
                        </label>
                        </div>
                        <div className="sideBySideCardMinPadding">
                        <label htmlFor="expDate"><b>Use By Date</b>
                            <br />
                            <input type="date" className="addCardInput" id="expDate" value={cardExD} onChange={handleAddExpiringDate} />
                        </label>
                        </div>
                    </div>

                    <h3>Notable Benefit</h3>
                    <div className="containerNoGap">
                        <div className="sideBySideCardMinPadding">
                        <label htmlFor="notableTitle"><b>Title for Notable Benefit</b>
                            <br />
                            <input type="text" className="addCardInput" id="notableTitle" value={cardNbT} onChange={handleAddNotableTitle} />
                        </label>
                        </div>
                        <div className="sideBySideCardMinPadding">
                        <label htmlFor="notable"><b>Notable Benefit Description</b>
                            <br />
                            <input type="text" className="addCardInput" id="notable" value={cardNble} onChange={handleAddNotableBenefit} />
                        </label>
                        </div>
                    </div>

                    <br /><br />
                    <Link to="/dashboard">
                        <button onClick={handleAddCard}>Add Card</button>
                    </Link>

                    </form>
                </div>
            </main>
        </>
    )
}

export default AddCardForm;