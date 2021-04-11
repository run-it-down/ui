<template>
  <v-layout fill-height="true">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate></v-progress-circular>
    </v-overlay>

    <v-navigation-drawer permanent>
      <template v-slot:prepend>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title"> Your Run Down </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="item in items" :key="item.title" :link="!noData" @click="navigateTo(item.title)">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group v-for="complex in complexMenu" :key="complex.title" :prepend-icon="complex.icon">
            <template v-slot:activator>
              <v-list-item-title>{{complex.title}}</v-list-item-title>
            </template>
            <v-list-item v-for="item in complex.items" :key="item.title" :link="!noData" @click="navigateTo(item.title)">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item>
          </v-list-group>
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
    };
  },
  computed: {
    items: function () {
      return [
        { title: "Basics", icon: "mdi-clipboard-text" },
        { title: "Combinations", icon: "mdi-set-none" },
        { title: "Average Game", icon: "mdi-equalizer-outline" },
        { title: "Aggression", icon: "mdi-emoticon-angry" }
      ];
    },
    complexMenu: function () {
      return [{
        title: "Classifications",
        icon: "mdi-book-variant",
        items: [
          { title: "Millionaire", icon: "mdi-cash" },
          { title: "Match Type", icon: "mdi-clipboard-text-multiple-outline" },
          { title: "Murderous Duo", icon: "mdi-account-multiple" },
          { title: "Duo Type", icon: "mdi-heart-outline" },
          { title: "Farmer Type", icon: "mdi-silo" },
          { title: "Tactician", icon: "mdi-billboard" },
        ],
      }];
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
        console.log(res.data)
        this.$store.dispatch("finish", res.data);
        router.replace({ name: "Basics" });
      })
      .catch(() => {
        this.$store.dispatch("error");
        router.replace({ name: "Home" });
      });
  },
  methods: {
    navigateTo: function (name) {
      if (name == "Basics") {
        router.replace({ name: 'Basics' })
      } else if (name == "Aggression") {
        router.replace({ name: 'Aggression' })
      } else if (name == "Average Game") {
        router.replace({ name: 'AverageGame' })
      } else if (name == "Match Type") {
        router.replace({ name: "MatchType" })
      } else if (name == "Duo Type") {
        router.replace({ name: "DuoType" })
      } else if (name == "Farmer Type") {
        router.replace({ name: "FarmerType" })
      } else if (name == "Murderous Duo") {
        router.replace({ name: "MurderousDuo" })
      } else if (name == "Tactician") {
        router.replace({ name: "Tactician" })
      } else if (name == "Millionaire") {
        router.replace({ name: "Millionaire" })
      } else if (name == "Combinations") {
        router.replace({ name: "Combinations" })
      }
    }
  }
};
</script>

<style>
.root {
  width: 100%;
  height: 100%;
  float: left;
}
</style>