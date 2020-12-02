
import {actions} from '../Actions';

var initialState = {
    deckStatus : 'never triggered',
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
        
    // Card shuffling

        case actions.shufflecard.TRIGGER:
            state.deckStatus = "Triggered";
            console.log("Card Shuffling Triggered");
            return state;

        case actions.shufflecard.REQUEST:
            state.deckStatus = "Requested";
            console.log("Card Shuffling Requested");
            return state;

        case actions.shufflecard.SUCCESS:
            state.deckStatus = "Success";
            console.log("Card Shuffling Success");
            return state;

        case actions.shufflecard.FAILURE:
            state.deckStatus = "Failed";
            console.log("Card Shuffling Failed");
            return state;

        case actions.shufflecard.FULFILL:
            state.deckStatus = "Fullfilled";
            console.log("Card Shuffling Fullfilled");
            return state;

    //Adding Bot's cards

        case actions.addBotcards.TRIGGER:
            console.log("addbotcard triggered");
            return state;

        case actions.addBotcards.REQUEST:
            console.log("addbotcard requested");
            return state;

        case actions.addBotcards.SUCCESS:
            state.botCards = action.payload;
            console.log("addbotcard success");
            return state;

        case actions.addBotcards.FAILURE:
            state.botCards = action.payload;
            console.log("addbotcard FAILURE");
            return state;

        case actions.addBotcards.FULFILL:
            console.log("addbotcard FULFILL");
            return state;

    //Adding Player's card

        case actions.addPlayercards.TRIGGER:
            console.log("addPlayercards triggered");
            return state;

        case actions.addPlayercards.REQUEST:
            console.log("addPlayercards requested");
            return state;

        case actions.addPlayercards.SUCCESS:
            state.playerCards = action.payload
            console.log("addPlayercards success");
            return state;

        case actions.addPlayercards.FAILURE:
            state.playerCards = action.payload
            console.log("addPlayercards FAILURE");
            return state;

        case actions.addPlayercards.FULFILL:
            console.log("addPlayercards FULFILL");
            return state;

    // Insert Bot's Result array

        case 'CHECK_BOTRES' :
            state.botRes = action.res;
            return state

    // Insert Player's Result array

        case 'CHECK_PLAYERRES' :
            state.plrRes = action.res;
            return state

    // Check Winner

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