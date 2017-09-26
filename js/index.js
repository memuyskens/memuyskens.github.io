var site;

$(document).ready(function() {
    site = new Site();
    resize();
});

$(window).resize(function () {
  resize();
});

function resize() {
  if ($(window).width() <= 880 && !$("body").hasClass("mobile")) {
    $("body").addClass("mobile");
    site.present("resume");
  } else if ($(window).width() > 880 && $("body").hasClass("mobile")) {
    $("body").removeClass("mobile");
  }
}

function Site() {
    var that = this;

    $("#link-home").click(function (e) {
        e.preventDefault();
        if (!$("body").hasClass("mobile")) {
          that.present("home");
        }
    });

    $("#link-education").click(function (e) {
        e.preventDefault();
        that.present("education");
    });

    $("#link-experience").click(function (e) {
        e.preventDefault();
        that.present("experience");
    });

    $("#link-activities").click(function (e) {
        e.preventDefault();
        that.present("activities");
    });

    $("#link-projects").click(function (e) {
        e.preventDefault();
        that.present("projects");
    });

    $("#link-resume").click(function (e) {
        e.preventDefault();
        that.present("resume");
    });

    this.present("education");
}

Site.prototype.present = function (page) {
  $("header > div > nav > a").removeClass("active");
  $("#link-" + page).addClass("active");
  $("main > div").hide();
  $("#" + page).show();
};
