Vue.createApp({
  data: () => ({
    imgIdx: 0,
    colorIdx: 0,
    dimensionIdx: -1,
    categoryId: -1,
  }),
  computed: {
    item() {
      const [categoryId, itemId] = window.location.hash.substring(1).split("-");
      const item = CATEGORIES[categoryId].items.find((item) => item.id == itemId);
      document.title = item.name;
      this.categoryId = categoryId;
      return item;
    },
    basket() {
      return JSON.parse(window.localStorage.getItem("basket") || "[]");
    },
  },
  methods: {
    changeSubImg(idx) {
      this.imgIdx = idx;
    },
    changeColor(idx) {
      this.colorIdx = idx;
      this.imgIdx = 0;
      this.dimensionIdx = -1;
    },
    changeDimension(idx) {
      this.dimensionIdx = idx;
    },
    isSizeNotSelected() {
      return this.dimensionIdx == -1 && this.item.colors[this.colorIdx].dimension.length;
    },
    addBasket(toBasket = false) {
      const color = this.item.colors[this.colorIdx];
      const item = {
        id: this.item.id,
        categoryId: this.categoryId,
        name: this.item.name,
        description: this.item.description,
        color: {
          name: color.name,
          price: color.price,
          imgs: color.imgs,
          dimension: color.dimension[this.dimensionIdx],
        },
      };

      this.basket.push(item);
      window.localStorage.setItem("basket", JSON.stringify(this.basket));
      this.$forceUpdate();
      if (toBasket) window.location.replace("basket.html");
    },
  },
}).mount("#app");
