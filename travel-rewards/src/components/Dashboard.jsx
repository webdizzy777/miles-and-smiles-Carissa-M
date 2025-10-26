import PointsTable from './PointsTable.jsx';
import AddCard from './AddCard.jsx';
import ExpiringRewards from './ExpiringRewards.jsx';
import NotableBenefits from './NotableBenefits.jsx';
import FinancialSnapshot from './FinancialSnapshot.jsx';

function Dashboard({cards, setCards}){

    return(
        <>
            <main>
                <div className='center'>
                    <AddCard></AddCard>
                </div>
                <PointsTable cards={cards}></PointsTable>
                <div className='container'>
                    <ExpiringRewards cards={cards} setCards={setCards}></ExpiringRewards>
                    <NotableBenefits cards={cards}></NotableBenefits>
                    <FinancialSnapshot cards={cards}></FinancialSnapshot>
                </div> 
            </main>
        </>
    );

}

export default Dashboard