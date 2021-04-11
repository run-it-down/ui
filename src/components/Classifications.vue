<template>
  <v-navigation-drawer mini-variant permanent>
    <v-list>
      <v-list-item v-for="c in classes" :key="c" link>
        <v-list-item-title v-text="c"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Classifications",
  data: function() {
    return {
      classes: ["Millionaire", "Match Type", "Murderous Duo", "Duo Type", "Farmer Type", "Tactician"]
    }
  }
}
</script>