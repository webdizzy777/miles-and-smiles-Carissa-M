import React, { useState, useEffect, useCallback } from "react";
import AddCard from "./AddCard.jsx";
import { Link } from "react-router-dom";

function CardManagement({ userId }) {
  const [cardData, setCardData] = useState([]);
  const [error, setError] = useState(null);

  //useCallback in order to prevent infinite loop in useEffect when fetchCards is a dependency because it is re-created on every render
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
        // Convert the response to JSON and clear any previous errors
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

  // Fetch cards when component mounts or userId changes
  useEffect(() => {
    if (userId) {
      setCardData([]);
      fetchCards();
    }
  }, [userId, fetchCards]);

  async function handleDeleteCard(cardId) {
    // Confirm the user wants to delete the card and proceed if they do
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this card?"
    );
    if (!confirmDelete) return;
    try {
      // Send DELETE request to backend to delete the card
      const deleteResponse = await fetch(
        `http://localhost:8080/cards/${cardId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (deleteResponse.ok) {
        // Refresh the card list after successful deletion
        fetchCards();
      } else {
        setError("Error deleting card");
      }
    } catch (err) {
      setError("Error deleting card: " + err.message);
    }
  }
  //For each card, create a table row with edit and delete options with unique key and names
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
          <span
            className="material-symbols-outlined close"
            onClick={() => handleDeleteCard(c.cardId)}
          >
            delete
          </span>
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
              {error && <p className="error-message">{error}</p>}
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
