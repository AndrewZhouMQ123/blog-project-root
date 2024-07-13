import behelit from './behelit.png';
import './Header.css';


const Header = (props) => {
    return (
    <div className="headbox clearfix">
        <div className="frame">
            <a href="http://localhost:3000/"> 
                <img src={behelit} alt="Behelit" className="logo"/>
            </a>
        </div>
        <h1 className="title"> {props.name}'s Web App 
            <sub className="creatorSignature"> </sub>
        </h1>
    </div>
    );
}


export default Header;