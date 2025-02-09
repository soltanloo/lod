<template>
  <div class="flex justify-between items-start self-stretch secondary-title flex-col xs:flex-row">
    <div class="flex items-center gap-4">
      <p>Start time</p>
      <p>{{ startDate }}</p>
    </div>
    <div class="flex flex-col items-start gap-3">
      <div class="flex items-center gap-4 self-stretch">
        <p>End time</p>
        <p>{{ endDate }}</p>
      </div>

      <div class="flex items-start justify-center gap-1">
        <AlarmIcon class="width-1" />
        <p>{{ duration }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AlarmIcon from '../../assets/svg/AlarmIcon.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { AlarmIcon },
  props: {
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    duration: { type: String, required: true },
  },
})
</script>
