import { useEffect, useState } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import logo from "../images/logo.png";

const NavBar = () => {
    const routes = useLocation().pathname;
    const [menuActive, setMenuActive] = useState(false);

    useEffect(() => {
        setMenuActive(false);
    }, [routes]);

    return (
        <nav className="informationNavbar">
            <div className="header">
                <Link to="/">
                    <div className="logo" onClick={() => setMenuActive(false)}>
                        <img src={logo} alt="" />
                    </div>
                </Link>
                <h1>DEL ROSARIO INFORMATION MANAGEMENT SYSTEM</h1>
                <NavLink to="/login" >
                    <div className='login' >LOGIN</div>
                </NavLink>
                <div className={(menuActive ? "hamburger-menu active" : "hamburger-menu")} onClick={() => setMenuActive(!menuActive)}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
            <div className={menuActive ? "links active" : "links"}>
                <Link to="/home" className={(routes === "/home") ? 'active' : ''}>HOME</Link>
                <Link to="/about" className={(routes === "/about") ? 'active' : ''}>ABOUT US</Link>
                <Link to="/contact" className={(routes === "/contact") ? 'active' : ''}>CONTACT US</Link>
            </div>
            <div className={menuActive ? "menu-overlay active" : "menu-overlay"} onClick={() => setMenuActive(false)}></div>
        </nav>
    );
}

export default NavBar;