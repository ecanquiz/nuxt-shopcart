<script setup>
defineProps({
  modelValue: { type: [Number, String], default: 0 },
});

const emit = defineEmits(["update:modelValue", "input"]);
const updateValue = (value) => {
  if (value !== "") {
    emit("update:modelValue", value);
  }
};
</script>
<template>
  <span>
    <button
      class="cursor-pointer px-2 rounded-l"
      @click="updateValue(modelValue > 0 ? modelValue - 1 : null)"
    >
      -
    </button>
    <input
      class="border-gray-500 w-10 text-center"
      :value="modelValue"
      type="number"
      min="0"
      @input="updateValue($event.target.value)"
    />
    <button
      class="px-2 rounded-r cursor-pointer"
      @click="updateValue(modelValue + 1)"
    >
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

