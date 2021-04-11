<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            Based on their Creep Score Share (CSS) and their Creep Score
            Difference (CSD), both summoners will be classified as either
            <b>Farmers</b> or <b>City Kids</b>.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card :color="color(this.farmerType[this.summoner].isClass)">
          <v-card-text>
            <v-row align="center">
              <v-col class="text-h5">
                {{ this.summoner }}
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col class="subtitle-1"> is a </v-col>
            </v-row>
            <v-row align="center">
              <v-col class="text-h5">
                <b>{{ this.type(this.farmerType[this.summoner].isClass) }}</b>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card :color="color(this.farmerType[this.partner].isClass)">
          <v-card-text>
            <v-row align="center">
              <v-col class="text-h5">
                {{ this.partner }}
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col class="subtitle-1"> is a </v-col>
            </v-row>
            <v-row align="center">
              <v-col class="text-h5">
                <b>{{ this.type(this.farmerType[this.partner].isClass) }}</b>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" dense>
      <v-col>
        <v-layout justify-center>
          <v-card>
            <v-card-text>
              <v-row align="center" justify="center">
                Visualizing CSS and CSD distribution compared to class centers
              </v-row>
              <v-row>
                <v-col>
                  <scatter-chart
                    :data="data"
                    :options="options"
                  ></scatter-chart>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-layout>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ScatterChart from "@/components/Scatter";

export default {
  name: "FarmerType",
  components: {
    ScatterChart,
  },
  computed: {
    farmerType: {
      get: function () {
        return this.$store.state.analysis.farmer_type;
      },
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
    options: {
      get: function () {
        return {
          responsive: true,
          scales: {
            display: true,
            xAxes: [{
              display: true,
              scaleLabel: {
                labelString: "CS Share",
                display: true
              },
              ticks: {
                suggestedMin: 0,
                suggestedMax: 1
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                labelString: "CS Difference",
                display: true
              },
              ticks: {
                suggestedMin: 0,
                suggestedMax: 1
              }
            }]
          }
        };
      },
    },
    data: {
      get: function () {
        return {
          labels: ["CS Share", "CS Difference"],
          datasets: [
            {
              label: `${this.summoner} - Center`,
              data: [
                {
                  x: this.farmerType[this.summoner].value[0],
                  y: this.farmerType[this.summoner].value[1],
                },
              ],
              borderColor: "rgba(219, 83, 15, 0.6)",
              backgroundColor: "rgba(223, 111, 55, 0.5)",
            },
            {
              label: `${this.summoner} - Data`,
              data: this.farmerType.raw[this.summoner].map((it) => {
                return { x: it[0], y: it[1] };
              }),
              borderColor: "rgba(204, 15, 8, 0.6)",
              backgroundColor: "rgba(201, 52, 46, 0.5)",
            },
            {
              label: `${this.partner} - Center`,
              data: [
                {
                  x: this.farmerType[this.partner].value[0],
                  y: this.farmerType[this.partner].value[1],
                },
              ],
              borderColor: "rgba(6, 74, 74, 0.6)",
              backgroundColor: "rgba(13, 133, 133, 0.5)",
            },
            {
              label: `${this.partner} - Data`,
              data: this.farmerType.raw[this.partner].map((it) => {
                return { x: it[0], y: it[1] };
              }),
              borderColor: "rgba(0, 71, 71, 0.6)",
              backgroundColor: "rgba(0, 99, 99, 0.5)",
            },
            {
              label: `Farmer - Center`,
              data: [
                {
                  x: this.farmerType.cluster_centre["0"][0],
                  y: this.farmerType.cluster_centre["0"][1],
                },
              ],
              borderColor: "rgba(0, 140, 21, 0.6)",
              backgroundColor: "rgba(0, 212, 32, 0.5)",
            },
            {
              label: `City Kid - Center`,
              data: [
                {
                  x: this.farmerType.cluster_centre["1"][0],
                  y: this.farmerType.cluster_centre["1"][1],
                },
              ],
              borderColor: "rgba(0, 11, 105, 0.6)",
              backgroundColor: "rgba(0, 20, 199, 0.5)",
            },
          ],
        };
      },
    },
  },
  methods: {
    color: function (isClass) {
      return isClass ? "#79DE79" : "#FB6962";
    },
    type: function (isClass) {
      return isClass ? "Farmer" : "City Kid";
    },
  },
};
</script>