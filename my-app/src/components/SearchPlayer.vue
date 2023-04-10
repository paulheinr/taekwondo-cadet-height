<template>
  <div class="container">
    <div class="container">
      <div class="row">
        <div class="col-md-6 mrgnbtm">
          <h2>Kämpfer suchen</h2>
          <form>
            <div class="row">
              <div class="form-group col-md-6">
                <label>ID</label>
                <input type="text" class="form-control" v-model="inputId" name="id" id="id"
                       aria-describedby="emailHelp" placeholder="ID"/>
              </div>
            </div>
            <button type="button" @click='searchPlayer()' class="btn btn-dark">Suchen</button>
          </form>
        </div>

        <div class="col-md-6 mrgnbtm">
          <h2>Aktueller Kämpfer</h2>
          <div class="row">
            <div class="col-md">
              <label>ID</label>
            </div>
            <div class="col-md">
              <label>{{ player.id }}</label>
            </div>
          </div>

          <div class="row">
            <div class="col-md">
              <label>Name</label>
            </div>
            <div class="col-md">
              <label>{{ player.name }}</label>
            </div>
          </div>

          <div class="row">
            <div class="col-md">
              <label>Verein</label>
            </div>
            <div class="col-md">
              <label>{{ player.club }}</label>
            </div>
          </div>

          <div class="row">
            <div class="col-md">
              <label>Größe</label>
            </div>
            <div class="col-md">
              <label>{{ player.height }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mrgnbtm">
      <h2>Größe erfassen</h2>
      <form>
        <div class="row">
          <div class="form-group col-md-6">
            <label>Größe in cm</label>
            <input type="text" class="form-control" v-model="newHeight" name="height" id="height"
                   placeholder="Größe"/>
          </div>
        </div>
        <button type="button" @click='updatePlayer()' class="btn btn-dark">Größe eintragen</button>
      </form>
    </div>
  </div>
</template>

<script>
import {getPlayer, updateHeight} from "@/services/PlayerService";

const defaultPlayer = {
  id: "---",
  name: "---",
  club: "---",
  height: "---",
}

export default {
  name: 'SearchPayer',
  data() {
    return {
      player: defaultPlayer,
      newHeight: null,
      inputId: null,
    }
  },
  methods: {
    async searchPlayer() {
      console.log("Searching for player " + this.inputId)
      this.player = await getPlayer(this.inputId);
    },
    async updatePlayer() {
      console.log("Updating player" + this.inputId)
      await updateHeight(this.player.id, parseInt(this.newHeight))
      this.clearForm();
    },
    clearForm() {
      this.player = defaultPlayer;
      this.newHeight = null;
      this.inputId = null;
    }
  }
}
</script>