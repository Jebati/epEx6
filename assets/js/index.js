Vue.createApp({
  data: () => ({
    categories: CATEGORIES,
  }),
  computed: {
    basket() {
      return JSON.parse(window.localStorage.getItem("basket") || "[]");
    },
  },
}).mount("#app");
