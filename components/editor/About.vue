<template>
  <div class="container-fluid">
    <Members />
    <v-divider />
    <Delegates />
  </div>
</template>
<script>
import Members from './Members'
import Delegates from './Delegates'

export default {
  components: {
    Members,
    Delegates
  }
}
</script>
