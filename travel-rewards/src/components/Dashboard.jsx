import Header from './Header.jsx';
import Footer from './Footer.jsx';
import PointsTable from './PointsTable.jsx';
import AddCard from './AddCard.jsx';
import ExpiringRewards from './ExpiringRewards.jsx';
import NotableBenefits from './NotableBenefits.jsx';
import FinancialSnapshot from './FinancialSnapshot.jsx';

function Dashboard({cards, setCards}){

    return(
        <>
            <Header></Header>
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
            <Footer></Footer>
        </>
    );

}

export default Dashboard