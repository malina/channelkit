import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  init(){
    this._super(...arguments);
    this.fetchChannels();
  },

  fetchChannels(){
    var self = this;
    this.get('store').findAll('channel').then(function(data){
      self.set('groups', data);
      self.prepareItems();
    });
  },

  prepareItems(){
    var items = this.get('groups').filterBy('parent_id', null);
    this.set('items', items);
  },

  dragOver(event) {
    event.preventDefault();
  },

  drop(event) {
    var id = event.dataTransfer.getData('text/data');

    this.get('store').findRecord('channel', parseInt(id, 10)).then((channel)=> {
      channel.set('parent_id', null);
      //channel.save();
      this.prepareItems();
    });
  },

  actions: {
    updateState() {
      console.log('Update');
      this.prepareItems();
    }
  }
});
