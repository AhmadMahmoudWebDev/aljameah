<template>
  <v-card
    dark
    shaped
    :color="items['3'].color"
    raised
    class="mt-3"
  >
    <v-card-text class="white--text">
      مندوبين الجمعية التضامنية
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="fa-search"
        label="بحث"
        single-line
        hide-details
      />
    </v-card-text>
    <v-data-table
      :headers="headers"
      :items="delegates"
      :search="search"
      disable-pagination
      hide-default-footer
    />
  </v-card>
</template>

<script>
import Parse from 'parse'
export default {
  name: 'Delegates',
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'إسم المندوب',
          align: 'left',
          value: 'name'
        },
        { text: 'المنطقة', value: 'place' },
        { text: 'الهاتف', sortable: false, value: 'phone' },
        { text: 'موبايل', sortable: false, value: 'mobile' }
      ],
      delegates: []
    }
  },
  computed: {
    items () {
      return this.$store.state.mainCategories.items
    }
  },
  created () {
    this.loadDelegates()
  },
  methods: {
    loadDelegates () {
      if (process.client) {
        if (this.$nuxt.isOnline) {
          Parse.serverURL = 'https://parseapi.back4app.com' // This is your Server URL
          Parse.initialize(
            'nmEfF3xwLXGr4qlXeUccFmXlK0jA2bdy8UrY61U9', // This is your Application ID
            'YeNOM9wb8QBuaI8LBjyoKjps843U3P5VEU4CpbSi' // This is your Javascript key
          )
          const Delegates = Parse.Object.extend('Delegates')
          const query = new Parse.Query(Delegates)
          query.find().then((results) => {
          // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
            results.forEach((delegate) => {
              this.delegates.push({
                id: delegate.id,
                name: delegate.get('name'),
                place: delegate.get('place'),
                mobile: delegate.get('mobile'),
                phone: delegate.get('phone')
              })
            })
            this.$localForage.delegates.setItem('delegates', this.delegates)
          })
        } else {
          this.$localForage.delegates.getItem('delegates').then((delegates) => {
            this.delegates = delegates
          })
        }
      }
    }
  }

}
</script>
