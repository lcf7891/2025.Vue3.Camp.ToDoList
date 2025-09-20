<template>
  <div
    class="fixed top-0 left-0 z-40 flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-xs"
  >
    <div class="relative h-[60px] w-[60px]">
      <span
        class="loader absolute top-0 left-0 h-full w-full"
        v-for="i in 20"
        :key="i"
        :style="{ '--i': i }"
      ></span>
    </div>
  </div>
</template>

<style scoped>
  .loader {
    transform: rotate(calc(18deg * var(--i)));
  }
  .loader::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #ffd370;
    box-shadow:
      0 0 10px #ffd370,
      0 0 20px #ffd370,
      0 0 40px #ffd370,
      0 0 60px #ffd370,
      0 0 80px #ffd370,
      0 0 100px #ffd370;
    animation: LoadingAction 1s linear infinite;
    animation-delay: calc(0.05s * var(--i));
  }

  @keyframes LoadingAction {
    0% {
      transform: scale(1);
    }
    60%,
    100% {
      transform: scale(0);
    }
  }
</style>
