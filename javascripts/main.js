// Generated by CoffeeScript 1.8.0
(function() {
  var beginNavToChase, handleRedirect, initBlog, initForm, initMap, initPagetopLink;

  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

  initMap = function() {
    return $(document).on('click', '.map', function() {
      return $(this).find('iframe').css({
        "pointer-events": "auto"
      });
    });
  };

  initBlog = function() {
    var blogDiv, script;
    blogDiv = $("[data-blog-posts]");
    if (blogDiv.size() === 0) {
      return;
    }
    window.waculBlogCallback = function(blog) {
      return blogDiv.each(function() {
        var num, template, tfunc;
        num = parseInt($(this).attr("data-blog-posts"), 10);
        if (num == null) {
          num = 4;
        }
        template = $(this).html().replace(/&lt;%=/g, '<%=').replace(/%&gt;/g, '%>');
        tfunc = _.template(template);
        $(this).empty();
        _(blog.posts.slice(0, num)).each((function(_this) {
          return function(post) {
            return $(_this).append(tfunc(post));
          };
        })(this));
        return $(this).show();
      });
    };
    script = document.createElement('script');
    script.setAttribute('src', '//blog.wacul.co.jp/posts.js');
    return $('head').append(script);
  };

  handleRedirect = function() {
    var def, defs, path, pattern, to, _i, _len, _results;
    defs = [[/^\/member/, '/about/members/'], [/^\/services\/(resarchapplication|training)/, '/services/']];
    _results = [];
    for (_i = 0, _len = defs.length; _i < _len; _i++) {
      def = defs[_i];
      pattern = def[0];
      to = def[1];
      path = location.pathname;
      if (path.match(pattern)) {
        _results.push(location.replace(to));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  initPagetopLink = function() {
    var $window, switchPagetopLink;
    $window = $(window);
    switchPagetopLink = function() {
      var target;
      target = $('.link-pagetop');
      if (target.length > 0) {
        if ($window.scrollTop() > 0) {
          target.show();
          return target.css("opacity", Math.min($window.scrollTop(), 200) / 200.0);
        } else {
          return target.hide();
        }
      }
    };
    $window.on('scroll', switchPagetopLink);
    return switchPagetopLink();
  };

  initForm = function() {
    var loading, timer;
    loading = $(".form-loading");
    if (loading.size() === 0) {
      return;
    }
    return timer = setInterval(function() {
      var iframe;
      iframe = $(".wufoo-form-container");
      if (iframe.size() === 0) {
        return;
      }
      clearInterval(timer);
      return iframe.load(function() {
        return loading.hide();
      });
    }, 10);
  };

  handleRedirect();

  $(function() {
    initMap();
    initBlog();
    initForm();
    return initPagetopLink();
  });

}).call(this);
