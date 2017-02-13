//<![CDATA[    
(function (a) {
    a.cbrnewpost = function (c, b) {
        var d = this;
        d.$el = a(c);
        d.init = function () {
            d.options = a.extend({}, a.cbrnewpost.defaultOptions, b);
            d.$el.html('<div class="cbttaglistco ' + d.options.postType + '"><ul class="cbrnewponew"></ul></div>').addClass(d.options.loadingClass);
            a.get((d.options.blogURL === "" ? window.location.protocol + "//" + window.location.host : d.options.blogURL) + "/feeds/posts/default" + (d.options.tagName === false ? "" : "/-/" + d.options.tagName) + "?max-results=" + d.options.MaxPost + "&orderby=published&alt=json-in-script", function (B) {
                var E, h, D, r, H, t, G, s, q, w, F, y, C, n = "",
                    f = B.feed.entry;
                if (f !== undefined) {
                    for (var z = 0, p = f.length; z < p; z++) {
                        for (var x = 0, v = f[z].link.length; x < v; x++) {
                            if (f[z].link[x].rel == "alternate") {
                                E = f[z].link[x].href;
                                break
                            }
                        }
                        for (var u = 0, A = f[z].link.length; u < A; u++) {
                            if (f[z].link[u].rel == "replies" && f[z].link[u].type == "text/html") {
                                H = f[z].link[u].title.split(" ")[0];
                                break
                            }
                        }
                        D = ("content" in f[z]) ? f[z].content.$t : ("summary" in f[z]) ? f[z].summary.$t : "";
                        var e = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
                        t = a("<div></div>").append(D.replace(e, ""));
                        G = t.find("img");
                        if ("media$thumbnail" in f[z]) {
                            s = f[z].media$thumbnail.url.replace(/\/s[0-9]+\-c/g, "/" + d.options.ImageSize);
                            if (f[z] === f[0] && d.options.postType !== "s") {
                                s = f[z].media$thumbnail.url.replace(/\/s[0-9]+\-c/g, "/" + d.options.FirstImageSize)
                            } else {
                                if (f[z].media$thumbnail.url.indexOf("img.youtube.com") != -1) {
                                    s = f[z].media$thumbnail.url.replace("default", "0")
                                }
                            }
                        } else {
                            if (G.length != 0) {
                                s = G[0].src
                            } else {
                                s = d.options.pBlank
                            }
                        }
                        D = D.replace(/<\S[^>]*>/g, "");
                        if (D.length > d.options.Summarylength) {
                            D = D.substring(0, d.options.Summarylength) + "..."
                        }
                        h = f[z].title.$t;
                        C = f[z].published.$t.substring(0, 10);
                        q = C.substring(0, 4);
                        w = C.substring(5, 7);
                        F = C.substring(8, 10);
                        y = d.options.MonthNames[parseInt(w, 10) - 1];
                        n += '<li class="a' + z + '"><div class="inner" ><a title="' + h + '" class="imagethubnailwithtagin" href="' + E + '"><img src="' + s + '"/></a><strong><a href="' + E + '">' + h + '</a></strong><div class="info">' + (d.options.ShowDate === true ? '<span id="dayclass">' + y + " " + F + ", " + q + "</span>" : "") + (d.options.ShowComment === true ? '<span id="comclass"><a href="' + E + '#comment-form">' + H + "</a> Comment(s)</span>" : "") + "</div><p " + (d.options.ShowDesc === false ? "" : 'style="display:block"') + ">" + D + "</p></div></li>"
                    }
                    a("ul", d.$el).append(n);
                    if (d.options.postType === "s") {
                        var o = a(c).parents(".widget");
                        var I = o.children("h2");
                        if (d.options.tagName != false) {
                            I.wrapInner('<a href="/search/label/' + encodeURIComponent(d.options.tagName) + '"/>')
                        }
                        var m, g;
                        var k = d.$el.width();
                        if (a(window).width() < 479) {
                            g = 1;
                            m = k / g
                        } else {
                            if (a(window).width() < 979) {
                                g = 2;
                                m = k / g
                            } else {
                                if (a(window).width() < 1025) {
                                    g = 3;
                                    m = k / g
                                } else {
                                    g = 4;
                                    m = k / g
                                }
                            }
                        }
                        a(".cbttaglistco", d.$el).flexslider({
                            animation: "slide",
                            selector: ".cbrnewponew > li",
                            animationLoop: true,
                            itemWidth: m,
                            minItems: 1,
                            move: g,
                            mousewheel: true,
                            maxItems: 4
                        });
                        d.$el.removeClass(d.options.loadingClass)
                    } else {
                        if (d.options.tagName != false) {
                            d.$el.append('<div class="morepostag"><a title="View All About ' + d.options.tagName + '" href="/search/label/' + encodeURIComponent(d.options.tagName) + '"><span>View All</span></a></div>').removeClass(d.options.loadingClass)
                        }
                    }
                    d.$el.removeClass(d.options.loadingClass)
                } else {
                    d.$el.html("<span>No result! Or Error Loading Feed</span>")
                }
            }, "jsonp")
        };
        d.init()
    };
    a.cbrnewpost.defaultOptions = {
        blogURL: "",
        MaxPost: 6,
        FirstImageSize: "s360-p",
        ImageSize: "s80-p",
        ShowDesc: false,
        ShowDate: true,
        ShowComment: true,
        Summarylength: 170,
        postType: "v",
        loadingClass: "loadingxxnewcontent",
        pBlank: "http://1.bp.blogspot.com/-htG7vy9vIAA/Tp0KrMUdoWI/AAAAAAAABAU/e7XkFtErqsU/s72-c/grey.gif",
        MonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        tagName: false
    };
    a.fn.cbrnewpost = function (b) {
        return this.each(function () {
            (new a.cbrnewpost(this, b))
        })
    }
})(jQuery);
//]]>