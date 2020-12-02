import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { actions } from '../../Actions'
import '../../Csss/game.css'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

const Game = ( {disp, gamestatus }) => {
    const [cardcall,setCardcall] = useState(true);
    const [win,setWin]=useState('Loading...');

    useEffect(()=>{
        if(cardcall){
            setCardcall(false);
            disp(actions.shufflecard.trigger());
            disp(actions.addBotcards.trigger());
            tryit();
        }
    },[cardcall])


    async function tryit() {

        let checker = true;
        let limit = 0;
        while (checker) {
            if(gamestatus.winner===''){
                console.log("..");
                await delay(1000);
                limit++;
            }else{
                checker = false
                setWin(gamestatus.winner);
            }
            if(limit>20){
                checker=false;
            }
        }
        console.log("Winner :",gamestatus.winner);
    }

    if (gamestatus.botCards.length!==0){
        if (gamestatus.playerCards.length!==0){
            return <>
    <div className="gameScreen">
        <img className="botAvtar" src={gamestatus.botID} alt="BOT" /><br/>
    
        {gamestatus.botCards.map((cd,i)=>{
            return <img className="cards" src={cd[2]} alt="card" key={i}/>
        })}

        <br/>
        <div className="winnerdiv">
            <h1 className="winner">{win}</h1>
        </div>
        <h1 className="yourlable">Your cards :</h1>

        {gamestatus.playerCards.map((cd,i)=>{
            return <img className="cards" src={cd[2]} alt="card" key={i}/>
        })}
    </div>
        
    </>;
        }
    }

    return<>
        <div className="loadingScreen"><div className="loader"></div></div>
    </>

    
}

const mapDispatchToProps = dispatch => ({
    disp: something => dispatch(something)
})

const mapStateToProps = state => ({
    gamestatus:state
})

export default  connect(mapStateToProps,mapDispatchToProps)(Game);
