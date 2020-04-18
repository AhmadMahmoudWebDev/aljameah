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
      أعضاء الجمعية
    </h2>
    <v-dialog v-model="createMemberDialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark class="mb-2" v-on="on">
          إضافة عضو جديد
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline"> إضافة عضو جديد</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="insertedItem.title"
                  :counter="50"
                  :rules="titleRules"
                  label="المسمى"
                  required
                  hint="رئيس الجمعية، المحاسب...."
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
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="createMemberDialog = false">
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
              المسمى
            </th>
            <th>
              الإسم
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in members" :key="item.id">
            <td class="text-left">
              {{ item.title }}
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
    <v-dialog v-model="editMemberDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline"> تعديل العضو</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.title"
                  :counter="50"
                  :rules="titleRules"
                  label="المسمى"
                  required
                  hint="رئيس الجمعية، المحاسب...."
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
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="editMemberDialog = false">
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
  name: 'Members',
  data () {
    return {
      members: [],
      createMemberDialog: false,
      editMemberDialog: false,
      snackbar: false,
      messagetext: '',
      messageColor: '',
      insertedItem: {
        title: '',
        name: '',
        mobile: ''
      },
      editedItem: {
        id: '',
        title: '',
        name: '',
        mobile: ''
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
      const member = Parse.Object.extend('Member')
      const query = new Parse.Query(member)
      this.members = []
      query.find().then((results) => {
      // You can use the "get" method to get the value of an attribute
      // Ex: response.get("<ATTRIBUTE_NAME>")
        results.forEach((element) => {
          this.members.push({
            id: element.id,
            name: element.get('name'),
            title: element.get('title'),
            mobile: element.get('mobile')
          })
        })
      })
    },
    deleteItem (item) {
      // delete In Backend
      const Member = Parse.Object.extend('Member')
      const query = new Parse.Query(Member)
      // here you put the objectId that you want to delete
      query.get(item.id).then((object) => {
        object.destroy().then((response) => {
          if (typeof document !== 'undefined') {
            this.messagetext = 'تم حذف العضو بنجاح'
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
          console.error('Error while deleting Members', error)
        })
      })
    },
    create () {
      // Create in Backend
      const Member = Parse.Object.extend('Member')
      const myNewObject = new Member()

      myNewObject.set('name', this.insertedItem.name)
      myNewObject.set('title', this.insertedItem.title)
      myNewObject.set('mobile', this.insertedItem.mobile)

      myNewObject.save().then(
        (result) => {
          if (typeof document !== 'undefined') {
            this.messagetext = 'تم إنشاء العضو بنجاح'
            this.messageColor = 'success'
            this.initialize()
            this.snackbar = true
            this.createMemberDialog = false
          }
        },
        (error) => {
          if (typeof document !== 'undefined') {
            this.messagetext = 'حدث خطأ في إنشاء العضو يرجى إعادة المحاولة'
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
      this.editedItem.title = item.title
      this.editedItem.mobile = item.mobile
      this.editMemberDialog = true
    },
    update () {
      // update in backend
      const Member = Parse.Object.extend('Member')
      const query = new Parse.Query(Member)
      // here you put the objectId that you want to update
      query.get(this.editedItem.id).then((object) => {
        object.set('name', this.editedItem.name)
        object.set('title', this.editedItem.title)
        object.set('mobile', this.editedItem.mobile)
        object.save().then((response) => {
          // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
          if (typeof document !== 'undefined') {
            this.messagetext = 'تم تعديل العضو بنجاح'
            this.messageColor = 'success'
            this.initialize()
            this.snackbar = true
            this.editMemberDialog = false
          }
        }, (error) => {
          if (typeof document !== 'undefined') {
            this.messagetext = 'حدث خطأ في تعديل العضو يرجى إعادة المحاولة'
            this.messageColor = 'danger'
            this.snackbar = true
          }
          // eslint-disable-next-line no-console
          console.error('Error while updating Members', error)
        })
      })
    }
  }
}
</script>
