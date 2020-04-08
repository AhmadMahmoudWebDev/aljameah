<template>
  <div class="container-fluid">
    <v-snackbar
      v-model="snackbar"
      :timeout="1500"
      :color="messageColor"
      multi-line
      vertical
    >
      {{ messagetext }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        إغلاق
      </v-btn>
    </v-snackbar>
    <h2 class="text-center">
      آخر الوفيات
    </h2>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              الإسم
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in occasions" :key="item.id">
            <td class="text-left">
              {{ item.name }}
            </td>
            <td>
              <v-icon
                small
                @click="deleteItem(item)"
              >
                fa fa-trash
              </v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import Parse from 'parse'
export default {
  name: 'Occasions',
  data () {
    return {
      occasions: [],
      snackbar: false,
      messagetext: '',
      messageColor: ''
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      Parse.serverURL = 'https://parseapi.back4app.com' // This is your Server URL
      Parse.initialize(
        'nmEfF3xwLXGr4qlXeUccFmXlK0jA2bdy8UrY61U9', // This is your Application ID
        'YeNOM9wb8QBuaI8LBjyoKjps843U3P5VEU4CpbSi' // This is your Javascript key
      )
      const Occasion = Parse.Object.extend('Occasion')
      const query = new Parse.Query(Occasion)
      this.occasions = []
      query.find().then((results) => {
      // You can use the "get" method to get the value of an attribute
      // Ex: response.get("<ATTRIBUTE_NAME>")
        results.forEach((element) => {
          this.occasions.push({
            id: element.id,
            name: element.get('name')
          })
        })
      })
    },
    deleteItem (item) {
      // delete In Backend
      const Occasion = Parse.Object.extend('Occasion')
      const query = new Parse.Query(Occasion)
      // here you put the objectId that you want to delete
      query.get(item.id).then((object) => {
        object.destroy().then((response) => {
          if (typeof document !== 'undefined') {
            this.messagetext = 'تم حذف الخبر بنجاح'
            this.messageColor = 'success'
            this.initialize()
            this.snackbar = true
          }
        }, (error) => {
          if (typeof document !== 'undefined') {
            this.messagetext = 'حدث خطأ في حذف الخبر يرجى إعادة المحاولة'
            this.messageColor = 'danger'
            this.snackbar = true
          }
          // eslint-disable-next-line no-console
          console.error('Error while deleting Occasion', error)
        })
      })
    }
  }
}
</script>
