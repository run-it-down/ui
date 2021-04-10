<template>
  <v-layout>
    <v-container fluid>
      <v-row dense>
        <v-col>
          <v-card>
            <v-card-text>
              <v-row align="center">
                <v-col class="display-3">
                  {{ this.gameInfo.games }} games
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col class="display-5">
                  were analyzed for {{ this.$store.state.summoner }} and
                  {{ this.$store.state.partner }}
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-text>
              <v-row align="center">
                <v-col class="display-3">
                  {{ this.averageTime }}
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col class="display-5">
                  Average game time for {{ this.$store.state.summoner }} and
                  {{ this.$store.state.partner }}
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>Queue Types</v-card-title>
            <pie-chart :chartData="queueTypes"></pie-chart>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import PieChart from "@/components/Pie";

export default {
  name: "Basics",
  components: {
    PieChart
  },
  computed: {
    gameInfo: {
      get: function () {
        return this.$store.state.analysis.game_information;
      },
    },
    queueTypes: {
      get: function () {
        const labels = [];
        const data = [];

        for (const key in this.gameInfo.queueType) {
          const entry = this.gameInfo.queueType[key];
          console.log(entry);
          labels.push(entry["type"]);
          data.push(entry["count"]);
        }

        return {
          labels: labels,
          datasets: [
            {
              label: "Played Queue Types",
              data: data,
            },
          ],
        };
      },
      averageTime: {
        get: function () {
          const minutes = Math.floor(this.gameInfo.duration / 60);
          const seconds = Math.floor(this.gameInfo.duration % 60);

          return `${minutes} min ${seconds} s`;
        },
      },
    },
  },
};
</script>

<script>
import { Component, Vue } from "vue-property-decorator";
import PieChart from "@/components/Pie";

@Component({
  components: {
    PieChart,
  },
})
export default class Analysis extends Vue {
  get gameInfo() {
    return this.$store.state.analysis.game_information;
  }
  get queueTypes() {
    const labels = [];
    const data = [];

    for (const key in this.gameInfo.queueType) {
      const entry = this.gameInfo.queueType[key];
      console.log(entry);
      labels.push(entry["type"]);
      data.push(entry["count"]);
    }

    return {
      labels: labels,
      datasets: [
        {
          label: "Played Queue Types",
          data: data,
        },
      ],
    };
  }
  get averageTime() {
    const minutes = Math.floor(this.gameInfo.duration / 60);
    const seconds = Math.floor(this.gameInfo.duration % 60);

    return `${minutes} min ${seconds} s`;
  }
}
</script>