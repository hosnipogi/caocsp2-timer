<template>
  <div class="controls toggle">
    <button class="controls__toggle" @click="toggleMenu()" ref="toggle">
      {{ toggled ? '&#9650;' : '&#9660;' }}
    </button>
    <div class="controls__body" ref="controls">
      <div class="flex">
        <div class="buttons">
          <button
            class="speed highlight"
            @click="adjustTimerSpeed($event, 1000)"
          >
            1x
          </button>
          <button @click="operateHour(true, 1)">+1 hour</button>
          <button @click="operateHour(false, 1)">-1 hour</button>
        </div>
        <div class="buttons">
          <button class="speed" @click="adjustTimerSpeed($event, 500)">
            2x
          </button>
          <button @click="operateMin(true, 1)">+1 min</button>
          <button @click="operateMin(false, 1)">-1 min</button>
        </div>
        <div class="buttons">
          <button class="speed" @click="adjustTimerSpeed($event, 250)">
            5x
          </button>
          <button @click="operateMin(true, getMinutesRemainingAdd)">
            +{{ getMinutesRemainingAdd }} min
          </button>
          <button @click="operateMin(false, getMinutesRemainingSubtract)">
            -{{ getMinutesRemainingSubtract }} min
          </button>
        </div>
      </div>
      <button
        id="play"
        v-bind:class="{ highlight: !timerRunning }"
        @click="playPause"
      >
        <span v-if="timerRunning">Pause</span
        ><span v-if="!timerRunning">Play</span>
      </button>
    </div>
  </div>
</template>

<script>
import timer from '@/utils/timer';
import touch from '@/utils/touchControls';

export default {
  name: 'Controls',
  data() {
    return {
      toggled: false,
    };
  },
  props: {
    timerRunning: Boolean,
    timer: Number,
    timerSpeed: Number,
    minutes: [Number, String],
    hours: [Number, String],
  },
  mounted() {
    const display = this.$parent.$refs.display.$el;
    touch(display, (direction, tapOnly) => {
      if (this.toggled) {
        if (tapOnly) {
          this.playPause();
          return;
        }
        switch (direction) {
          case 'left':
            this.operateMin(false, 1);
            break;
          case 'right':
            this.operateMin(true, 1);
            break;
          case 'up':
            this.operateMin(false, 5);
            break;
          case 'down':
            this.operateMin(true, 5);
            break;
          default:
            break;
        }
      } else {
        this.toggleMenu();
      }
    });
  },
  methods: {
    toggleMenu() {
      const controls = this.$refs.controls;
      const display = this.$parent.$refs.display.$el;
      const toggle = this.$refs.toggle;

      this.toggled = !this.toggled;
      controls.classList.toggle('toggle');
      display.classList.toggle('toggled');
      this.toggled ? (toggle.style.opacity = 0.4) : (toggle.style.opacity = 1);
    },
    adjustTimerSpeed(event, speed) {
      const buttons = document.querySelectorAll('button.speed');
      if (this.timerSpeed != speed) {
        this.$emit('adjustSpeed', speed);
        if (this.timerRunning) {
          clearInterval(this.timer);
          this.$emit('run');
        } else {
          this.playPause();
        }

        buttons.forEach((i) => {
          i.classList.remove('highlight');
        });
        event.target.classList.add('highlight');
      }
    },
    playPause() {
      this.timerRunning ? clearInterval(this.timer) : this.$emit('run');
      this.$emit('toggleTimerRunning');
    },
    operateMin(add, by) {
      this.$emit('mins', timer(this.minutes, 60, add, by));
      if (this.minutes >= 55 && add) {
        if (by > 1) {
          this.$emit('hours', timer(this.hours, 24));
        } else if (by && this.minutes === 59) {
          this.$emit('hours', timer(this.hours, 24));
        }
      } else if (this.minutes == 0 && !add) {
        this.$emit('hours', timer(this.hours, 24, false));
      }
    },
    operateHour(add, by) {
      this.$emit('hours', timer(this.hours, 24, add, by));
    },
  },
  computed: {
    getMinutesRemainingAdd() {
      const mins = parseInt(this.minutes);
      let remainingMins = 60 - mins;
      if (remainingMins < 5) {
        return remainingMins;
      } else if (!remainingMins) {
        return 1;
      } else {
        return 5;
      }
    },
    getMinutesRemainingSubtract() {
      const mins = parseInt(this.minutes);
      let remainingMins = 60 - mins;
      if (remainingMins > 55 && remainingMins < 59) {
        return 60 - remainingMins;
      } else if (remainingMins >= 59) {
        return 1;
      } else {
        return 5;
      }
    },
  },
};
</script>
