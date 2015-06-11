//testing 
Tweets = new Mongo.Collection("tweets");

if (Meteor.isClient) {

  Template.submit.events({
    'submit form': function (event) {
      var email = Meteor.user().emails[0].address;
      var text = event.target.text.value;
      var logic = event.target.logic.value;

      // insert a list with the submitting user as owner
      Tweets.insert({
        ownerId: Meteor.userId(),
        text: text,
        logic: logic,
        email: email,
        approved: false,
        posted: false,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.text.value = "";
      event.target.logic.value = "";

      // Prevent default form submit
      return false;
    }
  });

  Template.queue.helpers({
    tweets: function () {
      return Tweets.find();
    }
  });

  Template.tweet.helpers({
    isApproved: function() {
      return '?';
    },
    isPosted: function () {
      return '?';
    }
  });


}

