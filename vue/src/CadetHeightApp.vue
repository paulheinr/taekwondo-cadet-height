<template>
  <div class="container">
    <div class="col">
      <form>
        <div class="mb-3">
          <label for="fighterId" class="form-label">ID</label>
          <input type="text" class="form-control" id="fighterId" v-model="id">
        </div>
        <button type="button" class="btn btn-primary" @click="getPlayer">Submit</button>
      </form>
    </div>

    <div class="col">
      <div class="row">
        <div class="col col-2">GAL Number</div>
        <div class="col">{{ currentPlayer.number }}</div>
      </div>
      <div class="row">
        <div class="col col-2">Name</div>
        <div class="col">{{ currentPlayer.name }}</div>
      </div>
      <div class="row">
        <div class="col col-2">Verein</div>
        <div class="col">{{ currentPlayer.club }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'

// import sqlite3 from 'sqlite3'
// import {open} from 'sqlite'
//
// open({
//   filename: '/tmp/database.db',
//   driver: sqlite3.Database
// }).then((db) => {
//   // do your thing
// })

const name = ref("CadetHeightApp")
const id = ref(null)
const currentPlayer = ref({
  number: "",
  name: "Test-Name",
  club: "Test-Verein"
})


async function getPlayer() {
  // db.serialize(() => {
  //       db.get("SELECT * FROM Fighter where number=ZZZ-" + this.id + "", (err, row) => {
  //         this.currentPlayer = {
  //           number: row.number,
  //           name: row.name,
  //           club: row.club
  //         }
  //       });
  //     }
  // );

  // this.currentPlayer = {
  //   id: 987654,
  //   name: "Test-Name geladen",
  //   surname: "Test-Vorname geladen",
  //   club: "Test-Verein geladen"
  // }
}
</script>

<style scoped>

</style>