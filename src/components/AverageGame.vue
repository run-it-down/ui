<template>
  <v-layout>
    <v-container fluid>
      <v-row>
        <v-col
          v-for="summoner in averageGame.summoners"
          :key="summoner.summoner"
        >
          <v-card>
            <v-card-text>
              <v-row class="text-h5" align="center">
                {{ summoner.summoner }}
              </v-row>
              <v-row>
                <v-col class="subtitle-1" style="font-weight: bold">
                  KDA
                </v-col>
                <v-col class="subtitle-1">
                  {{ summoner.kda }}
                </v-col>
              </v-row>
              <v-row>
                <v-col class="subtitle-1" style="font-weight: bold">
                  Role
                </v-col>
                <v-col class="subtitle-1">
                  {{ summoner.role }}
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card elevation="2">
            <v-card-text>
              <v-row align="center">
                <v-col class="text-h4">
                  {{ this.averageTime }}
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col class="display-5">
                  Average Game Time
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card elevation="2">
            <v-card-text>
              <v-row align="center">
                <v-col class="text-h4">
                  {{ parseFloat(this.averageGame.common.winrate).toFixed(2) }} %
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col class="display-5">
                  Average Win Rate
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card elevation="2">
            <v-card-text>
              <v-row align="center">
                <v-col class="text-h4">
                  {{ this.averageGame.common.bans }}
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col class="display-5">
                  most banned champion
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card elevation="2">
            <v-card-text>
              <v-row align="center">
                <v-col class="text-h4">
                  {{ this.averageGame.common.drakes }}
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col class="subtitle-1">
                  <v-icon>$dragon</v-icon> Dragons
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card elevation="2">
            <v-card-text>
              <v-row align="center">
                <v-col class="text-h4">
                  {{ this.averageGame.common.heralds }}
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col class="subtitle-1">
                  <v-icon>$herald</v-icon> Heralds
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card elevation="2">
            <v-card-text>
              <v-row align="center">
                <v-col class="text-h4">
                  {{ this.averageGame.common.nash }}
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col class="subtitle-1">
                  <v-icon>$nashor</v-icon> Baron Nashors
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Firsts...</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-if="averageGame.common.first_blood">
                  In your games, your team tends to draw first blood.
                </v-list-item>
                <v-list-item v-if="averageGame.common.first_tower">
                  In your games, your team tends to destroy the first turret.
                </v-list-item>
                <v-list-item v-if="averageGame.common.first_inhib">
                  In your games, your team tends to destroy the first inhibitor.
                </v-list-item>
                <v-list-item v-if="averageGame.common.first_herald">
                  In your games, your team tends to kill the first herald.
                </v-list-item>
                <v-list-item v-if="averageGame.common.first_dragon">
                  In your games, your team tends to kill the first dragon.
                </v-list-item>
                <v-list-item v-if="averageGame.common.first_baron">
                  In your games, your team tends to kill the first baron.
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  name: "AverageGame",
  computed: {
    gameInfo: {
      get: function () {
        return this.$store.state.analysis.game_information;
      },
    },
    averageGame: {
      get: function () {
        console.log(this.$store.state.analysis["avg-game"]);
        return this.$store.state.analysis["avg-game"];
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
};
</script>