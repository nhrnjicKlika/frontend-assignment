<template>
    <div>
        <select v-model = 'selectedRound'>
            <option value="-1"> Select a round </option>
            <option v-for = 'round in roundsRange' :value="(round)"> {{ (round + 1) }} </option>
        </select>

        <div class = 'matches-listing'>
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
</template>

<script>

import { mapState } from 'vuex'

export default{

    data(){
        return{
            selectedRound: -1,
            roundsRange: []
        }
    },

    created(){
        for(let i = 0; i < this.scoresTable.length; i++){
            this.roundsRange = [...this.roundsRange, i]
        }
    },

    computed: {
        ...mapState({
            scoresTable(state){
                return state.scoresTable
            },

            selectedRoundData(){
                let lastRoundIndex = this.scoresTable.length - 1
                if(this.selectedRound === -1){
                    return this.scoresTable[lastRoundIndex].matches
                }else{
                    return this.scoresTable[this.selectedRound].matches
                }
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