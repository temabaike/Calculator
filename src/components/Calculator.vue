<template>
  <div class="phone" :class="[isActive ? 'blackbg' : 'whitebg']">
    <div class="top">
      <custom-button @click="showHistory" :class="[isActive ? 'greybg' : 'whitebg']">
        <img
          class="image-button"
          src="../assets/history.png"
          alt="history image"/>
      </custom-button>
      <custom-button @click="isActive = !isActive" :class="[isActive ? 'greybg' : 'whitebg']">
        <img
          class="image-button"
          src="../assets/moon.png"
          alt="moon image"/>
          </custom-button>
    </div>
    <ul v-if="isHistory" class="historyDetails">
      <li :key="operation.operations" v-for="operation in historyData">
        <small>{{ operation.operations }}</small>
        <h2>{{ operation.sum }}</h2>
      </li>
    </ul>

    <div class="middle">
      <h1>{{ prevNum }} {{ selectedOperation }} {{ currentNum }}</h1>
    </div>
    <div class="bottom">
      <custom-button :class="[isActive ? 'greybg' : 'whitebg']" @click="pressed('c')">c</custom-button>
      <custom-button :class="[isActive ? 'greybg' : 'whitebg']" @click="deleteValue"
        ><img
          class="image-button"
          src="../assets/delete.png"
          alt="delete image"
      /></custom-button>
      <custom-button :class="[isActive ? 'whitebg' : 'whitebg']" @click="pressed('%')">%</custom-button>
      <custom-button :class="[isActive ? 'whitebg' : 'whitebg']" @click="pressed('/')">/</custom-button>

      <custom-button :class="[isActive ? 'whiteclr' : 'blackclr']" @click="pressed('7')">7</custom-button>
      <custom-button :class="[isActive ? 'whiteclr' : 'blackclr']" @click="pressed('8')">8</custom-button>
      <custom-button :class="[isActive ? 'whiteclr' : 'blackclr']" @click="pressed('9')">9</custom-button>
      <custom-button :class="[isActive ? 'whitebg' : 'whitebg']" @click="pressed('*')">*</custom-button>

      <custom-button :class="[isActive ? 'whiteclr' : 'blackclr']" @click="pressed('4')">4</custom-button>
      <custom-button :class="[isActive ? 'whiteclr' : 'blackclr']" @click="pressed('5')">5</custom-button>
      <custom-button :class="[isActive ? 'whiteclr' : 'blackclr']" @click="pressed('6')">6</custom-button>
      <custom-button :class="[isActive ? 'whitebg' : 'whitebg']" @click="pressed('-')">-</custom-button>

      <custom-button :class="[isActive ? 'whiteclr' : 'blackclr']" @click="pressed('1')">1</custom-button>
      <custom-button :class="[isActive ? 'whiteclr' : 'blackclr']" @click="pressed('2')">2</custom-button>
      <custom-button :class="[isActive ? 'whiteclr' : 'blackclr']" @click="pressed('3')">3</custom-button>
      <custom-button :class="[isActive ? 'whitebg' : 'whitebg']" @click="pressed('+')">+</custom-button>

      <custom-button :class="[isActive ? 'whiteclr' : 'blackclr']" @click="negateValue">+/-</custom-button>
      <custom-button :class="[isActive ? 'whiteclr' : 'blackclr']" @click="pressed('0')">0</custom-button>
      <custom-button :class="[isActive ? 'whiteclr' : 'blackclr']" @click="pressed('.')">.</custom-button>
      <custom-button :class="[isActive ? 'whitebg' : 'whitebg']" @click="pressed('=')">=</custom-button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import CustomButton from "./UI/CustomButton.vue";
