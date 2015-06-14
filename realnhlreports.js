//testing 
Tweets = new Mongo.Collection("tweets");

if (Meteor.isClient) {

  //////////// events
  Template.submit.events({
    'submit form': function (event) {
      var username = Meteor.user().username;
      var text = event.target.text.value;
      var logic = event.target.logic.value;

      // insert a list with the submitting user as owner
      Tweets.insert({
        ownerId: Meteor.userId(),
        text: text,
        logic: logic,
        username: username,
        approved: false,
        posted: false,
        votes: {},
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.text.value = "";
      event.target.logic.value = "";

      // Prevent default form submit
      return false;
    }
  });

  Template.tweet.events({
    'click .delete': function (event) {
      if (this.ownerId == Meteor.userId()) {
        // TODO: remove from users' favorites
        Tweets.remove(this._id);  
      } 
    }
  });

  //////////// helpers
  Template.queue.helpers({
    tweets: function () {
      return Tweets.find();
    }
  });

  Template.tweet.helpers({
    isOwner: function() {
      return ((this.ownerId == Meteor.userId()) ? true : false);
    }
  });

  Template.submit.helpers({
    username: function() {
      return Meteor.user().username;
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

//////////// server stuff
// TODO: How do I move this into another file?
if (Meteor.isServer) {
  Meteor.startup(function () {
    
  });

  // when a user is created we'll need to add some of our properties
  // favorites: an array of the users favorite files/lists
  Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
      user.profile = options.profile;
    } else {
      user.profile = {};
    }
    // user favorite arrays; files and lists
    user.profile.admin = false;
    return user;
  });
}

