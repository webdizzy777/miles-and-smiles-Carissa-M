import { Link } from "react-router-dom";

function Footer(){
    return(
        <>
            <footer>
                <h3 className="center">Get in touch with us!</h3>
                <address>
                    <p className="center">
                        <span className="material-symbols-outlined purple">
                            phone_in_talk
                        </span> &nbsp;
                        <a href="tel:+3145555555">(314) 555-5555</a>
                        &nbsp; |
                        &nbsp;<span className="material-symbols-outlined purple">
                            map
                        </span>&nbsp;
                        615 222 S Meramec Ave., Suite 202, St. Louis, MO 63105
                        &nbsp; |
                        &nbsp;<span className="material-symbols-outlined purple">
                            alternate_email
                        </span>&nbsp;
                        <a href="mailto:support@example.com">support@example.com</a>
                    </p>
                </address>
                <p className="center"><Link to='/dashboard'>Dashboard</Link> | <Link to='/about'>About Us</Link></p>
                <p className="center">© {new Date().getFullYear()} Miles & Smiles Rewards Tracker. This is a student project not affiliated with any airline or company.</p>
            </footer>
        </>
    );
}

export default Footer;