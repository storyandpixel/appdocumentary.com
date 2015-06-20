(function () {
  'use strict';
  var disc_types = ['Digital Download', 'Blu-ray', 'DVD'];
  var shirts = ['Icon', 'Not All Sunshine'];
  var sizes = ["Men's XS", "Men's S", "Men's M", "Men's L", "Men's XL", "Women's S", "Women's M", "Women's L", "Women's XL", "Women's 2XL"]

  var options = [];
  disc_types.forEach(function (disc_type) {
    shirts.forEach(function (shirt) {
      sizes.forEach(function (size) {
        options.push(disc_type + ' & ' + size + ' ' + shirt + ' shirt');
      });
    });
  });

  console.log(options.join("\n"));
}());
