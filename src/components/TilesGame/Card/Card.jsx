import classes from './Card.module.css'
import cn from 'classnames';

const Card = ({content, id, opened, solved, openCard}) => {
    return (
        <div className={cn(classes.cardContainer, opened && classes.openedCard, solved && classes.solvedCard)}
        onClick={()=>{!solved && openCard(id)}}>
            <div className={classes.card}>
                <div className={classes.cardContent}>
                    {String.fromCodePoint(content)}
                </div>
                <div className={classes.cardBack}>
    
                </div>
            </div>
        </div>
    )
}
export default Card;