<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            Duo Type classifies two summoners based on their time spent together. The following types can occur: <br />
            <b>Singles (&lt; 1/3)</b>, <b>Friends</b> or <b>Lovers(&gt; 2/3)</b>.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card :color="color">
          <v-card-text>
            <v-row align="center">
              <v-col class="text-h5">
                {{ this.summoner }} and {{ this.partner }}
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col class="subtitle-1">
                are
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col class="text-h5">
                <b>{{ duoType.type }}</b>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col class="subtitle-1">
                Both of you spend around {{ +( Math.round(this.duoType["pct_spent_together"] + "e+4") + "e-4") * 100 }}% of the game together.
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DuoType",
  computed: {
    duoType: {
      get: function() {
        return this.$store.state.analysis.duo_type
      }
    },
    summoner: {
      get: function() {
        return this.$store.state.summoner
      }
    },
    partner: {
      get: function() {
        return this.$store.state.partner
      }
    },
    color: {
      get: function() {
        if (this.duoType.type == "Lovers") {
          return "#79DE79";
        } else if (this.duoType.type == "Friends") {
          return "#FCFC99";
        } else if (this.duoType.type == "Singles") {
          return "#FB6962";
        } else {
          return "#A8E4EF";
        }
      }
    }
  }
};
</script>