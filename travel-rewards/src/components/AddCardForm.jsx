import Footer from "./Footer.jsx"
import Header from "./Header.jsx"
import { useState } from "react";
import { Link } from "react-router";

function AddCardForm({cards, setCards}){

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
    function handleAddCard(){
        const idN = (cards.length) + 1;
        const newCard = {
            id: idN,
            cardName: cardNm,
            gas: cardGs,
            restaurant: cardRs,
            supermarket: cardSp,
            discount: cardDs,
            wholesale: cardWh,
            onlineShopping: cardOn,
            utilities: cardUt,
            internet: cardIn,
            phone: cardPh,
            travel: cardTr,
            other: cardOh,
            expiringRewards: cardExp,
            expiringDate: cardExD,
            notableBenefitTitle: cardNbT,
            notableBenefit: cardNble,
            fee: cardFee, 
            dateOpened: cardDate,
            apr: cardApr,
            creditLimit: cardLoc,
            balance: cardBal,
            dueDate: cardDue
            }
        setCards([...cards, newCard]);
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
            <Header></Header>
            <main>
                <div className="card">

                    <form>

                    <label htmlFor="cardName"><b>Card Name</b>
                        <br />
                        <input type="text" className="addCardInput" id="cardName" value={cardNm} onChange={handleAddName} required />
                    </label>
                    

                    <label htmlFor="gas"><b>Gas Points</b>
                        <br />
                        <input type="number" className="addCardInput" id="gas" value={cardGs} onChange={handleAddGas} required />
                    </label>

                    <label htmlFor="restaurant"><b>Restaurant Points</b>
                        <br />
                        <input type="number" className="addCardInput" id="restaurant" value={cardRs} onChange={handleAddRestaurant} required />
                    </label>
                    

                    <label htmlFor="supermarket"><b>Supermarket Points</b>
                        <br />
                        <input type="number" className="addCardInput" id="supermarket" value={cardSp} onChange={handleAddSupermarket} />
                    </label>

                    <label htmlFor="discount"><b>Discount Store Points</b>
                        <br />
                        <input type="number" className="addCardInput" id="discount" value={cardDs} onChange={handleAddDiscount} />
                    </label>

                    <label htmlFor="wholesale"><b>Wholesale Store Points</b>
                        <br />
                        <input type="number" className="addCardInput" id="wholesale" value={cardWh} onChange={handleAddWholesale} />
                    </label>

                    <label htmlFor="online"><b>Online Shopping Points</b>
                        <br />
                        <input type="number" className="addCardInput" id="online" value={cardDs} onChange={handleAddOnlineShopping} />
                    </label>

                    <label htmlFor="utilities"><b>Utility Points</b>
                        <br />
                        <input type="number" className="addCardInput" id="utilities" value={cardUt} onChange={handleAddUtilities} />
                    </label>

                    <label htmlFor="internet"><b>Internet Points</b>
                        <br />
                        <input type="number" className="addCardInput" id="internet" value={cardIn} onChange={handleAddInternet} />
                    </label>

                    <label htmlFor="phone"><b>Phone Points</b>
                        <br />
                        <input type="number" className="addCardInput" id="phone" value={cardPh} onChange={handleAddPhone} />
                    </label>

                    <label htmlFor="travel"><b>Travel Points</b>
                        <br />
                        <input type="number" className="addCardInput" id="travel" value={cardTr} onChange={handleAddTravel} />
                    </label>

                    <label htmlFor="other"><b>Other Spend Points</b>
                        <br />
                        <input type="number" className="addCardInput" id="other" value={cardOh} onChange={handleAddOther} />
                    </label>

                    <label htmlFor="expiring"><b>Reward That Expires</b>
                        <br />
                        <input type="text" className="addCardInput" id="expiring" value={cardExp} onChange={handleAddExpiringRewards} />
                    </label>

                    <label htmlFor="expDate"><b>Use By Date</b>
                        <br />
                        <input type="date" className="addCardInput" id="expDate" value={cardExD} onChange={handleAddExpiringDate} />
                    </label>

                    <label htmlFor="notableTitle"><b>Title for Notable Benefit</b>
                        <br />
                        <input type="text" className="addCardInput" id="notableTitle" value={cardNbT} onChange={handleAddNotableTitle} />
                    </label>

                    <label htmlFor="notable"><b>Notable Benefit Description</b>
                        <br />
                        <input type="text" className="addCardInput" id="notable" value={cardNble} onChange={handleAddNotableBenefit} />
                    </label>

                    <label htmlFor="fee"><b>Annual Fee</b>
                        <br />
                        <input type="number" className="addCardInput" id="fee" value={cardFee} onChange={handleAddFee} />
                    </label>

                    <label htmlFor="openDate"><b>Date Opened</b>
                        <br />
                        <input type="date" className="addCardInput" id="openDate" value={cardDate} onChange={handleAddDate} />
                    </label>

                    <label htmlFor="apr"><b>APR</b>
                        <br />
                        <input type="number" step={0.01} className="addCardInput" id="apr" value={cardApr} onChange={handleAddApr} />
                    </label>

                    <label htmlFor="loc"><b>Credit Limit</b>
                        <br />
                        <input type="number" className="addCardInput" id="loc" value={cardLoc} onChange={handleAddLoc} />
                    </label>

                    <label htmlFor="bal"><b>Balance</b>
                        <br />
                        <input type="number" step={0.01} className="addCardInput" id="bal" value={cardBal} onChange={handleAddBal} />
                    </label>

                    <label htmlFor="due"><b>Day of Month Due</b>
                        <br />
                        <input type="number" className="addCardInput" id="due" value={cardDue} onChange={handleAddDue} />
                    </label>

                    <br /><br />
                    <Link to="/dashboard"><button onClick={handleAddCard}>Add Card</button></Link>

                    </form>

                </div>
            </main>
            <Footer></Footer>
        </>
    )
}

export default AddCardForm;