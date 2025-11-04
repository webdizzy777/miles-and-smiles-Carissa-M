import { formatDate, formatCurrency, formatDueDate } from "./Functions";
import { useState, useEffect } from "react";
function FinancialSnapshot({userId}){

    const [financialData, setFinancialData] = useState([]);
    const [error, setError] = useState(null);   

    // Fetch financial snapshot data when the component mounts or if userId changes
    useEffect(() => {

        async function fetchFinancialSnapshot() {
            try {
                const response = await fetch(`http://localhost:8080/cards/user/${userId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (response.ok) {
                    // Convert the response to a JS object and clear any previous errors
                    const data = await response.json();
                    setFinancialData(data);
                    setError(null); 
                } else {
                    // Display an error message if the fetch fails
                    setError('Failed to fetch financial snapshot');
                }
            } catch (err) {
                // Display an error message if there is a network or other error
                setError('An error occurred while fetching financial snapshot:' + err.message);
            }
        }

        if (userId) {
            //clear the old financial data then load the new user's data
            setFinancialData([]);
            fetchFinancialSnapshot();
        }

    }, [userId]);

    //find lowest APR
    const aprs = financialData.map((c)=>c.apr);
    const lowestApr = aprs.length > 0 ? Math.min(...aprs) : null;

    //fill out the table
    //red style if utilization above threshold
    const cardRow = financialData.map((c) => {
        const utilization = ((c.balance / c.creditLimit).toFixed(2))*100;
        return (
            <tr key={c.cardId}>
            <td title={c.cardName}>{c.cardName}</td>
            <td title={c.fee}>${c.fee}</td>
            <td title={formatDate(c.dateOpened)}>{formatDate(c.dateOpened)}</td>
            <td title={c.apr}>
                {lowestApr !== null && c.apr === lowestApr
                ? <span className="green"><b>{c.apr}%</b></span>
                : `${c.apr}%`}
            </td>
            <td title={formatCurrency(c.creditLimit)}>{formatCurrency(c.creditLimit)}</td>
            <td title={formatCurrency(c.balance)}>{formatCurrency(c.balance)}</td>
            <td title={(isNaN(utilization)) ? "-" : (utilization + '%')}>
                {utilization > 30
                ? <span className="red">{utilization}%</span>
                : `${(isNaN(utilization)) ? "-" : (utilization + '%')}`}
            </td>
            <td title={formatDueDate(c.dueDay)}>{(formatDueDate(c.dueDay)) ? formatDueDate(c.dueDay) : "-"}</td>
            </tr>
        );
    });


    return(
        <>
            <div className="card">
                <h2 className="center">Financial Snapshot</h2>
                <div className="tableContainer">

                    {/*Display error message if financial data isn't found */} 
                    {error && <p>{error}</p>}
                    {financialData.length === 0 && !error && (
                        <p className="center" >No financial data found.</p>
                    )}

                    {/* Only show table if there is financial data */}
                    {financialData.length > 0 && (                
                    <table>
                        <thead>
                            <tr>
                                <th title="Card Name">Card Name</th>
                                <th title="Fee">Fee</th>
                                <th title="Date Opened">Date Opened</th>
                                <th title="APR">APR</th>
                                <th title="Credit Limit">Credit Limit</th>
                                <th title="Balance">Balance</th>
                                <th title="Utilization">Utilization</th>
                                <th title="Due Date">Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cardRow}
                        </tbody>
                    </table>
                    )}
                </div>

            </div>
        </>
    );
}

export default FinancialSnapshot;