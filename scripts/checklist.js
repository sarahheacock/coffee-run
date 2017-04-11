(function(window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    if(!selector) {
      throw new Error('No selector provided');
    }

    this.$element = $(selector);
    if(this.$element.length === 0){
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  CheckList.prototype.addClickHandler = function(fn) {
    this.$element.on('click', 'input', function(event) {
      var email = event.target.value;
      fn(email).then(function() {
        this.removeRow(email);
      }.bind(this));
    }.bind(this));
  };

  CheckList.prototype.addRow = function(coffeeOrder) {
    //remove existing rows that match email address
    this.removeRow(coffeeOrder.emailAddress);
    //create new Row
    var rowElement = new Row(coffeeOrder);
    //add row's instance's $element property to Checklist
    this.$element.append(rowElement.$element);
  };

  //remove row from table
  CheckList.prototype.removeRow = function (email) {
    this.$element.find('[value="' + email + '"]').closest('[data-coffee-order="checkbox"]').remove();
  };

  //create new row for new order
  function Row(coffeeOrder) {
    //coffee constructor
    //$div is not an instance variable (this.$div)
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox'
    });

    var $label = $('<label></label>');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress
    });

    var description = coffeeOrder.size + ' ';
    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + ' ';
    }

    description += coffeeOrder.coffee + ', ';
    description += ' (' + coffeeOrder.emailAddress + ') ';
    description += ' [' + coffeeOrder.strength + 'x]';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);
    this.$element = $div;
  }



  //listener for click events to remove row


    App.CheckList = CheckList;
    window.App = App;
}) (window);
