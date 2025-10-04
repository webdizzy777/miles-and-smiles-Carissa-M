import { formatDate } from "./Functions.jsx";

function ExpiringRewards({cards, setCards}){
    
    //when the used icon is pressed remove the benefit 
    //map through the cards for the card with the matching id, set the array to only change the benefit
    function handleRemoveBenefit(id){
         setCards(c => 
             c.map(card =>{
                     if(card.id === id){
                        return {...card, expiringRewards: ""}  
                     } else{
                        return  card
                     }
                 }
             )
         );
     }

    const cardExpiringRewards = cards
    //filter out cards that don't have text in the array for this benefit
    .filter((card) => (card.expiringRewards !== ""))
    //sort by expiration date by casting to a date object
    .sort((a,b) => new Date(a.expiringDate) - new Date(b.expiringDate))
    //map through the cards to make a list item with the relevant information
    .map((card)=>{  
        return(
            <li className="benefit-li" key={card.id}>
                <b>{card.cardName}: </b>
                {card.expiringRewards}
                <b> Use by: &nbsp;
                <span className="green">{formatDate(card.expiringDate)}</span></b> &nbsp;
                <span className="material-symbols-outlined used" onClick={() => handleRemoveBenefit(card.id)}>
                    check_circle
                </span>
            </li>
        );
    });

    return(
        <div className="sideBySideCard">
            <h2>Expiring Rewards</h2>
            <ul>
                {cardExpiringRewards}
            </ul>
        </div>
    );

}

export default ExpiringRewards;