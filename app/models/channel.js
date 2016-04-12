import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  parent_id: DS.attr('number')
});
