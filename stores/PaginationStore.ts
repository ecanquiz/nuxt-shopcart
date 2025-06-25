import { defineStore, acceptHMRUpdate } from 'pinia'

export const usePaginationStore = defineStore('PaginationStore', () => {
    // State
    const currentPage = ref(1)
    const totalPages = ref(0)
    const pageSize = ref(10)
    const totalItems = ref(0)

    // Getters
    const hasNextPage = computed(() => currentPage.value < totalPages.value)
    const hasPreviousPage = computed(() => currentPage.value > 1)

    // Actions
    function setPagination(page: number, total: number, size: number) {
        currentPage.value = page
        totalItems.value = total
        pageSize.value = size
        totalPages.value = Math.ceil(total / size)
    }

    function nextPage() {
        if (hasNextPage.value) {
            currentPage.value++
        }
    }

    function previousPage() {
        if (hasPreviousPage.value) {
            currentPage.value--
        }
    }

    return {
        currentPage,
        totalPages,
        pageSize,
        totalItems,
        hasNextPage,
        hasPreviousPage,
        setPagination,
        nextPage,
        previousPage
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePaginationStore, import.meta.hot))
}
