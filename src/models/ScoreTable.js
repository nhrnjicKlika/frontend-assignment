export default class ScoresTable{

    constructor(){
        this.scoreTable = []
    }   

    addGamePlayed(match){

        let teamOne = this.getTeam(match, 0)
        let teamTwo = this.getTeam(match, 1)
        
        let teamOneIndex = this.getTeamIndex(teamOne.name)
        let teamTwoIndex = this.getTeamIndex(teamTwo.name)
        
        if(teamOneIndex === -1){
            this.scoreTable = [...this.scoreTable, {
                name: teamOne.name,
                gamesPlayed: 1,
                wins: teamOne.goals > teamTwo.goals ? 1 : 0,
                draw: teamOne.goals === teamTwo.goals ? 1 : 0,
                lostGames: teamOne.goals < teamTwo.goals ? 1 : 0,
                scoredGoals: teamOne.goals,
                recievedGoals: teamTwo.goals
            }]
        }else{
            let item = this.scoreTable[teamOneIndex]
            this.scoreTable[teamOneIndex] = {
                name: item.name,
                gamesPlayed: item.gamesPlayed + 1,
                wins: teamOne.goals > teamTwo.goals ? item.wins + 1 : item.wins,
                draw: teamOne.goals === teamTwo.goals ? item.draw + 1 : item.draw,
                lostGames: teamOne.goals < teamTwo.goals ? item.lostGames + 1 : item.lostGames,
                scoredGoals: item.scoredGoals + teamOne.goals,
                recievedGoals: item.recievedGoals + teamTwo.goals
            }
        }

        if(teamTwoIndex === -1){
            this.scoreTable = [...this.scoreTable, {
                name: teamTwo.name,
                gamesPlayed: 1,
                wins: teamTwo.goals > teamOne.goals ? 1 : 0,
                draw: teamOne.goals === teamTwo.goals ? 1 : 0,
                lostGames: teamTwo.goals < teamOne.goals ? 1 : 0,
                scoredGoals: teamTwo.goals,
                recievedGoals: teamOne.goals
            }]
        }else{
            let item = this.scoreTable[teamTwoIndex]
            this.scoreTable[teamTwoIndex] = {
                name: item.name,
                gamesPlayed: item.gamesPlayed + 1,
                wins: teamTwo.goals > teamOne.goals ? item.wins + 1 : item.wins,
                draw: teamOne.goals === teamTwo.goals ? item.draw + 1 : item.draw,
                lostGames: teamTwo.goals < teamOne.goals ? item.lostGames + 1 : item.lostGames,
                scoredGoals: item.scoredGoals + teamTwo.goals,
                recievedGoals: item.recievedGoals + teamOne.goals
            }
        }
    }

    getTeamIndex(name){
        return this.scoreTable.findIndex(team => team.name === name)
    }

    getScoreTable(){
       return this.sortByPoints()
    }

    sortByPoints(){
        return this.scoreTable.concat().sort((firstTeam, secondTeam) => {
            let firstTeamPoints = (firstTeam.wins * 3) + firstTeam.draw
            let secondTeamPoints = (secondTeam.wins * 3) + secondTeam.draw

            let firstTeamGoalDifferential = firstTeam.scoredGoals - firstTeam.recievedGoals
            let secondTeamGoalDifferential = secondTeam.scoredGoals - secondTeam.recievedGoals

            if(firstTeamPoints === secondTeamPoints){
                return firstTeamGoalDifferential > secondTeamGoalDifferential ? -1 : 1
            }

            return firstTeamPoints > secondTeamPoints ? -1 : 1
        })
    }

    getTeam(match, index){
        var name = Object.keys(match)[index]
        var goals = match[name]

        return{ name, goals }
    }
}