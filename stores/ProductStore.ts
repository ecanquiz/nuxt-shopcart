import { ref } from "vue";
import { defineStore } from "pinia";

type Product = {
  name: string;
  image: string;
  price: number;
};

export const useProductStore = defineStore("ProductStore", () => {
  const products = ref<Product[]>([]);
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  async function fill() {
    // const { data, error } = await useFetch('/api/products');
    // products.value = data.value as Product[];
    // Para evitar errores de tipado y asegurar reactividad:
    const { data } = await useFetch('/api/products');
    if (data.value) {
      products.value = data.value.data as Product[];
      pagination.value.total = data.value.pagination.total;
      pagination.value.totalPages = data.value.pagination.totalPages;
    }
  }

  const previusPage = () => {
    if (pagination.value.page > 1) {
      pagination.value.page--;
    }
  };
  const nextPage = () => {
    if (pagination.value.page < pagination.value.totalPages) {
      pagination.value.page++;
    }
  };

  return {
    products,
    pagination,
    previusPage,
    nextPage,
    fill,
  };
});
