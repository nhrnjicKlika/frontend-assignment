export default{

    inputValidator: (input) => {
        for(let i = 0; i < input.length; i++){
            let targetItem = input[i]
            let hasRound = targetItem.hasOwnProperty('round')
            let hasScores = targetItem.matches.length > 0
    
            if(!hasRound || !hasScores){
                return false
            }
        }

        return true
    }
}


