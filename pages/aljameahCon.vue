<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        lg="6"
        md="6"
        sm="6"
        xl="6"
      >
        <v-card dark :loading="loading" color="#004D40">
          <v-card-text>
            <v-card-title>تسجيل الدخول</v-card-title>
            <v-card-subtitle>تسجيل الدخول للوحة التحكم بالموقع</v-card-subtitle>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="logIn.username"
                :counter="10"
                :rules="nameRules"
                label="إسم المستخدم"
                required
              />

              <v-text-field
                v-model="logIn.password"
                :append-icon="show ? 'fas fa-eye' : 'fas fa-eye-slash'"
                :rules="[rules.required]"
                :type="show ? 'text' : 'password'"
                placeholder="كلمة المرور"
                counter
                @click:append="show = !show"
              />
              <v-btn
                :disabled="!valid"
                color="primary"
                class="mr-4"
                @click="userLogin"
              >
                تسجيل دخول
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
        <v-snackbar
          v-model="snackbar"
          :timeout="3000"
          color="red"
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
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Parse from 'parse'

export default {
  data: () => {
    return {
      valid: false,
      logIn: {
        username: '',
        password: ''
      },
      loading: false,
      show: false,
      snackbar: false,
      messagetext: '',
      rules: {
        required: value => !!value || 'كلمة السر.'
      },
      nameRules: [
        v => !!v || 'الإسم مطلوب',
        v => (v && v.length <= 50) || 'على الإسم ألا يتجاوز ال 50 حرف'
      ]
    }
  },
  methods: {
    userLogin () {
      Parse.serverURL = 'https://parseapi.back4app.com' // This is your Server URL
      Parse.initialize(
        'nmEfF3xwLXGr4qlXeUccFmXlK0jA2bdy8UrY61U9', // This is your Application ID
        'YeNOM9wb8QBuaI8LBjyoKjps843U3P5VEU4CpbSi' // This is your Javascript key
      )
      this.loading = true
      // Pass the username and password to logIn function
      Parse.User.logIn(this.logIn.username, this.logIn.password).then((user) => {
        this.loading = false
        this.$router.push('/editor')
      }).catch(() => {
        this.$router.push('/aljameahCon')
        this.snackbar = true
        this.loading = false
        this.messagetext = 'إسم المستخدم و كلمة المرور غير صحيحتين'
      })
    }
  }
}
</script>
