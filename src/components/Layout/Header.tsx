import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";

import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';

type HeaderProps = {
    onShowCart: () => void;
};

const Header = ({ onShowCart }: HeaderProps) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} />
            </div>
        </Fragment>
    );
}

export default Header;