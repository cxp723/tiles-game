import Card from "./Card/Card";
import classes from './TilesGame.module.css'
import Modal from './Modal/Modal';

//This is clean presentational component, that gets props and returns JSX
//Modal Window is showed, if game was finished

const TilesGame = ({cards, openCard, movesCount, gameIsFinished, initializeGame}) => (
        <>
            <div className={classes.cardField}>
                {cards.map(card => <Card key={card.id} {...card} openCard={openCard}/>)}
            </div>
            <h1 className={classes.roundsMessage}>Rounds: {movesCount}</h1>
            {gameIsFinished && <Modal initializeGame={initializeGame} movesCount={movesCount}/>}
        </>
    )


export default TilesGame;