<template>
  <div class="hello">
    <Header/>
    <div class="container mrgnbtm">
      <div class="row">
        <div class="col-md">
          <SearchPlayer @createUser="userCreate($event)"/>
        </div>
      </div>
    </div>
    <div class="container mrgnbtm">
      <div class="container">
        <Users v-if="users.length > 0" :users="users"/>
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
import {getAllUsers, createUser} from '@/services/UserService'

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
      users: [],
      numberOfUsers: 0
    }
  },
  methods: {
    getAllUsers() {
      getAllUsers().then(response => {
        console.log(response)
        this.users = response
        this.numberOfUsers = this.users.length
      })
    },
    userCreate(data) {
      console.log('data:::', data)
      createUser(data).then(response => {
        console.log(response);
        this.getAllUsers();
      });
    }
  },
  mounted() {
    this.getAllUsers();
  }
}
</script>