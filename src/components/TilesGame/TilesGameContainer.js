import React from 'react';
import { connect } from 'react-redux';
import { getRandomElements, shuffleArr } from '../../common/array-handlers';
import { initializeGame, setCardOpened, setCardsSolved, setCardsClosed, roundFinished, finishTheGame } from '../../redux/tile-game-reducer'
import TilesGame from './TilesGame';

//This container component connects our UI of Tiles Game to Redux store and processing whole game logic to keep our presentational component clean
//This component can be refactored to Functional component with useState and useEffect hooks
//If needed all logical methods can be moved to separated modules

class TilesGameContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstCard: null,//This local state is needed to store temporary data about selected cards. This data also can be stored in global Redux store
            secondCard: null
        }
    }
    prepareCards = () => {
        let cardsContent = getRandomElements(this.props.fieldHeight * this.props.fieldWidth / 2, this.props.cardsImages); //Choosing random pictures
        cardsContent = shuffleArr(cardsContent.concat(cardsContent));
        let cardsForGame = [];//Creating an array of cards for the game with random pictures
        for (let i = 0; i < cardsContent.length; i++) {
            cardsForGame.push({ content: cardsContent[i], id: i, opened: false, solved: false })
        }
        this.props.initializeGame(cardsForGame);
    }
    handleRound = () => {//Logic, that is provided when second picture was picked
        if (this.props.cards[this.state.firstCard].content === this.props.cards[this.state.secondCard].content) {
            this.props.setCardsSolved(this.state.firstCard, this.state.secondCard);
            this.setState({ firstCard: null, secondCard: null });
            this.props.roundFinished(true)
        } else {
            this.props.roundFinished(false);
            this.props.setCardsClosed(this.state.firstCard, this.state.secondCard);
            this.setState({ firstCard: null, secondCard: null });
        }
    }
    openCard = (cardId) => {
        if (this.state.firstCard === null) {
            this.setState({ firstCard: cardId });
            this.props.setCardOpened(cardId);
        } else {
            if (this.state.secondCard === null && cardId !== this.state.firstCard) {
                this.setState({ secondCard: cardId });
                this.props.setCardOpened(cardId);
                setTimeout(() => { this.handleRound() }, 700)//Delay of round processing can be changed here
            }
        }
    }

    componentDidMount() {
        this.prepareCards();
    }
    componentDidUpdate(prevProps) {
        (prevProps.cardsSolved !== this.props.cardsSolved) && (this.props.cardsSolved === this.props.cards.length)
        && this.props.finishTheGame() // Checking if all cards were solved
    }
    render() {
        return (
                <TilesGame
                    cards={this.props.cards}
                    openCard={this.openCard}
                    movesCount={this.props.movesCount}
                    gameIsFinished={this.props.gameIsFinished}
                    initializeGame={this.prepareCards} />
        )
    }
}
const mapStateToProps = (state) => ({
    cards: state.tiles.cards,
    cardsSolved: state.tiles.cardsSolved,
    movesCount: state.tiles.movesCount,
    gameIsFinished: state.tiles.gameIsFinished,
    fieldHeight: state.tiles.fieldHeight,
    fieldWidth: state.tiles.fieldWidth,
    cardsImages: state.tiles.cardsImages
})
const mapDispatchToProps = { initializeGame, setCardOpened, setCardsSolved, setCardsClosed, finishTheGame, roundFinished }
export default connect(mapStateToProps, mapDispatchToProps)(TilesGameContainer)