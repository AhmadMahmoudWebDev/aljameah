<template>
  <div class="container-fluid pt-9 mt-5">
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
      مندوبيّ الجمعية
    </h2>
    <v-dialog v-model="createDelegateDialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark class="mb-2" v-on="on">
          إضافة مندوب جديد
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline"> إضافة مندوب جديد</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="insertedItem.place"
                  :counter="50"
                  :rules="titleRules"
                  label="المكان"
                  required
                />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="insertedItem.name"
                  :counter="50"
                  :rules="titleRules"
                  label="الإسم"
                  required
                />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="insertedItem.mobile"
                  :counter="10"
                  :rules="phoneRules"
                  label="الموبايل"
                  required
                  prepend-icon="fas fa-mobile"
                />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="insertedItem.phone"
                  :counter="10"
                  :rules="phoneRules"
                  label="الهاتف"
                  required
                  prepend-icon="fas fa-phone"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="createDelegateDialog = false">
            إلغاء
          </v-btn>
          <v-btn color="blue darken-1" text @click="create">
            إنشاء
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              المكان
            </th>
            <th>
              الإسم
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in delegates" :key="item.id">
            <td class="text-left">
              {{ item.place }}
            </td>
            <td>{{ item.name }}</td>
            <td>
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
              >
                fa fa-edit
              </v-icon>
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
    <v-dialog v-model="editDelegateDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline"> تعديل المندوب</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.place"
                  :counter="50"
                  :rules="titleRules"
                  label="المكان"
                  required
                />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.name"
                  :counter="50"
                  :rules="titleRules"
                  label="الإسم"
                  required
                />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.mobile"
                  :counter="10"
                  :rules="phoneRules"
                  label="الموبايل"
                  required
                  prepend-icon="fas fa-mobile"
                />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.phone"
                  :counter="10"
                  :rules="phoneRules"
                  label="الهاتف"
                  required
                  prepend-icon="fas fa-phone"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="editDelegateDialog = false">
            إلغاء
          </v-btn>
          <v-btn color="blue darken-1" text @click="update">
            تعديل
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Parse from 'parse'
export default {
  name: 'Delegates',
  data () {
    return {
      delegates: [],
      createDelegateDialog: false,
      editDelegateDialog: false,
      snackbar: false,
      messagetext: '',
      messageColor: '',
      insertedItem: {
        place: '',
        name: '',
        mobile: '',
        phone: ''
      },
      editedItem: {
        id: '',
        place: '',
        name: '',
        mobile: '',
        phone: ''
      },
      titleRules: [
        v => !!v || 'الحقل مطلوب',
        // eslint-disable-next-line no-misleading-character-class
        v => v.match(/^[\sأ-يء ّ ءَآ ً ُ]+$/) ? true : false || 'فقط أحرف عربية',
        v => (v && v.length <= 50) || 'على الحقل ألا يتجاوز ال 50 حرف'
      ],
      phoneRules: [
        v => v.match(/^[0-9٠-٩]+$/) ? true : false || 'أرقام فقط',
        v => (v && v.length <= 10) || 'على الحقل ألا يتجاوز ال 10 رقم'
      ]
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
      const Delegates = Parse.Object.extend('Delegates')
      const query = new Parse.Query(Delegates)
      this.delegates = []
      query.find().then((results) => {
      // You can use the "get" method to get the value of an attribute
      // Ex: response.get("<ATTRIBUTE_NAME>")
        results.forEach((element) => {
          this.delegates.push({
            id: element.id,
            name: element.get('name'),
            place: element.get('place'),
            mobile: element.get('mobile'),
            phone: element.get('phone')
          })
        })
      })
    },
    deleteItem (item) {
      // delete In Backend
      const Delegates = Parse.Object.extend('Delegates')
      const query = new Parse.Query(Delegates)
      // here you put the objectId that you want to delete
      query.get(item.id).then((object) => {
        object.destroy().then((response) => {
          if (typeof document !== 'undefined') {
            this.messagetext = 'تم حذف المندوب بنجاح'
            this.messageColor = 'success'
            this.initialize()
            this.snackbar = true
          }
        }, (error) => {
          if (typeof document !== 'undefined') {
            this.messagetext = 'حدث خطأ في حذف العضو يرجى إعادة المحاولة'
            this.messageColor = 'danger'
            this.snackbar = true
          }
          // eslint-disable-next-line no-console
          console.error('Error while deleting Delegates', error)
        })
      })
    },
    create () {
      // Create in Backend
      const Delegates = Parse.Object.extend('Delegates')
      const myNewObject = new Delegates()

      myNewObject.set('name', this.insertedItem.name)
      myNewObject.set('place', this.insertedItem.place)
      myNewObject.set('mobile', this.insertedItem.mobile)
      myNewObject.set('phone', this.insertedItem.phone)

      myNewObject.save().then(
        (result) => {
          if (typeof document !== 'undefined') {
            this.messagetext = 'تم إنشاء المندوب بنجاح'
            this.messageColor = 'success'
            this.initialize()
            this.snackbar = true
            this.createDelegateDialog = false
          }
        },
        (error) => {
          if (typeof document !== 'undefined') {
            this.messagetext = 'حدث خطأ في إنشاء المندوب يرجى إعادة المحاولة'
            this.messageColor = 'danger'
            this.snackbar = true
          }
          // eslint-disable-next-line no-console
          console.log(error)
        }
      )
    },
    editItem (item) {
      this.editedItem.id = item.id
      this.editedItem.name = item.name
      this.editedItem.place = item.place
      this.editedItem.mobile = item.mobile
      this.editedItem.phone = item.phone
      this.editDelegateDialog = true
    },
    update () {
      // update in backend
      const Delegates = Parse.Object.extend('Delegates')
      const query = new Parse.Query(Delegates)
      // here you put the objectId that you want to update
      query.get(this.editedItem.id).then((object) => {
        object.set('name', this.editedItem.name)
        object.set('place', this.editedItem.place)
        object.set('mobile', this.editedItem.mobile)
        object.set('phone', this.editedItem.phone)
        object.save().then((response) => {
          // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
          if (typeof document !== 'undefined') {
            this.messagetext = 'تم تعديل المندوب بنجاح'
            this.messageColor = 'success'
            this.initialize()
            this.snackbar = true
            this.editDelegateDialog = false
          }
        }, (error) => {
          if (typeof document !== 'undefined') {
            this.messagetext = 'حدث خطأ في تعديل المندوب يرجى إعادة المحاولة'
            this.messageColor = 'danger'
            this.snackbar = true
          }
          // eslint-disable-next-line no-console
          console.error('Error while updating Delegates', error)
        })
      })
    }
  }
}
</script>
