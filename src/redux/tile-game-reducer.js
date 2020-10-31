const initialState = {
    cardsImages: [ 0x1F42E, 0x1F42A, 0x1F428, 0x1F998, 0x1F408, 0x1F437, 0x1F439,
        0x1F43C, 0x1F986, 0x1F425, 0x1F438, 0x1F419, 0x1F41D, 0x1F41E], // Here are some hardcoded emojis. We can use any images, colors and etc.
    fieldWidth: 4, //Here we can customize the size of our field, for example adding dropdown menu with difficulty levels to UI
    fieldHeight: 4,
    cards: [],
    movesCount: null,
    cardsSolved: 0,
    gameIsFinished: false
}

//Action creators:
const INITIALIZE_GAME = 'INITIALIZE_GAME';
export const initializeGame = (cardsForGame) => ({type: INITIALIZE_GAME, cardsForGame})

const OPEN_CARD = 'OPEN_CARD';
export const openCard = (cardId) => ({type: OPEN_CARD, cardId})

const FINISH_THE_GAME = 'FINISH_THE_GAME';
export const finishTheGame = () => ({type: FINISH_THE_GAME})

const SET_CARD_OPENED = 'SET_CARD_OPENED';
export const setCardOpened = (cardId) => ({type: SET_CARD_OPENED, cardId})

const SET_CARDS_SOLVED = 'SET_CARDS_SOLVED';
export const setCardsSolved = (firstCard, secondCard) => ({type: SET_CARDS_SOLVED, firstCard, secondCard})

const SET_CARDS_CLOSED = 'SET_CARDS_CLOSED';
export const setCardsClosed = (firstCard, secondCard) => ({type: SET_CARDS_CLOSED, firstCard, secondCard})

const ROUND_FINISHED = 'ROUND_FINISHED';
export const roundFinished = (guesed) => ({type: ROUND_FINISHED, guesed})

export const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_GAME :
            return {...state, cards: action.cardsForGame, movesCount: 0, cardsSolved: 0, gameIsFinished: false}
        case SET_CARD_OPENED :
            return {...state,
                cards: state.cards.map(card => card.id === action.cardId ? {...card, opened: true} : card)}
        case FINISH_THE_GAME :
            return {...state, gameIsFinished: true, cards: state.cards.map(card => ({...card, opened: false}))}
        case SET_CARDS_SOLVED :
            return {...state,
                cards: state.cards.map(card => (card.id === action.firstCard || card.id === action.secondCard) ? {...card, solved: true} : card)}
        case SET_CARDS_CLOSED :
            return {...state,
                cards: state.cards.map(card => (card.id === action.firstCard || card.id === action.secondCard) ? {...card, opened: false} : card)}
        case ROUND_FINISHED :
            return action.guesed ? {...state, movesCount: state.movesCount + 1, cardsSolved: state.cardsSolved + 2} : {...state, movesCount: state.movesCount + 1}
        default: return state
    }
}

