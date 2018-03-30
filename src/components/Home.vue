<template>
 
<div> 
  <form enctype="multipart/form-data">

    <p v-if = 'showErrorMsg'> It seems that your input contains some invalid data. </p>

    <label> Submit your scores table to get started: </label>
    <input type="file" @change='fileChanged' />
  </form>
</div>

</template>

<script>

import validators from '../services/validators'

export default {
  
  data(){
    return{
       showErrorMsg: false
    }
  },

  methods:{
    fileChanged(e){
      let file = e.target.files[0]
      let reader = new FileReader()
      
      reader.onload = (e) => {
        let fileContent = e.target.result
        let contentObject = JSON.parse(fileContent)
        let isInputValid = validators.inputValidator(contentObject)
        this.showErrorMsg = !isInputValid

        if(isInputValid){
          this.setTables(contentObject)
        }
      }

      reader.readAsText(file)
    },

    setTables(results){
      console.log('set data to store', results)
    }
  }
}
</script>

<style scoped>

label{
  display: block;
  padding: 10px;
}

input{
  padding: 10px;
}

p{
  color: red;
}

</style>
