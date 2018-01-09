webpackJsonp([8], {
    316: function (e, t, a) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        Object.defineProperty(t, "__esModule", {value: !0});
        var l = a(2), r = n(l), i = a(317), s = (n(i), a(293)), u = n(s);
        t["default"] = r["default"].createClass({
            displayName: "spinner", getInitialState: function () {
                return {visible: !0}
            }, render: function () {
                var e = (0, u["default"])({hide: !this.state.visible});
                return r["default"].createElement("div", {className: (0, u["default"])("loading-spinner", e)}, r["default"].createElement("div", {className: "loading-bar bar0"}), r["default"].createElement("div", {className: "loading-bar bar1"}), r["default"].createElement("div", {className: "loading-bar bar2"}), r["default"].createElement("div", {className: "loading-bar bar3"}))
            }, hide: function () {
                this.setState({visible: !1})
            }, show: function () {
                this.setState({visible: !0})
            }
        })
    }, 317: function (e, t) {
    }, 368: function (e, t) {
        "use strict";
        function a(e) {
            return "/api/image/load?url=" + e.url + "&action=RESIZE&width=" + e.width + "&height=" + e.height + "&offset=TOP_LEFT"
        }

        function n(e) {
            var t = {url: e, width: 50, height: 50};
            return a(t)
        }

        function l(e) {
            var t = {url: e, width: 720, height: 200};
            return a(t)
        }

        function r(e) {
            var t = {url: e, width: 30, height: 30};
            return a(t)
        }

        function i(e) {
            var t = {url: e, width: 62, height: 40};
            return a(t)
        }

        function s(e) {
            var t = {url: e, width: 77, height: 57};
            return a(t)
        }

        function u(e) {
            var t = {url: e, width: 40, height: 40};
            return a(t)
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t["default"] = a, t.smallSize = n, t.thumbnailSize = l, t.tinySize = r, t.projectTinySize = i, t.activitySize = s, t.detailSize = u;
        t.tinyAvatar = r
    }, 376: function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        t.PROJECT_STATUS = ["众筹中", "预热中", "众筹成功", "未提交审核"], t.TABS = [{name: "detail", label: "图文详情"}, {
            name: "finance",
            label: "融资方案"
        }, {name: "comment", label: "项目问答"}]
    }, 397: function (e, t, a) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        Object.defineProperty(t, "__esModule", {value: !0});
        var l = a(2), r = n(l), i = a(398), s = (n(i), a(159));
        t["default"] = r["default"].createClass({
            displayName: "fixedBar",
            position: "absolute",
            offsetTop: 0,
            onScroll: function () {
                var e = (0, s.findDOMNode)(this.refs.node), t = (0, s.findDOMNode)(this.refs.content), a = document.getElementsByTagName("body")[0].scrollTop;
                "fixed" !== this.position && a > this.offsetTop && (t.style.position = "fixed", this.position = "fixed", e.className += " fixed"), "absolute" !== this.position && a < this.offsetTop && (this.position = "absolute", t.style.position = "absolute", e.className = e.className.replace(" fixed", ""))
            },
            componentDidMount: function () {
                var e = (0, s.findDOMNode)(this.refs.node), t = (0, s.findDOMNode)(this.refs.content);
                e.style.paddingTop = t.offsetHeight + "px", this.offsetTop = e.getBoundingClientRect().top + document.getElementsByTagName("body")[0].scrollTop, document.addEventListener("scroll", this.onScroll)
            },
            componentWillUnmount: function () {
                document.removeEventListener("scroll", this.onScroll)
            },
            render: function () {
                return r["default"].createElement("div", {
                    className: "fixed-bar",
                    ref: "node"
                }, r["default"].createElement("div", {
                    className: "fixed-bar-content",
                    ref: "content"
                }, this.props.children))
            }
        })
    }, 398: function (e, t) {
    }, 417: function (e, t, a) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        Object.defineProperty(t, "__esModule", {value: !0});
        var l = a(2), r = n(l), i = a(418), s = n(i), u = a(419), o = n(u), c = a(289), d = n(c), f = (a(160), a(422)), m = n(f), p = a(424), h = (n(p), a(261)), v = (n(h), a(397)), E = n(v);
        t["default"] = r["default"].createClass({
            displayName: "components", getInitialState: function () {
                return s["default"].getState()
            }, componentDidMount: function () {
                s["default"].listen(this.onChange), d["default"].setTitle("首页"), o["default"].fetchProjects(0), o["default"].surveyCheck(4)
            }, componentWillUnmount: function () {
                s["default"].unlisten(this.onChange)
            }, onChange: function (e) {
                this.setState(e)
            }, changeFilter: function (e) {
                e.preventDefault();
                var t = e.target.dataset.index / 1;
                o["default"].changeFilter(t)
            }, render: function () {
                var e = this, t = this.state.surveyShow, a = this.state.filters.map(function (t, a) {
                    var n = e.state.filterIndex === a ? " selected" : "";
                    return r["default"].createElement("a", {
                        href: "#",
                        "data-index": a,
                        key: a,
                        onClick: e.changeFilter,
                        className: "filter-item" + n
                    }, t.label)
                }), n = void 0;
                return n = 1 == t ? r["default"].createElement("a", {
                    href: "http://www.yunchou.com/survey/4",
                    className: "entrance"
                }, r["default"].createElement("span", {className: "iconfont"}, ""), r["default"].createElement("p", null, "问卷")) : r["default"].createElement("div", null), r["default"].createElement("div", {className: "index"}, r["default"].createElement(E["default"], null, r["default"].createElement("div", {className: "project-filters"}, a)), r["default"].createElement(m["default"], {
                    className: "index-projects",
                    projects: this.state.projects
                }))
            }
        })
    }, 418: function (e, t, a) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        function l(e, t) {
            if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(t, "__esModule", {value: !0});
        var r = function () {
            function e(e, t) {
                for (var a = 0; a < t.length; a++) {
                    var n = t[a];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value"in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }

            return function (t, a, n) {
                return a && e(t.prototype, a), n && e(t, n), t
            }
        }(), i = a(261), s = n(i), u = a(223), o = a(419), c = n(o), d = a(420), f = n(d), m = a(421), p = (a(259), a(282)), h = function () {
            function e() {
                l(this, e), this.projects = null, this.filterIndex = 0, this.errMsg = null, this.filters = m.FILTERS.slice(0, 3), this.surveyShow = !1, this.user = null, this.bindListeners({
                    handleFetchProjects: c["default"].FETCH_PROJECTS,
                    changeFilter: c["default"].CHANGE_FILTER,
                    surveyCheck: c["default"].SURVEY_CHECK
                })
            }

            return r(e, [{
                key: "handleFetchProjects", value: function () {
                    var e = this;
                    this.projects = null;
                    var t = this.filters[this.filterIndex].name;
                    u.request.get(f["default"].project_list, {params: {status: t}}).then(function (t) {
                        var a = t.data;
                        return "NA" === a.error && (e.projects = a.list, void e.emitChange())
                    })
                }
            }, {
                key: "changeFilter", value: function (e) {
                    return this.filterIndex !== e && (this.filterIndex = e, void this.handleFetchProjects())
                }
            }, {
                key: "surveyCheck", value: function (e) {
                    var t = this;
                    this.user = (0, p.getUser)(), this.user ? u.request.get(f["default"].survey_check, {
                        params: {
                            surveyId: e,
                            userId: this.user.userId
                        }
                    }).then(function (e) {
                        e.data.data && (t.surveyShow = !0), t.emitChange()
                    }) : this.surveyShow = !0
                }
            }]), e
        }();
        t["default"] = s["default"].createStore(h, "IndexStore")
    }, 419: function (e, t, a) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        function l(e, t) {
            if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(t, "__esModule", {value: !0});
        var r = function () {
            function e(e, t) {
                for (var a = 0; a < t.length; a++) {
                    var n = t[a];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value"in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }

            return function (t, a, n) {
                return a && e(t.prototype, a), n && e(t, n), t
            }
        }(), i = a(261), s = n(i), u = function () {
            function e() {
                l(this, e)
            }

            return r(e, [{
                key: "fetchProjects", value: function (e) {
                    return e
                }
            }, {
                key: "changeFilter", value: function (e) {
                    return e
                }
            }, {
                key: "surveyCheck", value: function (e) {
                    return e
                }
            }]), e
        }();
        t["default"] = s["default"].createActions(u)
    }, 420: function (e, t, a) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var n = a(280);
        t["default"] = {
            project_list: n.BASE_API_PATH + "project/list",
            survey_check: n.BASE_API_PATH + "survey/isApplicable"
        }
    }, 421: function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        t.FILTERS = [{name: "众筹中", label: "正在融资"}, {name: "预热中", label: "预热中"}, {
            name: "众筹成功",
            label: "融资成功"
        }, {name: "未提交审核", label: "未提交审核"}, {name: "预热审核", label: "预热审核"}, {name: "待补充资料", label: "待补充资料"}, {
            name: "预热审核失败",
            label: "预热审核失败"
        }, {name: "上线审核", label: "上线审核"}, {name: "上线审核失败", label: "上线审核失败"}, {
            name: "待完善资料",
            label: "待完善资料,"
        }, {name: "上线准备", label: "上线准备"}, {name: "付款中", label: "付款中"}, {name: "众筹失败", label: "众筹失败"}]
    }, 422: function (e, t, a) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        Object.defineProperty(t, "__esModule", {value: !0});
        var l = a(2), r = n(l), i = a(160), s = a(423), u = (n(s), a(376)), o = a(368), c = a(276), d = a(316), f = n(d), m = a(293), p = n(m), h = a(159), v = function (e) {
            var t = e.project, a = e.active;
            if ("product" === t.type) {
                var n = t, l = 1e4 * parseInt(n.fundRaisingGoal), i = n.minInvestmentAmount;
                return r["default"].createElement("div", {className: "summary-item text-item"}, r["default"].createElement("p", null, "本期推出：", r["default"].createElement("i", null, parseInt(l / i), "份")), r["default"].createElement("p", null, "每份：", r["default"].createElement("i", null, i, "元")))
            }
            if (t.status === u.PROJECT_STATUS[2]) {
                var s = void 0;
                if (t.leadInvestors.length) {
                    var d = t.leadInvestors.map(function (e, t) {
                        return r["default"].createElement("img", {
                            src: a ? (0, o.tinySize)(e.pictureUrl) : "",
                            alt: e.displayName,
                            key: t
                        })
                    });
                    s = r["default"].createElement("div", {className: "investors summary-item avatar-item"}, r["default"].createElement("h4", null, "领投方"), r["default"].createElement("div", {className: "avatar-list"}, d))
                } else s = r["default"].createElement("div", null);
                return r["default"].createElement("div", null, s, r["default"].createElement("div", {className: "summary-item text-item"}, r["default"].createElement("p", null, "融资额：", r["default"].createElement("i", null, t.fundRaisingGoal)), r["default"].createElement("p", null, "已筹金额：", r["default"].createElement("i", null, parseInt(t.pledgedAmount / 1e6) + "万元"))), r["default"].createElement("div", {className: "summary-item text-item"}, r["default"].createElement("p", null, "完成时间：", r["default"].createElement("i", null, (0, c.formatDateTime)(t.closingDate)))))
            }
            if (t.status === u.PROJECT_STATUS[0]) {
                var f = function () {
                    return t.founder ? r["default"].createElement("div", {className: "founder summary-item avatar-item"}, r["default"].createElement("h4", null, "创始人"), r["default"].createElement("div", {className: "avatar-list"}, r["default"].createElement("img", {
                        src: a ? (0, o.tinySize)(t.founder.pictureUrl) : "",
                        alt: t.founder.displayName
                    }))) : r["default"].createElement("div", null)
                }();
                return r["default"].createElement("div", null, f, r["default"].createElement("div", {className: "summary-item text-item"}, r["default"].createElement("p", null, "融资额：", r["default"].createElement("i", null, t.fundRaisingGoal)), r["default"].createElement("p", null, "equity" === t.type ? "出让股份" : "出让权益", "：", r["default"].createElement("i", null, t.shareProportion.toFixed(2), "%"))))
            }
            if (t.status === u.PROJECT_STATUS[1]) {
                var m = function () {
                    return t.founder ? r["default"].createElement("div", {className: "founder summary-item avatar-item"}, r["default"].createElement("h4", null, "创始人"), r["default"].createElement("div", {className: "avatar-list"}, r["default"].createElement("img", {
                        src: a ? (0, o.tinySize)(t.founder.pictureUrl) : "",
                        alt: t.founder.displayName
                    }))) : r["default"].createElement("div", null)
                }();
                return r["default"].createElement("div", null, m, r["default"].createElement("div", {className: "summary-item text-item"}, r["default"].createElement("p", null, "融资额：", r["default"].createElement("i", null, t.fundRaisingGoal)), r["default"].createElement("p", null, "equity" === t.type ? "出让股份" : "出让权益", "：", r["default"].createElement("i", null, t.shareProportion.toFixed(2) + "%"))))
            }
            return r["default"].createElement("div", null)
        }, E = r["default"].createClass({
            displayName: "Project",
            propTypes: {
                project: r["default"].PropTypes.object.isRequired,
                scrollHeight: r["default"].PropTypes.number.isRequired
            },
            offsetTop: window.innerHeight,
            active: !1,
            scale: 0,
            getGallaryHeight: function () {
                return 240 * this.scale
            },
            getSrc: function () {
                var e = this.props.scrollHeight + window.innerHeight;
                return !this.active && this.offsetTop <= e - 50 ? (this.active = !0, this.props.project.picture ? this.props.project.picture : "/assets/images/projects/default.png") : "/assets/images/projects/default.png"
            },
            shouldComponentUpdate: function (e, t) {
                return !this.active
            },
            componentDidMount: function () {
                var e = this.refs.node;
                this.offsetTop = e.offsetTop, this.offsetTop < window.innerHeight && this.forceUpdate(), this.scale = e.offsetWidth / 370;
                var t = (0, h.findDOMNode)(this.refs.gallery);
                t.style.height = this.getGallaryHeight() + "px"
            },
            componentWillUnmount: function () {
                this.active = !1, this.offsetTop = 0
            },
            render: function () {
                var e = this.props.project, t = this.getSrc(), a = (0, p["default"])({active: this.active});
                return r["default"].createElement("li", {
                    className: (0, p["default"])("project", "table-view-cell", a),
                    ref: "node"
                }, r["default"].createElement(i.Link, {to: e.type && "product" === e.type ? "/product/" + e.id : "/project/" + e.id}, r["default"].createElement("div", {
                    className: "project-thumbnail",
                    ref: "gallery"
                }, r["default"].createElement("img", {
                    src: t,
                    alt: e.title
                })), r["default"].createElement("div", {className: "project-summary"}, r["default"].createElement(v, {
                    project: e,
                    active: this.active
                })), r["default"].createElement("div", {className: "project-status"}, e.status)))
            }
        });
        t["default"] = r["default"].createClass({
            displayName: "projects",
            propTypes: {projects: r["default"].PropTypes.array},
            componentDidMount: function () {
                document.addEventListener("scroll", this.onScoll)
            },
            onScoll: function () {
                var e = document.getElementsByTagName("body")[0], t = e.scrollTop;
                t > this.scrollHeight && (this.scrollHeight = e.scrollTop, this.forceUpdate())
            },
            componentWillUpdate: function (e, t) {
            },
            componentDidUpdate: function (e, t) {
            },
            scrollHeight: 0,
            componentWillUnmount: function () {
                document.removeEventListener("scroll", this.onScoll)
            },
            componentWillReceiveProps: function (e) {
                e.projects && (this.scrollHeight = 0)
            },
            render: function () {
                var e = this;
                if (!this.props.projects)return r["default"].createElement(f["default"], null);
                if (0 === this.props.projects.length)return r["default"].createElement("div", {className: this.props.className}, r["default"].createElement("div", {className: "empty"}, "无结果"));
                if (this.props.projects.length > 0) {
                    var t = this.props.projects.map(function (t) {
                        return r["default"].createElement(E, {project: t, key: t.id, scrollHeight: e.scrollHeight})
                    });
                    return r["default"].createElement("div", {className: this.props.className}, r["default"].createElement("ul", {
                        className: "table-view projects",
                        ref: "projects"
                    }, t))
                }
            }
        })
    }, 423: function (e, t) {
    }, 424: function (e, t) {
    }
});
//# sourceMappingURL=chunk.804e11d11807535187f8.js.map