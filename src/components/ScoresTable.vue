<template>
    <div>
        <select v-model = 'selectedRound'>
            <option value="0"> Select a round </option>
            <option v-for = 'round in roundsRange' :value="round"> {{ round }} </option>
        </select>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default{

    data(){
        return{
            selectedRound: 0,
            roundsRange: []
        }
    },

    created(){
        for(let i = 0; i < this.scoresTable.length; i++){
            this.roundsRange = [...this.roundsRange, (i + 1)]
        }
    },

    computed: {
        ...mapState({
            scoresTable(state){
                return state.scoresTable
            },

            selectedRoundData(){
                let lastRoundIndex = this.scoresTable.length - 1
                if(this.selectedRound === 0){
                    return this.scoresTable[lastRoundIndex]
                }else{
                    return this.scoresTable[this.selectedRound]
                }
            }
        })
    }
}

</script>