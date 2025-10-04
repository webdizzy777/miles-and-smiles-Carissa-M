//import AddCard from './AddCard.jsx';

function PointsTable({cards}){

    //find the max points value
    const maxGas = cards.map(card => card.gas);
    const maxGasValue = Math.max(...maxGas);

    const maxRestaurant = cards.map(card => card.restaurant);
    const maxRestaurantValue = Math.max(...maxRestaurant);

    const maxSupermarket = cards.map(card => card.supermarket);
    const maxSupermarketValue = Math.max(...maxSupermarket);

    const maxDiscount = cards.map(card => card.discount);
    const maxDiscountValue = Math.max(...maxDiscount);
  
    const maxWholesale = cards.map(card => card.wholesale);
    const maxWholesaleValue = Math.max(...maxWholesale);

    const maxOnlineShopping = cards.map(card => card.onlineShopping);
    const maxOnlineShoppingValue = Math.max(...maxOnlineShopping);

    const maxUtilities = cards.map(card => card.utilities);
    const maxUtilitiesValue = Math.max(...maxUtilities);
   
    const maxInternet = cards.map(card => card.internet);
    const maxInternetValue = Math.max(...maxInternet);

    const maxPhone = cards.map(card => card.phone);
    const maxPhoneValue = Math.max(...maxPhone);

    const maxTravel = cards.map(card => card.travel);
    const maxTravelValue = Math.max(...maxTravel);
    
    const maxOther = cards.map(card => card.other);
    const maxOtherValue = Math.max(...maxOther);

    //Fill the table, add green style if value matches the max
    const cardNames = cards.map((cardN)=>(
        <td key={cardN.id} title={cardN.cardName}>
            {cardN.cardName}
        </td>
    ));

    const cardGas = cards.map((cardG)=>(
        <td key={cardG.id}>
            {cardG.gas === maxGasValue ? <span className="green"><b>{cardG.gas}</b></span> : cardG.gas} 
        </td>
    ))

    const cardRestaurant = cards.map((cardR) => (
        <td key={cardR.id}>
            {cardR.restaurant === maxRestaurantValue? <span className="green"><b>{cardR.restaurant}</b></span> : cardR.restaurant}
        </td>
    ));

    const cardSupermarket = cards.map((cardS)=>(
        <td key={cardS.id}>
            {cardS.supermarket === maxSupermarketValue ? <span className="green"><b>{cardS.supermarket}</b></span> : cardS.supermarket}
        </td>
    ));

    const cardDiscount = cards.map((cardD)=>(
        <td key={cardD.id}>
            {cardD.discount === maxDiscountValue ? <span className="green"><b>{cardD.discount}</b></span> : cardD.discount}
        </td>
    ));

    const cardWholesale = cards.map((cardW)=>(
        <td key={cardW.id}>
            {cardW.wholesale === maxWholesaleValue ? <span className="green"><b>{cardW.wholesale}</b></span> : cardW.wholesale}
        </td>
    ));

    const cardOShopping = cards.map((cardO)=>(
        <td key={cardO.id}>
            {cardO.onlineShopping === maxOnlineShoppingValue ? <span className="green"><b>{cardO.onlineShopping}</b>
        </span> : cardO.onlineShopping}</td>
    ));

    const cardUtilities = cards.map((cardU)=>(
        <td key={cardU.id}>
            {cardU.utilities === maxUtilitiesValue ? <span className="green"><b>{cardU.utilities}</b></span> : cardU.utilities}
        </td>
    ));

    const cardInternet = cards.map((cardI)=>(
        <td key={cardI.id}>
            {cardI.internet === maxInternetValue ? <span className="green"><b>{cardI.internet}</b></span> : cardI.internet}
        </td>
    ));

    const cardPhone = cards.map((cardP)=>(
        <td key={cardP.id}>
            {cardP.phone === maxPhoneValue ? <span className="green"><b>{cardP.phone}</b></span> : cardP.phone}
        </td>
    ));

    const cardTravel = cards.map((cardT)=>(
        <td key={cardT.id}>
            {cardT.travel === maxTravelValue ? <span className="green"><b>{cardT.travel}</b></span> : cardT.travel}
        </td>
    ));

    const cardOther = cards.map((cardOt)=>(
        <td key={cardOt.id}>
            {cardOt.other === maxOtherValue ? <span className="green"><b>{cardOt.other}</b></span> : cardOt.other}
        </td>
    ));
    
    return(
        <div className="card">
            <h2  className="center">Points Table</h2>
            <div className="tableContainer">
                <table >
                    <tbody>
                        <tr>
                            <th title="Card Name">Card Name</th>
                            {cardNames}
                        </tr>
                        <tr>
                            <th title="Gas">Gas</th>
                            {cardGas}
                        </tr>
                        <tr>
                            <th title="Restaurant">Restaurant</th>
                            {cardRestaurant}
                        </tr>
                        <tr>
                            <th title="Supermarket">Supermarket</th>
                            {cardSupermarket}
                        </tr>
                        <tr>
                            <th title="Discount">Discount</th>
                            {cardDiscount}
                        </tr>
                        <tr>
                            <th title="Wholesale">Wholesale</th>
                            {cardWholesale}
                        </tr>
                        <tr>
                            <th title="Online Shopping">Online Shopping</th>
                            {cardOShopping}
                        </tr>
                        <tr>
                            <th title="Utilities">Utilities</th>
                            {cardUtilities}
                        </tr>
                        <tr>
                            <th title="Internet">Internet</th>
                            {cardInternet}
                        </tr>
                        <tr>
                            <th title="Phone">Phone</th>
                            {cardPhone}
                        </tr>
                        <tr>
                            <th title="Travel">Travel</th>
                            {cardTravel}
                        </tr>
                        <tr>
                            <th title="Other">Other</th>
                            {cardOther}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>        
    )

}

export default PointsTable;