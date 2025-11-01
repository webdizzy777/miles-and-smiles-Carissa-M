import { useState, useEffect } from 'react';

function PointsTable({ userId }) {
  const [earningData, setEarningData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch points data when the component mounts or if userId changes
  useEffect(() => {
    async function fetchPoints() {
      try {
        const response = await fetch(`http://localhost:8080/point-earnings/user/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
          // Convert the response to JSON
          const data = await response.json();
          setEarningData(data);
        } else {
          // Display an error message if the fetch fails
          console.log('Error fetching points data');
          setError('Failed to fetch points');
        }
      } catch (err) {
        // Display an error message if there is a network or other error
        console.error('Fetch error:', err);
        setError('An error occurred while fetching points');
      }
    }
    
    if (userId) {
      //clear the old points data then load the new user's data
      setEarningData([]);
      fetchPoints();
    }
  }, [userId]);

    // Map through all data retrieved to get each cardName, sort alphabetically, remove duplicates with a Set,
    // and convert the result back into an array using spread syntax so we can use it for the column header.
    const cards = [...new Set(earningData.map(data => data.cardName).sort())];

    // Do the same to group points by category so each row header will be a category
    const categories = [...new Set(earningData.map(data => data.categoryName).sort())];

  // Create a nested object to hold the category then card multipliers for that category
  const tableData = {};
  earningData.forEach(pointCategory => {
    //if the object for this category doesn't exist yet, create it
    if (!tableData[pointCategory.categoryName]) {
      tableData[pointCategory.categoryName] = {};
    }
    //Nest the objects by cardName and set the multiplier value
    tableData[pointCategory.categoryName][pointCategory.cardName] = pointCategory.multiplier;
  });

  // Find the max multiplier per category by declaring an empty object,
  // then map through our category Set, if the category is in the tableData object,
  // then add it to the values array and set the maxByCategory object key to the max value from that array
  const maxByCategory = {};
  categories.forEach(category => {
    const values = cards.map(card => tableData[category]?.[card] || 0);
    maxByCategory[category] = Math.max(...values);
  });

  return (
    <div className="card">
      <h2 className="center">Points Table</h2>
      <div className="tableContainer">

        {/* Show error or empty message at the top of the table */}
        {error && <p className="center red">Error: {error}</p>}
        {!error && earningData.length === 0 && (
          <p className="center">No points data found.</p>
        )}

        {/* Only render the table if there is data */}
        {earningData.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Category</th>
                {cards.map(card => (
                  // Display each card name as column header
                  <th key={card}>{card}</th> 
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                //for each table row, set the header to the category name
                <tr key={category}>
                  <th>{category}</th>
                  {cards.map(card => {
                    //and if the category exist for this card, set the value to the card's multiplier
                    const value = tableData[category]?.[card];
                    //check if the value set above is equal to what was found for the max in this category
                    const isMax = value === maxByCategory[category] && value > 0;
                    return (
                      <td key={card}>
                        {value
                          ? isMax
                            ? <span className="green"><b>{value}</b></span>
                            : value
                          : '-'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
}

export default PointsTable;
