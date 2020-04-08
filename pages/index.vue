<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="(item, i) in items"
        :key="i"
        cols="12"
        sm="6"
        md="6"
        lg="6"
        xl="3"
      >
        <v-card
          :color="item.color"
          :to="item.link"
          dark
          shaped
          hover
          ripple
          nuxt
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline"
                v-text="item.title"
              />

              <v-card-subtitle v-text="item.description" />
            </div>

            <v-avatar
              class="ma-3"
              size="75"
              tile
            >
              <v-icon :color="item.iconColor" size="75">
                {{ item.icon }}
              </v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  computed: {
    items () {
      return this.$store.state.mainCategories.items
    }
  }
}
</script>
