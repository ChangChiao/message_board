<script setup>

</script>

<template>
  <div class='w-screen h-screen bg-black opacity-50 top-0 left-0 z-10 fixed flex items-center justify-center'>
      <div class='loading'></div>
  </div>
</template>

<style scoped>
@-webkit-keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading {
  border-radius: 50%;
  width: 24px;
  height: 24px;
  border: 0.25rem solid rgba(255, 255, 255, 0.2);
  border-top-color: white;
  -webkit-animation: spin 1s infinite linear;
          animation: spin 1s infinite linear;
}

</style>
