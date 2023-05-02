<template>
    <button class="custom-button">
      <slot></slot>
    </button>
</template>

<script>
export default {
};
</script>

<style>
.custom-button {
  background-color: transparent;
  font-family: 'Lato', sans-serif;
  font-size: 30px;
  border: none;
  border-radius: 50px;
  width: 60px;
  height: 60px;
  
}
.custom-button:hover {
  background-color: #81C784;
  transition: ease 0.1s;
}
</style>