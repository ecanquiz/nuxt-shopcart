<script setup>
defineProps({
  modelValue: { type: [Number, String], default: 0 },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (value) => {
  let num = Number(value);
  if (isNaN(num) || value === "" || num < 0) num = 0;
  emit("update:modelValue", num);
};

// Evitar que se escriba la letra "e" o signos negativos en el input
const onlyNumbers = (event) => {
  const keyCode = event.keyCode || event.which;
  const keyValue = String.fromCharCode(keyCode)
  // Permite números, punto (.), y signo negativo (-)
  if (!/^[-0-9.]$/.test(keyValue)) {
    event.preventDefault()
  }
};
</script>

<template>
  <span>
    <button class="cursor-pointer px-2 rounded-l" @click="updateValue(modelValue > 0 ? modelValue - 1 : 0)">
      -
    </button>
    <input class="border-gray-500 w-10 text-center" :value="modelValue" type="number" min="0"
      @input="updateValue($event.target.value)" @keydown="onlyNumbers" />
    <button class="px-2 rounded-r cursor-pointer" @click="updateValue(Number(modelValue) + 1)">
      +
    </button>
  </span>
</template>

<style scoped lang="postcss">
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

input[type="number"] {
  appearance: none;
  -moz-appearance: textfield;
  border: 1px solid gray;
  /* @apply border-gray-500 w-10 text-center; TODO */
}

button {
  border: 1px solid gray;
}
</style>
