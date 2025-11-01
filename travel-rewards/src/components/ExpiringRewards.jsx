import { useEffect, useState, useCallback} from "react";
import { formatDate } from "./Functions.jsx";

function ExpiringRewards({userId}){

    const [rewardData, setRewardData] = useState([]);
    const [error, setError] = useState(null);

    //Remember this function so it doesn't rebuild on every render
    //Only rebuild if userId changes
    const fetchRewards = useCallback (async () =>{ 
        //clear old errors before new fetch
        setError(null);
        try {
            //fetch the rewards from the backend
            const response = await fetch(`http://localhost:8080/expiring-rewards/user/${userId}`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });

            if (response.ok){
                //convert response to JSON
                const data = await response.json();
                setRewardData(data);
                setError(null);
            } else{
                //Display error message if fetch fails
                setError('Failed to fetch expiring rewards');
            }
        }catch(err){
            //Display error message if network error
            setError('An error occurred while fetching expiring rewards: ' + err.message);
        }
    }, [userId]);

    //automatically fetch rewards when userId changes such as when a new user logs in or signs up
    useEffect(() =>{
        if(userId){
            //load the rewards for the new user
            fetchRewards();
        }
    }, [userId, fetchRewards]);
    
    //when the used icon is pressed remove the benefit 
    async function handleRemoveBenefit(id){
        
        try{
            const response = await fetch(`http://localhost:8080/expiring-rewards/${id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            });
            if(response.ok){
                //after deleting the reward, fetch the updated list
                fetchRewards();
            } else{
                setError('Error deleting reward');
            }
        }catch(err){
            setError('Error deleting reward: ' + err.message);
        }

     }

    //Create a variable to hold the list of expiring rewards
    const cardExpiringRewards = rewardData
    //sort by expiration date soonest to latest
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

            {/* Display error message or no reward found at top of card */}
            {error && <p className="center red">Error: {error}</p>}
            {!error && rewardData.length === 0 &&(
                <p className="center">No expiring rewards found</p>
            )}

            {/* Only show the list if there are rewards */}
            {rewardData.length > 0 && (
                <ul>
                    {/* Populate the list items */}
                    {cardExpiringRewards}
                </ul>
            )}

        </div>
    );

}

export default ExpiringRewards;