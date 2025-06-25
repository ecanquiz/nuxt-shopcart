import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { usePaginationStore } from "@/stores/PaginationStore";

type Product = {
  name: string;
  image: string;
  price: number;
};

export const useProductStore = defineStore("ProductStore", () => {
  const pagination = usePaginationStore();
  const products = ref<Product[]>([]);

  async function fill(page = pagination.currentPage) {
    const { data } = await useFetch(`/api/products?page=${page}&limit=${pagination.pageSize}`);
    if (data.value) {
      products.value = data.value.data as Product[];
      pagination.setPagination(
        data.value.pagination.page,
        data.value.pagination.total,
        data.value.pagination.pageSize
      );
    }
  }

  // Actualiza productos al cambiar de página
  watch(() => pagination.currentPage, async (newPage) => {
    await fill(newPage);
  });

  const previousPage = () => {
    if (pagination.currentPage > 1) {
      pagination.previousPage();
    }
  };
  const nextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      pagination.nextPage();
    }
  };

  return {
    products,
    previousPage,
    nextPage,
    fill,
  };
});
