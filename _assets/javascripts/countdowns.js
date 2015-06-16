$('a[data-toggle="tooltip"]').tooltip();
var ksConclusion = new Date(2014, 7-1, 31, 8, 55);
ksConclusion.setUTCHours(14);

var countdownConclusion = new Date(2014, 7-1, 27, 8, 55);
countdownConclusion.setUTCHours(14);

var initCountdown = function (elSelector, until) {
  $(elSelector).countdown({
    layout: 'in {dn} {dl}, {hn} {hl}, {mn} {ml}, and {sn} {sl}.', 
    until: until
  });
};

initCountdown('#ks-countdown', ksConclusion);
initCountdown('#contest-countdown', countdownConclusion);
