<template>
  <div id="display">
    <h1>
      <span>{{ hours }}</span
      >: <span>{{ minutes }}</span
      >:
      <span v-bind:class="{ highlight: !timerRunning }">{{ seconds }}</span>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'Display',
  props: {
    hours: [Number, String],
    minutes: [Number, String],
    seconds: [Number, String],
    timerRunning: Boolean,
  },
};
</script>
