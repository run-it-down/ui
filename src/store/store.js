import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    "loading": false,
    "notFound": false,
    "summoner": "",
    "partner": "",
    "analysis": {}
  },
  mutations: {
    changeSummoner (state, payload) {
      state.summoner = payload;
    },
    changePartner (state, payload) {
      state.partner = payload;
    },
    setLoading (state, payload) {
      state.loading = payload;
    },
    saveAnalysis (state, payload) {
      state.analysis = payload;
    },
    notFound (state, payload) {
      state.notFound = payload;
    }
  },
  actions: {
    load(context) {
      context.commit("setLoading", true);
      context.commit("notFound", false);
    },
    finish(context, analysis) {
      context.commit("setLoading", false);
      context.commit("saveAnalysis", analysis);
      context.commit("notFound", false);
    },
    error(context) {
      context.commit("setLoading", false);
      context.commit("notFound", true);
    }
  },
  modules: {}
})