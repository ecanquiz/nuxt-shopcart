import { defineStore } from "pinia";

type product = {
  "name": string;
  "image": string;
  "price": number;
}

export const useProductStore = defineStore("ProductStore", {
  state: () => {
    return {
      products: [] as product[],
    };
  },
  actions: {
    async fill() {
      //this.products = (await import("@/data/products.json")).default;
      const { data, error } = await useFetch('/api/products'); 
      this.products = data as unknown as product[]
    },
  },
  // getters
});
