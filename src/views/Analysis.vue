<template>
  <v-layout fill-height="true">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate></v-progress-circular>
    </v-overlay>

    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Your Run Down </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="item in items" :key="item.title" :link="!noData">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <router-view name="analysis"></router-view>
  </v-layout>
</template>


<script>
import router from "@/router/router";
import ApiLayer from "@/api/api";

export default {
  data() {
    return {
      selectedItem: 0,
      api: null,
      noData: false,
    }
  },
  computed: {
    items: function () {
      return [
        { title: "Basics", icon: "mdi-clipboard-text" },
        { title: "Combinations", icon: "mdi-set-none" },
        { title: "Classifications", icon: "mdi-book-variant" },
        { title: "Average Game", icon: "mdi-equalizer-outline" },
      ];
    },
    loading: function () {
      return this.$store.state.loading;
    },
  },
  created: function () {
    console.log("Created");
    console.log("Collecting report...");

    this.api = new ApiLayer();
    const response = this.api.getReport(
      this.$store.state.summoner,
      this.$store.state.partner
    );
    this.$store.dispatch("load");

    response
      .then((res) => {
        console.log(res.data);
        this.$store.dispatch("finish", res.data);

        router.replace({ path: "/analysis/basics" });
      })
      .catch((err) => {
        this.$store.dispatch("finish", {});
        console.error(err);
      });
  },
};
</script>

<style>
.root {
  width: 100%;
  height: 100%;
  float: left;
}
</style>