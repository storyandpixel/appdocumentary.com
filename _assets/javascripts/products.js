(function () {
  var initProductionVariationLinks = function () {
    $('.product-variation a').click(function (event) {
      var link = $(event.target);
      var formTag = link.closest('form');
      var inputTag = formTag.find('input#option');
      inputTag.val(link.attr('data-product-id'));
      formTag.submit();
    });
  };

  $(function () {
    initProductionVariationLinks();
  });
}());
