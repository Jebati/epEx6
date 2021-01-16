Vue.createApp({
  computed: {
    basket() {
      return JSON.parse(window.localStorage.getItem("basket") || "[]");
    },
  },
  methods: {
    deleteItem(idx) {
      this.basket.splice(idx, 1);
      window.localStorage.setItem("basket", JSON.stringify(this.basket));
      this.$forceUpdate();
    },
    sum() {
      let sum = 0;
      this.basket.forEach((item) => {
        sum += item.color.price;
      });
      return sum;
    },
  },
}).mount("#app");
