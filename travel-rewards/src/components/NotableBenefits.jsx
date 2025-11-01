import { useState, useEffect } from "react";

function NotableBenefits({userId}){
    
    const [benefitData, setBenefitData] = useState([]);
    const [error, setError] = useState(null);

    // Fetch notable benefits data when the component mounts or if userId changes
    useEffect(() => {

        async function fetchBenefits() {
            try {
                const response = await fetch(`http://localhost:8080/notable-benefits/user/${userId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (response.ok) {
                    // Convert the response to JSON
                    const data = await response.json();
                    setBenefitData(data);
                } else {
                    // Display an error message if the fetch fails
                    console.log('Error fetching notable benefits data');
                    setError('Failed to fetch notable benefits');
                }
            } catch (err) {
                // Display an error message if there is a network or other error
                console.error('Fetch error:', err.message);
                setError('An error occurred while fetching notable benefits');
            }   
        }   
        if (userId) {
            //clear the old benefits data then load the new user's data
            setBenefitData([]);
            fetchBenefits();
        }

    }, [userId]);

    const cardNotableBenefits = benefitData
    .map((card)=>(
        <li className="benefit-li" key={card.benefitId}>
            <b>{card.cardName}:</b>
            <ul>
                <li><b><i><span className="green">{card.title}:</span> </i></b>  
                {card.description}</li>
            </ul>
        </li>
        
    ))

    return(
        <div className="sideBySideCard">
            <h2>Notable Benefits</h2>
            
            {/*Display error message if a reward isn't found */}
            {error && <p className="error-message">{error}</p>}
            {benefitData.length === 0 && !error && (
                <p className="center">No notable benefits found.</p>
            )}

            {/* Only show list if there are rewards */}
            {benefitData.length > 0 && (
                <ul>
                    {cardNotableBenefits}
                </ul>
            )}

        </div>
    );

}

export default NotableBenefits;