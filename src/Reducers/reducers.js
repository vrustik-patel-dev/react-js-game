import Cookies from 'js-cookie';

let tempdeckID = Cookies.get('localdeckid');
var initialState = {
    deckID :tempdeckID,
    botCards : [],
    playerCards : [],
    botID : 'https://robohash.org/tempID',
    botRes:[],
    plrRes:[],
    winner:'',
}

let tempID = '';
let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
let charactersLength = characters.length;
for ( var i = 0; i < 5; i++ ) {
    tempID += characters.charAt(Math.floor(Math.random() * charactersLength));
}
tempID = 'https://robohash.org/'+tempID;
initialState.botID = tempID;

const cardstatus = (state=initialState,action) => {
    switch (action.type) {

        case 'ADD_BOTCARDS' :
            state.botCards = action.cards
            return state

        case 'ADD_PLAYERCARDS' :
            state.playerCards = action.cards
            return state

        case 'CHECK_BOTRES' :
            state.botRes = action.res;
            return state

        case 'CHECK_PLAYERRES' :
            state.plrRes = action.res;
            return state

        case 'WINNER' :
            state.winner = checkWinner(state.plrRes,state.botRes);
            return state

        default:
            return state
    }
}

function checkWinner (arr1,arr2){
    return (arr1[0]===arr2[0])
        ?(arr1[1]===arr2[1])
            ?(arr1[2]===arr2[2])
                ?(arr1[0]===1)
                    ?(arr1[3]===arr2[3])?"DRAW":(arr1[3]>arr2[3])?"YOU Won":"BOT Won"
                    :"DRAW"
                :(arr1[2]>arr2[2])?"YOU won":"BOT won"
            :(arr1[1]>arr2[1])?"YOU won":"BOT won"
    :(arr1[0]>arr2[0])?"YOU Won":"BOT Won";
}

export default cardstatus;