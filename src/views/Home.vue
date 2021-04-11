<template>
  <div class="home">
    <div>
      <v-container fluid>
        <v-alert
          type="error"
          v-if="this.$store.state.notFound"
          dismissible
          dense
        >
          No data found for given summoners. Trigger a data collection run to be
          able to run it down.
        </v-alert>
        <v-alert
          type="success"
          v-if="this.$store.state.crawled"
          dismissible
          dense
        >
          You successfully triggered your data collection run
        </v-alert>
      </v-container>
    </div>
    <div class="content">
      <v-form ref="form" class="form">
        <v-text-field
          ref="summoner"
          label="Your Summoner"
          placeholder="Type in your summoner name"
          v-model="summoner"
          :rules="[() => !!summoner || 'This field is required']"
        />
        <v-text-field
          ref="partner"
          label="Your Partner"
          placeholder="Type in your partner's summoner name"
          v-model="partner"
          :rules="[() => !!partner || 'This field is required']"
        />

        <v-row>
          <v-col>
            <v-btn color="success" @click="onSubmit">run it down!</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
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
                      Please keep in mind, that the collection process can take
                      a while dependent on number of games to collect. <br />
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
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import router from "@/router/router";
import ApiLayer from "@/api/api";

export default {
  components: {
  },
  propsData: {
    formErrors: false,
  },
  data() {
    return {
      dialog: false,
      token: ""
    }
  },
  computed: {
    summoner: {
      get: function () {
        return this.$store.state.summoner;
      },
      set: function (summoner) {
        this.$store.commit("changeSummoner", summoner);
      },
    },
    partner: {
      get: function () {
        return this.$store.state.partner;
      },
      set: function (partner) {
        this.$store.commit("changePartner", partner);
      },
    },
    formData: function () {
      const formData = {
        summoner: this.summoner,
        partner: this.partner,
      };
      return formData;
    },
    form: function () {
      return this.$refs.form;
    },
  },
  methods: {
    onSubmit: function () {
      this.formErrors = false;

      this.checkErrors();
      if (!this.formErrors) {
        router.push({ path: "/analysis" });
      }
    },
    checkErrors: function() {
      Object.keys(this.formData).forEach((key) => {
        if (!this.formData[key]) {
          this.formErrors = true;
        }
        this.form.validate();
      });
    },
    crawlData: function() {
      let api = new ApiLayer();
      if (this.token) {
        const response = api.crawlData(this.token, this.summoner, this.partner);
        response.then(() => {
          this.dialog = false;
          this.$store.dispatch("triggered");
        })
      } else {
        this.$refs.token.validate();
      }
    },
    openDialog: function() {
      this.checkErrors();
      if (!this.formErrors) {
        this.dialog = true;
      }
    }
  },
  mounted: function () {
    this.$store.dispatch("untriggered");
  },
};
</script>

<style>
.home {
  height: 100%;
  display: flex;
  flex-flow: column;
}

.content {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
}

.form {
  width: 75%;
}
</style>
