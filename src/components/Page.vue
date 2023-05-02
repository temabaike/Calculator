<template>
  <div class="calc-wrapper">
    <input
      :class="changeInput"
      type="text"
      class="calc-input"
      v-model="result"
      placeholder="0"
    />
    <custom-button @click="clicked = !clicked" class="change-button">color</custom-button>
    <div class="wrapper">
      <div v-for="button in buttons" :key="button.id">
        <custom-button @click="input(button.sym)">{{button.sym}}</custom-button>
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from "./UI/CustomButton.vue";
import { calculate } from "../functions.js";
export default {
  data() {
    return {
      clicked: false,
      result: "",
      buttons: [
        { id: 1, sym: "7" },
        { id: 2, sym: "8" },
        { id: 3, sym: "9" },
        { id: 4, sym: "/" },
        { id: 5, sym: "4" },
        { id: 6, sym: "5" },
        { id: 7, sym: "6" },
        { id: 8, sym: "*" },
        { id: 9, sym: "1" },
        { id: 10, sym: "2" },
        { id: 11, sym: "3" },
        { id: 12, sym: "-" },
        { id: 13, sym: "AC" },
        { id: 14, sym: "c" },
        { id: 15, sym: "0" },
        { id: 16, sym: "+" },
        { id: 17, sym: "=" },
        { id: 18, sym: "%" },
        { id: 19, sym: "." },
        { id: 20, sym: "+/-" },
      ],
    };
  },
  components: {
    CustomButton,
  },
  computed: {
    changeInput: function () {
      if (this.clicked) {
        return "calc-input-changed";
      } else return false;
    },
  },
  methods: {
    input(char) {
      this.result += char;
      if (this.result.includes("AC")) {
        this.result = "";
      }
      if (this.result.includes("C")) {
        this.result = this.result.slice(0, -2);
      }
      if (this.result.includes("=")) {
        this.result = this.result.slice(0, -1);
        this.result = calculate(this.result);
      }
      if(this.result.includes("%")){
        this.result = this.result.slice(0, -1);
        this.result = this.result / 100
      }
      if(this.result.includes("+/-")){
        this.result = this.result.slice(0, -1);
      this.negateValue()
      }
    },
    negateValue(){
      // if (this.result === "0") {
      //   return (this.result = "-0");
      // }
      // if (this.result === "-") {
      //   return (this.result = "0");
      // }
      // if (this.result === "0.") {
      //   return (this.result = `-${this.result}`);
      // }
      // if (this.result === "-0.") {
      //   return (this.result = "0.");
      // }
      this.result = `${this.result * -1}`;
    }
  },
};
</script>

<style>
.wrapper {
  width: 270px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.calc-input {
  width: 250px;
  border-radius: 5px;
  margin: 150px 0 15px;
  padding: 12px 5px;
  font-size: 25px;
  text-align: end;
}

.calc-input-changed {
  background-color: rgba(255, 166, 0, 0.505);
}

.change-button {
  padding: 0px;
  border-radius: 10px;
  margin: 0;
  position: absolute;
  top: 147px;
  left: 280px;
}

.calc-wrapper {
  position: relative;
}
</style>