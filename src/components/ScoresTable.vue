<template>
    <div>
        <p> Scores Table </p>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default{

    created(){},

    computed: {
        ...mapState({
            scoresTable(state){
                return state.scoresTable
            }
        })
    }
}

</script>