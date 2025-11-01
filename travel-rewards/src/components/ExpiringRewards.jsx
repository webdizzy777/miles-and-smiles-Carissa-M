import { useEffect, useState } from "react";
import { formatDate } from "./Functions.jsx";

function ExpiringRewards({setCards, userId}){

    const [rewardData, setRewardData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() =>{
        async function fetchRewards() {
            try {
                //fetch the rewards when component mounts or userId changes
                const response = await fetch(`http://localhost:8080/expiring-rewards/user/${userId}`,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                });

                if (response.ok){
                    //convert response to JSON
                    const data = await response.json();
                    setRewardData(data)
                } else{
                    //Display error message if fetch fails
                    setError('Failed to fetch expiring rewards');
                }
            }catch(err){
                //Display error message if network error
                setError('An error occurred while fetching expiring rewards: ' + err)
            }
        }

        if(userId){
            //clear old data and load new data
            setRewardData([]);
            fetchRewards();
        }
    }, [userId]);
    
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

    const cardExpiringRewards = rewardData
    .sort((a,b) => new Date(a.expirationDate) - new Date(b.expirationDate))
    //map through the cards to make a list item with the relevant information
    .map((card)=>{  
        return(
            <li className="benefit-li" key={card.rewardId}>
                <b>{card.cardName}: </b>
                {card.title}:&nbsp;
                <i>{card.details}</i>
                <b> Use by: &nbsp;
                <span className="green">{formatDate(card.expirationDate)}</span></b> &nbsp;
                <span className="material-symbols-outlined used" onClick={() => handleRemoveBenefit(card.rewardId)}>
                    check_circle
                </span>
            </li>
        );
    });

    return(
        <div className="sideBySideCard">
            <h2>Expiring Rewards</h2>
            {/* Display error message or no reward found at top of car */}
            {error && <p className="center red">Error: {error}</p>}
            {!error && rewardData.length === 0 &&(
                <p className="center">No expiring rewards found</p>
            )}
            <ul>
                {/* Populate the list items */}
                {cardExpiringRewards}
            </ul>
        </div>
    );

}

export default ExpiringRewards;