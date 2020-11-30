import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Checkresult from './checkResult';

function makefaceID() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 5; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result = 'https://robohash.org/'+result;
    return result;
}

const Game = () => {
    const [botCards,setbotCards]=useState([]);
    const [playerCards,setplayerCards]=useState([]);
    const [botID,setbotID] =useState('aaa');
    const [cardcall,setCardcall] = useState(true);
    const [botRes,setbotRes]=useState([]);
    const [plrRes,setplrRes]=useState([]);
    const [winner,setWinner]=useState('');

    let deckID = Cookies.get('localdeckid');

    useEffect(()=>{

        if (botID==='aaa'){
            setbotID(makefaceID());
        }
        
        if(cardcall){
            
            setCardcall(false)
            
            axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`)
            .then(res=>{
                    axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/`,{
                        params:{
                            count: 3
                        }
                    })
                    .then(res=>{

                        let botselectedCards = [];

                        res.data.cards.map((card)=>{
                            botselectedCards.push([card.value,card.suit,card.image]);
                            return 0;
                        })

                        setbotCards(botselectedCards);
                        setbotRes(Checkresult(botselectedCards));


                        axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/`,{
                            params:{
                                count: 3
                            }
                        })
                        .then(res=>{
                            let playerselectedCards = [];

                            res.data.cards.map((card)=>{
                                playerselectedCards.push([card.value,card.suit,card.image]);
                                return 0;
                            }) 

                            setplayerCards(playerselectedCards);
                            setplrRes(Checkresult(playerselectedCards));
                        })
                        .catch(err=>{console.log("Card fetching for player got failed");})
                    })
                    .catch(err=>{console.log("Card fetching for Bot got failed");})
                    })
            .catch(err=>{console.log("Deck reset failed");})
        }

        if(botRes.length!==0 && plrRes.length!==0){
            console.log(botRes);
            console.log(botRes.length!==0);
            checkwinner();
        }

    },[botID,cardcall,deckID])

    const checkwinner = ()=>{
        if(plrRes[0]>botRes[0]){
            setWinner('You won')
        }else if(plrRes[0]<botRes[0]){
            setWinner('You lose')
        }else{
            if(plrRes[1]>botRes[1]){
                setWinner('You won')
            }else if(plrRes[1]<botRes[1]){
                setWinner('You lose')
            }else{
                if(plrRes[0]===1){
                    if(plrRes[2]>botRes[2]){
                        setWinner('You won')
                    }else if(plrRes[2]<botRes[2]){
                        setWinner('You lose')
                    }else{
                        setWinner('Draw')
                    }
                }else{
                    setWinner('Draw')
                }
            }
        }
    }


    return <>
        <img src={botID} alt="BOT"/><h1>:</h1>
        {botCards.map((cd,i)=>{
            return <img src={cd[2]} alt="card" key={i}/>
        })}
        <input type="button" value="Find Winner" onClick={()=>checkwinner()} />
        <h1>{winner}</h1>
        <h1>Your cards :</h1>
        {playerCards.map((cd,i)=>{
            return <img src={cd[2]} alt="card" key={i}/>
        })}
    </>;
}

export default Game;
