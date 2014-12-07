Router.map(function() {
  this.route('landing', {path: '/'});
  this.route('/find_project/:text', {
    name: "find_project_page",
    template: 'find_project'
  });
});

function toggle_button_text(button_el) {
  button_el.text() === button_el.data("text-original") ?
    button_el.text(button_el.data("text-loading")):
    button_el.text(button_el.data("text-original"));
}

Template.body.events({
  "submit .search-box": function(event) {
    if (event.target.text.value.length > 0) {
      var button_el = $("button.search-button", this.el);
      var query = event.target.text.value;
 
      Meteor.call('searchRepos', query, 1, function(err, result) {
        toggle_button_text(button_el);
        Router.go("find_project_page", {text: query});
        Session.set("temp_"+query, result);
      });

      toggle_button_text(button_el);
    }

    return false;
  }
});

Template.find_project.helpers({
  results: function() {
    var query = Router.current().params.text;
    var result = Session.get("temp_"+query);

    if (!result) {
      var button_el = $("button.search-button", this.el);

      Meteor.call('searchRepos', query, 1, function(err, result) {
        toggle_button_text(button_el);
        Router.go("find_project_page", {text: query});
        Session.set("temp_"+query, result);
      });

      toggle_button_text(button_el);
    } else 
      return result.items;
  }

});

Template.find_project.events({
  'click button': function () {
  }
});

