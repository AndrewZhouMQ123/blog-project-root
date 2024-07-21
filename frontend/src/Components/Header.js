import behelit from './behelit.png';
import './Header.css';


const Header = (props) => {
    return (
    <div className="headbox clearfix">
        <div className="frame">
            <a href="http://18.189.30.220:8080/api"> 
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