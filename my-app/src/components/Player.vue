<template>
  <div class="container">
    <h2>Kämpfer</h2>
    <div class="overflow-auto">
      <b-table id="player-table" :items="players" :per-page="10" :current-page="currentPage"
               :fields="fields" :bordered="true"></b-table>
      <b-pagination v-model="currentPage" :total-rows="rows" :per-page="10" aria-controls="player-table"></b-pagination>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Players',
  props: ['players'],
  data() {
    return {
      currentPage: 1,
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true
        },
        {
          key: "club",
          label: "Verein",
          sortable: true
        },
        {
          key: "height",
          label: "Größe",
          sortable: true
        },
        {
          key: "lastUpdate",
          label: "Letztes Update",
          sortable: true
        },
      ]
    }
  },
  computed: {
    rows() {
      return this.players.length
    }
  }
}
</script>