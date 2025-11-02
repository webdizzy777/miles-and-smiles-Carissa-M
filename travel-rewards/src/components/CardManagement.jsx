import React, {useState, useEffect} from 'react';
import AddCard from './AddCard.jsx';
import { Link } from 'react-router-dom';

function CardManagement({userId}){

    const [cardData, setCardData] = useState([]);
    const [error, setError] = useState(null);

    // Fetch user's cards when the component mounts or if userId changes
    useEffect(() => {   

        async function fetchCards() {
            try {
                const response = await fetch(`http://localhost:8080/cards/user/${userId}`, { 
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (response.ok) {
                    // Convert the response to JSON and clear any previous errors
                    const data = await response.json();
                    setCardData(data);
                    setError(null); 
                } else {
                    // Display an error message if the fetch fails
                    setError('Failed to fetch cards');
                }  
            } catch (err) {
                // Display an error message if there is a network or other error
                setError('An error occurred while fetching cards:' + err.message);
            }

        }
        if (userId) {
            //clear the old card data then load the new user's data
            setCardData([]);
            fetchCards();
        }
    }, [userId]);

    const cardRow = cardData.map((c) => {
        return(
            <tr key={c.cardId}>
            <td title={c.cardName}>{c.cardName}</td>    
            <td><Link to={`/editCard/${c.cardId}`}>
                <span class="material-symbols-outlined">
                edit_square
                </span>
            </Link></td>
            <td>
                <span class="material-symbols-outlined">
                delete
                </span>
            </td>
        </tr>
        );
    });

    return(
        <>
            <main>
                <div className='center'>
                    <AddCard></AddCard>
                </div>
                <div className='container'>
                    <div className='card'>
                        <h2>Card Management</h2>
                        <div className='tableContainer'>

                            {/*Display error message if card data isn't found */} 
                            {error && <p className="error-message">{error}</p>}
                            {cardData.length === 0 && !error && (
                                <p className="center" >No card data found. <AddCard></AddCard></p> 
                            )}

                            {/* Only show table if there is card data */}
                            {cardData.length > 0 && ( 
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Card Name</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cardRow}
                                    </tbody>
                                </table>
                            )}

                        </div>
                    </div>
                </div>
            </main>
        </>
    );

}

export default CardManagement