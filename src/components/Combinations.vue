<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            Visualizes champion combinations and their win rate.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col>
                <apexchart
                  :series="this.dataSource"
                  :options="options"
                ></apexchart>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "Combinations",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      options: {
        chart: {
          width: "70%",
          height: 1000,
          type: "heatmap",
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "14px",
            fontFamily: "Roboto",
            fontWeight: "bold",
            colors: ["#444"],
          },
          background: {
            enabled: true,
            borderColor: "#bbb",
            borderWidth: 2
          }
        },
        colors: ["#008FFB"],
        title: {
          text: "Heatmap of champion combinations",
        },
        plotOptions: {
          heatmap: {
            shadeIntensity: 0.5,
          },
        },
        xaxis: {
          title: {
            text: this.$store.state.partner
          }
        },
        yaxis: {
          title: {
            text: this.$store.state.summoner
          }
        }
      },
    };
  },
  computed: {
    dataSource: {
      get: function () {
        let arr = {};
        let uniques = [];
        this.$store.state.analysis.champ_combo.forEach((combo) => {
          if (!(combo["summoner1"] in arr)) {
            arr[combo["summoner1"]] = [];
          }
          if (uniques.indexOf(combo["summoner2"]) == -1) {
            uniques.push(combo["summoner2"]);
          }
        });

        uniques = uniques.map((unique) => {
          return {
            x: unique,
            y: null,
          };
        });

        for (const key of Object.keys(arr)) {
          arr[key] = uniques.map((a) => Object.assign({}, a));
        }

        this.$store.state.analysis.champ_combo.forEach((combo) => {
          let idx = arr[combo["summoner1"]].findIndex(
            (el) => el["x"] == combo["summoner2"]
          );
          if (idx != -1) {
            arr[combo["summoner1"]][idx]["y"] = combo["win_rate"];
          }
        });

        let series = [];
        for (const [key, value] of Object.entries(arr)) {
          series.push({
            name: key,
            data: value,
            allAreas: false,
          });
        }
        console.log(series);
        return series;
      },
    },
  },
};
</script>