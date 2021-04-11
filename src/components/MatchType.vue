<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            Match type determines whether two given summoner's play well
            together. There are three possible outcomes: <b>Perfect Match</b>,
            <b>Average Fit</b> or <b>Mismatch</b>.
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
                are a
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col class="text-h5">
                <b>{{ matchType.type }}</b>
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
  name: "MatchType",
  computed: {
    matchType: {
      get: function() {
        return this.$store.state.analysis.match_type
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
        if (this.matchType.type == "Perfect Match") {
          return "#79DE79";
        } else if (this.matchType.type == "Average Fit") {
          return "#FCFC99";
        } else if (this.matchType.type == "Mismatch") {
          return "#FB6962";
        } else {
          return "#A8E4EF";
        }
      }
    }
  }
};
</script>