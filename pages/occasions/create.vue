<template>
  <v-card
    class="mx-auto mt-9 text-center"
    max-width="500"
    dark
    shaped
    color="#212121"
    raised
  >
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <h1>إنشاء مناسبة جديدة</h1>
      <v-card-title class="title font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
        <v-avatar
          color="primary lighten-2"
          class="subheading white--text"
          size="24"
          v-text="step"
        />
      </v-card-title>
      <v-window v-model="step">
        <v-window-item :value="1">
          <Step1 />
        </v-window-item>

        <v-window-item :value="2">
          <Step2 />
        </v-window-item>

        <v-window-item :value="3">
          <Step3 />
          <PreviewOrder />
          <v-card-actions>
            <v-spacer />
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="SendOrder"
            >
              إرسال الطلب
              <v-icon right>
                far fa-paper-plane
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-window-item>
      </v-window>

      <v-divider />

      <v-card-actions>
        <v-btn
          :disabled="step === 1"
          text
          @click="step--"
        >
          رجوع
        </v-btn>
        <v-spacer />
        <v-btn
          :disabled="step === 3"
          color="primary"
          depressed
          @click="step++"
        >
          التالي
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
import Step1 from '~/components/create-occasion/Step1'
import Step2 from '~/components/create-occasion/Step2'
import Step3 from '~/components/create-occasion/Step3'
import PreviewOrder from '~/components/create-occasion/PreviewOrder'

export default {
  components: {
    Step1,
    Step2,
    Step3,
    PreviewOrder
  },
  data: () => ({
    step: 1,
    valid: false
  }),
  middleware: ['auth-create'],
  computed: {
    currentTitle () {
      switch (this.step) {
        case 1: return 'عن المتوفى:'
        case 2: return 'عن موعد الوفاة و الدفن:'
        default: return 'عن التعازي:'
      }
    }
  },
  methods: {
    SendOrder (event) {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.$store.commit('createOccasion/submit')
        this.$router.push('/occasions')
      }
    }
  }
}
</script>
