import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        scoresTable: []
    },

    mutations:{
        SET_SCORES_TABLE(state, scoresTable){
            state.scoresTable = scoresTable
        }
    }
})