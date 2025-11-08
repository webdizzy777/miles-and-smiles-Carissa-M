import React, { useState, useEffect, useCallback } from "react";
import AddCard from "./AddCard.jsx";
import Modal from "./Modal.jsx";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton.jsx";

function CardManagement({ userId }) {
  const [cardData, setCardData] = useState([]);
  const [error, setError] = useState(null);

  //useCallback will only recreate the function if userId changes, important because useEffect depends on it and prevents infinite loops with fetchCards inside useEffect
  const fetchCards = useCallback(async () => {
    try {
      // Fetch card data from the backend
      const response = await fetch(
        `http://localhost:8080/cards/user/${userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        // Convert the response to a JS object and clear any previous errors
        const data = await response.json();
        setCardData(data);
        setError(null);
      } else {
        // Display an error message if the fetch fails
        setError("Failed to fetch cards");
      }
    } catch (err) {
      // Display an error message if there is a network or other error
      setError("An error occurred while fetching cards:" + err.message);
    }
  }, [userId]);

  // Clear previous data and fetch cards when component mounts or userId changes
  useEffect(() => {
    if (userId) {
      setCardData([]);
      fetchCards();
    }
  }, [userId, fetchCards]);

  const cardRow = cardData.map((c) => {
    return (
      <tr key={c.cardId}>
        <td title={c.cardName}>{c.cardName}</td>
        <td>
          <Link to={`/edit-card/${c.cardId}`}>
            <span className="material-symbols-outlined">edit_square</span>
          </Link>
        </td>
        <td>
          <DeleteButton
            itemId={c.cardId}
            deleteUrl="http://localhost:8080/cards"
            //as the parent, tell child deleteButton to refresh the card list after deletion
            onDelete={fetchCards}
          >
            <span className="material-symbols-outlined close" title="Delete">
              delete
            </span>
          </DeleteButton>
        </td>
      </tr>
    );
  });

  return (
    <>
      <main>
        <div className="center">
          <AddCard></AddCard>
        </div>
        <div className="container">
          <div className="card">
            <h2>Card Management</h2>
            <div className="tableContainer">
              {/*Display error message if card data isn't found */}
              {error && <p>{error}</p>}
              {cardData.length === 0 && !error && (
                <p className="center">
                  No card data found. <AddCard></AddCard>
                </p>
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
                  <tbody>{cardRow}</tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default CardManagement;
