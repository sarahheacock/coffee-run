(function(window) {
  'use strict';
  //assign propert App to variable app
  //if DNE create empty object
  var App = window.App || {};

  function DataStore() {
    //console.log('running the DataStore function');
    this.data = {};
  }

  function promiseResolvedWith(value){
    var promise = new Promise(function(resolve, reject){
      resolve(value);
    });
    return promise;
  }

  //add information to DataStore instance
  DataStore.prototype.add = function (key, val) {
    return promiseResolvedWith(null);
  };

  //retrieve information from a DataStore instance
  DataStore.prototype.get = function (key) {
    return promiseResolvedWith(this.data[key]);
  };

  DataStore.prototype.getAll = function () {
    return promiseResolvedWith(this.data);
  };

  //remove information
  DataStore.prototype.remove = function (key) {
    delete this.data[key];
    return promiseResolvedWith(null);
  };

  App.DataStore = DataStore;
  window.App = App;
})(window);
