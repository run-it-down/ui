<template>
  <v-layout>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              Here is your run down for {{ this.summoner }} and
              {{ this.partner }}
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" persistent max-width="750px">
                <template v-slot:activator="{ attrs }">
                  <v-btn color="primary" v-bind="attrs" @click="openDialog">
                    Collect Data!
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline"> Collect data? </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col>
                        Data Collection currently requires your Riot Games API
                        Key. <br />
                        Please keep in mind, that the collection process can
                        take a while dependent on number of games to collect.
                        <br />
                        Are you sure you want to continue?
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          ref="token"
                          label="Your Riot Games API-Token"
                          required
                          v-model="token"
                          :rules="[() => !!token || 'This field is required']"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="dialog = false">
                      Cancel
                    </v-btn>
                    <v-btn color="green darken-1" text @click="crawlData">
                      Continue
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row dense>
        <!-- Column 1 -->
        <v-col>
          <!-- Game Count -->
          <v-row>
            <v-container fluid>
              <v-card elevation="2">
                <v-card-text>
                  <v-row align="center">
                    <v-col class="display-3">
                      {{ this.gameInfo.games }} games
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col class="display-5">
                      were analyzed for {{ this.summoner }} and
                      {{ this.$store.state.partner }}
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-container>
          </v-row>
          <!-- Basics: S1 -->
          <v-row>
            <v-container fluid>
              <v-card elevation="2">
                <v-card-text>
                  <v-row align="center" justify="center">
                    <div class="text-h3">{{ this.summoner }}</div>
                  </v-row>
                  <v-row align="center">
                    <v-divider></v-divider>
                  </v-row>
                  <v-row align="center">
                    <v-col justify="start">
                      <div class="subtitle-1">KDA</div>
                    </v-col>
                    <v-col>
                      <div class="body-1">{{ this.kda[summoner].kda }}</div>
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col justify="start">
                      <div class="subtitle-1">Overall Kills</div>
                    </v-col>
                    <v-col>
                      <div class="body-1">{{ this.kda[summoner].kills }}</div>
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col justify="start">
                      <div class="subtitle-1">Overall Deaths</div>
                    </v-col>
                    <v-col>
                      <div class="body-1">{{ this.kda[summoner].deaths }}</div>
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col justify="start">
                      <div class="subtitle-1">Overall Assists</div>
                    </v-col>
                    <v-col>
                      <div class="body-1">{{ this.kda[summoner].assists }}</div>
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col justify="start">
                      <div class="subtitle-1">Average Creep Score</div>
                    </v-col>
                    <v-col>
                      <div class="body-1">
                        {{ this.analysis.cs[summoner] }} CS / game
                      </div>
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col justify="start">
                      <div class="subtitle-1">Average Role</div>
                    </v-col>
                    <v-col>
                      <div class="body-1">
                        {{ this.analysis.avg_role[this.summoner] }}
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-container>
          </v-row>
        </v-col>
        <!-- Column 2 -->
        <v-col>
          <!-- Time -->
          <v-row>
            <v-container fluid>
              <v-card elevation="2">
                <v-card-text>
                  <v-row align="center">
                    <v-col class="display-3">
                      {{ this.averageTime }}
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col class="display-5">
                      Average game time for {{ this.summoner }} and
                      {{ this.partner }}
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-container>
          </v-row>
          <!-- Basics: S2 -->
          <v-row>
            <v-container fluid>
              <v-card elevation="2">
                <v-card-text>
                  <v-row align="center" justify="center">
                    <div class="text-h3">{{ this.partner }}</div>
                  </v-row>
                  <v-row align="center">
                    <v-divider></v-divider>
                  </v-row>
                  <v-row align="center">
                    <v-col justify="start">
                      <div class="subtitle-1">KDA</div>
                    </v-col>
                    <v-col>
                      <div class="body-1">{{ this.kda[partner].kda }}</div>
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col justify="start">
                      <div class="subtitle-1">Overall Kills</div>
                    </v-col>
                    <v-col>
                      <div class="body-1">{{ this.kda[partner].kills }}</div>
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col justify="start">
                      <div class="subtitle-1">Overall Deaths</div>
                    </v-col>
                    <v-col>
                      <div class="body-1">{{ this.kda[partner].deaths }}</div>
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col justify="start">
                      <div class="subtitle-1">Overall Assists</div>
                    </v-col>
                    <v-col>
                      <div class="body-1">{{ this.kda[partner].assists }}</div>
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col justify="start">
                      <div class="subtitle-1">Average Creep Score</div>
                    </v-col>
                    <v-col>
                      <div class="body-1">
                        {{
                          +(
                            Math.round(this.analysis.cs[partner] + "e+2") +
                            "e-2"
                          )
                        }}
                        CS / game
                      </div>
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col justify="start">
                      <div class="subtitle-1">Average Role</div>
                    </v-col>
                    <v-col>
                      <div class="body-1">
                        {{ this.analysis.avg_role[this.partner] }}
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-container>
          </v-row>
        </v-col>
        <!-- Column 3: Queue Types -->
        <v-col>
          <v-row>
            <v-container fluid>
              <v-card elevation="2">
                <v-card-text>
                  <v-row align="center">
                    <v-col class="display-3">
                      {{
                        +(
                          Math.round(
                            this.$store.state.analysis.winrate.win_rate + "e+4"
                          ) + "e-4"
                        ) * 100
                      }}
                      %
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col class="display-5">
                      Win Rate for {{ this.summoner }} and {{ this.partner }}
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-container>
          </v-row>
          <v-row>
            <v-container>
              <v-card elevation="2">
                <v-card-text>
                  <v-row justify="center">
                    <pie-chart :data="queueTypes"></pie-chart>
                  </v-row>
                  <v-row>
                    <v-col class="display-5">
                      What game modes did {{ this.summoner }} and
                      {{ this.partner }} play together?
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-container>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import PieChart from "@/components/Pie"
import ApiLayer from "@/api/api"

export default {
  name: "Basics",
  components: {
    PieChart,
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    analysis: {
      get: function () {
        return this.$store.state.analysis;
      },
    },
    kda: {
      get: function () {
        return this.$store.state.analysis.kda;
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
              backgroundColor: [
                "rgb(170, 189, 140)",
                "rgb(56, 29, 42)",
                "rgb(161, 103, 74)",
              ],
            },
          ],
        };
      },
    },
    averageTime: {
      get: function () {
        const minutes = Math.floor(this.gameInfo.duration / 60);
        const seconds = Math.floor(this.gameInfo.duration % 60);

        return `${minutes} min ${seconds} s`;
      },
    },
  },
  methods: {
    crawlData: function () {
      let api = new ApiLayer();
      if (this.token) {
        const response = api.crawlData(this.token, this.summoner, this.partner);
        response.then(() => {
          this.dialog = false;
          this.$store.dispatch("triggered");
        });
      } else {
        this.$refs.token.validate();
      }
    },
    openDialog: function () {
      this.dialog = true;
    },
  },
};
</script>
