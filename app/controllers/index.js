import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    updateChannel(id, parentId) {
      parentId = parentId == null ? parentId : parseInt(parentId, 10);
      this.store.findRecord('channel', parseInt(id, 10)).then((channel)=> {
        channel.set('parent_id', parentId);
        channel.save();
      });
    }
  }
});
