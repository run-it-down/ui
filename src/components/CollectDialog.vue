<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="750px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" v-bind="attrs" v-on="on"> Collect Data! </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline"> Collect data? </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              Data Collection currently requires your Riot Games API Key. <br/> 
              Please keep in mind, that the collection process can take a while dependent on number of games to collect. <br/>
              Are you sure you want to continue?
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                ref="token"
                label="Your Riot Games API-Token"
                required
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
  </v-row>
</template>

<script>
import ApiLayer from "@/api/api";

export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    crawlData: function() {
      let api = new ApiLayer();
      const response = api.crawlData(this.$refs.token);
      response.then(() => {
        this.dialog = false;
        this.$store.dispatch("triggered");
      })
    },
    on: function() {
      console.log(this.parent.form)
      this.dialog = true;
    }
  }
};
</script>
