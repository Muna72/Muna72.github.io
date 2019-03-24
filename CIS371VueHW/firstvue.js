new Vue({
  el: "#top",
  data: {
    userCount: 4,
    users: [],
	nationalities: [],
    currentHighRes: "",
    nationalityFlag: ""
  },
  methods: {
    getUser() {
      fetch(
        `https://randomuser.me/api?results=${this.userCount}&nat=${
          this.nationalities
        }`
      )
        .then(r => r.json())
        .then(u => {
          this.users = u.results;
        });
    },
    resetUser: function() {
      this.users = [];
    },
    setHighRes: function(u) {
      this.currentHighRes = u.picture.large;
    },
	resetHighRes: function() {
      this.currentHighRes = "";
    }
  }
});