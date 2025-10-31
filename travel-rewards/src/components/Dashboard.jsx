import PointsTable from './PointsTable.jsx';
import AddCard from './AddCard.jsx';
import ExpiringRewards from './ExpiringRewards.jsx';
import NotableBenefits from './NotableBenefits.jsx';
import FinancialSnapshot from './FinancialSnapshot.jsx';

function Dashboard({cards, setCards, userId}){

    return(
        <>
            <main>
                <div className='center'>
                    <AddCard></AddCard>
                </div>
                <PointsTable cards={cards} userId={userId}></PointsTable>
                <div className='container'>
                    <ExpiringRewards cards={cards} setCards={setCards} userId={userId}></ExpiringRewards>
                    <NotableBenefits cards={cards} userId={userId}></NotableBenefits>
                    <FinancialSnapshot cards={cards} userId={userId}></FinancialSnapshot>
                </div> 
            </main>
        </>
    );

}

export default Dashboard