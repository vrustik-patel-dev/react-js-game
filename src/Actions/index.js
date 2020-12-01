import {ADD_BOTCARDS,ADD_PLAYERCARDS,CHECK_BOTRES,CHECK_PLAYERRES,WINNER} from './actionTypes';

export const addBotcards = (cardarr) => ({
    type: ADD_BOTCARDS,
    cards: cardarr,
})

export const addPlayercards = (cardarr) => ({
    type: ADD_PLAYERCARDS,
    cards: cardarr,
})

export const checkBotres = (result) => ({
    type:CHECK_BOTRES,
    res: result
})

export const checkPlayerres = (result) => ({
    type:CHECK_PLAYERRES,
    res:result
})

export const winner = () => ({
    type:WINNER
})