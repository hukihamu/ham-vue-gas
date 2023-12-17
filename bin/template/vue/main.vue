<script setup lang="ts">
import {gasClient} from '@V/index'
import {ref} from 'vue'

const inputText = ref('')
const dateList = ref<string[]>([])
function onClickInput(){
  gasClient.send('insertData', inputText.value).then(it => {
    dateList.value = it
    inputText.value = ''
  })
}
</script>

<template>
  <v-card>
    <h1>Welcome HamVueGas</h1>
    <div>
      <input v-model="inputText"><button @click="onClickInput">Input</button>
    </div>
    <div v-for="text in dateList">
      <span>{{text}}</span>
    </div>
  </v-card>
</template>