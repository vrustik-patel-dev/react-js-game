let cards = new Map([
    ["ACE",14],
    ["KING",13],
    ["QUEEN",12],
    ["JACK",11],
    ["10",10],
    ["9",9],
    ["8",8],
    ["7",7],
    ["6",6],
    ["5",5],
    ["4",4],
    ["3",3],
    ["2",2],
])



const checkType = (cardsarr) =>{

    if (cardsarr[0][0]===cardsarr[1][0] && cardsarr[0][0]===cardsarr[2][0]) {
        console.log("Trail");
        return [6,cards.get(cardsarr[0][0])];
    }
    else if (cardsarr[0][1]===cardsarr[1][1] && cardsarr[0][1]===cardsarr[2][1]) {
        let valarr = [];
        cardsarr.map((card)=>{valarr.push(cards.get(card[0]))});
        let [res,val] = checkseries(valarr);
        if(res){
            console.log("Pure Seq");
            return[5,val];
        }else{
            console.log("Color");
            return[3,val];
        }
    }else if(cardsarr[1][0]===cardsarr[0][0]){
        console.log("Pair");
        return [2,cards.get(cardsarr[0][0]),cards.get(cardsarr[2][0])]
    }else if( cardsarr[0][0]===cardsarr[2][0]){
        console.log("Pair");
        return [2,cards.get(cardsarr[0][0]),cards.get(cardsarr[1][0])];
    }else if( cardsarr[1][0]===cardsarr[2][0]){
        console.log("Pair");
        return [2,cards.get(cardsarr[1][0]),cards.get(cardsarr[0][0])]
        
    }else{
        let valarr = [];
        cardsarr.map((card)=>{valarr.push(cards.get(card[0]))});
        let [res,val,vala,valb] = checkseries(valarr);
        if(res){
            console.log("Seq");
            return[4,val];
        }else{
            console.log("High card");
            return[1,val,vala,valb];
        }
    }
}

const checkseries = (arr)=>{
    let chserarr = arr.sort((a, b) => a - b);
    if (chserarr[0]===12 && chserarr[1]===13 && chserarr[2]===14){
        return [true,15];
    }else if (chserarr[0]===2 && chserarr[1]===3 && chserarr[2]===14){
        return [true,14];
    }else if (chserarr[2]-chserarr[1]===1 && chserarr[1]-chserarr[0]===1){
        return [true,chserarr[2]];
    }else{
        return [false,chserarr[2],chserarr[1],chserarr[0]];
    }
}

export default checkType;