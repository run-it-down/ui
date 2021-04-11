<template>
  <v-layout>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card justify="center" align="center">
            <vertical-bar-chart :data="barData"></vertical-bar-chart>
            <v-card-text class="subtitle-1"
              >Aggression Breakdown for {{ this.summoner }} and
              {{ this.partner }}</v-card-text
            >
          </v-card>
        </v-col>
        <v-col>
          <v-card justify="center" align="center">
            <radar-chart
              :data="radarData"
              :options="radarOptions"
            ></radar-chart>
            <v-card-text class="subtitle-1"
              >Aggression Breakdown for {{ this.summoner }} and
              {{ this.partner }}</v-card-text
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import RadarChart from "@/components/Radar";
import VerticalBarChart from "@/components/VerticalBar";

export default {
  name: "Aggression",
  components: {
    RadarChart,
    VerticalBarChart,
  },
  computed: {
    aggression: function () {
      return this.$store.state.analysis.aggression;
    },
    summoner: {
      get: function () {
        return this.$store.state.summoner;
      },
    },
    partner: {
      get: function () {
        return this.$store.state.partner;
      },
    },
    radarData: function () {
      return {
        labels: [
          "Kill Participation",
          "Forward Kills",
          "Positioning",
          "Ganking",
        ],
        datasets: [
          {
            label: this.summoner,
            borderColor: "rgba(229, 88, 18, 0.6)",
            backgroundColor: "rgba(223, 111, 55, 0.5)",
            data: [
              +(Math.round(this.aggression[this.summoner].kp + "e+4") + "e-4") *
                100,
              +(
                Math.round(this.aggression[this.summoner].fw_kills + "e+4") +
                "e-4"
              ) * 100,
              +(
                Math.round(this.aggression[this.summoner].positioning + "e+4") +
                "e-4"
              ) * 100,
              +(
                Math.round(this.aggression[this.summoner].ganking + "e+4") +
                "e-4"
              ) * 100,
            ],
          },
          {
            label: this.partner,
            borderColor: "rgba(0, 38, 38, 0.6)",
            backgroundColor: "rgba(0, 99, 99, 0.5)",
            data: [
              +(Math.round(this.aggression[this.partner].kp + "e+4") + "e-4") *
                100,
              +(
                Math.round(this.aggression[this.partner].fw_kills + "e+4") +
                "e-4"
              ) * 100,
              +(
                Math.round(this.aggression[this.partner].positioning + "e+4") +
                "e-4"
              ) * 100,
              +(
                Math.round(this.aggression[this.partner].ganking + "e+4") +
                "e-4"
              ) * 100,
            ],
          },
        ],
      };
    },
    radarOptions: function () {
      return {
        scale: {
          ticks: {
            beginAtZero: true,
            min: 0,
            stepSize: 20,
          },
        },
      };
    },
    barData: function () {
      return {
        labels: ["Aggression"],
        datasets: [
          {
            label: this.summoner,
            data: [this.aggression[this.summoner].aggression],
            borderColor: "rgba(229, 88, 18, 0.6)",
            backgroundColor: "rgba(223, 111, 55, 0.5)",
          },
          {
            label: this.partner,
            data: [this.aggression[this.partner].aggression],
            borderColor: "rgba(0, 38, 38, 0.6)",
            backgroundColor: "rgba(0, 99, 99, 0.5)",
          },
        ],
      };
    },
  },
};
</script>