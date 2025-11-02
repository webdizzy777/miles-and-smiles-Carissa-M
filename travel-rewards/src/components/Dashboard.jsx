import PointsTable from './PointsTable.jsx';
import AddCard from './AddCard.jsx';
import ExpiringRewards from './ExpiringRewards.jsx';
import NotableBenefits from './NotableBenefits.jsx';
import FinancialSnapshot from './FinancialSnapshot.jsx';

function Dashboard({userId}){

    return(
        <>
            <main>
                <div className='center'>
                    <AddCard userId={userId}></AddCard>
                </div>
                <PointsTable userId={userId}></PointsTable>
                <div className='container'>
                    <ExpiringRewards userId={userId}></ExpiringRewards>
                    <NotableBenefits userId={userId}></NotableBenefits>
                </div> 
                <FinancialSnapshot userId={userId}></FinancialSnapshot>
            </main>
        </>
    );

}

export default Dashboard