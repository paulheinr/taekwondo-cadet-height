<template>
  <div class="container">
    <div class="container">
      <div class="row">
        <div class="col-md-6 mrgnbtm">
          <h2>Kämpfer suchen</h2>
          <form>
            <button type="submit" disabled style="display: none" aria-hidden="true"></button>
            <div class="row">
              <div class="form-group col-md-6">
                <label>ID</label>
                <input type="text" class="form-control" v-model="inputId" name="id" id="id" v-on:keypress="numbersOnly"
                       v-on:keyup.enter="searchPlayer" aria-describedby="emailHelp" placeholder="ID"/>
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
        <!-- Prevent submission by enter -->
        <button type="submit" disabled style="display: none" aria-hidden="true"></button>
        <div class="row">
          <div class="form-group col-md-6">
            <label>Größe in cm</label>
            <input type="text" class="form-control" v-model="newHeight" name="height" id="height"
                   v-on:keyup.enter="updatePlayer" placeholder="Größe" v-on:keypress="numbersOnly"/>
          </div>
        </div>
        <button type="button" @click='updatePlayer()' class="btn btn-dark">Größe eintragen</button>
      </form>
      <b-alert class="mrgnbtm" :show="alertCountdown" dismissible variant="success" @dismissed="alertCountdown=0">
        Größe wurde erfolgreich eingetragen.
      </b-alert>
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
  lastUpdate: "---"
}

export default {
  name: 'SearchPayer',
  data() {
    return {
      player: defaultPlayer,
      newHeight: null,
      inputId: null,
      alertCountdown: 0
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
      this.alertCountdown = 2;
      this.$emit("updatePlayer")
    },
    numbersOnly(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();

      } else {
        return true;
      }
    },
    clearForm() {
      this.player = defaultPlayer;
      this.newHeight = null;
      this.inputId = null;
    }
  }
}
</script>