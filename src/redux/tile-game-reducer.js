import { getRandomElements } from "../common/array-handlers";
import { shuffleArr } from './../common/array-handlers';

const initialState = {
    cardsImages: [0x1F43F, 0x1F42E, 0x1F42A, 0x1F428, 0x1F998, 0x1F408, 0x1F437, 0x1F439,
        0x1F43C, 0x1F986, 0x1F425, 0x1F438, 0x1F419, 0x1FAB2, 0x1F41D, 0x1F41E],
    fieldWidth: 4,
    fieldHeight: 4,
    cards: [],
    firstCard: null,
    secondCard: null,
    moveIsDone: false,
    movesCount: null,
    cardsSolved: 0,
    gameIsFinished: false
}

const INITIALIZE_GAME = 'INITIALIZE_GAME';
export const initializeGame = () => ({type: INITIALIZE_GAME})

const OPEN_CARD = 'OPEN_CARD';
export const openCard = (cardId) => ({type: OPEN_CARD, cardId})

const HANDLE_MOVE = 'HANDLE_MOVE';
export const handleMove = () => ({type: HANDLE_MOVE})

export const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_GAME :
            let cardsContent = getRandomElements(state.fieldHeight*state.fieldWidth/2, state.cardsImages); //Choosing random pictures
            cardsContent = shuffleArr(cardsContent.concat(cardsContent));
            let cardsForGame = [];
            for (let i = 0; i <cardsContent.length; i++) {
                cardsForGame.push({content: cardsContent[i], id: i, opened: false, solved: false}) 
            }
            return {...state, cards: cardsForGame, movesCount: 0, cardsSolved: 0, gameIsFinished: false}
        case OPEN_CARD :
            if (state.firstCard === null) {
            return {...state,
            cards: state.cards.map(card => card.id === action.cardId ? {...card, opened: true} : card),
            firstCard: action.cardId};
            } else {
                if (state.secondCard === null && action.cardId !== state.firstCard) {
                return {...state,
                    cards: state.cards.map(card => card.id === action.cardId ? {...card, opened: true} : card),
                    secondCard: action.cardId,
                    moveIsDone: true};
                } else return state
            }
        case HANDLE_MOVE :
            return state.cards[state.firstCard].content === state.cards[state.secondCard].content ?
            {...state, cards: state.cards.map(card => (card.id === state.firstCard || card.id === state.secondCard) ? {...card, solved: true} : card), 
            moveIsDone: false,
            firstCard: null,
            secondCard: null,
            movesCount: state.movesCount + 1,
            cardsSolved: state.cardsSolved + 2,
            gameIsFinished: state.cardsSolved === state.cards.length - 2 && true} :
            {...state, cards: state.cards.map(card => ({...card, opened: false})), moveIsDone: false, firstCard: null, secondCard: null,  movesCount: state.movesCount + 1}
        default: return state
    }
}

