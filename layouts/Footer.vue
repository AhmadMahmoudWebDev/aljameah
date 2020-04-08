<template>
  <v-footer
    dark
    padless
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-text class="teal darken-4 white--text text-center">
        يمكنكم التواصل مع الجمعية عبر:

        <v-spacer />

        <v-btn
          v-for="social in socials"
          :key="social.name"
          :href="social.link"
          class="mx-4"
          dark
          icon
          target="_blank"
          ripple
        >
          <v-icon size="24px">
            {{ social.icon }}
          </v-icon>
        </v-btn>
        <v-spacer />
        <v-chip
          color="primary"
          dark
          ripple
          :link="true"
          href="tel:00963112712550"
        >
          <span dir="ltr" class="font-weight-bold">+963-11-271 25 50</span>
          <v-avatar right>
            <v-icon>fa fa-phone</v-icon>
          </v-avatar>
        </v-chip>
        <v-chip
          color="success"
          dark
        >
          <span dir="ltr" class="font-weight-bold">147589 لدى المصرف التجاري السوري</span>
          <v-avatar right tile>
            <v-icon>fas fa-donate</v-icon>
          </v-avatar>
        </v-chip>
      </v-card-text>
      <v-card-text class="py-2 white--text text-center grey darken-4">
        {{ new Date().getFullYear() }} — <strong>الجمعية التضامنية الإجتماعية الخيرية</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    socials: [
      {
        name: 'gmail',
        link: 'mailto:ahmadmahmoud.webdev@gmail.com',
        icon: 'fab fa-google'
      },
      {
        name: 'facbook',
        link: 'https://www.facebook.com/%D8%A7%D9%84%D8%AC%D9%85%D8%B9%D9%8A%D8%A9-%D8%A7%D9%84%D8%AA%D8%B6%D8%A7%D9%85%D9%86%D9%8A%D8%A9-%D8%A7%D9%84%D8%A5%D8%AC%D8%AA%D9%85%D8%A7%D8%B9%D9%8A%D8%A9-%D8%A7%D9%84%D8%AE%D9%8A%D8%B1%D9%8A%D8%A9-214491952627783/',
        icon: 'fab fa-facebook'
      },
      {
        name: 'youtube',
        link: 'https://www.youtube.com/channel/UCkBAULDOl_J2wk5ozzHAGjw',
        icon: 'fab fa-youtube'
      }
    ]
  })
}
</script>
