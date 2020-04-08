/* eslint-disable no-misleading-character-class */
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
      الأجهزة الطبية
    </h2>
    <v-dialog v-model="createMedicalEqDialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark class="mb-2" v-on="on">
          إضافة معدّة طبية جديدة
        </v-btn>
      </template>
      <v-card :loading="loading">
        <v-card-title>
          <span class="headline"> إضافة معدّة طبية جديدة</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="insertedItem.title"
                  :counter="50"
                  :rules="titleRules"
                  label="الإسم"
                  required
                  hint="إسم المعدّة الطبية"
                />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  v-model="insertedItem.excerpt"
                  :counter="254"
                  :rules="placeRules"
                  name="excerpt"
                  label="الوصف"
                  hint="وصف المعدّة الطبية، ميزاتها، مكوناتها..."
                  required
                />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-file-input
                  v-model="insertedItem.images"
                  :show-size="1000"
                  color="deep-purple accent-4"
                  label="الصور"
                  multiple
                  accept="image/*"
                  placeholder="إضافة صورة أو عدّة صور للمعدّة الطبية"
                  prepend-icon="fa-images"
                  outlined
                >
                  <template v-slot:selection="{ index, text }">
                    <v-chip
                      v-if="index < 2"
                      color="deep-purple accent-4"
                      dark
                      label
                      small
                    >
                      {{ text }}
                    </v-chip>

                    <span
                      v-else-if="index === 2"
                      class="overline grey--text text--darken-3 mx-2"
                    >
                      +{{ insertedItem.images.length - 2 }} File(s)
                    </span>
                  </template>
                </v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="success" @click="createMedicalEqDialog = false">
            إلغاء
          </v-btn>
          <v-btn
            :loading="loading"
            :disabled="loading"
            color="success"
            @click="create"
          >
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
              إسم المعدّة الطبية
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in medicalEqs" :key="item.id">
            <td class="text-left">
              {{ item.title }}
            </td>
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
    <v-dialog v-model="editMedicalEqDialog" max-width="500px">
      <v-card :loading="loading">
        <v-card-title>
          <span class="headline"> تعديل المعدّة الطبية</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.title"
                  :counter="50"
                  :rules="titleRules"
                  label="الإسم"
                  required
                  hint="أسم المعدّة الطبية"
                />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  v-model="editedItem.excerpt"
                  :counter="254"
                  :rules="placeRules"
                  name="editedExcerpt"
                  label="الوصف"
                  hint="وصف المعدة الطبية، مميزاتها، مكوناتها..."
                  required
                />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-file-input
                  v-model="editedItem.images"
                  :show-size="1000"
                  color="deep-purple accent-4"
                  label="الصور"
                  multiple
                  accept="image/*"
                  placeholder="تعديل صور المعدّة الطبية"
                  prepend-icon="fa-images"
                  outlined
                >
                  <template v-slot:selection="{ index, text }">
                    <v-chip
                      v-if="index < 2"
                      color="deep-purple accent-4"
                      dark
                      label
                      small
                    >
                      {{ text }}
                    </v-chip>

                    <span
                      v-else-if="index === 2"
                      class="overline grey--text text--darken-3 mx-2"
                    >
                      +{{ editedItem.images.length - 2 }} File(s)
                    </span>
                  </template>
                </v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="success" @click="editMedicalEqDialog = false">
            إلغاء
          </v-btn>
          <v-btn
            :loading="loading"
            :disabled="loading"
            color="success"
            @click="update"
          >
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
  name: 'MedicalEqs',
  data () {
    return {
      medicalEqs: [],
      createMedicalEqDialog: false,
      editMedicalEqDialog: false,
      snackbar: false,
      loading: false,
      messagetext: '',
      messageColor: '',
      insertedItem: {
        title: '',
        excerpt: '',
        images: null
      },
      editedItem: {
        id: '',
        title: '',
        excerpt: '',
        images: null
      },
      titleRules: [
        v => !!v || 'الحقل مطلوب',
        // eslint-disable-next-line no-misleading-character-class
        v => v.match(/^[\sأ-يء ّ ءَ ً ُ]+$/) ? true : false || 'فقط أحرف عربية',
        v => (v && v.length <= 50) || 'على الحقل ألا يتجاوز ال 50 حرف'
      ],
      placeRules: [
        v => !!v || 'حقل الوصف مطلوب',
        // eslint-disable-next-line no-misleading-character-class
        v => v.match(/^[0-9٠-٩\sأ-يء ّ ءَ ً ُ]+$/) ? true : false || 'فقط أحرف عربية و أرقام',
        v => (v && v.length <= 254) || 'على الحقل ألا يتجاوز ال 254 حرف'
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
      const MedicalEq = Parse.Object.extend('MedicalEq')
      const query = new Parse.Query(MedicalEq)
      this.medicalEqs = []
      query.find().then((results) => {
      // You can use the "get" method to get the value of an attribute
      // Ex: response.get("<ATTRIBUTE_NAME>")
        results.forEach((element) => {
          this.medicalEqs.push({
            id: element.id,
            title: element.get('title'),
            excerpt: element.get('excerpt'),
            images: element.get('images')
          })
        })
      })
    },
    deleteItem (item) {
      // delete In Backend
      const MedicalEq = Parse.Object.extend('MedicalEq')
      const query = new Parse.Query(MedicalEq)
      // here you put the objectId that you want to delete
      query.get(item.id).then((object) => {
        object.destroy().then((response) => {
          if (typeof document !== 'undefined') {
            this.messagetext = 'تم حذف المعدّة الطبية بنجاح'
            this.messageColor = 'success'
            this.initialize()
            this.snackbar = true
          }
        }, (error) => {
          if (typeof document !== 'undefined') {
            this.messagetext = 'حدث خطأ في حذف المعدّة الطبية يرجى إعادة المحاولة'
            this.messageColor = 'danger'
            this.snackbar = true
          }
          // eslint-disable-next-line no-console
          console.error('Error while deleting MedicalEq', error)
        })
      })
    },
    create () {
      // Create in Backend
      const MedicalEq = Parse.Object.extend('MedicalEq')
      const myNewObject = new MedicalEq()

      myNewObject.set('title', this.insertedItem.title)
      myNewObject.set('excerpt', this.insertedItem.excerpt)
      this.insertedItem.images.forEach((image, index) => {
        switch (index) {
          case 0:
            myNewObject.set('image1', new Parse.File('image1.jpg', image))
            break
          case 1:
            myNewObject.set('image2', new Parse.File('image2.jpg', image))
            break
          case 2:
            myNewObject.set('image3', new Parse.File('image3.jpg', image))
            break
        }
      })
      this.loading = true
      myNewObject.save().then(
        (result) => {
          if (typeof document !== 'undefined') {
            this.loading = false
            this.messagetext = 'تم إنشاء المعدّة الطبية بنجاح'
            this.messageColor = 'success'
            this.initialize()
            this.snackbar = true
            this.createMedicalEqDialog = false
            this.insertedItem = {
              title: '',
              excerpt: '',
              images: null
            }
          }
        },
        (error) => {
          if (typeof document !== 'undefined') {
            this.messagetext = 'حدث خطأ في إنشاء المعدّة الطبية يرجى إعادة المحاولة'
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
      this.editedItem.title = item.title
      this.editedItem.excerpt = item.excerpt
      this.editedItem.images = item.images
      this.editMedicalEqDialog = true
    },
    update () {
      // update in backend
      const MedicalEq = Parse.Object.extend('MedicalEq')
      const query = new Parse.Query(MedicalEq)
      // here you put the objectId that you want to update
      query.get(this.editedItem.id).then((object) => {
        object.set('title', this.editedItem.title)
        object.set('excerpt', this.editedItem.excerpt)
        object.set('images', this.editedItem.images)
        this.editedItem.images.forEach((image, index) => {
          switch (index) {
            case 0:
              object.set('image1', new Parse.File('image1.jpg', image))
              break
            case 1:
              object.set('image2', new Parse.File('image2.jpg', image))
              break
            case 2:
              object.set('image3', new Parse.File('image3.jpg', image))
              break
          }
        })
        this.loading = true
        object.save().then((response) => {
          // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
          if (typeof document !== 'undefined') {
            this.loading = false
            this.messagetext = 'تم تعديل المعدّة الطبية بنجاح'
            this.messageColor = 'success'
            this.initialize()
            this.snackbar = true
            this.editMedicalEqDialog = false
          }
        }, (error) => {
          if (typeof document !== 'undefined') {
            this.messagetext = 'حدث خطأ في تعديل المعدّة الطبية يرجى إعادة المحاولة'
            this.messageColor = 'danger'
            this.snackbar = true
          }
          // eslint-disable-next-line no-console
          console.error('Error while updating MedicalEqs', error)
        })
      })
    }
  }
}
</script>
