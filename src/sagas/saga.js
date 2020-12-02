import { put, all, takeEvery } from "redux-saga/effects";
import Cookies from 'js-cookie';
import axios from 'axios';

import Checkresult from '../Pages/game/checkResult'

import { actions, checkBotres, checkPlayerres, winner } from '../Actions';

let deckID = Cookies.get('localdeckid');

function* getCards(){

    //Shuffle Entire Deck

    yield put(actions.shufflecard.request());
    let getCardsPromise = new Promise((resolved,rejected)=>{
        axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`)
            .then(res=>{
                resolved(res)
            })
            .catch(err=>{
                console.log("Error in Shuffle :",err);
                alert("Server Error...! Please try again later");
                rejected()
            })
    });
    try{
        getCardsPromise.then(yield put(actions.shufflecard.success()))
        
    }catch(error){
        console.log(error);
        yield put(actions.shufflecard.failure())
    }
}

function* getPlayingCards(){

    //For BOT's Card
    
    yield put(actions.addBotcards.request({}));
    var botselectedCards = [];
    let getBotcardPromise = new Promise((resolved,rejected)=>{
        axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/`,{
            params:{
                count: 3
            }
        }).then(res=>{
            console.log("Bot cards fetched");
            res.data.cards.map((card)=>{
                botselectedCards.push([card.value,card.suit,card.image])
                return 0;
            })
            resolved()
        }).catch(err=>{
            console.log("Error in BOT cards :",err);
            alert("Server Error...! Please try again later");
            rejected()})
        })
    try {
        yield getBotcardPromise;
        let res = Checkresult(botselectedCards);
        getBotcardPromise.then(yield put(actions.addBotcards.success(botselectedCards)),yield put(checkBotres(res)));
    }catch(error){
        console.log("Error :",error);
        yield put(actions.addBotcards.failure("Failed to fetch"))
    }

    // For Player's card

    yield put(actions.addPlayercards.request({}));
    var playerselectedCards = [];
    let getPlayercardPromise = new Promise((resolved,rejected)=>{
        axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/`,{
            params:{
                count: 3
            }
        }).then(res=>{
            console.log("Player cards fetched");
            res.data.cards.map((card)=>{
                playerselectedCards.push([card.value,card.suit,card.image])
                return 0;
            })
            resolved()
        }).catch(err=>{
            console.log("Error in Player cards :",err);
            alert("Server Error...! Please try again later");
            rejected()})
        })
    try {
        yield getPlayercardPromise;
        let res = Checkresult(playerselectedCards);
        getPlayercardPromise.then(yield put(actions.addPlayercards.success(playerselectedCards)),yield put(checkPlayerres(res)));
    }catch(error){
        console.log("Error :",error);
        yield put(actions.addPlayercards.failure("Failed to fetch"))
    }
    yield put(winner())
}


export function* watchfun(){
    yield all([
        takeEvery(actions.shufflecard.TRIGGER, getCards),
        takeEvery(actions.addBotcards.TRIGGER,getPlayingCards),
    ])
}

