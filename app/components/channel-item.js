import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  attributeBindings: ['draggable'],
  draggable: 'true',

  expanded: false,

  init() {
    this._super(...arguments);
    this.prepareChildren();
  },

  prepareChildren() {
    var children = this.get('groups').filterBy('parent_id', parseInt(this.get('group.id'), 10));
    this.set('group.children', children);
  },


  hasChildren: Ember.computed('groups.@each.parent_id', function() {
    var children = this.get('groups').filterBy('parent_id', parseInt(this.get('group.id'), 10));
    return children.get('length') > 0;
  }),

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

    this.get('store').findRecord('channel', parseInt(id, 10)).then((channel)=> {
      channel.set('parent_id', this.get('group.id'));
      //channel.save();
      this.get('onUpdate')();
    });
  },

  actions:{
    expandGroup: function (_event) {
      this.set('expanded', !this.get('expanded'));
    }
  }
});
