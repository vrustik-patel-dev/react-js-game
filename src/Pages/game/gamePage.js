import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import {addBotcards,addPlayercards,checkBotres,checkPlayerres,winner} from '../../Actions'
import Checkresult from './checkResult';

const Game = ({gamestatus,addBotcards,addPlayercards,checkBotres,checkPlayerres,winner}) => {
    const [cardcall,setCardcall] = useState(true);
    const [win,setWin]=useState('');

    useEffect(()=>{
        if(cardcall){
            setCardcall(false);
            getCards();
        }
    },[cardcall])

    async function getCards(){
        let shuffledeck = new Promise((resolve, reject) => {
            axios.get(`https://deckofcardsapi.com/api/deck/${gamestatus.deckID}/shuffle/`)
            .then(res=>{
                console.log("Shuffled");
                resolve()
            })
            .catch(err=>{
                console.log("Error in Shuffle :",err);
                alert("Server Error...! Please try again later");
                reject()})
        })
    
        await shuffledeck;

        let getbotcards= new Promise((resolve, reject) => {
            axios.get(`https://deckofcardsapi.com/api/deck/${gamestatus.deckID}/draw/`,{
                params:{
                    count: 3
                }
            })
            .then(res=>{
                console.log("Bot cards fetched");
                let botselectedCards = [];
    
                res.data.cards.map((card)=>{
                    botselectedCards.push([card.value,card.suit,card.image]);
                    return 0;
                })
                addBotcards(botselectedCards);
                let checkres = Checkresult(botselectedCards);
                checkBotres(checkres);
                resolve()
            })
            .catch(err=>{
                console.log("Error in BOT cards :",err);
                alert("Server Error...! Please try again later");
                reject()})
        })
    
        await getbotcards;

        let getplayercards= new Promise((resolve, reject) => {
            axios.get(`https://deckofcardsapi.com/api/deck/${gamestatus.deckID}/draw/`,{
                params:{
                    count: 3
                }
            })
            .then(res=>{
                console.log("Player cards fetched");
                let playerselectedCards = [];
    
                res.data.cards.map((card)=>{
                    playerselectedCards.push([card.value,card.suit,card.image]);
                    return 0;
                })
    
                addPlayercards(playerselectedCards);
                let checkres = Checkresult(playerselectedCards);
                checkPlayerres(checkres);
                resolve()
            })
            .catch(err=>{
                console.log("Error in Player cards :",err);
                alert("Server Error...! Please try again later");
                reject()})
        })
    
        await getplayercards;
        winner();
        setWin(gamestatus.winner);
        
        console.log("Finished");
    }

    return <>
        <img src={gamestatus.botID} alt="BOT"/><h1>:</h1>
        
        {gamestatus.botCards.map((cd,i)=>{
            return <img src={cd[2]} alt="card" key={i}/>
        })}

        <br/>
        <h1>{win}</h1>
        <h1>Your cards :</h1>

        {gamestatus.playerCards.map((cd,i)=>{
            return <img src={cd[2]} alt="card" key={i}/>
        })}

        <input type="button" value="Rematch" onClick={()=>getCards()}/>
        
    </>;
}

const mapDispatchToProps = dispatch => ({
    addBotcards: cardarr => dispatch(addBotcards(cardarr)),
    addPlayercards: cardarr => dispatch(addPlayercards(cardarr)),
    checkBotres: res => dispatch(checkBotres(res)),
    checkPlayerres: res => dispatch(checkPlayerres(res)),
    winner: () => dispatch(winner())
})

const mapStateToProps = state => ({
    gamestatus:state
})

export default  connect(mapStateToProps,mapDispatchToProps)(Game);
