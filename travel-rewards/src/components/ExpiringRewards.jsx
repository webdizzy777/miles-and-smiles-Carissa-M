import React, { useEffect, useState, useCallback } from "react";
import DeleteButton from "./DeleteButton.jsx";
import { formatDate, getTimeRemaining } from "./Functions.jsx";

function ExpiringRewards({ userId }) {
  const [rewardData, setRewardData] = useState([]);
  const [error, setError] = useState(null);

  //Remember this function so it doesn't rebuild on every render
  //Only rebuild if userId changes
  const fetchRewards = useCallback(async () => {
    //clear old errors before new fetch
    setError(null);
    try {
      //fetch the rewards from the backend
      const response = await fetch(
        `http://localhost:8080/expiring-rewards/user/${userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        //convert response to a JS object
        const data = await response.json();
        setRewardData(data);
        setError(null);
      } else {
        //Display error message if fetch fails
        setError("Failed to fetch expiring rewards");
      }
    } catch (err) {
      //Display error message if network error
      setError(
        "An error occurred while fetching expiring rewards: " + err.message
      );
    }
  }, [userId]);

  //automatically fetch rewards when userId changes such as when a new user logs in or signs up
  useEffect(() => {
    if (userId) {
      //load the rewards for the new user
      fetchRewards();
    }
  }, [userId, fetchRewards]);

  //filter out any cards where the reward title or detail is an empty string
  const filteredRewards = rewardData.filter(
    (reward) =>
      (reward.title && reward.title.trim() !== "") ||
      (reward.details && reward.details.trim() !== "")
  );

  //Create a variable to hold the list of expiring rewards
  const cardExpiringRewards = filteredRewards
    //sort by expiration date soonest to latest
    .sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate))
    //map through the cards to make a list item with the relevant information
    .map((card) => {
      return (
        <li className="benefit-li" key={card.rewardId}>
          <b>{card.cardName}: </b>
          <ul>
            <li>
              <i>
                <b>
                  <span className="green">{card.title}:</span>
                </b>
              </i>
              &nbsp;
              {card.details}
              <b>
                {" "}
                Use by: &nbsp;
                <span className={getTimeRemaining(card.expirationDate)}>
                  {formatDate(card.expirationDate)}
                </span>
              </b>{" "}
              &nbsp;
              <DeleteButton
                itemId={card.rewardId}
                deleteUrl="http://localhost:8080/expiring-rewards"
                //as the parent, tell child deleteButton to refresh the card list after deletion
                onDelete={fetchRewards}
                itemName="benefit"
              >
                <span className="material-symbols-outlined used">
                  check_circle
                </span>
              </DeleteButton>
            </li>
          </ul>
        </li>
      );
    });

  return (
    <div className="sideBySideCard">
      <h2>Expiring Rewards</h2>

      {/* Display error message or no reward found at top of card */}
      {error && <p className="center red">Error: {error}</p>}
      {!error && filteredRewards.length === 0 && (
        <p className="center">No expiring rewards found.</p>
      )}

      {/* Only show the list if there are rewards */}
      {filteredRewards.length > 0 && (
        <>
          <p>
            <i>
              Mark the reward as used by clicking the check icon to remove it
              from the list.
            </i>
          </p>
          <ul>
            {/* Populate the list items */}
            {cardExpiringRewards}
          </ul>
        </>
      )}
    </div>
  );
}

export default ExpiringRewards;
