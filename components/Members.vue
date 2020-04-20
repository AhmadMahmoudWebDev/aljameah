<template>
  <v-card-text>
    <v-card-text class="white--text">
      أعضاء مجلس الإدارة:
    </v-card-text>
    <v-list-item v-for="(member) in members" :key="member.id">
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold">
          {{ member.name }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ member.title }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar tile>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-chip
              :color="items['3'].iconColor"
              dark
              ripple
              :link="true"
              :href="'tel:00963' + member.mobile"
              v-on="on"
            >
              <v-avatar>
                <v-icon>
                  fas fa-mobile-alt
                </v-icon>
              </v-avatar>
            </v-chip>
          </template>
          <span><bdi>(+963) {{ member.mobile }}</bdi></span>
        </v-tooltip>
      </v-list-item-avatar>
    </v-list-item>
  </v-card-text>
</template>

<script>
import Parse from 'parse'

export default {
  name: 'Members',
  data: () => ({
    members: []
  }),
  computed: {
    items () {
      return this.$store.state.mainCategories.items
    }
  },
  created () {
    this.loadMembers()
  },
  methods: {
    loadMembers () {
      if (process.client) {
        const online = navigator.onLine
        if (online) {
          Parse.serverURL = 'https://parseapi.back4app.com' // This is your Server URL
          Parse.initialize(
            'nmEfF3xwLXGr4qlXeUccFmXlK0jA2bdy8UrY61U9', // This is your Application ID
            'YeNOM9wb8QBuaI8LBjyoKjps843U3P5VEU4CpbSi' // This is your Javascript key
          )
          const Member = Parse.Object.extend('Member')
          const query = new Parse.Query(Member)
          query.find().then((results) => {
          // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
            results.forEach((member) => {
              this.members.push({
                id: member.id,
                name: member.get('name'),
                title: member.get('title'),
                mobile: member.get('mobile')
              })
            })
            this.$localForage.members.setItem('members', this.members)
          })
        } else {
          this.$localForage.members.getItem('members').then((members) => {
            this.members = members
          })
        }
      }
    }
  }
}
</script>
