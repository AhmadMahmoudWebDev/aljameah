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
        <v-card :loading="loading">
          <v-card-title>الإشتراك في موقع الجمعية</v-card-title>
          <v-card-text>
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
                placeholder="كلمة المرور الخاصة بك"
                counter
                @click:append="show = !show"
              />
              <v-btn
                color="primary"
                class="mr-4 mb-7"
                :loading="loading"
                @click="userRegister"
              >
                إشتراك
                <v-icon right>
                  fas fa-sign-in-alt
                </v-icon>
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
      logIn: {
        username: '',
        password: ''
      },
      valid: false,
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
    userRegister () {
      Parse.serverURL = 'https://parseapi.back4app.com' // This is your Server URL
      Parse.initialize(
        'nmEfF3xwLXGr4qlXeUccFmXlK0jA2bdy8UrY61U9', // This is your Application ID
        'YeNOM9wb8QBuaI8LBjyoKjps843U3P5VEU4CpbSi' // This is your Javascript key
      )
      const user = new Parse.User()
      user.set('username', this.logIn.username)
      user.set('password', this.logIn.password)
      this.loading = true
      // Pass the username and password to logIn function
      user.signUp().then((user) => {
        this.loading = false
        Parse.User.logIn(this.logIn.username, this.logIn.password).then((user) => {
          const Role = new Parse.Role()
          const query = new Parse.Query(Role)
          query.get('LVh2h5MpO2').then((role) => {
            role.getUsers().add(user)
            role.save()
          })
          this.$router.push('/occasions/create')
        }).catch(() => {
          this.$router.push('/login')
        })
      }).catch(() => {
        this.$router.push('/register')
        this.snackbar = true
        this.loading = false
        this.messagetext = 'لقد حدث خطأ بالإشتراك يرجى المحاولة لاحقاً'
      })
    }
  }
}
</script>
