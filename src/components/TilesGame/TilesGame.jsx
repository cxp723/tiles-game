import Card from "./Card/Card";
import classes from './TilesGame.module.css'
import Modal from './Modal/Modal';

const TilesGame = ({cards, openCard, movesCount, gameIsFinished, initializeGame}) => {
    let cardItems = cards.map(card => <Card {...card} openCard={openCard}/>)
    
    return (
        <>
            <div className={classes.cardField}>
                {cardItems}
            </div>
            <h1>Rounds: {movesCount}</h1>
            {gameIsFinished && <Modal initializeGame={initializeGame} movesCount={movesCount}/>}
        </>
    )
}

export default TilesGame;