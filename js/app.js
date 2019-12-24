var Storage = {
  fetch: () => {
    return JSON.parse(window.localStorage.getItem("todoList") || "[]");
  },
  save: items => {
    window.localStorage.setItem("todoList", JSON.stringify(items));
  }
};

var app = new Vue({
  el: "#app",
  data: {
    items: Storage.fetch(),
    newItem: ""
  },
  computed: {
    unfinished: function () {
      var i = 0;
      this.items.forEach((item, index) => {
        if (!item.isFinished) i++;
      });
      return i;
    },
    finished: function () {
      var i = 0;
      this.items.forEach((item, index) => {
        if (item.isFinished) i++;
      });
      return i;
    }
  },
  methods: {
    exchange: function (item) {
      item.isFinished = !item.isFinished;
    },
    addNew: function () {
      this.items.unshift({
        lable: this.newItem,
        isFinished: false,
        index: this.items.length
      });
      this.newItem = "";
    },
    indexOf: function (temp) {
      var i = -1;
      this.items.forEach((item, index) => {
        if (item == temp) i = index;
      });
      return i;
    },
    remove: function (item) {
      var index = this.indexOf(item);
      this.items.splice(index, 1);
    },
    clearAll: function () {
      this.items = [];
    }
  },
  watch: {
    items: {
      handler: items => {
        Storage.save(items);
      },
      deep: true
    }
  }
});