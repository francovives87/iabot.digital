<template>
    <v-navigation-drawer v-if="isAdminView" :model-value="drawer" @update:model-value="updateDrawer" app>
      <v-list dense>
        <v-list-item @click="goToRoute('AdminDashboard')">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon left>mdi-view-dashboard</v-icon>
              Escritorio
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="goToRoute('AdminCalendar')">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon left>mdi-calendar</v-icon>
              Calendario
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script>
  export default {
    props: {
      isAdminView: Boolean,
      drawer: Boolean
    },
    methods: {
      goToRoute(route) {
        this.$router.push({ name: route });
      },
      updateDrawer(value) {
        this.$emit('update:drawer', value);
      }
    }
  };
  </script>
  
  <style scoped>
  .v-navigation-drawer {
    max-width: 300px;
  }
  </style>
  