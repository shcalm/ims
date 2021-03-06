(function(b) {
    b.fn.markItUp = function(r, h) {
        var d, s, z, F, c, k, q, w;
        k = q = w = !1;
        "string" == typeof r && (z = r, F = h);
        c = {
            id: "",
            nameSpace: "",
            root: "",
            previewHandler: !1,
            previewInWindow: "",
            previewInElement: "",
            previewAutoRefresh: !0,
            previewPosition: "after",
            previewTemplatePath: "~/templates/preview.html",
            previewParser: !1,
            previewParserPath: "",
            previewParserVar: "data",
            resizeHandle: !0,
            beforeInsert: "",
            afterInsert: "",
            onEnter: {},
            onShiftEnter: {},
            onCtrlEnter: {},
            onTab: {},
            markupSet: [{}]
        };
        b.extend(c, r, h);
        c.root || b("script").each(function(k, l) {
            miuScript = b(l).get(0).src.match(/(.*)jquery\.markitup(\.pack)?\.js$/);
            null !== miuScript && (c.root = miuScript[1])
        });
        d = navigator.userAgent;
        d = d.toLowerCase();
        s = /(chrome)[ \/]([\w.]+)/.exec(d) || /(webkit)[ \/]([\w.]+)/.exec(d) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(d) || /(msie) ([\w.]+)/.exec(d) || 0 > d.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(d) || [];
        d = s[1] || "";
        s = s[2] || "0";
        var l = {};
        d && (l[d] = !0, l.version = s);
        l.chrome ? l.webkit = !0 : l.webkit && (l.safari = !0);
        return this.each(function() {
            function d(a, j) {
                return j ? a.replace(/("|')~\//g, "$1" + c.root) : a.replace(/^~\//, c.root)
            }

            function h(a) {
                var j = b("<ul></ul>"),
                    c = 0;
                b("li:hover > ul", j).css("display", "block");
                b.each(a, function() {
                    var a = this,
                        e = "",
                        d, g;
                    d = a.key ? (a.name || "") + " [Ctrl+" + a.key + "]" : a.name || "";
                    key = a.key ? 'accesskey="' + a.key + '"' : "";
                    if (a.separator) e = b('<li class="markItUpSeparator">' + (a.separator || "") + "</li>").appendTo(j);
                    else {
                        c++;
                        for (g = x.length - 1; 0 <= g; g--) e += x[g] + "-";
                        e = b('<li class="markItUpButton markItUpButton' + e + c + " " + (a.className || "") + '"><a href="" ' + key + ' title="' + d + '">' + (a.name || "") + "</a></li>").bind("contextmenu.markItUp", function() {
                            return !1
                        }).bind("click.markItUp", function(a) {
                            a.preventDefault()
                        }).bind("focusin.markItUp", function() {
                            f.focus()
                        }).bind("mouseup", function() {
                            a.call && eval(a.call)();
                            setTimeout(function() {
                                u(a)
                            }, 1);
                            return !1
                        }).bind("mouseenter.markItUp", function() {
                            b("> ul", this).show();
                            b(document).one("click", function() {
                                b("ul ul", A).hide()
                            })
                        }).bind("mouseleave.markItUp", function() {
                            b("> ul", this).hide()
                        }).appendTo(j);
                        a.dropMenu && (x.push(c), b(e).addClass("markItUpDropMenu").append(h(a.dropMenu)))
                    }
                });
                x.pop();
                return j
            }

            function n(a) {
                b.isFunction(a) && (a = a(v));
                a ? (a = a.toString(), a = a.replace(/\(\!\(([\s\S]*?)\)\!\)/g, function(a, c) {
                    var b = c.split("|!|");
                    return !0 === w ? void 0 !== b[1] ? b[1] : b[0] : void 0 === b[1] ? "" : b[0]
                }), a = a.replace(/\[\!\[([\s\S]*?)\]\!\]/g, function(a, b) {
                    var c = b.split(":!:");
                    if (!0 === y) return !1;
                    value = prompt(c[0], c[1] ? c[1] : "");
                    null === value && (y = !0);
                    return value
                })) : a = "";
                return a
            }

            function r(a) {
                var b = n(p.openWith),
                    c = n(p.placeHolder),
                    f = n(p.replaceWith),
                    e = n(p.closeWith),
                    g = n(p.openBlockWith),
                    d = n(p.closeBlockWith),
                    l = p.multiline;
                if ("" !== f) block = b + f + e;
                else if ("" === selection && "" !== c) block = b + c + e;
                else {
                    a = a || selection;
                    var k = [a],
                        m = [];
                    !0 === l && (k = a.split(/\r?\n/));
                    for (a = 0; a < k.length; a++) {
                        line = k[a];
                        var h;
                        (h = line.match(/ *$/)) ? m.push(b + line.replace(/ *$/g, "") + e + h): m.push(b + line + e)
                    }
                    block = m.join("\n")
                }
                block = g + block + d;
                return {
                    block: block,
                    openBlockWith: g,
                    openWith: b,
                    replaceWith: f,
                    placeHolder: c,
                    closeWith: e,
                    closeBlockWith: d
                }
            }

            function u(a) {
                var j, d, h;
                v = p = a;
                B();
                b.extend(v, {
                    line: "",
                    root: c.root,
                    textarea: e,
                    selection: selection || "",
                    caretPosition: g,
                    ctrlKey: k,
                    shiftKey: q,
                    altKey: w
                });
                n(c.beforeInsert);
                n(p.beforeInsert);
                (!0 === k && !0 === q || !0 === a.multiline) && n(p.beforeMultiInsert);
                b.extend(v, {
                    line: 1
                });
                if (!0 === k && !0 === q) {
                    lines = selection.split(/\r?\n/);
                    j = 0;
                    d = lines.length;
                    for (h = 0; h < d; h++) "" !== b.trim(lines[h]) ? (b.extend(v, {
                        line: ++j,
                        selection: lines[h]
                    }), lines[h] = r(lines[h]).block) : lines[h] = "";
                    string = {
                        block: lines.join("\n")
                    };
                    start = g;
                    j = string.block.length + (l.opera ? d - 1 : 0)
                } else !0 === k ? (string = r(selection), start = g + string.openWith.length, j = string.block.length - string.openWith.length - string.closeWith.length, j -= string.block.match(/ $/) ? 1 : 0, j -= D(string.block)) : !0 === q ? (string = r(selection), start = g, j = string.block.length, j -= D(string.block)) : (string = r(selection), start = g + string.block.length, j = 0, start -= D(string.block));
                "" === selection && "" === string.replaceWith && (m += s(string.block), start = g + string.openBlockWith.length + string.openWith.length, j = string.block.length - string.openBlockWith.length - string.openWith.length - string.closeWith.length - string.closeBlockWith.length, m = f.val().substring(g, f.val().length).length, m -= s(f.val().substring(0, g)));
                b.extend(v, {
                    caretPosition: g,
                    scrollPosition: C
                });
                string.block !== selection && !1 === y ? (d = string.block, document.selection ? document.selection.createRange().text = d : e.value = e.value.substring(0, g) + d + e.value.substring(g + selection.length, e.value.length), G(start, j)) : m = -1;
                B();
                b.extend(v, {
                    line: "",
                    selection: selection
                });
                (!0 === k && !0 === q || !0 === a.multiline) && n(p.afterMultiInsert);
                n(p.afterInsert);
                n(c.afterInsert);
                t && c.previewAutoRefresh && H();
                q = w = k = y = !1
            }

            function s(a) {
                return l.opera ? a.length - a.replace(/\n*/g, "").length : 0
            }

            function D(a) {
                return l.msie ? a.length - a.replace(/\r*/g, "").length : 0
            }

            function G(a, b) {
                if (e.createTextRange) {
                    if (l.opera && 9.5 <= l.version && 0 == b) return !1;
                    range = e.createTextRange();
                    range.collapse(!0);
                    range.moveStart("character", a);
                    range.moveEnd("character", b);
                    range.select()
                } else e.setSelectionRange && e.setSelectionRange(a, a + b);
                e.scrollTop = C;
                e.focus()
            }

            function B() {
                e.focus();
                C = e.scrollTop;
                if (document.selection)
                    if (selection = document.selection.createRange().text, l.msie) {
                        var a = document.selection.createRange(),
                            b = a.duplicate();
                        b.moveToElementText(e);
                        for (g = -1; b.inRange(a);) b.moveStart("character"), g++
                    } else g = e.selectionStart;
                else g = e.selectionStart, selection = e.value.substring(g, e.selectionEnd);
                return selection
            }

            function H() {
                if (c.previewHandler && "function" === typeof c.previewHandler) c.previewHandler(f.val());
                else if (c.previewParser && "function" === typeof c.previewParser) {
                    var a = c.previewParser(f.val());
                    E(d(a, 1))
                } else "" !== c.previewParserPath ? b.ajax({
                    type: "POST",
                    dataType: "text",
                    global: !1,
                    url: c.previewParserPath,
                    data: c.previewParserVar + "=" + encodeURIComponent(f.val()),
                    success: function(a) {
                        E(d(a, 1))
                    }
                }) : K || b.ajax({
                    url: c.previewTemplatePath,
                    dataType: "text",
                    global: !1,
                    success: function(a) {
                        E(d(a, 1).replace(/\x3c!-- content --\x3e/g, f.val()))
                    }
                });
                return !1
            }

            function E(a) {
                if (c.previewInElement) b(c.previewInElement).html(a);
                else if (t && t.document) {
                    try {
                        sp = t.document.documentElement.scrollTop
                    } catch (f) {
                        sp = 0
                    }
                    t.document.open();
                    t.document.write(a);
                    t.document.close();
                    t.document.documentElement.scrollTop = sp
                }
            }

            function I(a) {
                q = a.shiftKey;
                w = a.altKey;
                k = !a.altKey || !a.ctrlKey ? a.ctrlKey || a.metaKey : !1;
                if ("keydown" === a.type) {
                    if (!0 === k && (li = b('a[accesskey="' + (13 == a.keyCode ? "\\n" : String.fromCharCode(a.keyCode)) + '"]', A).parent("li"), 0 !== li.length)) return k = !1, setTimeout(function() {
                        li.triggerHandler("mouseup")
                    }, 1), !1;
                    if (13 === a.keyCode || 10 === a.keyCode) {
                        if (!0 === k) return k = !1, u(c.onCtrlEnter), c.onCtrlEnter.keepDefault;
                        if (!0 === q) return q = !1, u(c.onShiftEnter), c.onShiftEnter.keepDefault;
                        u(c.onEnter);
                        return c.onEnter.keepDefault
                    }
                    if (9 === a.keyCode) {
                        if (!0 == q || !0 == k || !0 == w) return !1;
                        if (-1 !== m) return B(), m = f.val().length - m, G(m, 0), m = -1, !1;
                        u(c.onTab);
                        return c.onTab.keepDefault
                    }
                }
            }
            var f, e, x, C, g, m, p, v, A, J, t, K, y;
            f = b(this);
            e = this;
            x = [];
            y = !1;
            C = g = 0;
            m = -1;
            c.previewParserPath = d(c.previewParserPath);
            c.previewTemplatePath = d(c.previewTemplatePath);
            if (z) switch (z) {
                case "remove":
                    f.unbind(".markItUp").removeClass("markItUpEditor");
                    f.parent("div").parent("div.markItUp").parent("div").replaceWith(f);
                    f.data("markItUp", null);
                    break;
                case "insert":
                    u(F);
                    break;
                default:
                    b.error("Method " + z + " does not exist on jQuery.markItUp")
            } else nameSpace = id = "", c.id ? id = 'id="' + c.id + '"' : f.attr("id") && (id = 'id="markItUp' + f.attr("id").substr(0, 1).toUpperCase() + f.attr("id").substr(1) + '"'), c.nameSpace && (nameSpace = 'class="' + c.nameSpace + '"'), f.wrap("<div " + nameSpace + "></div>"), f.wrap("<div " + id + ' class="markItUp"></div>'), f.wrap('<div class="markItUpContainer"></div>'), f.addClass("markItUpEditor"), A = b('<div class="markItUpHeader"></div>').insertBefore(f), b(h(c.markupSet)).appendTo(A), J = b('<div class="markItUpFooter"></div>').insertAfter(f), !0 === c.resizeHandle && !0 !== l.safari && (resizeHandle = b('<div class="markItUpResizeHandle"></div>').insertAfter(f).bind("mousedown.markItUp", function(a) {
                var c = f.height(),
                    e = a.clientY,
                    d, g;
                d = function(a) {
                    f.css("height", Math.max(20, a.clientY + c - e) + "px");
                    return !1
                };
                g = function() {
                    b("html").unbind("mousemove.markItUp", d).unbind("mouseup.markItUp", g);
                    return !1
                };
                b("html").bind("mousemove.markItUp", d).bind("mouseup.markItUp", g)
            }), J.append(resizeHandle)), f.bind("keydown.markItUp", I).bind("keyup", I), f.bind("insertion.markItUp", function(a, c) {
                !1 !== c.target && B();
                e === b.markItUp.focused && u(c)
            }), f.bind("focus.markItUp", function() {
                b.markItUp.focused = this
            }), c.previewInElement && H()
        })
    };
    b.fn.markItUpRemove = function() {
        return this.each(function() {
            b(this).markItUp("remove")
        })
    };
    b.markItUp = function(r) {
        var h = {
            target: !1
        };
        b.extend(h, r);
        if (h.target) return b(h.target).each(function() {
            b(this).focus();
            b(this).trigger("insertion", [h])
        });
        b("textarea").trigger("insertion", [h])
    }
})(jQuery);