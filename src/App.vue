<template>
  <div id="app">
    <Display
      :hours="hours"
      :minutes="minutes"
      :seconds="seconds"
      :timerRunning="timerRunning"
    ></Display>

    <Controls
      :timerRunning="timerRunning"
      :timerSpeed="timerSpeed"
      :timer="timer"
      :hours="hours"
      :minutes="minutes"
      @run="run"
      @adjustSpeed="setTimerSpeed"
      @toggleTimerRunning="toggleTimerRunning"
      @mins="operateMins"
      @hours="operateHours"
    ></Controls>
  </div>
</template>

<script>
import Display from './components/Display';
import Controls from './components/Controls';
import timer from '@/utils/timer';

export default {
  name: 'App',
  data() {
    return {
      hours: 23,
      minutes: 59,
      seconds: 54,
      timer: null,
      timerRunning: true,
      timerSpeed: 1000,
    };
  },
  components: {
    Display,
    Controls,
  },
  created() {
    this.run();
  },
  methods: {
    run() {
      this.timer = setInterval(() => {
        this.seconds = timer(this.seconds, 60);
        if (this.seconds == 0) {
          this.minutes = timer(this.minutes, 60);
          if (this.minutes == 0) {
            this.hours = timer(this.hours, 24);
          }
        }
      }, this.timerSpeed);
    },
    setTimerSpeed(speed) {
      this.timerSpeed = speed;
    },
    toggleTimerRunning() {
      this.timerRunning = !this.timerRunning;
    },
    operateMins(mins) {
      this.minutes = mins;
    },
    operateHours(hours) {
      this.hours = hours;
    },
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: digital;
  src: url('assets/fonts/DS-DIGI.TTF');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: digitalI;
  src: url('assets/fonts/DS-DIGIT.TTF');
  font-weight: italic;
}
* {
  touch-action: manipulation;
}
body {
  background-color: #000;
}

div#display {
  display: flex;
  height: 45vh;
  justify-content: center;
  h1 {
    align-self: center;
    font-family: digitalI;
    text-align: center;
    color: #333;
    font-size: 18vw;
    margin: 0;
    span {
      color: red;
      width: 20vw;
      display: inline-block;
    }
  }
}

div#controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  div.flex {
    display: flex;
    justify-content: center;
    div.buttons {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
  }
  button {
    font-family: digital;
    background: none;
    color: red;
    font-size: 4vw;
    height: 13vh;
    border-color: red;
    &:focus {
      outline: none;
      box-shadow: none;
    }
    &.highlight {
      background-color: rgba(255, 0, 0, 0.2) !important;
    }
  }
  button#play {
    display: block;
    width: 100%;
  }
}

.highlight {
  color: orange !important;
}
</style>
