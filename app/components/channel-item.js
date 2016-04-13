import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  attributeBindings: ['draggable'],
  draggable: 'true',

  expanded: false,

  init() {
    this._super(...arguments);
  },

  children: function () {
    return this.get('groups').filterBy('parent_id', parseInt(this.get('group.id'), 10));
  }.property('groups.@each.parent_id'),


  hasChildren: function() {
    return this.get('children.length') > 0;
  }.property('children'),

  dragStart(event) {
    event.stopPropagation();
    event.dataTransfer.setData('text/data', this.get('group.id'));
  },

  dragOver(event) {
    event.preventDefault();
  },

  drop(event) {
    event.stopPropagation();
    var id = event.dataTransfer.getData('text/data');
    if (parseInt(id, 10) === this.get('group.id')) {
      return;
    }
    this.get('onUpdate')(id, this.get('group.id'));
  },

  actions:{
    expandGroup: function () {
      this.set('expanded', !this.get('expanded'));
    }
  }
});
