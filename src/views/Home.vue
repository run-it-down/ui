<template>
  <div class="home">
    <div class="content">
      <v-form ref="form">
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

        <v-btn color="success" @click="onSubmit">run it down!</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import router from '@/router/router';

export default {
  propsData: {
    formErrors: false
  },
  computed: {
    summoner: {
      get: function() {
        return this.$store.state.summoner
      },
      set: function(summoner) {
        this.$store.commit("changeSummoner", summoner)
      }
    },
    partner: {
      get: function() {
        return this.$store.state.partner
      },
      set: function(partner) {
        this.$store.commit("changePartner", partner)
      }
    },
    formData: function() {
      const formData = {
        summoner: this.summoner,
        partner: this.partner
      }
      return formData
    },
    form: function() {
      return this.$refs.form
    }
  },
  methods: {
    onSubmit: function() {
      this.formErrors = false;

      Object.keys(this.formData).forEach((key) => {
        if (!this.formData[key]) {
          this.formErrors = true;
        }
        this.form.validate();
      });
      if (!this.formErrors) {
        router.push({ path: "/analysis" });
      }
    }
  }
}
</script>

<style>
.home {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
}

.content {
  width: 75%;
}
</style>
