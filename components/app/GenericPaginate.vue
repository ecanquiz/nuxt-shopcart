<template>
    <div
        class="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 sm:px-6">
        <nav class="flex items-center justify-between" aria-label="Pagination">
            <slot name="prev">
                <button
                    class="relative inline-flex items-center mr-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 cursor-pointer rounded-md shadow-sm hover:bg-gray-50 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
                    :disabled="!hasPreviousPage" @click="$emit('prev')">
                    Previous
                </button>
            </slot>
            <div class="hidden sm:block mx-2">
                <p class="text-sm text-gray-700">
                    Showing
                    <span class="font-medium">{{ currentPage }}</span>
                    to
                    <span class="font-medium">{{ totalPages }}</span>
                    of
                    <span class="font-medium">{{ totalItems }}</span>
                    results
                </p>
            </div>
            <slot name="next">
                <button
                    class="relative inline-flex items-center ml-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 cursor-pointer rounded-md shadow-sm hover:bg-gray-50"
                    :disabled="!hasNextPage" @click="$emit('next')">
                    Next
                </button>
            </slot>
        </nav>
    </div>
</template>

<script setup>
const props = defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    },
    totalItems: {
        type: Number,
        required: true
    }
})

defineEmits(['prev', 'next'])

const hasNextPage = computed(() => props.currentPage < props.totalPages)
const hasPreviousPage = computed(() => props.currentPage > 1)
</script>
