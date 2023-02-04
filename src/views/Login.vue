<template>
</template>

<script>
import { defineComponent } from "vue";
import service from "../config/service";
export default defineComponent({
  data() {
    return {
    };
  },
  methods: {
  },
});
</script>

<style scoped>
.wave {
  overflow: hidden;
  width: 100vw;
  position: absolute;
  bottom: 5vh;
  height: 300px;
  left: 0;
}

.wave1 {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 104vw;
  animation-name: wave1;
  animation-duration: 5s;
  animation-iteration-count: infinite;
}

.wave2 {
  position: absolute;
  left: -8vw;
  bottom: 0;
  width: 108vw;
  animation-name: wave2;
  animation-duration: 5s;
  animation-iteration-count: infinite;
}

.img11 {
  position: absolute;
  left: 340px;
  top: 300px;
  animation-name: img11;
  animation-duration: 5s;
  animation-iteration-count: infinite;
}

@keyframes wave1 {
  0% {
    left: 0vw;
  }

  50% {
    left: -4vw;
  }

  100% {
    left: 0vw;
  }
}

@keyframes wave2 {
  0% {
    left: -8vw;
  }

  50% {
    left: 0vw;
  }

  100% {
    left: -8vw;
  }
}

@keyframes img11 {
  0% {
    transform: translateY(-5px);
  }

  50% {
    transform: translateY(20px);
  }

  100% {
    transform: translateY(-5px);
  }
}
</style>