export default {
  data() {
    return {
     isActive: false
    }
  },
  components: { CustomButton },
  setup() {
    const operations = ["+", "-", "*", "/", "%"];
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
    const currentNum = ref("");
    const prevNum = ref("");
    const selectedOperation = ref("");
    const total = ref("");
    const isHistory = ref(false);
    const pressed = (value) => {
      if (value === "=") {
        historyData.push({
          operations: `${prevNum.value} ${selectedOperation.value} ${currentNum.value}`,
          sum: eval(
            `${prevNum.value} ${selectedOperation.value} ${currentNum.value}`
          ),
        });
        calculate();
      } else if (value === "%") percentage();
      else if (value === "c") clear();
      else if (operations.includes(value)) applyOperation(value);
      else if (numbers.includes(value)) appendNumber(value);
    };
    const appendNumber = (value) => {
      currentNum.value = currentNum.value + value;
    };
    const applyOperation = (value) => {
      calculate();
      prevNum.value = currentNum.value;
      currentNum.value = "";
      selectedOperation.value = value;
    };
    const calculate = () => {
      if (selectedOperation.value === "*") multiply();
      else if (selectedOperation.value === "/") divide();
      else if (selectedOperation.value === "%") percentage();
      else if (selectedOperation.value === "-") subtract();
      else if (selectedOperation.value === "+") sum();
      prevNum.value = "";
      selectedOperation.value = "";
    };
    const multiply = () => {
      currentNum.value = prevNum.value * currentNum.value;
      total.value = currentNum.value;
    };
    const divide = () => {
      currentNum.value = prevNum.value / currentNum.value;
      total.value = currentNum.value;
    };
    const percentage = () => {
      currentNum.value = currentNum.value / 100;
      total.value = currentNum.value;
    };
    const subtract = () => {
      currentNum.value = prevNum.value - currentNum.value;
      total.value = currentNum.value;
    };
    const sum = () => {
      currentNum.value = +prevNum.value + +currentNum.value;
      total.value = currentNum.value;
    };
    const clear = () => {
      currentNum.value = "";
      prevNum.value = "";
      selectedOperation.value = "";
      currentNum.value = "";
    };

    const deleteValue = () => {
      if (currentNum.value.length !== 0 && currentNum.value !== "0") {
        currentNum.value = currentNum.value.slice(0, -1);
      }
    };

    const negateValue = () => {
      if (currentNum.value === "0") {
        return (currentNum.value = "-0");
      }
      if (currentNum.value === "-") {
        return (currentNum.value = "0");
      }
      if (currentNum.value === "0.") {
        return (currentNum.value = `-${currentNum.value}`);
      }
      if (currentNum.value === "-0.") {
        return (currentNum.value = "0.");
      }
      currentNum.value = `${currentNum.value * -1}`;
    };

    let historyData = [];

    const showHistory = () => {
      isHistory.value = !isHistory.value;
    };

    return {
      currentNum,
      pressed,
      selectedOperation,
      prevNum,
      negateValue,
      deleteValue,
      total,
      historyData,
      isHistory,
      showHistory,
    };
  },
};
</script>

<style>
.phone {
  width: 20rem;
  margin: auto;
  position: relative;
  border-radius: 30px;
  padding-bottom: 10px;
  box-shadow: 0px 0px 20px 5px black;
  background-color: white;
}
.blackbg{
  background-color: #455A64;
}
.whitebg{
  background-color: white;
}
.greybg{
  background-color: rgb(131, 159, 140);
}
.whiteclr {
  color: white;
}
.blackclr {
  color: black;
}
.top {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}
.image-button {
  padding: 6px 1px 0px 0px;
  width: 28px;
  height: 28px;
}

.top button:nth-child(2){
  padding-left: 9px;
}
.historyDetails {
  border-radius: 10px;
  position: absolute;
  bottom: 12px;
  left: 0;
  background-color: #fff;
  height: 23rem;
  width: 17.5rem;
  z-index: 999;
  overflow-y: scroll;
}
.historyDetails li {
  border-bottom: 1px solid gray;
  padding-bottom: 10px;
}
.middle {
  text-align: center;
  margin: 3rem 0rem 0.5rem;
  height: 6rem;
}
.middle h1 {
  font-size: 2.5rem;
  letter-spacing: -1px;
}

.bottom {
  padding: 1.4rem 1rem;
  height: 23rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
  grid-gap: 0.5rem;
}

.bottom button:nth-child(1) {
  padding-bottom: 7px;
  color: #000;
}
.bottom button:nth-child(2) {
  padding-top: 3px;
    padding-right: 9px;
}
.bottom button:nth-child(3) {
  color: #27925c;
}
.bottom button:nth-child(4) {
  color: #27925c;
}
.bottom button:nth-child(8) {
  color: #27925c;
  padding-top: 16px;
}
.bottom button:nth-child(12) {
  color: #27925c;
  padding-bottom: 6px;
}
.bottom button:nth-child(16) {
  color: #27925c;
  padding-bottom: 5px;
}
.bottom button:nth-child(20) {
  color: #27925c;
  padding-bottom: 2px;
}
</style>