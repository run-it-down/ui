<template>
  <v-app>
    <v-app-bar app>
      <router-link to="/" >
          <v-img :src="require(`./assets/logo_text.svg`)" max-height="50px" max-width="210px"/>
      </router-link>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
#app {
  font-family: Roboto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
