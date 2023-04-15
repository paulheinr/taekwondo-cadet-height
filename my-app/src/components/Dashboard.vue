<template>
  <div class="hello">
    <Header/>
    <div class="container mrgnbtm">
      <div class="row">
        <div class="col-md">
          <SearchPlayer @updatePlayer="updatePlayer($event)"/>
        </div>
      </div>
    </div>
    <div class="container mrgnbtm">
      <div class="container">
        <Users v-if="players.length > 0" :players="players"/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import CreateUser from './CreatePlayer.vue'
import DisplayBoard from './DisplayBoard.vue'
import Users from './Player.vue'
import SearchPlayer from "@/components/SearchPlayer.vue";
import {getAllPlayers} from "@/services/PlayerService";

export default {
  name: 'Dashboard',
  components: {
    Header,
    CreateUser,
    DisplayBoard,
    Users,
    SearchPlayer
  },
  data() {
    return {
      players: [],
      numberOfUsers: 0
    }
  },
  methods: {
    updatePlayer(data) {
      getAllPlayers().then(response => {
        response.sort((a, b) => {
          var keyA = new Date(a.lastUpdate),
              keyB = new Date(b.lastUpdate);
          // Compare the 2 dates
          if (keyA < keyB) return 1;
          if (keyA > keyB) return -1;
          return 0;
        })
        this.players = response;
      })
    }
  },
  mounted() {
    this.updatePlayer();
  }
}
</script>