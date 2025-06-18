import { ref, computed } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";
import { groupBy } from "lodash";
import { useAuthUserStore } from "@/stores/AuthUserStore";

type Product = {
  name: string;
  image: string;
  price: number;
};

export const useCartStore = defineStore("CartStore", () => {
  // Estado
  const items = ref<Product[]>([]);
  const test = ref("hello world");

  // Getters
  const count = computed(() => items.value.length);
  const isEmpty = computed(() => count.value === 0);

  const grouped = computed(() => {
    const groupedObj = groupBy(items.value, (item) => item.name);
    const sorted = Object.keys(groupedObj).sort();
    const inOrder: Record<string, Product[]> = {};
    sorted.forEach((key) => (inOrder[key] = groupedObj[key]));
    return inOrder;
  });

  const groupCount = (name: string) => grouped.value[name]?.length ?? 0;
  const total = computed(() =>
    items.value.reduce((p, c) => p + c.price, 0)
  );

  // Actions
  function checkout() {
    const authUserStore = useAuthUserStore();
    alert(
      `${authUserStore.username} just bought ${count.value} items at a total of $${total.value}`
    );
  }

  function addItems(countToAdd: number, item: Product) {
    const countParsed = parseInt(countToAdd as unknown as string, 10);
    for (let index = 0; index < countParsed; index++) {
      items.value.push({ ...item });
    }
  }

  function clearItem(itemName: string) {
    items.value = items.value.filter((item) => item.name !== itemName);
  }

  function setItemCount(item: Product, countToSet: number) {
    clearItem(item.name);
    addItems(countToSet, item);
  }
  // Resetear el state del store
  function reset() {
    items.value = [];
    test.value = "hello world";
  }
  return {
    items,
    test,
    count,
    isEmpty,
    grouped,
    groupCount,
    total,
    checkout,
    addItems,
    clearItem,
    setItemCount,
    reset,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
