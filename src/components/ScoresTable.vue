<template>
    <div>
        <div class = 'row'>
            <div class = 'col-md-3'>

                <label> Change round: </label>
                <select v-model = 'selectedRound'>
                    <option value="-1"> Select a round </option>
                    <option v-for = 'round in roundsRange' :value="(round)"> {{ (round + 1) }} </option>
                </select>

                <div class = 'matches-listing'>
                    <p class = 'current-round-hint'> Games played in round {{ selectedRound + 1 }}: </p>
                    <div v-for = 'match in selectedRoundData' class = 'match'>
                        <div>
                            <span> {{ getTeamData(match, 0).teamName }} </span>
                            <span> {{ getTeamData(match, 0).goals }} </span>
                        </div>

                        <div>
                            <span> {{ getTeamData(match, 1).teamName }} </span>
                            <span> {{ getTeamData(match, 1).goals }} </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class = 'col-md-9'>

                <p class = 'round-hint'> Showing scores after round: {{ selectedRound + 1 }} </p>

                <table class = 'table table-stripped'>
                    <thead>
                        <tr>
                            <td> Position </td>
                            <td> Team </td>
                            <td> Games Played </td>
                            <td> Wins </td>
                            <td> Draws </td>
                            <td> Loses </td>
                            <td> Scored Goals </td>
                            <td> Recieved Goals </td>
                            <td> Goal Differential </td>
                            <td> Points </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for = '(team, index) in scoresTableCalculated'>
                            <td> {{ index + 1 }} </td>
                            <td> {{ team.name }} </td>
                            <td> {{ team.gamesPlayed }} </td>
                            <td> {{ team.wins }} </td>
                            <td> {{ team.draw }} </td>
                            <td> {{ scoresTableInitial.length - team.wins - team.draw }} </td>
                            <td> {{ team.scoredGoals }} </td>
                            <td> {{ team.recievedGoals }} </td>
                            <td> {{ team.scoredGoals - team.recievedGoals }} </td>
                            <td> {{ (team.wins * 3) + team.draw }} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import ScoreTable from '../models/ScoreTable'

export default{

    data(){
        return{
            selectedRound: -1,
            roundsRange: []
        }
    },

    created(){
        for(let i = 0; i < this.scoresTableInitial.length; i++){
            this.roundsRange = [...this.roundsRange, i]
        }

        this.selectedRound = this.scoresTableInitial.length - 1
    },

    computed: {
        ...mapState({
            scoresTableInitial(state){
                return state.scoresTable
            },

            selectedRoundData(){
                let lastRoundIndex = this.scoresTableInitial.length - 1
                if(this.selectedRound === -1){
                    return this.scoresTableInitial[lastRoundIndex].matches
                }else{
                    return this.scoresTableInitial[this.selectedRound].matches
                }
            },

            scoresTableCalculated(){
                let scoreTable = new ScoreTable()

                for(let roundIndex = 0; roundIndex <= this.selectedRound; roundIndex++){
                    let round = this.scoresTableInitial[roundIndex]

                    for(var matchIndex = 0; matchIndex < round.matches.length; matchIndex++){
                        let match = round.matches[matchIndex]
                        scoreTable.addGamePlayed(match)
                    }
                }

                return scoreTable.getScoreTable()
            }
        })
    },

    methods: {
        getTeamData(match, index){
            let teamName = Object.keys(match)[index]
            let goals = match[teamName]

            return{
                teamName,
                goals
            }
        }
    }
}

</script>

<style>

label{
    margin-left: 30px;
}

.matches-listing{
    padding: 25px;
}

.match{
    padding: 10px;
    border: 1px solid grey;
    margin-top: 5px;
}

table{
    text-align: center;
}

.round-hint{
    font-size: 1.3em;
    padding-left: 10px;
}

</style>