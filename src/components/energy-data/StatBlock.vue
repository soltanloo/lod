<template>
  <div class="block">
    <div>
      <p class="secondary-title">{{ title }}</p>
      <h2 class="primary-title">{{ formattedValue }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const formattedValue = computed(() =>
      props.value !== null && props.value !== undefined
        ? parseFloat(props.value.toFixed(1))
        : 'N/A',
    )

    return { formattedValue }
  },
})
</script>
