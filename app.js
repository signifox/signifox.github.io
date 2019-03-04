var User = {
  list: [],
  loadList: function() {
    return m
      .request({
        method: "GET",
        url: "https://rem-rest-api.herokuapp.com/api/users",
        withCredentials: true
      })
      .then(function(result) {
        User.list = result.data;
      });
  },
  current: {},
  load: function(id) {
    return m
      .request({
        method: "GET",
        url: "https://rem-rest-api.herokuapp.com/api/users/:id",
        data: { id: id },
        withCredentials: true
      })
      .then(function(result) {
        User.current = result;
      });
  },
  save: function() {
    return m.request({
      method: "PUT",
      url: "https://rem-rest-api.herokuapp.com/api/users/:id",
      data: User.current,
      withCredentials: true
    });
  }
};

var UserList = {
  oninit: User.loadList,
  view: function() {
    return m(
      ".user-list",
      User.list.map(function(user) {
        return m(
          "a.user-list-item",
          { href: "/edit/" + user.id, oncreate: m.route.link },
          user.firstName + " " + user.lastName
        );
      })
    );
  }
};

var UserForm = {
  oninit: function(vnode) {
    User.load(vnode.attrs.id);
  },
  view: function() {
    return m("form", [
      m("label.label", "First name"),
      m("input.input[type=text][placeholder=First name]", {
        oninput: m.withAttr("value", function(value) {
          User.current.firstName = value;
        }),
        value: User.current.firstName
      }),
      m("label.label", "Last name"),
      m("input.input[placeholder=Last name]", {
        oninput: m.withAttr("value", function(value) {
          User.current.lastName = value;
        }),
        value: User.current.lastName
      }),
      m("button.button[type=submit]", { onclick: User.save }, "Save")
    ]);
  }
};

var Layout = {
  view: function(vnode) {
    return m("main.layout", [
      m("nav.menu", [
        m("a[href='/list']", { oncreate: m.route.link }, "Users")
      ]),
      m("section", vnode.children)
    ]);
  }
};

m.route(document.getElementById("vapp"), "/list", {
  "/list": {
    render: function() {
      return m(Layout, m(UserList));
    }
  },
  "/edit/:id": {
    render: function(vnode) {
      return m(Layout, m(UserForm, vnode.attrs));
    }
  }
});
