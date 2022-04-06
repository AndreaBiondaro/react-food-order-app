import { FunctionComponent } from "react";
import classes from './Card.module.css';

const Card: FunctionComponent<{}> = ({ children }) => {
    return <div className={classes.card}>{children}</div>;
};

export default Card;