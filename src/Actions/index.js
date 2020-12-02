import { SHUFFLE_DECK, ADD_BOTCARDS, ADD_PLAYERCARDS, CHECK_BOTRES, CHECK_PLAYERRES, WINNER } from './actionTypes';

import { createRoutine } from 'redux-saga-routines';

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

export const actions = {
    shufflecard : createRoutine(SHUFFLE_DECK),
    addBotcards : createRoutine(ADD_BOTCARDS),
    addPlayercards : createRoutine(ADD_PLAYERCARDS)
}
