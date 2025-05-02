<script setup>
defineProps({
  active: { type: Boolean, default: false },
});

defineEmits(["close"]);
</script>
<template>
  <div v-if="active" class="modal-overlay">
    <div class="modal-overlay-bg" @click="$emit('close')"></div>
    <div class="modal-overlay-content">
      <span class="close" @click="$emit('close')">
        <fa icon="window-close" class="text-gray-700" />
      </span>
      <slot></slot>
    </div>
  </div>
</template>

<!--style lang="postcss" scoped>
.close{
  @apply absolute top-2 right-2;
}
.modal-overlay-bg{
  @apply fixed top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-80;
}
.modal-overlay-content{
  @apply fixed bg-gray-200 text-gray-800 p-10 w-4/5 rounded z-10 top:1/2 left:1/2;
  /*top: 50%;
  left:50%;
  transform: translate(-50%, -50%);*/
}
@media (min-width: 800px){
  .modal-overlay-content{
    width:600px !important;
  }
}
</style-->

<style scoped>
.close {
  position: absolute;
  top: 0.5rem; /* 2 */
  right: 0.5rem; /* 2 */
}

.modal-overlay-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(75, 85, 99, 0.8); /* bg-gray-900 con opacidad */
}

.modal-overlay-content {
  position: fixed;
  background-color: #E5E7EB; /* bg-gray-200 */
  color: #1F2937; /* text-gray-800 */
  padding: 2.5rem; /* p-10 */
  width: 80%; /* w-4/5 */
  border-radius: 0.375rem; /* rounded */
  z-index: 10;
  left: 50%;

  /*top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);*/
}

@media (min-width: 800px) {
  .modal-overlay-content {
    width: 600px !important;
  }
}
</style>
