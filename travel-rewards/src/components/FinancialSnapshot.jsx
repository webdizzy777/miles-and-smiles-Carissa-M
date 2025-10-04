import { formatDate, formatCurrency, formatDueDate } from "./Functions";
function FinancialSnapshot({cards}){

    //find lowest APR
    const aprs = cards.map((c)=>c.apr);
    const lowestApr = Math.min(...aprs);

    //fill out the table
    //red style if utilization above threshold
    const cardNameF = cards.map((c) => {
        const utilization = ((c.balance / c.creditLimit).toFixed(2))*100;
        return (
            <tr key={c.id}>
            <td title={c.cardName}>{c.cardName}</td>
            <td title={c.fee}>${c.fee}</td>
            <td title={formatDate(c.dateOpened)}>{formatDate(c.dateOpened)}</td>
            <td title={c.apr}>{c.apr === lowestApr
                ? <span className="green"><b>{c.apr}%</b></span>
                : `${c.apr}%`
                }</td>
            <td title={formatCurrency(c.creditLimit)}>{formatCurrency(c.creditLimit)}</td>
            <td title={formatCurrency(c.balance)}>{formatCurrency(c.balance)}</td>
            <td title={(isNaN(utilization)) ? "-" : (utilization + '%')}>
                {utilization > 30
                ? <span className="red">{utilization}%</span>
                : `${(isNaN(utilization)) ? "-" : (utilization + '%')}`}
            </td>
            <td title={formatDueDate(c.dueDate)}>{(formatDueDate(c.dueDate)) ? formatDueDate(c.dueDate) : "-"}</td>
            </tr>
        );
    });


    return(
        <>
            <div className="card">
                <h2 className="center">Financial Snapshot</h2>
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
                        {cardNameF}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default FinancialSnapshot;