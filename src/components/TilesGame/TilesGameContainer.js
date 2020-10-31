import React from 'react';
import { connect } from 'react-redux';
import {initializeGame, openCard, handleMove} from '../../redux/tile-game-reducer'
import TilesGame from './TilesGame';


class TilesGameContainer extends React.Component {
    componentDidMount () {
        this.props.initializeGame();
    }
    componentDidUpdate () {
        this.props.moveIsDone && setTimeout(()=>{this.props.handleMove()}, 500);
    }
    render () {
        return (
            <TilesGame 
            cards={this.props.cards} 
            openCard={this.props.openCard}
            movesCount={this.props.movesCount}
            gameIsFinished={this.props.gameIsFinished}
            initializeGame={this.props.initializeGame}/>
        )
    }
}
const mapStateToProps = (state) => ({
    cards: state.tiles.cards,
    moveIsDone: state.tiles.moveIsDone,
    movesCount: state.tiles.movesCount,
    gameIsFinished: state.tiles.gameIsFinished
})
const mapDispatchToProps = {initializeGame, openCard, handleMove}
export default connect(mapStateToProps, mapDispatchToProps)(TilesGameContainer)