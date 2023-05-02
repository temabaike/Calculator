<template>
  <div class="bg">
    <Calculator />
  </div>
</template>

<script>
import Calculator from "./components/Calculator.vue";
export default {
  components: {
    Calculator,
  },
};
</script>

<style >
body {
  background-image: url(./assets/wallpapper.jpg);
  background-size: cover;
  font-family: 'Lato', sans-serif;
}
</style>
