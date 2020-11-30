import {useState} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useHistory  } from 'react-router-dom';

function findDeck() {
    let deckID = Cookies.get('localdeckid');
    let deckPromise = new Promise((suc,error)=>{
        if(deckID){
            axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`)
            .then(res=>{suc()})
            .catch(err=>{error()})

        }else{
            axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/',{
                params:{
                    deck_count: 1
                }
            })
            .then(res=>{
                let deck_id = res.data.deck_id;
                Cookies.set('localdeckid',deck_id, { expires: 14 });
                suc();
            })
            .catch(err=>{console.log('new :',err);error()})
        }
    });

    deckPromise.then(()=>console.log("Success"))
    .catch(()=>console.log("Error"))
}

function useradd(name) {
    let username = name.toUpperCase();
    Cookies.set('username',username, { expires: 1 })
}

const Welcomepage = () => {
    const [name,cname] = useState('');
    const uname = Cookies.get('username');

    const history = useHistory();

    if (!uname) {
        return (
            <div className="welcomepage">
                <h1>Welcome to the Game</h1>
                <label>Please Enter your name here : </label>
                <input type="text" value={name} onChange={e=>cname(e.target.value)} />
                <input type="button" value="Enter Game" onClick={()=>{useradd(name);history.push('/game');}} />
            </div>
        )
    }

    return (
        <div className="welcomepage">
            <h1>Welcome back, {uname}</h1>
            <input type="button" value="Enter Game" onClick={()=>{findDeck();history.push('/game');}} />
        </div>
    )
}

export default Welcomepage;