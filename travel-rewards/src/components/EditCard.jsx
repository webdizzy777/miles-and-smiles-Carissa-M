import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function EditCard({ userId }) {
  const { cardId } = useParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fields for card data
  const [cardName, setCardName] = useState("Card Name");
  const [fee, setFee] = useState(0);
  const [dateOpened, setDateOpened] = useState("");
  const [apr, setApr] = useState(0);
  const [creditLimit, setCreditLimit] = useState(0);
  const [balance, setBalance] = useState(0);
  const [dueDay, setDueDay] = useState("");

  // Fields for point multipliers
  const [gasPoints, setGasPoints] = useState(0);
  const [restaurantPoints, setRestaurantPoints] = useState(0);
  const [supermarketPoints, setSupermarketPoints] = useState(0);
  const [discountPoints, setDiscountPoints] = useState(0);
  const [wholesalePoints, setWholesalePoints] = useState(0);
  const [onlineShoppingPoints, setOnlineShoppingPoints] = useState(0);
  const [utilityPoints, setUtilityPoints] = useState(0);
  const [internetPoints, setInternetPoints] = useState(0);
  const [phonePoints, setPhonePoints] = useState(0);
  const [travelPoints, setTravelPoints] = useState(0);
  const [otherPoints, setOtherPoints] = useState(0);

  // Arrays for rewards and benefits
  const [expiringRewards, setExpiringRewards] = useState([
    { title: "", details: "", expirationDate: "2025-01-01" },
  ]);

  const [notableBenefits, setNotableBenefits] = useState([
    { title: "", description: "" },
  ]);

  // Prefill data on load or cardId change
  useEffect(() => {
    async function fetchCardDetails() {
      try {
        //Fetch card details
        const cardResponse = await fetch(
          `http://localhost:8080/cards/${cardId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!cardResponse.ok) {
          setError("Failed to fetch card details");
        }
        // Convert response to JS object/array
        const cardData = await cardResponse.json();

        setCardName(cardData.cardName || "");
        setFee(cardData.fee || 0);
        setDateOpened(cardData.dateOpened || "");
        setApr(cardData.apr || 0);
        setCreditLimit(cardData.creditLimit || 0);
        setBalance(cardData.balance || 0);
        setDueDay(cardData.dueDay || "");

        //Fetch point multipliers
        const pointResponse = await fetch(
          `http://localhost:8080/point-earnings/card/${cardId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (pointResponse.ok) {
          // Convert response to JS object/array
          const pointData = await pointResponse.json();
          // Use a switch statement to set each category's points based on categoryId that we already know from the database
          pointData.forEach((point) => {
            switch (point.categoryId) {
              case 1:
                setGasPoints(point.multiplier || 0);
                break;
              case 2:
                setRestaurantPoints(point.multiplier || 0);
                break;
              case 3:
                setSupermarketPoints(point.multiplier || 0);
                break;
              case 4:
                setDiscountPoints(point.multiplier || 0);
                break;
              case 5:
                setWholesalePoints(point.multiplier || 0);
                break;
              case 6:
                setOnlineShoppingPoints(point.multiplier || 0);
                break;
              case 7:
                setUtilityPoints(point.multiplier || 0);
                break;
              case 8:
                setInternetPoints(point.multiplier || 0);
                break;
              case 9:
                setPhonePoints(point.multiplier || 0);
                break;
              case 10:
                setTravelPoints(point.multiplier || 0);
                break;
              case 11:
                setOtherPoints(point.multiplier || 0);
                break;
              default:
                break;
            }
          });
        }

        // Fetch expiring rewards
        const rewardResponse = await fetch(
          `http://localhost:8080/expiring-rewards/card/${cardId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (rewardResponse.ok) {
            // Convert response to JS object/array
          const rewardData = await rewardResponse.json();
          setExpiringRewards(
            // if rewards exist, set the object, else set a default blank line, backend already returns an array of objects so no loop is needed
            rewardData.length
              ? rewardData
              : [{ title: "", details: "", expirationDate: "2025-01-01" }]
          );
        }

        // Fetch notable benefits
        const benefitResponse = await fetch(
          `http://localhost:8080/notable-benefits/card/${cardId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (benefitResponse.ok) {
           // Parse JSON response into JS object/array
          const benefitData = await benefitResponse.json();
          setNotableBenefits(
            // if benefits exist, set the object, else set a default blank line, backend already returns an array of objects so no loop is needed
            benefitData.length ? benefitData : [{ title: "", description: "" }]
          );
        }
      } catch (err) {
        setError("Error loading card details: " + err.message);
      }
    }

    fetchCardDetails();
  }, [cardId]);

  //Handler functions

 // When a reward or benefit input changes, update the object at that index in the array with the new field value

  function handleRewardChange(index, field, value) {
    const updated = [...expiringRewards];
    updated[index][field] = value;
    setExpiringRewards(updated);
  }

  function handleBenefitChange(index, field, value) {
    const updated = [...notableBenefits];
    updated[index][field] = value;
    setNotableBenefits(updated);
  }

//Add a new line to the existing data

  function handleAddRewardLine() {
    setExpiringRewards([
      ...expiringRewards,
      { title: "", details: "", expirationDate: "2025-01-01" },
    ]);
  }

  function handleAddBenefitLine() {
    setNotableBenefits([...notableBenefits, { title: "", description: "" }]);
  }

  // Filter out the line at the given index to remove it
  function handleRemoveRewardLine(index) {
    setExpiringRewards((currentReward) => currentReward.filter((_ignoredReward, i) => i !== index));
  }

  function handleRemoveBenefitLine(index) {
    setNotableBenefits((currentBenefit) => currentBenefit.filter((_ignoredBenefit, i) => i !== index));
  }

  // Handle update submit
  async function handleUpdate(e) {
    // Prevent default form submission
    e.preventDefault();
    setError(null);
    try {
      // Create updated card object
      const updatedCard = {
        cardName,
        dateOpened,
        fee,
        apr,
        creditLimit,
        balance,
        dueDay,
        userId,
      };
      // Send PUT request to update card
      const cardUpdateResponse = await fetch(
        `http://localhost:8080/cards/${cardId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCard),
        }
      );

      if (!cardUpdateResponse.ok) {
        setError("Failed to update card");
        return;
      }

      // Create array of updated point multipliers to send to backend
      const categories = [
        { id: 1, value: gasPoints },
        { id: 2, value: restaurantPoints },
        { id: 3, value: supermarketPoints },
        { id: 4, value: discountPoints },
        { id: 5, value: wholesalePoints },
        { id: 6, value: onlineShoppingPoints },
        { id: 7, value: utilityPoints },
        { id: 8, value: internetPoints },
        { id: 9, value: phonePoints },
        { id: 10, value: travelPoints },
        { id: 11, value: otherPoints },
      ];

      // For each category, send a POST request to update the point multiplier
      for (const cat of categories) {
        const pointUpdateResponse = await fetch(
          `http://localhost:8080/point-earnings`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              //ensure string input is converted to number
              cardId: parseInt(cardId),
              categoryId: cat.id,
              multiplier: parseFloat(cat.value) || 0,
            }),
          }
        );

        if (!pointUpdateResponse.ok) {
          setError(`Failed to update points for category ID ${cat.id}`);
          return;
        }
      }

      // Update expiring rewards
      for (const reward of expiringRewards) {
        await fetch(`http://localhost:8080/expiring-rewards`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cardId: parseInt(cardId),
            title: reward.title,
            details: reward.details,
            expirationDate: reward.expirationDate,
          }),
        });
      }

      // Update notable benefits
      for (const benefit of notableBenefits) {
        await fetch(`http://localhost:8080/notable-benefits`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cardId: parseInt(cardId),
            title: benefit.title,
            description: benefit.description,
          }),
        });
      }

      // Redirect to dashboard after successful update
      await navigate("/dashboard");
    } catch (err) {
      setError("Error updating card: " + err.message);
    }
  }

  return (
    <main>
      <div className="card">
        <h2>Edit Card: {cardName || "Loading..."}</h2>
        {error && <p className="red">{error}</p>}
        <form onSubmit={handleUpdate}>
          <label>
            <b>Card Name</b>
          </label>
          <input
            type="text"
            className="addCardInput"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            required
          />

          <div className="containerNoGap">
            <div className="sideBySideCardMinPadding">
              <label>
                <b>Annual Fee</b>
              </label>
              <input
                type="number"
                className="addCardInput"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
              />
            </div>
            <div className="sideBySideCardMinPadding">
              <label>
                <b>Date Opened</b>
              </label>
              <input
                type="date"
                className="addCardInput"
                value={dateOpened}
                onChange={(e) => setDateOpened(e.target.value)}
              />
            </div>
          </div>

          <div className="containerNoGap">
            <div className="sideBySideCardMinPadding">
              <label>
                <b>APR</b>
              </label>
              <input
                type="number"
                step="0.01"
                className="addCardInput"
                value={apr}
                onChange={(e) => setApr(e.target.value)}
              />
            </div>
            <div className="sideBySideCardMinPadding">
              <label>
                <b>Credit Limit</b>
              </label>
              <input
                type="number"
                className="addCardInput"
                value={creditLimit}
                onChange={(e) => setCreditLimit(e.target.value)}
              />
            </div>
          </div>

          <div className="containerNoGap">
            <div className="sideBySideCardMinPadding">
              <label>
                <b>Balance</b>
              </label>
              <input
                type="number"
                step="0.01"
                className="addCardInput"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </div>
            <div className="sideBySideCardMinPadding">
              <label>
                <b>Day of Month Due</b>
              </label>
              <input
                type="number"
                className="addCardInput"
                value={dueDay}
                onChange={(e) => setDueDay(e.target.value)}
              />
            </div>
          </div>

          <h3>Point Multipliers</h3>
          <div className="containerNoGap">
            <div className="sideBySideThreeCardForm">
              <label>
                <b>Gas</b>
              </label>
              <input
                type="number"
                className="addCardInput"
                step="0.01"
                value={gasPoints}
                onChange={(e) => setGasPoints(e.target.value)}
              />
            </div>
            <div className="sideBySideThreeCardForm">
              <label>
                <b>Restaurant</b>
              </label>
              <input
                type="number"
                className="addCardInput"
                step="0.01"
                value={restaurantPoints}
                onChange={(e) => setRestaurantPoints(e.target.value)}
              />
            </div>
            <div className="sideBySideThreeCardForm">
              <label>
                <b>Supermarket</b>
              </label>
              <input
                type="number"
                className="addCardInput"
                step="0.01"
                value={supermarketPoints}
                onChange={(e) => setSupermarketPoints(e.target.value)}
              />
            </div>
          </div>

          <div className="containerNoGap">
            <div className="sideBySideThreeCardForm">
              <label>
                <b>Discount Store</b>
              </label>
              <input
                type="number"
                className="addCardInput"
                step="0.01"
                value={discountPoints}
                onChange={(e) => setDiscountPoints(e.target.value)}
              />
            </div>
            <div className="sideBySideThreeCardForm">
              <label>
                <b>Wholesale</b>
              </label>
              <input
                type="number"
                className="addCardInput"
                step="0.01"
                value={wholesalePoints}
                onChange={(e) => setWholesalePoints(e.target.value)}
              />
            </div>
            <div className="sideBySideThreeCardForm">
              <label>
                <b>Online Shopping</b>
              </label>
              <input
                type="number"
                className="addCardInput"
                step="0.01"
                value={onlineShoppingPoints}
                onChange={(e) => setOnlineShoppingPoints(e.target.value)}
              />
            </div>
          </div>

          <div className="containerNoGap">
            <div className="sideBySideThreeCardForm">
              <label>
                <b>Utilities</b>
              </label>
              <input
                type="number"
                className="addCardInput"
                step="0.01"
                value={utilityPoints}
                onChange={(e) => setUtilityPoints(e.target.value)}
              />
            </div>
            <div className="sideBySideThreeCardForm">
              <label>
                <b>Internet</b>
              </label>
              <input
                type="number"
                className="addCardInput"
                step="0.01"
                value={internetPoints}
                onChange={(e) => setInternetPoints(e.target.value)}
              />
            </div>
            <div className="sideBySideThreeCardForm">
              <label>
                <b>Phone</b>
              </label>
              <input
                type="number"
                className="addCardInput"
                step="0.01"
                value={phonePoints}
                onChange={(e) => setPhonePoints(e.target.value)}
              />
            </div>
          </div>

          <div className="containerNoGap">
            <div className="sideBySideThreeCardForm">
              <label>
                <b>Travel</b>
              </label>
              <input
                type="number"
                className="addCardInput"
                step="0.01"
                value={travelPoints}
                onChange={(e) => setTravelPoints(e.target.value)}
              />
            </div>
            <div className="sideBySideThreeCardForm">
              <label>
                <b>Other</b>
              </label>
              <input
                type="number"
                className="addCardInput"
                step="0.01"
                value={otherPoints}
                onChange={(e) => setOtherPoints(e.target.value)}
              />
            </div>
          </div>

          <h3>Expiring Rewards</h3>
          {/* For each reward in the array, create input fields for title, use by date, and details */}
          {expiringRewards.map((reward, index) => (
            <div key={index} className="containerNoGap">
              <div className="sideBySideCardMinPadding">
                <label>
                  <b>Title</b>
                </label>
                <input
                  type="text"
                  className="addCardInput"
                  value={reward.title}
                  onChange={(e) =>
                    handleRewardChange(index, "title", e.target.value)
                  }
                />
              </div>
              <div className="sideBySideCardMinPadding">
                <label>
                  <b>Use By Date</b>
                </label>
                <input
                  type="date"
                  className="addCardInput"
                  value={reward.expirationDate}
                  onChange={(e) =>
                    handleRewardChange(index, "expirationDate", e.target.value)
                  }
                />
              </div>
              <div className="sideBySideCardMinPadding">
                <label>
                  <b>Details</b>
                </label>
                <input
                  type="text"
                  className="addCardInput"
                  value={reward.details}
                  onChange={(e) =>
                    handleRewardChange(index, "details", e.target.value)
                  }
                />
              </div>
              <div className="alignMiddle">
                <b>
                  <span
                    className="material-symbols-outlined close"
                    title="Remove line"
                    onClick={() => handleRemoveRewardLine(index)}
                  >
                    close
                  </span>
                </b>
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddRewardLine}>
            + Add Reward
          </button>

          <h3>Notable Benefits</h3>
          {notableBenefits.map((benefit, index) => (
            <div key={index} className="containerNoGap">
              <div className="sideBySideCardMinPadding">
                <label>
                  <b>Title</b>
                </label>
                <input
                  type="text"
                  className="addCardInput"
                  value={benefit.title}
                  onChange={(e) =>
                    handleBenefitChange(index, "title", e.target.value)
                  }
                />
              </div>
              <div className="sideBySideCardMinPadding">
                <label>
                  <b>Description</b>
                </label>
                <input
                  type="text"
                  className="addCardInput"
                  value={benefit.description}
                  onChange={(e) =>
                    handleBenefitChange(index, "description", e.target.value)
                  }
                />
              </div>
              <div className="alignMiddle">
                <b>
                  <span
                    className="material-symbols-outlined close"
                    title="Remove line"
                    onClick={() => handleRemoveBenefitLine(index)}
                  >
                    close
                  </span>
                </b>
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddBenefitLine}>
            + Add Benefit
          </button>

          <div className="center">
            <button type="button" onClick={() => navigate("/cardManagement")}>
              Cancel
            </button>
            <button type="submit">Update Card</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditCard;
