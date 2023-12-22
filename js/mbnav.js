    "use strict";

    function _instanceof(left, right) {
        if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
            return !!right[Symbol.hasInstance](left);
        } else {
            return left instanceof right;
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!_instanceof(instance, Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }

    var MbNav = /*#__PURE__*/ function () {
        function MbNav() {
            _classCallCheck(this, MbNav);

            this.id = '#mbnav';
            this.listId = '#mbnavList';
            this.slistId = '#mbnavSlist';
            this.data = this.getData();
        }
        _createClass(MbNav, [{
            key: "initial",
            value: function initial() {
                var that = this; // 添加元素

                that.render().renderChildren(); // 打开二级菜单

                $(that.listId).on('click', '.item', function () {
                    if ($(this).hasClass('sub')) {
                        $(that.slistId + ' .sitem').removeClass('active').eq($(this)
                            .index()).addClass('active');
                    }
                }); // 收起二级菜单

                $(that.slistId).on('click', '.tit', function () {
                    $(that.slistId + ' .sitem').removeClass('active');
                }); // 关闭菜单

                $(that.id + '>.bg').on('click', function () {
                    that.off();
                });
            }
        }, {
            key: "getData",
            value: function getData() {
                var arr = [];
                var $data = $(this.id + ' .data ul');

                for (var i = 0; i < $data.length; i++) {
                    var item = {
                        title: $data.eq(i).attr('data-title'),
                        uri: $data.eq(i).attr('data-uri')
                    };
                    var sub = [];

                    for (var j = 0; j < $data.eq(i).find('li').length; j++) {
                        var sitem = {
                            title: $data.eq(i).find('li').eq(j).attr('data-title'),
                            uri: $data.eq(i).find('li').eq(j).attr('data-uri')
                        };
                        sub.push(sitem);
                    }

                    item.sub = sub;
                    arr.push(item);
                }

                $data.parent().remove();
                return arr;
            }
        }, {
            key: "render",
            value: function render() {
                var str = "";
                this.data.forEach(function (item) {
                    if (Array.isArray(item.sub) && item.sub.length > 0) {
                        str += "<a href=\"javascript:;\" class=\"item sub\">".concat(
                            item.title, "</a>");
                    } else {
                        str += "<a href=\"".concat(item.uri, "\" class=\"item\">")
                            .concat(item.title, "</a>");
                    }
                });
                $(this.listId).html(str);
                return this;
            }
        }, {
            key: "renderChildren",
            value: function renderChildren() {
                var str = "";
                this.data.forEach(function (item) {
                    if (Array.isArray(item.sub) && item.sub.length > 0) {
                        var s_str = "";
                        item.sub.forEach(function (sitem) {
                            s_str += "<a href=\"".concat(sitem.uri,
                                "\" class=\"item\">").concat(sitem.title,
                                "</a>");
                        });
                        str += "<div class=\"sitem\"><div class=\"tit\">".concat(item
                            .title, "</div>").concat(s_str, "</div>");
                    } else {
                        str += "<div class=\"sitem\"></div>";
                    }
                });
                $(this.slistId).html(str);
                return this;
            }
        }, {
            key: "open",
            value: function open() {
                // 打开菜单
                $('body').removeClass('mbNavOff').addClass('mbNavOpen');
            }
        }, {
            key: "off",
            value: function off() {
                // 关闭菜单
                $('body').removeClass('mbNavOpen').addClass('mbNavOff');
            }
        }]);

        return MbNav;
    }();
    var mbNav = new MbNav();
    mbNav.initial();

    $('.j-mbnav-open').click(function () {
        mbNav.open();
    });