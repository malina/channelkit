import Ember from 'ember';

export default Ember.Component.extend({
  init(){
    this._super(...arguments);
  },

  items: function () {
    return this.get('groups').filterBy('parent_id', null);
  }.property('groups.@each.parent_id'),

  dragOver(event) {
    event.preventDefault();
  },

  drop(event) {
    var id = event.dataTransfer.getData('text/data');
    this.get('onUpdate')(id, null);
  }
});
