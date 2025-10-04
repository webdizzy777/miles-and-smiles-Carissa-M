import Header from './Header.jsx';
import Footer from './Footer.jsx';

function About(){
    return(
        <>
            <Header></Header>
            <main>
                <div className="card">
                    <h2>Welcome to Miles & Smiles!</h2>
                    <p className="left">Since 1942, we have been committed to helping you maximize your travel rewards. As a family-owned business that loves to travel, we are dedicated to helping you find ways to create extraordinary experiences filled with joy, comfort, and adventure.</p>
                    <p className="left">We make it easy to track your reward points, ensuring you always know which card to use for each purchase. Many people pay fees for cards that have "use it or lose it" benefits - only to lose those benefits! Miles & Smiles helps you keep track of those benefits so you can enjoy them before they expire.</p>
                    <p className="left">We are proud to assist you in enriching your life and creating unforgettable memories.</p>
                    <p><b>As we like to say:</b><br /> 
                    Travel for free, not fees!</p>
                </div>
            </main>
            <Footer></Footer>
        </>
    );
}

export default About