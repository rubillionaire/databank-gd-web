!function(){function n(n,t){return t>n?-1:n>t?1:n>=t?0:0/0}function t(n){return null!=n&&!isNaN(n)}function r(n){return{left:function(t,r,e,u){for(arguments.length<3&&(e=0),arguments.length<4&&(u=t.length);u>e;){var i=e+u>>>1;n(t[i],r)<0?e=i+1:u=i}return e},right:function(t,r,e,u){for(arguments.length<3&&(e=0),arguments.length<4&&(u=t.length);u>e;){var i=e+u>>>1;n(t[i],r)>0?u=i:e=i+1}return e}}}function e(n){return n.length}function u(n){for(var t=1;n*t%1;)t*=10;return t}function i(n,t){try{for(var r in t)Object.defineProperty(n.prototype,r,{value:t[r],enumerable:!1})}catch(e){n.prototype=t}}function o(){}function a(n){return sa+n in this}function c(n){return n=sa+n,n in this&&delete this[n]}function s(){var n=[];return this.forEach(function(t){n.push(t)}),n}function l(){var n=0;for(var t in this)t.charCodeAt(0)===la&&++n;return n}function f(){for(var n in this)if(n.charCodeAt(0)===la)return!1;return!0}function h(){}function g(n,t,r){return function(){var e=r.apply(t,arguments);return e===t?n:e}}function p(n,t){if(t in n)return t;t=t.charAt(0).toUpperCase()+t.substring(1);for(var r=0,e=fa.length;e>r;++r){var u=fa[r]+t;if(u in n)return u}}function v(){}function d(){}function m(n){function t(){for(var t,e=r,u=-1,i=e.length;++u<i;)(t=e[u].on)&&t.apply(this,arguments);return n}var r=[],e=new o;return t.on=function(t,u){var i,o=e.get(t);return arguments.length<2?o&&o.on:(o&&(o.on=null,r=r.slice(0,i=r.indexOf(o)).concat(r.slice(i+1)),e.remove(t)),u&&r.push(e.set(t,{on:u})),n)},t}function y(){Bo.event.preventDefault()}function x(){for(var n,t=Bo.event;n=t.sourceEvent;)t=n;return t}function M(n){for(var t=new d,r=0,e=arguments.length;++r<e;)t[arguments[r]]=m(t);return t.of=function(r,e){return function(u){try{var i=u.sourceEvent=Bo.event;u.target=n,Bo.event=u,t[u.type].apply(r,e)}finally{Bo.event=i}}},t}function _(n){return ga(n,ya),n}function b(n){return"function"==typeof n?n:function(){return pa(n,this)}}function w(n){return"function"==typeof n?n:function(){return va(n,this)}}function S(n,t){function r(){this.removeAttribute(n)}function e(){this.removeAttributeNS(n.space,n.local)}function u(){this.setAttribute(n,t)}function i(){this.setAttributeNS(n.space,n.local,t)}function o(){var r=t.apply(this,arguments);null==r?this.removeAttribute(n):this.setAttribute(n,r)}function a(){var r=t.apply(this,arguments);null==r?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,r)}return n=Bo.ns.qualify(n),null==t?n.local?e:r:"function"==typeof t?n.local?a:o:n.local?i:u}function k(n){return n.trim().replace(/\s+/g," ")}function E(n){return new RegExp("(?:^|\\s+)"+Bo.requote(n)+"(?:\\s+|$)","g")}function A(n){return n.trim().split(/^|\s+/)}function C(n,t){function r(){for(var r=-1;++r<u;)n[r](this,t)}function e(){for(var r=-1,e=t.apply(this,arguments);++r<u;)n[r](this,e)}n=A(n).map(N);var u=n.length;return"function"==typeof t?e:r}function N(n){var t=E(n);return function(r,e){if(u=r.classList)return e?u.add(n):u.remove(n);var u=r.getAttribute("class")||"";e?(t.lastIndex=0,t.test(u)||r.setAttribute("class",k(u+" "+n))):r.setAttribute("class",k(u.replace(t," ")))}}function z(n,t,r){function e(){this.style.removeProperty(n)}function u(){this.style.setProperty(n,t,r)}function i(){var e=t.apply(this,arguments);null==e?this.style.removeProperty(n):this.style.setProperty(n,e,r)}return null==t?e:"function"==typeof t?i:u}function L(n,t){function r(){delete this[n]}function e(){this[n]=t}function u(){var r=t.apply(this,arguments);null==r?delete this[n]:this[n]=r}return null==t?r:"function"==typeof t?u:e}function T(n){return"function"==typeof n?n:(n=Bo.ns.qualify(n)).local?function(){return this.ownerDocument.createElementNS(n.space,n.local)}:function(){return this.ownerDocument.createElementNS(this.namespaceURI,n)}}function q(n){return{__data__:n}}function R(n){return function(){return ma(this,n)}}function D(t){return arguments.length||(t=n),function(n,r){return n&&r?t(n.__data__,r.__data__):!n-!r}}function P(n,t){for(var r=0,e=n.length;e>r;r++)for(var u,i=n[r],o=0,a=i.length;a>o;o++)(u=i[o])&&t(u,o,r);return n}function U(n){return ga(n,Ma),n}function j(n){var t,r;return function(e,u,i){var o,a=n[i].update,c=a.length;for(i!=r&&(r=i,t=0),u>=t&&(t=u+1);!(o=a[t])&&++t<c;);return o}}function H(){var n=this.__transition__;n&&++n.active}function F(n,t,r){function e(){var t=this[o];t&&(this.removeEventListener(n,t,t.$),delete this[o])}function u(){var u=c(t,Wo(arguments));e.call(this),this.addEventListener(n,this[o]=u,u.$=r),u._=t}function i(){var t,r=new RegExp("^__on([^.]+)"+Bo.requote(n)+"$");for(var e in this)if(t=e.match(r)){var u=this[e];this.removeEventListener(t[1],u,u.$),delete this[e]}}var o="__on"+n,a=n.indexOf("."),c=O;a>0&&(n=n.substring(0,a));var s=ba.get(n);return s&&(n=s,c=I),a?t?u:e:t?v:i}function O(n,t){return function(r){var e=Bo.event;Bo.event=r,t[0]=this.__data__;try{n.apply(this,t)}finally{Bo.event=e}}}function I(n,t){var r=O(n,t);return function(n){var t=this,e=n.relatedTarget;e&&(e===t||8&e.compareDocumentPosition(t))||r.call(t,n)}}function Y(){var n=".dragsuppress-"+ ++Sa,t="click"+n,r=Bo.select(Qo).on("touchmove"+n,y).on("dragstart"+n,y).on("selectstart"+n,y);if(wa){var e=Ko.style,u=e[wa];e[wa]="none"}return function(i){function o(){r.on(t,null)}r.on(n,null),wa&&(e[wa]=u),i&&(r.on(t,function(){y(),o()},!0),setTimeout(o,0))}}function Z(n,t){t.changedTouches&&(t=t.changedTouches[0]);var r=n.ownerSVGElement||n;if(r.createSVGPoint){var e=r.createSVGPoint();return e.x=t.clientX,e.y=t.clientY,e=e.matrixTransform(n.getScreenCTM().inverse()),[e.x,e.y]}var u=n.getBoundingClientRect();return[t.clientX-u.left-n.clientLeft,t.clientY-u.top-n.clientTop]}function V(){return Bo.event.changedTouches[0].identifier}function $(){return Bo.event.target}function X(){return Qo}function B(n){return n>0?1:0>n?-1:0}function J(n,t,r){return(t[0]-n[0])*(r[1]-n[1])-(t[1]-n[1])*(r[0]-n[0])}function W(n){return n>1?0:-1>n?ka:Math.acos(n)}function G(n){return n>1?Aa:-1>n?-Aa:Math.asin(n)}function K(n){return((n=Math.exp(n))-1/n)/2}function Q(n){return((n=Math.exp(n))+1/n)/2}function nt(n){return((n=Math.exp(2*n))-1)/(n+1)}function tt(n){return(n=Math.sin(n/2))*n}function rt(){}function et(n,t,r){return new ut(n,t,r)}function ut(n,t,r){this.h=n,this.s=t,this.l=r}function it(n,t,r){function e(n){return n>360?n-=360:0>n&&(n+=360),60>n?i+(o-i)*n/60:180>n?o:240>n?i+(o-i)*(240-n)/60:i}function u(n){return Math.round(255*e(n))}var i,o;return n=isNaN(n)?0:(n%=360)<0?n+360:n,t=isNaN(t)?0:0>t?0:t>1?1:t,r=0>r?0:r>1?1:r,o=.5>=r?r*(1+t):r+t-r*t,i=2*r-o,yt(u(n+120),u(n),u(n-120))}function ot(n,t,r){return new at(n,t,r)}function at(n,t,r){this.h=n,this.c=t,this.l=r}function ct(n,t,r){return isNaN(n)&&(n=0),isNaN(t)&&(t=0),st(r,Math.cos(n*=za)*t,Math.sin(n)*t)}function st(n,t,r){return new lt(n,t,r)}function lt(n,t,r){this.l=n,this.a=t,this.b=r}function ft(n,t,r){var e=(n+16)/116,u=e+t/500,i=e-r/200;return u=gt(u)*Oa,e=gt(e)*Ia,i=gt(i)*Ya,yt(vt(3.2404542*u-1.5371385*e-.4985314*i),vt(-.969266*u+1.8760108*e+.041556*i),vt(.0556434*u-.2040259*e+1.0572252*i))}function ht(n,t,r){return n>0?ot(Math.atan2(r,t)*La,Math.sqrt(t*t+r*r),n):ot(0/0,0/0,n)}function gt(n){return n>.206893034?n*n*n:(n-4/29)/7.787037}function pt(n){return n>.008856?Math.pow(n,1/3):7.787037*n+4/29}function vt(n){return Math.round(255*(.00304>=n?12.92*n:1.055*Math.pow(n,1/2.4)-.055))}function dt(n){return yt(n>>16,255&n>>8,255&n)}function mt(n){return dt(n)+""}function yt(n,t,r){return new xt(n,t,r)}function xt(n,t,r){this.r=n,this.g=t,this.b=r}function Mt(n){return 16>n?"0"+Math.max(0,n).toString(16):Math.min(255,n).toString(16)}function _t(n,t,r){var e,u,i,o=0,a=0,c=0;if(e=/([a-z]+)\((.*)\)/i.exec(n))switch(u=e[2].split(","),e[1]){case"hsl":return r(parseFloat(u[0]),parseFloat(u[1])/100,parseFloat(u[2])/100);case"rgb":return t(kt(u[0]),kt(u[1]),kt(u[2]))}return(i=$a.get(n))?t(i.r,i.g,i.b):(null==n||"#"!==n.charAt(0)||isNaN(i=parseInt(n.substring(1),16))||(4===n.length?(o=(3840&i)>>4,o=o>>4|o,a=240&i,a=a>>4|a,c=15&i,c=c<<4|c):7===n.length&&(o=(16711680&i)>>16,a=(65280&i)>>8,c=255&i)),t(o,a,c))}function bt(n,t,r){var e,u,i=Math.min(n/=255,t/=255,r/=255),o=Math.max(n,t,r),a=o-i,c=(o+i)/2;return a?(u=.5>c?a/(o+i):a/(2-o-i),e=n==o?(t-r)/a+(r>t?6:0):t==o?(r-n)/a+2:(n-t)/a+4,e*=60):(e=0/0,u=c>0&&1>c?0:e),et(e,u,c)}function wt(n,t,r){n=St(n),t=St(t),r=St(r);var e=pt((.4124564*n+.3575761*t+.1804375*r)/Oa),u=pt((.2126729*n+.7151522*t+.072175*r)/Ia),i=pt((.0193339*n+.119192*t+.9503041*r)/Ya);return st(116*u-16,500*(e-u),200*(u-i))}function St(n){return(n/=255)<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4)}function kt(n){var t=parseFloat(n);return"%"===n.charAt(n.length-1)?Math.round(2.55*t):t}function Et(n){return"function"==typeof n?n:function(){return n}}function At(n){return n}function Ct(n){return function(t,r,e){return 2===arguments.length&&"function"==typeof r&&(e=r,r=null),Nt(t,r,n,e)}}function Nt(n,t,r,e){function u(){var n,t=c.status;if(!t&&c.responseText||t>=200&&300>t||304===t){try{n=r.call(i,c)}catch(e){return o.error.call(i,e),void 0}o.load.call(i,n)}else o.error.call(i,c)}var i={},o=Bo.dispatch("beforesend","progress","load","error"),a={},c=new XMLHttpRequest,s=null;return!Qo.XDomainRequest||"withCredentials"in c||!/^(http(s)?:)?\/\//.test(n)||(c=new XDomainRequest),"onload"in c?c.onload=c.onerror=u:c.onreadystatechange=function(){c.readyState>3&&u()},c.onprogress=function(n){var t=Bo.event;Bo.event=n;try{o.progress.call(i,c)}finally{Bo.event=t}},i.header=function(n,t){return n=(n+"").toLowerCase(),arguments.length<2?a[n]:(null==t?delete a[n]:a[n]=t+"",i)},i.mimeType=function(n){return arguments.length?(t=null==n?null:n+"",i):t},i.responseType=function(n){return arguments.length?(s=n,i):s},i.response=function(n){return r=n,i},["get","post"].forEach(function(n){i[n]=function(){return i.send.apply(i,[n].concat(Wo(arguments)))}}),i.send=function(r,e,u){if(2===arguments.length&&"function"==typeof e&&(u=e,e=null),c.open(r,n,!0),null==t||"accept"in a||(a.accept=t+",*/*"),c.setRequestHeader)for(var l in a)c.setRequestHeader(l,a[l]);return null!=t&&c.overrideMimeType&&c.overrideMimeType(t),null!=s&&(c.responseType=s),null!=u&&i.on("error",u).on("load",function(n){u(null,n)}),o.beforesend.call(i,c),c.send(null==e?null:e),i},i.abort=function(){return c.abort(),i},Bo.rebind(i,o,"on"),null==e?i:i.get(zt(e))}function zt(n){return 1===n.length?function(t,r){n(null==t?r:null)}:n}function Lt(){var n=Tt(),t=qt()-n;t>24?(isFinite(t)&&(clearTimeout(Wa),Wa=setTimeout(Lt,t)),Ja=0):(Ja=1,Ka(Lt))}function Tt(){var n=Date.now();for(Ga=Xa;Ga;)n>=Ga.t&&(Ga.f=Ga.c(n-Ga.t)),Ga=Ga.n;return n}function qt(){for(var n,t=Xa,r=1/0;t;)t.f?t=n?n.n=t.n:Xa=t.n:(t.t<r&&(r=t.t),t=(n=t).n);return Ba=n,r}function Rt(n,t){return t-(n?Math.ceil(Math.log(n)/Math.LN10):1)}function Dt(n,t){var r=Math.pow(10,3*ca(8-t));return{scale:t>8?function(n){return n/r}:function(n){return n*r},symbol:n}}function Pt(n){var t=n.decimal,r=n.thousands,e=n.grouping,u=n.currency,i=e?function(n){for(var t=n.length,u=[],i=0,o=e[0];t>0&&o>0;)u.push(n.substring(t-=o,t+o)),o=e[i=(i+1)%e.length];return u.reverse().join(r)}:At;return function(n){var r=nc.exec(n),e=r[1]||" ",o=r[2]||">",a=r[3]||"",c=r[4]||"",s=r[5],l=+r[6],f=r[7],h=r[8],g=r[9],p=1,v="",d="",m=!1;switch(h&&(h=+h.substring(1)),(s||"0"===e&&"="===o)&&(s=e="0",o="=",f&&(l-=Math.floor((l-1)/4))),g){case"n":f=!0,g="g";break;case"%":p=100,d="%",g="f";break;case"p":p=100,d="%",g="r";break;case"b":case"o":case"x":case"X":"#"===c&&(v="0"+g.toLowerCase());case"c":case"d":m=!0,h=0;break;case"s":p=-1,g="r"}"$"===c&&(v=u[0],d=u[1]),"r"!=g||h||(g="g"),null!=h&&("g"==g?h=Math.max(1,Math.min(21,h)):("e"==g||"f"==g)&&(h=Math.max(0,Math.min(20,h)))),g=tc.get(g)||Ut;var y=s&&f;return function(n){var r=d;if(m&&n%1)return"";var u=0>n||0===n&&0>1/n?(n=-n,"-"):a;if(0>p){var c=Bo.formatPrefix(n,h);n=c.scale(n),r=c.symbol+d}else n*=p;n=g(n,h);var x=n.lastIndexOf("."),M=0>x?n:n.substring(0,x),_=0>x?"":t+n.substring(x+1);!s&&f&&(M=i(M));var b=v.length+M.length+_.length+(y?0:u.length),w=l>b?new Array(b=l-b+1).join(e):"";return y&&(M=i(w+M)),u+=v,n=M+_,("<"===o?u+n+w:">"===o?w+u+n:"^"===o?w.substring(0,b>>=1)+u+n+w.substring(b):u+(y?n:w+n))+r}}}function Ut(n){return n+""}function jt(){this._=new Date(arguments.length>1?Date.UTC.apply(this,arguments):arguments[0])}function Ht(n,t,r){function e(t){var r=n(t),e=i(r,1);return e-t>t-r?r:e}function u(r){return t(r=n(new ec(r-1)),1),r}function i(n,r){return t(n=new ec(+n),r),n}function o(n,e,i){var o=u(n),a=[];if(i>1)for(;e>o;)r(o)%i||a.push(new Date(+o)),t(o,1);else for(;e>o;)a.push(new Date(+o)),t(o,1);return a}function a(n,t,r){try{ec=jt;var e=new jt;return e._=n,o(e,t,r)}finally{ec=Date}}n.floor=n,n.round=e,n.ceil=u,n.offset=i,n.range=o;var c=n.utc=Ft(n);return c.floor=c,c.round=Ft(e),c.ceil=Ft(u),c.offset=Ft(i),c.range=a,n}function Ft(n){return function(t,r){try{ec=jt;var e=new jt;return e._=t,n(e,r)._}finally{ec=Date}}}function Ot(n){function t(n){function t(t){for(var r,u,i,o=[],a=-1,c=0;++a<e;)37===n.charCodeAt(a)&&(o.push(n.substring(c,a)),null!=(u=ic[r=n.charAt(++a)])&&(r=n.charAt(++a)),(i=C[r])&&(r=i(t,null==u?"e"===r?" ":"0":u)),o.push(r),c=a+1);return o.push(n.substring(c,a)),o.join("")}var e=n.length;return t.parse=function(t){var e={y:1900,m:0,d:1,H:0,M:0,S:0,L:0,Z:null},u=r(e,n,t,0);if(u!=t.length)return null;"p"in e&&(e.H=e.H%12+12*e.p);var i=null!=e.Z&&ec!==jt,o=new(i?jt:ec);return"j"in e?o.setFullYear(e.y,0,e.j):"w"in e&&("W"in e||"U"in e)?(o.setFullYear(e.y,0,1),o.setFullYear(e.y,0,"W"in e?(e.w+6)%7+7*e.W-(o.getDay()+5)%7:e.w+7*e.U-(o.getDay()+6)%7)):o.setFullYear(e.y,e.m,e.d),o.setHours(e.H+Math.floor(e.Z/100),e.M+e.Z%100,e.S,e.L),i?o._:o},t.toString=function(){return n},t}function r(n,t,r,e){for(var u,i,o,a=0,c=t.length,s=r.length;c>a;){if(e>=s)return-1;if(u=t.charCodeAt(a++),37===u){if(o=t.charAt(a++),i=N[o in ic?t.charAt(a++):o],!i||(e=i(n,r,e))<0)return-1}else if(u!=r.charCodeAt(e++))return-1}return e}function e(n,t,r){b.lastIndex=0;var e=b.exec(t.substring(r));return e?(n.w=w.get(e[0].toLowerCase()),r+e[0].length):-1}function u(n,t,r){M.lastIndex=0;var e=M.exec(t.substring(r));return e?(n.w=_.get(e[0].toLowerCase()),r+e[0].length):-1}function i(n,t,r){E.lastIndex=0;var e=E.exec(t.substring(r));return e?(n.m=A.get(e[0].toLowerCase()),r+e[0].length):-1}function o(n,t,r){S.lastIndex=0;var e=S.exec(t.substring(r));return e?(n.m=k.get(e[0].toLowerCase()),r+e[0].length):-1}function a(n,t,e){return r(n,C.c.toString(),t,e)}function c(n,t,e){return r(n,C.x.toString(),t,e)}function s(n,t,e){return r(n,C.X.toString(),t,e)}function l(n,t,r){var e=x.get(t.substring(r,r+=2).toLowerCase());return null==e?-1:(n.p=e,r)}var f=n.dateTime,h=n.date,g=n.time,p=n.periods,v=n.days,d=n.shortDays,m=n.months,y=n.shortMonths;t.utc=function(n){function r(n){try{ec=jt;var t=new ec;return t._=n,e(t)}finally{ec=Date}}var e=t(n);return r.parse=function(n){try{ec=jt;var t=e.parse(n);return t&&t._}finally{ec=Date}},r.toString=e.toString,r},t.multi=t.utc.multi=ar;var x=Bo.map(),M=Yt(v),_=Zt(v),b=Yt(d),w=Zt(d),S=Yt(m),k=Zt(m),E=Yt(y),A=Zt(y);p.forEach(function(n,t){x.set(n.toLowerCase(),t)});var C={a:function(n){return d[n.getDay()]},A:function(n){return v[n.getDay()]},b:function(n){return y[n.getMonth()]},B:function(n){return m[n.getMonth()]},c:t(f),d:function(n,t){return It(n.getDate(),t,2)},e:function(n,t){return It(n.getDate(),t,2)},H:function(n,t){return It(n.getHours(),t,2)},I:function(n,t){return It(n.getHours()%12||12,t,2)},j:function(n,t){return It(1+rc.dayOfYear(n),t,3)},L:function(n,t){return It(n.getMilliseconds(),t,3)},m:function(n,t){return It(n.getMonth()+1,t,2)},M:function(n,t){return It(n.getMinutes(),t,2)},p:function(n){return p[+(n.getHours()>=12)]},S:function(n,t){return It(n.getSeconds(),t,2)},U:function(n,t){return It(rc.sundayOfYear(n),t,2)},w:function(n){return n.getDay()},W:function(n,t){return It(rc.mondayOfYear(n),t,2)},x:t(h),X:t(g),y:function(n,t){return It(n.getFullYear()%100,t,2)},Y:function(n,t){return It(n.getFullYear()%1e4,t,4)},Z:ir,"%":function(){return"%"}},N={a:e,A:u,b:i,B:o,c:a,d:Qt,e:Qt,H:tr,I:tr,j:nr,L:ur,m:Kt,M:rr,p:l,S:er,U:$t,w:Vt,W:Xt,x:c,X:s,y:Jt,Y:Bt,Z:Wt,"%":or};return t}function It(n,t,r){var e=0>n?"-":"",u=(e?-n:n)+"",i=u.length;return e+(r>i?new Array(r-i+1).join(t)+u:u)}function Yt(n){return new RegExp("^(?:"+n.map(Bo.requote).join("|")+")","i")}function Zt(n){for(var t=new o,r=-1,e=n.length;++r<e;)t.set(n[r].toLowerCase(),r);return t}function Vt(n,t,r){oc.lastIndex=0;var e=oc.exec(t.substring(r,r+1));return e?(n.w=+e[0],r+e[0].length):-1}function $t(n,t,r){oc.lastIndex=0;var e=oc.exec(t.substring(r));return e?(n.U=+e[0],r+e[0].length):-1}function Xt(n,t,r){oc.lastIndex=0;var e=oc.exec(t.substring(r));return e?(n.W=+e[0],r+e[0].length):-1}function Bt(n,t,r){oc.lastIndex=0;var e=oc.exec(t.substring(r,r+4));return e?(n.y=+e[0],r+e[0].length):-1}function Jt(n,t,r){oc.lastIndex=0;var e=oc.exec(t.substring(r,r+2));return e?(n.y=Gt(+e[0]),r+e[0].length):-1}function Wt(n,t,r){return/^[+-]\d{4}$/.test(t=t.substring(r,r+5))?(n.Z=-t,r+5):-1}function Gt(n){return n+(n>68?1900:2e3)}function Kt(n,t,r){oc.lastIndex=0;var e=oc.exec(t.substring(r,r+2));return e?(n.m=e[0]-1,r+e[0].length):-1}function Qt(n,t,r){oc.lastIndex=0;var e=oc.exec(t.substring(r,r+2));return e?(n.d=+e[0],r+e[0].length):-1}function nr(n,t,r){oc.lastIndex=0;var e=oc.exec(t.substring(r,r+3));return e?(n.j=+e[0],r+e[0].length):-1}function tr(n,t,r){oc.lastIndex=0;var e=oc.exec(t.substring(r,r+2));return e?(n.H=+e[0],r+e[0].length):-1}function rr(n,t,r){oc.lastIndex=0;var e=oc.exec(t.substring(r,r+2));return e?(n.M=+e[0],r+e[0].length):-1}function er(n,t,r){oc.lastIndex=0;var e=oc.exec(t.substring(r,r+2));return e?(n.S=+e[0],r+e[0].length):-1}function ur(n,t,r){oc.lastIndex=0;var e=oc.exec(t.substring(r,r+3));return e?(n.L=+e[0],r+e[0].length):-1}function ir(n){var t=n.getTimezoneOffset(),r=t>0?"-":"+",e=~~(ca(t)/60),u=ca(t)%60;return r+It(e,"0",2)+It(u,"0",2)}function or(n,t,r){ac.lastIndex=0;var e=ac.exec(t.substring(r,r+1));return e?r+e[0].length:-1}function ar(n){for(var t=n.length,r=-1;++r<t;)n[r][0]=this(n[r][0]);return function(t){for(var r=0,e=n[r];!e[1](t);)e=n[++r];return e[0](t)}}function cr(){}function sr(n,t,r){var e=r.s=n+t,u=e-n,i=e-u;r.t=n-i+(t-u)}function lr(n,t){n&&fc.hasOwnProperty(n.type)&&fc[n.type](n,t)}function fr(n,t,r){var e,u=-1,i=n.length-r;for(t.lineStart();++u<i;)e=n[u],t.point(e[0],e[1],e[2]);t.lineEnd()}function hr(n,t){var r=-1,e=n.length;for(t.polygonStart();++r<e;)fr(n[r],t,1);t.polygonEnd()}function gr(){function n(n,t){n*=za,t=t*za/2+ka/4;var r=n-e,o=r>=0?1:-1,a=o*r,c=Math.cos(t),s=Math.sin(t),l=i*s,f=u*c+l*Math.cos(a),h=l*o*Math.sin(a);gc.add(Math.atan2(h,f)),e=n,u=c,i=s}var t,r,e,u,i;pc.point=function(o,a){pc.point=n,e=(t=o)*za,u=Math.cos(a=(r=a)*za/2+ka/4),i=Math.sin(a)},pc.lineEnd=function(){n(t,r)}}function pr(n){var t=n[0],r=n[1],e=Math.cos(r);return[e*Math.cos(t),e*Math.sin(t),Math.sin(r)]}function vr(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function dr(n,t){return[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]]}function mr(n,t){n[0]+=t[0],n[1]+=t[1],n[2]+=t[2]}function yr(n,t){return[n[0]*t,n[1]*t,n[2]*t]}function xr(n){var t=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=t,n[1]/=t,n[2]/=t}function Mr(n){return[Math.atan2(n[1],n[0]),G(n[2])]}function _r(n,t){return ca(n[0]-t[0])<Ca&&ca(n[1]-t[1])<Ca}function br(n,t){n*=za;var r=Math.cos(t*=za);wr(r*Math.cos(n),r*Math.sin(n),Math.sin(t))}function wr(n,t,r){++vc,mc+=(n-mc)/vc,yc+=(t-yc)/vc,xc+=(r-xc)/vc}function Sr(){function n(n,u){n*=za;var i=Math.cos(u*=za),o=i*Math.cos(n),a=i*Math.sin(n),c=Math.sin(u),s=Math.atan2(Math.sqrt((s=r*c-e*a)*s+(s=e*o-t*c)*s+(s=t*a-r*o)*s),t*o+r*a+e*c);dc+=s,Mc+=s*(t+(t=o)),_c+=s*(r+(r=a)),bc+=s*(e+(e=c)),wr(t,r,e)}var t,r,e;Ec.point=function(u,i){u*=za;var o=Math.cos(i*=za);t=o*Math.cos(u),r=o*Math.sin(u),e=Math.sin(i),Ec.point=n,wr(t,r,e)}}function kr(){Ec.point=br}function Er(){function n(n,t){n*=za;var r=Math.cos(t*=za),o=r*Math.cos(n),a=r*Math.sin(n),c=Math.sin(t),s=u*c-i*a,l=i*o-e*c,f=e*a-u*o,h=Math.sqrt(s*s+l*l+f*f),g=e*o+u*a+i*c,p=h&&-W(g)/h,v=Math.atan2(h,g);wc+=p*s,Sc+=p*l,kc+=p*f,dc+=v,Mc+=v*(e+(e=o)),_c+=v*(u+(u=a)),bc+=v*(i+(i=c)),wr(e,u,i)}var t,r,e,u,i;Ec.point=function(o,a){t=o,r=a,Ec.point=n,o*=za;var c=Math.cos(a*=za);e=c*Math.cos(o),u=c*Math.sin(o),i=Math.sin(a),wr(e,u,i)},Ec.lineEnd=function(){n(t,r),Ec.lineEnd=kr,Ec.point=br}}function Ar(){return!0}function Cr(n,t,r,e,u){var i=[],o=[];if(n.forEach(function(n){if(!((t=n.length-1)<=0)){var t,r=n[0],e=n[t];if(_r(r,e)){u.lineStart();for(var a=0;t>a;++a)u.point((r=n[a])[0],r[1]);return u.lineEnd(),void 0}var c=new zr(r,n,null,!0),s=new zr(r,null,c,!1);c.o=s,i.push(c),o.push(s),c=new zr(e,n,null,!1),s=new zr(e,null,c,!0),c.o=s,i.push(c),o.push(s)}}),o.sort(t),Nr(i),Nr(o),i.length){for(var a=0,c=r,s=o.length;s>a;++a)o[a].e=c=!c;for(var l,f,h=i[0];;){for(var g=h,p=!0;g.v;)if((g=g.n)===h)return;l=g.z,u.lineStart();do{if(g.v=g.o.v=!0,g.e){if(p)for(var a=0,s=l.length;s>a;++a)u.point((f=l[a])[0],f[1]);else e(g.x,g.n.x,1,u);g=g.n}else{if(p){l=g.p.z;for(var a=l.length-1;a>=0;--a)u.point((f=l[a])[0],f[1])}else e(g.x,g.p.x,-1,u);g=g.p}g=g.o,l=g.z,p=!p}while(!g.v);u.lineEnd()}}}function Nr(n){if(t=n.length){for(var t,r,e=0,u=n[0];++e<t;)u.n=r=n[e],r.p=u,u=r;u.n=r=n[0],r.p=u}}function zr(n,t,r,e){this.x=n,this.z=t,this.o=r,this.e=e,this.v=!1,this.n=this.p=null}function Lr(n,t,r,e){return function(u,i){function o(t,r){var e=u(t,r);n(t=e[0],r=e[1])&&i.point(t,r)}function a(n,t){var r=u(n,t);d.point(r[0],r[1])}function c(){y.point=a,d.lineStart()}function s(){y.point=o,d.lineEnd()}function l(n,t){v.push([n,t]);var r=u(n,t);M.point(r[0],r[1])}function f(){M.lineStart(),v=[]}function h(){l(v[0][0],v[0][1]),M.lineEnd();var n,t=M.clean(),r=x.buffer(),e=r.length;if(v.pop(),p.push(v),v=null,e)if(1&t){n=r[0];var u,e=n.length-1,o=-1;if(e>0){for(_||(i.polygonStart(),_=!0),i.lineStart();++o<e;)i.point((u=n[o])[0],u[1]);i.lineEnd()}}else e>1&&2&t&&r.push(r.pop().concat(r.shift())),g.push(r.filter(Tr))}var g,p,v,d=t(i),m=u.invert(e[0],e[1]),y={point:o,lineStart:c,lineEnd:s,polygonStart:function(){y.point=l,y.lineStart=f,y.lineEnd=h,g=[],p=[]},polygonEnd:function(){y.point=o,y.lineStart=c,y.lineEnd=s,g=Bo.merge(g);var n=Dr(m,p);g.length?(_||(i.polygonStart(),_=!0),Cr(g,Rr,n,r,i)):n&&(_||(i.polygonStart(),_=!0),i.lineStart(),r(null,null,1,i),i.lineEnd()),_&&(i.polygonEnd(),_=!1),g=p=null},sphere:function(){i.polygonStart(),i.lineStart(),r(null,null,1,i),i.lineEnd(),i.polygonEnd()}},x=qr(),M=t(x),_=!1;return y}}function Tr(n){return n.length>1}function qr(){var n,t=[];return{lineStart:function(){t.push(n=[])},point:function(t,r){n.push([t,r])},lineEnd:v,buffer:function(){var r=t;return t=[],n=null,r},rejoin:function(){t.length>1&&t.push(t.pop().concat(t.shift()))}}}function Rr(n,t){return((n=n.x)[0]<0?n[1]-Aa-Ca:Aa-n[1])-((t=t.x)[0]<0?t[1]-Aa-Ca:Aa-t[1])}function Dr(n,t){var r=n[0],e=n[1],u=[Math.sin(r),-Math.cos(r),0],i=0,o=0;gc.reset();for(var a=0,c=t.length;c>a;++a){var s=t[a],l=s.length;if(l)for(var f=s[0],h=f[0],g=f[1]/2+ka/4,p=Math.sin(g),v=Math.cos(g),d=1;;){d===l&&(d=0),n=s[d];var m=n[0],y=n[1]/2+ka/4,x=Math.sin(y),M=Math.cos(y),_=m-h,b=_>=0?1:-1,w=b*_,S=w>ka,k=p*x;if(gc.add(Math.atan2(k*b*Math.sin(w),v*M+k*Math.cos(w))),i+=S?_+b*Ea:_,S^h>=r^m>=r){var E=dr(pr(f),pr(n));xr(E);var A=dr(u,E);xr(A);var C=(S^_>=0?-1:1)*G(A[2]);(e>C||e===C&&(E[0]||E[1]))&&(o+=S^_>=0?1:-1)}if(!d++)break;h=m,p=x,v=M,f=n}}return(-Ca>i||Ca>i&&0>gc)^1&o}function Pr(n){var t,r=0/0,e=0/0,u=0/0;return{lineStart:function(){n.lineStart(),t=1},point:function(i,o){var a=i>0?ka:-ka,c=ca(i-r);ca(c-ka)<Ca?(n.point(r,e=(e+o)/2>0?Aa:-Aa),n.point(u,e),n.lineEnd(),n.lineStart(),n.point(a,e),n.point(i,e),t=0):u!==a&&c>=ka&&(ca(r-u)<Ca&&(r-=u*Ca),ca(i-a)<Ca&&(i-=a*Ca),e=Ur(r,e,i,o),n.point(u,e),n.lineEnd(),n.lineStart(),n.point(a,e),t=0),n.point(r=i,e=o),u=a},lineEnd:function(){n.lineEnd(),r=e=0/0},clean:function(){return 2-t}}}function Ur(n,t,r,e){var u,i,o=Math.sin(n-r);return ca(o)>Ca?Math.atan((Math.sin(t)*(i=Math.cos(e))*Math.sin(r)-Math.sin(e)*(u=Math.cos(t))*Math.sin(n))/(u*i*o)):(t+e)/2}function jr(n,t,r,e){var u;if(null==n)u=r*Aa,e.point(-ka,u),e.point(0,u),e.point(ka,u),e.point(ka,0),e.point(ka,-u),e.point(0,-u),e.point(-ka,-u),e.point(-ka,0),e.point(-ka,u);else if(ca(n[0]-t[0])>Ca){var i=n[0]<t[0]?ka:-ka;u=r*i/2,e.point(-i,u),e.point(0,u),e.point(i,u)}else e.point(t[0],t[1])}function Hr(n){function t(n,t){return Math.cos(n)*Math.cos(t)>i}function r(n){var r,i,c,s,l;return{lineStart:function(){s=c=!1,l=1},point:function(f,h){var g,p=[f,h],v=t(f,h),d=o?v?0:u(f,h):v?u(f+(0>f?ka:-ka),h):0;if(!r&&(s=c=v)&&n.lineStart(),v!==c&&(g=e(r,p),(_r(r,g)||_r(p,g))&&(p[0]+=Ca,p[1]+=Ca,v=t(p[0],p[1]))),v!==c)l=0,v?(n.lineStart(),g=e(p,r),n.point(g[0],g[1])):(g=e(r,p),n.point(g[0],g[1]),n.lineEnd()),r=g;else if(a&&r&&o^v){var m;d&i||!(m=e(p,r,!0))||(l=0,o?(n.lineStart(),n.point(m[0][0],m[0][1]),n.point(m[1][0],m[1][1]),n.lineEnd()):(n.point(m[1][0],m[1][1]),n.lineEnd(),n.lineStart(),n.point(m[0][0],m[0][1])))}!v||r&&_r(r,p)||n.point(p[0],p[1]),r=p,c=v,i=d},lineEnd:function(){c&&n.lineEnd(),r=null},clean:function(){return l|(s&&c)<<1}}}function e(n,t,r){var e=pr(n),u=pr(t),o=[1,0,0],a=dr(e,u),c=vr(a,a),s=a[0],l=c-s*s;if(!l)return!r&&n;var f=i*c/l,h=-i*s/l,g=dr(o,a),p=yr(o,f),v=yr(a,h);mr(p,v);var d=g,m=vr(p,d),y=vr(d,d),x=m*m-y*(vr(p,p)-1);if(!(0>x)){var M=Math.sqrt(x),_=yr(d,(-m-M)/y);if(mr(_,p),_=Mr(_),!r)return _;var b,w=n[0],S=t[0],k=n[1],E=t[1];w>S&&(b=w,w=S,S=b);var A=S-w,C=ca(A-ka)<Ca,N=C||Ca>A;if(!C&&k>E&&(b=k,k=E,E=b),N?C?k+E>0^_[1]<(ca(_[0]-w)<Ca?k:E):k<=_[1]&&_[1]<=E:A>ka^(w<=_[0]&&_[0]<=S)){var z=yr(d,(-m+M)/y);return mr(z,p),[_,Mr(z)]}}}function u(t,r){var e=o?n:ka-n,u=0;return-e>t?u|=1:t>e&&(u|=2),-e>r?u|=4:r>e&&(u|=8),u}var i=Math.cos(n),o=i>0,a=ca(i)>Ca,c=ge(n,6*za);return Lr(t,r,c,o?[0,-n]:[-ka,n-ka])}function Fr(n,t,r,e){return function(u){var i,o=u.a,a=u.b,c=o.x,s=o.y,l=a.x,f=a.y,h=0,g=1,p=l-c,v=f-s;if(i=n-c,p||!(i>0)){if(i/=p,0>p){if(h>i)return;g>i&&(g=i)}else if(p>0){if(i>g)return;i>h&&(h=i)}if(i=r-c,p||!(0>i)){if(i/=p,0>p){if(i>g)return;i>h&&(h=i)}else if(p>0){if(h>i)return;g>i&&(g=i)}if(i=t-s,v||!(i>0)){if(i/=v,0>v){if(h>i)return;g>i&&(g=i)}else if(v>0){if(i>g)return;i>h&&(h=i)}if(i=e-s,v||!(0>i)){if(i/=v,0>v){if(i>g)return;i>h&&(h=i)}else if(v>0){if(h>i)return;g>i&&(g=i)}return h>0&&(u.a={x:c+h*p,y:s+h*v}),1>g&&(u.b={x:c+g*p,y:s+g*v}),u}}}}}}function Or(n,t,r,e){function u(e,u){return ca(e[0]-n)<Ca?u>0?0:3:ca(e[0]-r)<Ca?u>0?2:1:ca(e[1]-t)<Ca?u>0?1:0:u>0?3:2}function i(n,t){return o(n.x,t.x)}function o(n,t){var r=u(n,1),e=u(t,1);return r!==e?r-e:0===r?t[1]-n[1]:1===r?n[0]-t[0]:2===r?n[1]-t[1]:t[0]-n[0]}return function(a){function c(n){for(var t=0,r=d.length,e=n[1],u=0;r>u;++u)for(var i,o=1,a=d[u],c=a.length,s=a[0];c>o;++o)i=a[o],s[1]<=e?i[1]>e&&J(s,i,n)>0&&++t:i[1]<=e&&J(s,i,n)<0&&--t,s=i;return 0!==t}function s(i,a,c,s){var l=0,f=0;if(null==i||(l=u(i,c))!==(f=u(a,c))||o(i,a)<0^c>0){do s.point(0===l||3===l?n:r,l>1?e:t);while((l=(l+c+4)%4)!==f)}else s.point(a[0],a[1])}function l(u,i){return u>=n&&r>=u&&i>=t&&e>=i}function f(n,t){l(n,t)&&a.point(n,t)}function h(){N.point=p,d&&d.push(m=[]),S=!0,w=!1,_=b=0/0}function g(){v&&(p(y,x),M&&w&&A.rejoin(),v.push(A.buffer())),N.point=f,w&&a.lineEnd()}function p(n,t){n=Math.max(-Cc,Math.min(Cc,n)),t=Math.max(-Cc,Math.min(Cc,t));var r=l(n,t);if(d&&m.push([n,t]),S)y=n,x=t,M=r,S=!1,r&&(a.lineStart(),a.point(n,t));else if(r&&w)a.point(n,t);else{var e={a:{x:_,y:b},b:{x:n,y:t}};C(e)?(w||(a.lineStart(),a.point(e.a.x,e.a.y)),a.point(e.b.x,e.b.y),r||a.lineEnd(),k=!1):r&&(a.lineStart(),a.point(n,t),k=!1)}_=n,b=t,w=r}var v,d,m,y,x,M,_,b,w,S,k,E=a,A=qr(),C=Fr(n,t,r,e),N={point:f,lineStart:h,lineEnd:g,polygonStart:function(){a=A,v=[],d=[],k=!0},polygonEnd:function(){a=E,v=Bo.merge(v);var t=c([n,e]),r=k&&t,u=v.length;(r||u)&&(a.polygonStart(),r&&(a.lineStart(),s(null,null,1,a),a.lineEnd()),u&&Cr(v,i,t,s,a),a.polygonEnd()),v=d=m=null}};return N}}function Ir(n,t){function r(r,e){return r=n(r,e),t(r[0],r[1])}return n.invert&&t.invert&&(r.invert=function(r,e){return r=t.invert(r,e),r&&n.invert(r[0],r[1])}),r}function Yr(n){var t=0,r=ka/3,e=ie(n),u=e(t,r);return u.parallels=function(n){return arguments.length?e(t=n[0]*ka/180,r=n[1]*ka/180):[180*(t/ka),180*(r/ka)]},u}function Zr(n,t){function r(n,t){var r=Math.sqrt(i-2*u*Math.sin(t))/u;return[r*Math.sin(n*=u),o-r*Math.cos(n)]}var e=Math.sin(n),u=(e+Math.sin(t))/2,i=1+e*(2*u-e),o=Math.sqrt(i)/u;return r.invert=function(n,t){var r=o-t;return[Math.atan2(n,r)/u,G((i-(n*n+r*r)*u*u)/(2*u))]},r}function Vr(){function n(n,t){zc+=u*n-e*t,e=n,u=t}var t,r,e,u;Dc.point=function(i,o){Dc.point=n,t=e=i,r=u=o},Dc.lineEnd=function(){n(t,r)}}function $r(n,t){Lc>n&&(Lc=n),n>qc&&(qc=n),Tc>t&&(Tc=t),t>Rc&&(Rc=t)}function Xr(){function n(n,t){o.push("M",n,",",t,i)}function t(n,t){o.push("M",n,",",t),a.point=r}function r(n,t){o.push("L",n,",",t)}function e(){a.point=n}function u(){o.push("Z")}var i=Br(4.5),o=[],a={point:n,lineStart:function(){a.point=t},lineEnd:e,polygonStart:function(){a.lineEnd=u},polygonEnd:function(){a.lineEnd=e,a.point=n},pointRadius:function(n){return i=Br(n),a},result:function(){if(o.length){var n=o.join("");return o=[],n}}};return a}function Br(n){return"m0,"+n+"a"+n+","+n+" 0 1,1 0,"+-2*n+"a"+n+","+n+" 0 1,1 0,"+2*n+"z"}function Jr(n,t){mc+=n,yc+=t,++xc}function Wr(){function n(n,e){var u=n-t,i=e-r,o=Math.sqrt(u*u+i*i);Mc+=o*(t+n)/2,_c+=o*(r+e)/2,bc+=o,Jr(t=n,r=e)}var t,r;Uc.point=function(e,u){Uc.point=n,Jr(t=e,r=u)}}function Gr(){Uc.point=Jr}function Kr(){function n(n,t){var r=n-e,i=t-u,o=Math.sqrt(r*r+i*i);Mc+=o*(e+n)/2,_c+=o*(u+t)/2,bc+=o,o=u*n-e*t,wc+=o*(e+n),Sc+=o*(u+t),kc+=3*o,Jr(e=n,u=t)}var t,r,e,u;Uc.point=function(i,o){Uc.point=n,Jr(t=e=i,r=u=o)},Uc.lineEnd=function(){n(t,r)}}function Qr(n){function t(t,r){n.moveTo(t,r),n.arc(t,r,o,0,Ea)}function r(t,r){n.moveTo(t,r),a.point=e}function e(t,r){n.lineTo(t,r)}function u(){a.point=t}function i(){n.closePath()}var o=4.5,a={point:t,lineStart:function(){a.point=r},lineEnd:u,polygonStart:function(){a.lineEnd=i},polygonEnd:function(){a.lineEnd=u,a.point=t},pointRadius:function(n){return o=n,a},result:v};return a}function ne(n){function t(n){return(a?e:r)(n)}function r(t){return ee(t,function(r,e){r=n(r,e),t.point(r[0],r[1])})}function e(t){function r(r,e){r=n(r,e),t.point(r[0],r[1])}function e(){x=0/0,S.point=i,t.lineStart()}function i(r,e){var i=pr([r,e]),o=n(r,e);u(x,M,y,_,b,w,x=o[0],M=o[1],y=r,_=i[0],b=i[1],w=i[2],a,t),t.point(x,M)}function o(){S.point=r,t.lineEnd()}function c(){e(),S.point=s,S.lineEnd=l}function s(n,t){i(f=n,h=t),g=x,p=M,v=_,d=b,m=w,S.point=i}function l(){u(x,M,y,_,b,w,g,p,f,v,d,m,a,t),S.lineEnd=o,o()}var f,h,g,p,v,d,m,y,x,M,_,b,w,S={point:r,lineStart:e,lineEnd:o,polygonStart:function(){t.polygonStart(),S.lineStart=c},polygonEnd:function(){t.polygonEnd(),S.lineStart=e}};return S}function u(t,r,e,a,c,s,l,f,h,g,p,v,d,m){var y=l-t,x=f-r,M=y*y+x*x;if(M>4*i&&d--){var _=a+g,b=c+p,w=s+v,S=Math.sqrt(_*_+b*b+w*w),k=Math.asin(w/=S),E=ca(ca(w)-1)<Ca||ca(e-h)<Ca?(e+h)/2:Math.atan2(b,_),A=n(E,k),C=A[0],N=A[1],z=C-t,L=N-r,T=x*z-y*L;(T*T/M>i||ca((y*z+x*L)/M-.5)>.3||o>a*g+c*p+s*v)&&(u(t,r,e,a,c,s,C,N,E,_/=S,b/=S,w,d,m),m.point(C,N),u(C,N,E,_,b,w,l,f,h,g,p,v,d,m))}}var i=.5,o=Math.cos(30*za),a=16;return t.precision=function(n){return arguments.length?(a=(i=n*n)>0&&16,t):Math.sqrt(i)},t}function te(n){var t=ne(function(t,r){return n([t*La,r*La])});return function(n){return oe(t(n))}}function re(n){this.stream=n}function ee(n,t){return{point:t,sphere:function(){n.sphere()},lineStart:function(){n.lineStart()},lineEnd:function(){n.lineEnd()},polygonStart:function(){n.polygonStart()},polygonEnd:function(){n.polygonEnd()}}}function ue(n){return ie(function(){return n})()}function ie(n){function t(n){return n=a(n[0]*za,n[1]*za),[n[0]*h+c,s-n[1]*h]}function r(n){return n=a.invert((n[0]-c)/h,(s-n[1])/h),n&&[n[0]*La,n[1]*La]}function e(){a=Ir(o=se(m,y,x),i);var n=i(v,d);return c=g-n[0]*h,s=p+n[1]*h,u()
}function u(){return l&&(l.valid=!1,l=null),t}var i,o,a,c,s,l,f=ne(function(n,t){return n=i(n,t),[n[0]*h+c,s-n[1]*h]}),h=150,g=480,p=250,v=0,d=0,m=0,y=0,x=0,M=Ac,_=At,b=null,w=null;return t.stream=function(n){return l&&(l.valid=!1),l=oe(M(o,f(_(n)))),l.valid=!0,l},t.clipAngle=function(n){return arguments.length?(M=null==n?(b=n,Ac):Hr((b=+n)*za),u()):b},t.clipExtent=function(n){return arguments.length?(w=n,_=n?Or(n[0][0],n[0][1],n[1][0],n[1][1]):At,u()):w},t.scale=function(n){return arguments.length?(h=+n,e()):h},t.translate=function(n){return arguments.length?(g=+n[0],p=+n[1],e()):[g,p]},t.center=function(n){return arguments.length?(v=n[0]%360*za,d=n[1]%360*za,e()):[v*La,d*La]},t.rotate=function(n){return arguments.length?(m=n[0]%360*za,y=n[1]%360*za,x=n.length>2?n[2]%360*za:0,e()):[m*La,y*La,x*La]},Bo.rebind(t,f,"precision"),function(){return i=n.apply(this,arguments),t.invert=i.invert&&r,e()}}function oe(n){return ee(n,function(t,r){n.point(t*za,r*za)})}function ae(n,t){return[n,t]}function ce(n,t){return[n>ka?n-Ea:-ka>n?n+Ea:n,t]}function se(n,t,r){return n?t||r?Ir(fe(n),he(t,r)):fe(n):t||r?he(t,r):ce}function le(n){return function(t,r){return t+=n,[t>ka?t-Ea:-ka>t?t+Ea:t,r]}}function fe(n){var t=le(n);return t.invert=le(-n),t}function he(n,t){function r(n,t){var r=Math.cos(t),a=Math.cos(n)*r,c=Math.sin(n)*r,s=Math.sin(t),l=s*e+a*u;return[Math.atan2(c*i-l*o,a*e-s*u),G(l*i+c*o)]}var e=Math.cos(n),u=Math.sin(n),i=Math.cos(t),o=Math.sin(t);return r.invert=function(n,t){var r=Math.cos(t),a=Math.cos(n)*r,c=Math.sin(n)*r,s=Math.sin(t),l=s*i-c*o;return[Math.atan2(c*i+s*o,a*e+l*u),G(l*e-a*u)]},r}function ge(n,t){var r=Math.cos(n),e=Math.sin(n);return function(u,i,o,a){var c=o*t;null!=u?(u=pe(r,u),i=pe(r,i),(o>0?i>u:u>i)&&(u+=o*Ea)):(u=n+o*Ea,i=n-.5*c);for(var s,l=u;o>0?l>i:i>l;l-=c)a.point((s=Mr([r,-e*Math.cos(l),-e*Math.sin(l)]))[0],s[1])}}function pe(n,t){var r=pr(t);r[0]-=n,xr(r);var e=W(-r[1]);return((-r[2]<0?-e:e)+2*Math.PI-Ca)%(2*Math.PI)}function ve(n,t,r){var e=Bo.range(n,t-Ca,r).concat(t);return function(n){return e.map(function(t){return[n,t]})}}function de(n,t,r){var e=Bo.range(n,t-Ca,r).concat(t);return function(n){return e.map(function(t){return[t,n]})}}function me(n){return n.source}function ye(n){return n.target}function xe(n,t,r,e){var u=Math.cos(t),i=Math.sin(t),o=Math.cos(e),a=Math.sin(e),c=u*Math.cos(n),s=u*Math.sin(n),l=o*Math.cos(r),f=o*Math.sin(r),h=2*Math.asin(Math.sqrt(tt(e-t)+u*o*tt(r-n))),g=1/Math.sin(h),p=h?function(n){var t=Math.sin(n*=h)*g,r=Math.sin(h-n)*g,e=r*c+t*l,u=r*s+t*f,o=r*i+t*a;return[Math.atan2(u,e)*La,Math.atan2(o,Math.sqrt(e*e+u*u))*La]}:function(){return[n*La,t*La]};return p.distance=h,p}function Me(){function n(n,u){var i=Math.sin(u*=za),o=Math.cos(u),a=ca((n*=za)-t),c=Math.cos(a);jc+=Math.atan2(Math.sqrt((a=o*Math.sin(a))*a+(a=e*i-r*o*c)*a),r*i+e*o*c),t=n,r=i,e=o}var t,r,e;Hc.point=function(u,i){t=u*za,r=Math.sin(i*=za),e=Math.cos(i),Hc.point=n},Hc.lineEnd=function(){Hc.point=Hc.lineEnd=v}}function _e(n,t){function r(t,r){var e=Math.cos(t),u=Math.cos(r),i=n(e*u);return[i*u*Math.sin(t),i*Math.sin(r)]}return r.invert=function(n,r){var e=Math.sqrt(n*n+r*r),u=t(e),i=Math.sin(u),o=Math.cos(u);return[Math.atan2(n*i,e*o),Math.asin(e&&r*i/e)]},r}function be(n,t){function r(n,t){o>0?-Aa+Ca>t&&(t=-Aa+Ca):t>Aa-Ca&&(t=Aa-Ca);var r=o/Math.pow(u(t),i);return[r*Math.sin(i*n),o-r*Math.cos(i*n)]}var e=Math.cos(n),u=function(n){return Math.tan(ka/4+n/2)},i=n===t?Math.sin(n):Math.log(e/Math.cos(t))/Math.log(u(t)/u(n)),o=e*Math.pow(u(n),i)/i;return i?(r.invert=function(n,t){var r=o-t,e=B(i)*Math.sqrt(n*n+r*r);return[Math.atan2(n,r)/i,2*Math.atan(Math.pow(o/e,1/i))-Aa]},r):Se}function we(n,t){function r(n,t){var r=i-t;return[r*Math.sin(u*n),i-r*Math.cos(u*n)]}var e=Math.cos(n),u=n===t?Math.sin(n):(e-Math.cos(t))/(t-n),i=e/u+n;return ca(u)<Ca?ae:(r.invert=function(n,t){var r=i-t;return[Math.atan2(n,r)/u,i-B(u)*Math.sqrt(n*n+r*r)]},r)}function Se(n,t){return[n,Math.log(Math.tan(ka/4+t/2))]}function ke(n){var t,r=ue(n),e=r.scale,u=r.translate,i=r.clipExtent;return r.scale=function(){var n=e.apply(r,arguments);return n===r?t?r.clipExtent(null):r:n},r.translate=function(){var n=u.apply(r,arguments);return n===r?t?r.clipExtent(null):r:n},r.clipExtent=function(n){var o=i.apply(r,arguments);if(o===r){if(t=null==n){var a=ka*e(),c=u();i([[c[0]-a,c[1]-a],[c[0]+a,c[1]+a]])}}else t&&(o=null);return o},r.clipExtent(null)}function Ee(n,t){return[Math.log(Math.tan(ka/4+t/2)),-n]}function Ae(n){return n[0]}function Ce(n){return n[1]}function Ne(n){for(var t=n.length,r=[0,1],e=2,u=2;t>u;u++){for(;e>1&&J(n[r[e-2]],n[r[e-1]],n[u])<=0;)--e;r[e++]=u}return r.slice(0,e)}function ze(n,t){return n[0]-t[0]||n[1]-t[1]}function Le(n,t,r){return(r[0]-t[0])*(n[1]-t[1])<(r[1]-t[1])*(n[0]-t[0])}function Te(n,t,r,e){var u=n[0],i=r[0],o=t[0]-u,a=e[0]-i,c=n[1],s=r[1],l=t[1]-c,f=e[1]-s,h=(a*(c-s)-f*(u-i))/(f*o-a*l);return[u+h*o,c+h*l]}function qe(n){var t=n[0],r=n[n.length-1];return!(t[0]-r[0]||t[1]-r[1])}function Re(){tu(this),this.edge=this.site=this.circle=null}function De(n){var t=Gc.pop()||new Re;return t.site=n,t}function Pe(n){$e(n),Bc.remove(n),Gc.push(n),tu(n)}function Ue(n){var t=n.circle,r=t.x,e=t.cy,u={x:r,y:e},i=n.P,o=n.N,a=[n];Pe(n);for(var c=i;c.circle&&ca(r-c.circle.x)<Ca&&ca(e-c.circle.cy)<Ca;)i=c.P,a.unshift(c),Pe(c),c=i;a.unshift(c),$e(c);for(var s=o;s.circle&&ca(r-s.circle.x)<Ca&&ca(e-s.circle.cy)<Ca;)o=s.N,a.push(s),Pe(s),s=o;a.push(s),$e(s);var l,f=a.length;for(l=1;f>l;++l)s=a[l],c=a[l-1],Ke(s.edge,c.site,s.site,u);c=a[0],s=a[f-1],s.edge=We(c.site,s.site,null,u),Ve(c),Ve(s)}function je(n){for(var t,r,e,u,i=n.x,o=n.y,a=Bc._;a;)if(e=He(a,o)-i,e>Ca)a=a.L;else{if(u=i-Fe(a,o),!(u>Ca)){e>-Ca?(t=a.P,r=a):u>-Ca?(t=a,r=a.N):t=r=a;break}if(!a.R){t=a;break}a=a.R}var c=De(n);if(Bc.insert(t,c),t||r){if(t===r)return $e(t),r=De(t.site),Bc.insert(c,r),c.edge=r.edge=We(t.site,c.site),Ve(t),Ve(r),void 0;if(!r)return c.edge=We(t.site,c.site),void 0;$e(t),$e(r);var s=t.site,l=s.x,f=s.y,h=n.x-l,g=n.y-f,p=r.site,v=p.x-l,d=p.y-f,m=2*(h*d-g*v),y=h*h+g*g,x=v*v+d*d,M={x:(d*y-g*x)/m+l,y:(h*x-v*y)/m+f};Ke(r.edge,s,p,M),c.edge=We(s,n,null,M),r.edge=We(n,p,null,M),Ve(t),Ve(r)}}function He(n,t){var r=n.site,e=r.x,u=r.y,i=u-t;if(!i)return e;var o=n.P;if(!o)return-1/0;r=o.site;var a=r.x,c=r.y,s=c-t;if(!s)return a;var l=a-e,f=1/i-1/s,h=l/s;return f?(-h+Math.sqrt(h*h-2*f*(l*l/(-2*s)-c+s/2+u-i/2)))/f+e:(e+a)/2}function Fe(n,t){var r=n.N;if(r)return He(r,t);var e=n.site;return e.y===t?e.x:1/0}function Oe(n){this.site=n,this.edges=[]}function Ie(n){for(var t,r,e,u,i,o,a,c,s,l,f=n[0][0],h=n[1][0],g=n[0][1],p=n[1][1],v=Xc,d=v.length;d--;)if(i=v[d],i&&i.prepare())for(a=i.edges,c=a.length,o=0;c>o;)l=a[o].end(),e=l.x,u=l.y,s=a[++o%c].start(),t=s.x,r=s.y,(ca(e-t)>Ca||ca(u-r)>Ca)&&(a.splice(o,0,new Qe(Ge(i.site,l,ca(e-f)<Ca&&p-u>Ca?{x:f,y:ca(t-f)<Ca?r:p}:ca(u-p)<Ca&&h-e>Ca?{x:ca(r-p)<Ca?t:h,y:p}:ca(e-h)<Ca&&u-g>Ca?{x:h,y:ca(t-h)<Ca?r:g}:ca(u-g)<Ca&&e-f>Ca?{x:ca(r-g)<Ca?t:f,y:g}:null),i.site,null)),++c)}function Ye(n,t){return t.angle-n.angle}function Ze(){tu(this),this.x=this.y=this.arc=this.site=this.cy=null}function Ve(n){var t=n.P,r=n.N;if(t&&r){var e=t.site,u=n.site,i=r.site;if(e!==i){var o=u.x,a=u.y,c=e.x-o,s=e.y-a,l=i.x-o,f=i.y-a,h=2*(c*f-s*l);if(!(h>=-Na)){var g=c*c+s*s,p=l*l+f*f,v=(f*g-s*p)/h,d=(c*p-l*g)/h,f=d+a,m=Kc.pop()||new Ze;m.arc=n,m.site=u,m.x=v+o,m.y=f+Math.sqrt(v*v+d*d),m.cy=f,n.circle=m;for(var y=null,x=Wc._;x;)if(m.y<x.y||m.y===x.y&&m.x<=x.x){if(!x.L){y=x.P;break}x=x.L}else{if(!x.R){y=x;break}x=x.R}Wc.insert(y,m),y||(Jc=m)}}}}function $e(n){var t=n.circle;t&&(t.P||(Jc=t.N),Wc.remove(t),Kc.push(t),tu(t),n.circle=null)}function Xe(n){for(var t,r=$c,e=Fr(n[0][0],n[0][1],n[1][0],n[1][1]),u=r.length;u--;)t=r[u],(!Be(t,n)||!e(t)||ca(t.a.x-t.b.x)<Ca&&ca(t.a.y-t.b.y)<Ca)&&(t.a=t.b=null,r.splice(u,1))}function Be(n,t){var r=n.b;if(r)return!0;var e,u,i=n.a,o=t[0][0],a=t[1][0],c=t[0][1],s=t[1][1],l=n.l,f=n.r,h=l.x,g=l.y,p=f.x,v=f.y,d=(h+p)/2,m=(g+v)/2;if(v===g){if(o>d||d>=a)return;if(h>p){if(i){if(i.y>=s)return}else i={x:d,y:c};r={x:d,y:s}}else{if(i){if(i.y<c)return}else i={x:d,y:s};r={x:d,y:c}}}else if(e=(h-p)/(v-g),u=m-e*d,-1>e||e>1)if(h>p){if(i){if(i.y>=s)return}else i={x:(c-u)/e,y:c};r={x:(s-u)/e,y:s}}else{if(i){if(i.y<c)return}else i={x:(s-u)/e,y:s};r={x:(c-u)/e,y:c}}else if(v>g){if(i){if(i.x>=a)return}else i={x:o,y:e*o+u};r={x:a,y:e*a+u}}else{if(i){if(i.x<o)return}else i={x:a,y:e*a+u};r={x:o,y:e*o+u}}return n.a=i,n.b=r,!0}function Je(n,t){this.l=n,this.r=t,this.a=this.b=null}function We(n,t,r,e){var u=new Je(n,t);return $c.push(u),r&&Ke(u,n,t,r),e&&Ke(u,t,n,e),Xc[n.i].edges.push(new Qe(u,n,t)),Xc[t.i].edges.push(new Qe(u,t,n)),u}function Ge(n,t,r){var e=new Je(n,null);return e.a=t,e.b=r,$c.push(e),e}function Ke(n,t,r,e){n.a||n.b?n.l===r?n.b=e:n.a=e:(n.a=e,n.l=t,n.r=r)}function Qe(n,t,r){var e=n.a,u=n.b;this.edge=n,this.site=t,this.angle=r?Math.atan2(r.y-t.y,r.x-t.x):n.l===t?Math.atan2(u.x-e.x,e.y-u.y):Math.atan2(e.x-u.x,u.y-e.y)}function nu(){this._=null}function tu(n){n.U=n.C=n.L=n.R=n.P=n.N=null}function ru(n,t){var r=t,e=t.R,u=r.U;u?u.L===r?u.L=e:u.R=e:n._=e,e.U=u,r.U=e,r.R=e.L,r.R&&(r.R.U=r),e.L=r}function eu(n,t){var r=t,e=t.L,u=r.U;u?u.L===r?u.L=e:u.R=e:n._=e,e.U=u,r.U=e,r.L=e.R,r.L&&(r.L.U=r),e.R=r}function uu(n){for(;n.L;)n=n.L;return n}function iu(n,t){var r,e,u,i=n.sort(ou).pop();for($c=[],Xc=new Array(n.length),Bc=new nu,Wc=new nu;;)if(u=Jc,i&&(!u||i.y<u.y||i.y===u.y&&i.x<u.x))(i.x!==r||i.y!==e)&&(Xc[i.i]=new Oe(i),je(i),r=i.x,e=i.y),i=n.pop();else{if(!u)break;Ue(u.arc)}t&&(Xe(t),Ie(t));var o={cells:Xc,edges:$c};return Bc=Wc=$c=Xc=null,o}function ou(n,t){return t.y-n.y||t.x-n.x}function au(n,t,r){return(n.x-r.x)*(t.y-n.y)-(n.x-t.x)*(r.y-n.y)}function cu(n){return n.x}function su(n){return n.y}function lu(){return{leaf:!0,nodes:[],point:null,x:null,y:null}}function fu(n,t,r,e,u,i){if(!n(t,r,e,u,i)){var o=.5*(r+u),a=.5*(e+i),c=t.nodes;c[0]&&fu(n,c[0],r,e,o,a),c[1]&&fu(n,c[1],o,e,u,a),c[2]&&fu(n,c[2],r,a,o,i),c[3]&&fu(n,c[3],o,a,u,i)}}function hu(n,t){n=Bo.rgb(n),t=Bo.rgb(t);var r=n.r,e=n.g,u=n.b,i=t.r-r,o=t.g-e,a=t.b-u;return function(n){return"#"+Mt(Math.round(r+i*n))+Mt(Math.round(e+o*n))+Mt(Math.round(u+a*n))}}function gu(n,t){var r,e={},u={};for(r in n)r in t?e[r]=du(n[r],t[r]):u[r]=n[r];for(r in t)r in n||(u[r]=t[r]);return function(n){for(r in e)u[r]=e[r](n);return u}}function pu(n,t){return t-=n=+n,function(r){return n+t*r}}function vu(n,t){var r,e,u,i=ns.lastIndex=ts.lastIndex=0,o=-1,a=[],c=[];for(n+="",t+="";(r=ns.exec(n))&&(e=ts.exec(t));)(u=e.index)>i&&(u=t.substring(i,u),a[o]?a[o]+=u:a[++o]=u),(r=r[0])===(e=e[0])?a[o]?a[o]+=e:a[++o]=e:(a[++o]=null,c.push({i:o,x:pu(r,e)})),i=ts.lastIndex;return i<t.length&&(u=t.substring(i),a[o]?a[o]+=u:a[++o]=u),a.length<2?c[0]?(t=c[0].x,function(n){return t(n)+""}):function(){return t}:(t=c.length,function(n){for(var r,e=0;t>e;++e)a[(r=c[e]).i]=r.x(n);return a.join("")})}function du(n,t){for(var r,e=Bo.interpolators.length;--e>=0&&!(r=Bo.interpolators[e](n,t)););return r}function mu(n,t){var r,e=[],u=[],i=n.length,o=t.length,a=Math.min(n.length,t.length);for(r=0;a>r;++r)e.push(du(n[r],t[r]));for(;i>r;++r)u[r]=n[r];for(;o>r;++r)u[r]=t[r];return function(n){for(r=0;a>r;++r)u[r]=e[r](n);return u}}function yu(n){return function(t){return 0>=t?0:t>=1?1:n(t)}}function xu(n){return function(t){return 1-n(1-t)}}function Mu(n){return function(t){return.5*(.5>t?n(2*t):2-n(2-2*t))}}function _u(n){return n*n}function bu(n){return n*n*n}function wu(n){if(0>=n)return 0;if(n>=1)return 1;var t=n*n,r=t*n;return 4*(.5>n?r:3*(n-t)+r-.75)}function Su(n){return function(t){return Math.pow(t,n)}}function ku(n){return 1-Math.cos(n*Aa)}function Eu(n){return Math.pow(2,10*(n-1))}function Au(n){return 1-Math.sqrt(1-n*n)}function Cu(n,t){var r;return arguments.length<2&&(t=.45),arguments.length?r=t/Ea*Math.asin(1/n):(n=1,r=t/4),function(e){return 1+n*Math.pow(2,-10*e)*Math.sin((e-r)*Ea/t)}}function Nu(n){return n||(n=1.70158),function(t){return t*t*((n+1)*t-n)}}function zu(n){return 1/2.75>n?7.5625*n*n:2/2.75>n?7.5625*(n-=1.5/2.75)*n+.75:2.5/2.75>n?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375}function Lu(n,t){n=Bo.hcl(n),t=Bo.hcl(t);var r=n.h,e=n.c,u=n.l,i=t.h-r,o=t.c-e,a=t.l-u;return isNaN(o)&&(o=0,e=isNaN(e)?t.c:e),isNaN(i)?(i=0,r=isNaN(r)?t.h:r):i>180?i-=360:-180>i&&(i+=360),function(n){return ct(r+i*n,e+o*n,u+a*n)+""}}function Tu(n,t){n=Bo.hsl(n),t=Bo.hsl(t);var r=n.h,e=n.s,u=n.l,i=t.h-r,o=t.s-e,a=t.l-u;return isNaN(o)&&(o=0,e=isNaN(e)?t.s:e),isNaN(i)?(i=0,r=isNaN(r)?t.h:r):i>180?i-=360:-180>i&&(i+=360),function(n){return it(r+i*n,e+o*n,u+a*n)+""}}function qu(n,t){n=Bo.lab(n),t=Bo.lab(t);var r=n.l,e=n.a,u=n.b,i=t.l-r,o=t.a-e,a=t.b-u;return function(n){return ft(r+i*n,e+o*n,u+a*n)+""}}function Ru(n,t){return t-=n,function(r){return Math.round(n+t*r)}}function Du(n){var t=[n.a,n.b],r=[n.c,n.d],e=Uu(t),u=Pu(t,r),i=Uu(ju(r,t,-u))||0;t[0]*r[1]<r[0]*t[1]&&(t[0]*=-1,t[1]*=-1,e*=-1,u*=-1),this.rotate=(e?Math.atan2(t[1],t[0]):Math.atan2(-r[0],r[1]))*La,this.translate=[n.e,n.f],this.scale=[e,i],this.skew=i?Math.atan2(u,i)*La:0}function Pu(n,t){return n[0]*t[0]+n[1]*t[1]}function Uu(n){var t=Math.sqrt(Pu(n,n));return t&&(n[0]/=t,n[1]/=t),t}function ju(n,t,r){return n[0]+=r*t[0],n[1]+=r*t[1],n}function Hu(n,t){var r,e=[],u=[],i=Bo.transform(n),o=Bo.transform(t),a=i.translate,c=o.translate,s=i.rotate,l=o.rotate,f=i.skew,h=o.skew,g=i.scale,p=o.scale;return a[0]!=c[0]||a[1]!=c[1]?(e.push("translate(",null,",",null,")"),u.push({i:1,x:pu(a[0],c[0])},{i:3,x:pu(a[1],c[1])})):c[0]||c[1]?e.push("translate("+c+")"):e.push(""),s!=l?(s-l>180?l+=360:l-s>180&&(s+=360),u.push({i:e.push(e.pop()+"rotate(",null,")")-2,x:pu(s,l)})):l&&e.push(e.pop()+"rotate("+l+")"),f!=h?u.push({i:e.push(e.pop()+"skewX(",null,")")-2,x:pu(f,h)}):h&&e.push(e.pop()+"skewX("+h+")"),g[0]!=p[0]||g[1]!=p[1]?(r=e.push(e.pop()+"scale(",null,",",null,")"),u.push({i:r-4,x:pu(g[0],p[0])},{i:r-2,x:pu(g[1],p[1])})):(1!=p[0]||1!=p[1])&&e.push(e.pop()+"scale("+p+")"),r=u.length,function(n){for(var t,i=-1;++i<r;)e[(t=u[i]).i]=t.x(n);return e.join("")}}function Fu(n,t){return t=t-(n=+n)?1/(t-n):0,function(r){return(r-n)*t}}function Ou(n,t){return t=t-(n=+n)?1/(t-n):0,function(r){return Math.max(0,Math.min(1,(r-n)*t))}}function Iu(n){for(var t=n.source,r=n.target,e=Zu(t,r),u=[t];t!==e;)t=t.parent,u.push(t);for(var i=u.length;r!==e;)u.splice(i,0,r),r=r.parent;return u}function Yu(n){for(var t=[],r=n.parent;null!=r;)t.push(n),n=r,r=r.parent;return t.push(n),t}function Zu(n,t){if(n===t)return n;for(var r=Yu(n),e=Yu(t),u=r.pop(),i=e.pop(),o=null;u===i;)o=u,u=r.pop(),i=e.pop();return o}function Vu(n){n.fixed|=2}function $u(n){n.fixed&=-7}function Xu(n){n.fixed|=4,n.px=n.x,n.py=n.y}function Bu(n){n.fixed&=-5}function Ju(n,t,r){var e=0,u=0;if(n.charge=0,!n.leaf)for(var i,o=n.nodes,a=o.length,c=-1;++c<a;)i=o[c],null!=i&&(Ju(i,t,r),n.charge+=i.charge,e+=i.charge*i.cx,u+=i.charge*i.cy);if(n.point){n.leaf||(n.point.x+=Math.random()-.5,n.point.y+=Math.random()-.5);var s=t*r[n.point.index];n.charge+=n.pointCharge=s,e+=s*n.point.x,u+=s*n.point.y}n.cx=e/n.charge,n.cy=u/n.charge}function Wu(n,t){return Bo.rebind(n,t,"sort","children","value"),n.nodes=n,n.links=ri,n}function Gu(n,t){for(var r=[n];null!=(n=r.pop());)if(t(n),(u=n.children)&&(e=u.length))for(var e,u;--e>=0;)r.push(u[e])}function Ku(n,t){for(var r=[n],e=[];null!=(n=r.pop());)if(e.push(n),(i=n.children)&&(u=i.length))for(var u,i,o=-1;++o<u;)r.push(i[o]);for(;null!=(n=e.pop());)t(n)}function Qu(n){return n.children}function ni(n){return n.value}function ti(n,t){return t.value-n.value}function ri(n){return Bo.merge(n.map(function(n){return(n.children||[]).map(function(t){return{source:n,target:t}})}))}function ei(n){return n.x}function ui(n){return n.y}function ii(n,t,r){n.y0=t,n.y=r}function oi(n){return Bo.range(n.length)}function ai(n){for(var t=-1,r=n[0].length,e=[];++t<r;)e[t]=0;return e}function ci(n){for(var t,r=1,e=0,u=n[0][1],i=n.length;i>r;++r)(t=n[r][1])>u&&(e=r,u=t);return e}function si(n){return n.reduce(li,0)}function li(n,t){return n+t[1]}function fi(n,t){return hi(n,Math.ceil(Math.log(t.length)/Math.LN2+1))}function hi(n,t){for(var r=-1,e=+n[0],u=(n[1]-e)/t,i=[];++r<=t;)i[r]=u*r+e;return i}function gi(n){return[Bo.min(n),Bo.max(n)]}function pi(n,t){return n.value-t.value}function vi(n,t){var r=n._pack_next;n._pack_next=t,t._pack_prev=n,t._pack_next=r,r._pack_prev=t}function di(n,t){n._pack_next=t,t._pack_prev=n}function mi(n,t){var r=t.x-n.x,e=t.y-n.y,u=n.r+t.r;return.999*u*u>r*r+e*e}function yi(n){function t(n){l=Math.min(n.x-n.r,l),f=Math.max(n.x+n.r,f),h=Math.min(n.y-n.r,h),g=Math.max(n.y+n.r,g)}if((r=n.children)&&(s=r.length)){var r,e,u,i,o,a,c,s,l=1/0,f=-1/0,h=1/0,g=-1/0;if(r.forEach(xi),e=r[0],e.x=-e.r,e.y=0,t(e),s>1&&(u=r[1],u.x=u.r,u.y=0,t(u),s>2))for(i=r[2],bi(e,u,i),t(i),vi(e,i),e._pack_prev=i,vi(i,u),u=e._pack_next,o=3;s>o;o++){bi(e,u,i=r[o]);var p=0,v=1,d=1;for(a=u._pack_next;a!==u;a=a._pack_next,v++)if(mi(a,i)){p=1;break}if(1==p)for(c=e._pack_prev;c!==a._pack_prev&&!mi(c,i);c=c._pack_prev,d++);p?(d>v||v==d&&u.r<e.r?di(e,u=a):di(e=c,u),o--):(vi(e,i),u=i,t(i))}var m=(l+f)/2,y=(h+g)/2,x=0;for(o=0;s>o;o++)i=r[o],i.x-=m,i.y-=y,x=Math.max(x,i.r+Math.sqrt(i.x*i.x+i.y*i.y));n.r=x,r.forEach(Mi)}}function xi(n){n._pack_next=n._pack_prev=n}function Mi(n){delete n._pack_next,delete n._pack_prev}function _i(n,t,r,e){var u=n.children;if(n.x=t+=e*n.x,n.y=r+=e*n.y,n.r*=e,u)for(var i=-1,o=u.length;++i<o;)_i(u[i],t,r,e)}function bi(n,t,r){var e=n.r+r.r,u=t.x-n.x,i=t.y-n.y;if(e&&(u||i)){var o=t.r+r.r,a=u*u+i*i;o*=o,e*=e;var c=.5+(e-o)/(2*a),s=Math.sqrt(Math.max(0,2*o*(e+a)-(e-=a)*e-o*o))/(2*a);r.x=n.x+c*u+s*i,r.y=n.y+c*i-s*u}else r.x=n.x+e,r.y=n.y}function wi(n,t){return n.parent==t.parent?1:2}function Si(n){var t=n.children;return t.length?t[0]:n.t}function ki(n){var t,r=n.children;return(t=r.length)?r[t-1]:n.t}function Ei(n,t,r){var e=r/(t.i-n.i);t.c-=e,t.s+=r,n.c+=e,t.z+=r,t.m+=r}function Ai(n){for(var t,r=0,e=0,u=n.children,i=u.length;--i>=0;)t=u[i],t.z+=r,t.m+=r,r+=t.s+(e+=t.c)}function Ci(n,t,r){return n.a.parent===t.parent?n.a:r}function Ni(n){return 1+Bo.max(n,function(n){return n.y})}function zi(n){return n.reduce(function(n,t){return n+t.x},0)/n.length}function Li(n){var t=n.children;return t&&t.length?Li(t[0]):n}function Ti(n){var t,r=n.children;return r&&(t=r.length)?Ti(r[t-1]):n}function qi(n){return{x:n.x,y:n.y,dx:n.dx,dy:n.dy}}function Ri(n,t){var r=n.x+t[3],e=n.y+t[0],u=n.dx-t[1]-t[3],i=n.dy-t[0]-t[2];return 0>u&&(r+=u/2,u=0),0>i&&(e+=i/2,i=0),{x:r,y:e,dx:u,dy:i}}function Di(n){var t=n[0],r=n[n.length-1];return r>t?[t,r]:[r,t]}function Pi(n){return n.rangeExtent?n.rangeExtent():Di(n.range())}function Ui(n,t,r,e){var u=r(n[0],n[1]),i=e(t[0],t[1]);return function(n){return i(u(n))}}function ji(n,t){var r,e=0,u=n.length-1,i=n[e],o=n[u];return i>o&&(r=e,e=u,u=r,r=i,i=o,o=r),n[e]=t.floor(i),n[u]=t.ceil(o),n}function Hi(n){return n?{floor:function(t){return Math.floor(t/n)*n},ceil:function(t){return Math.ceil(t/n)*n}}:hs}function Fi(n,t,r,e){var u=[],i=[],o=0,a=Math.min(n.length,t.length)-1;for(n[a]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++o<=a;)u.push(r(n[o-1],n[o])),i.push(e(t[o-1],t[o]));return function(t){var r=Bo.bisect(n,t,1,a)-1;return i[r](u[r](t))}}function Oi(n,t,r,e){function u(){var u=Math.min(n.length,t.length)>2?Fi:Ui,c=e?Ou:Fu;return o=u(n,t,c,r),a=u(t,n,c,du),i}function i(n){return o(n)}var o,a;return i.invert=function(n){return a(n)},i.domain=function(t){return arguments.length?(n=t.map(Number),u()):n},i.range=function(n){return arguments.length?(t=n,u()):t},i.rangeRound=function(n){return i.range(n).interpolate(Ru)},i.clamp=function(n){return arguments.length?(e=n,u()):e},i.interpolate=function(n){return arguments.length?(r=n,u()):r},i.ticks=function(t){return Vi(n,t)},i.tickFormat=function(t,r){return $i(n,t,r)},i.nice=function(t){return Yi(n,t),u()},i.copy=function(){return Oi(n,t,r,e)},u()}function Ii(n,t){return Bo.rebind(n,t,"range","rangeRound","interpolate","clamp")}function Yi(n,t){return ji(n,Hi(Zi(n,t)[2]))}function Zi(n,t){null==t&&(t=10);var r=Di(n),e=r[1]-r[0],u=Math.pow(10,Math.floor(Math.log(e/t)/Math.LN10)),i=t/e*u;return.15>=i?u*=10:.35>=i?u*=5:.75>=i&&(u*=2),r[0]=Math.ceil(r[0]/u)*u,r[1]=Math.floor(r[1]/u)*u+.5*u,r[2]=u,r}function Vi(n,t){return Bo.range.apply(Bo,Zi(n,t))}function $i(n,t,r){var e=Zi(n,t);if(r){var u=nc.exec(r);if(u.shift(),"s"===u[8]){var i=Bo.formatPrefix(Math.max(ca(e[0]),ca(e[1])));return u[7]||(u[7]="."+Xi(i.scale(e[2]))),u[8]="f",r=Bo.format(u.join("")),function(n){return r(i.scale(n))+i.symbol}}u[7]||(u[7]="."+Bi(u[8],e)),r=u.join("")}else r=",."+Xi(e[2])+"f";return Bo.format(r)}function Xi(n){return-Math.floor(Math.log(n)/Math.LN10+.01)}function Bi(n,t){var r=Xi(t[2]);return n in gs?Math.abs(r-Xi(Math.max(ca(t[0]),ca(t[1]))))+ +("e"!==n):r-2*("%"===n)}function Ji(n,t,r,e){function u(n){return(r?Math.log(0>n?0:n):-Math.log(n>0?0:-n))/Math.log(t)}function i(n){return r?Math.pow(t,n):-Math.pow(t,-n)}function o(t){return n(u(t))}return o.invert=function(t){return i(n.invert(t))},o.domain=function(t){return arguments.length?(r=t[0]>=0,n.domain((e=t.map(Number)).map(u)),o):e},o.base=function(r){return arguments.length?(t=+r,n.domain(e.map(u)),o):t},o.nice=function(){var t=ji(e.map(u),r?Math:vs);return n.domain(t),e=t.map(i),o},o.ticks=function(){var n=Di(e),o=[],a=n[0],c=n[1],s=Math.floor(u(a)),l=Math.ceil(u(c)),f=t%1?2:t;if(isFinite(l-s)){if(r){for(;l>s;s++)for(var h=1;f>h;h++)o.push(i(s)*h);o.push(i(s))}else for(o.push(i(s));s++<l;)for(var h=f-1;h>0;h--)o.push(i(s)*h);for(s=0;o[s]<a;s++);for(l=o.length;o[l-1]>c;l--);o=o.slice(s,l)}return o},o.tickFormat=function(n,t){if(!arguments.length)return ps;arguments.length<2?t=ps:"function"!=typeof t&&(t=Bo.format(t));var e,a=Math.max(.1,n/o.ticks().length),c=r?(e=1e-12,Math.ceil):(e=-1e-12,Math.floor);return function(n){return n/i(c(u(n)+e))<=a?t(n):""}},o.copy=function(){return Ji(n.copy(),t,r,e)},Ii(o,n)}function Wi(n,t,r){function e(t){return n(u(t))}var u=Gi(t),i=Gi(1/t);return e.invert=function(t){return i(n.invert(t))},e.domain=function(t){return arguments.length?(n.domain((r=t.map(Number)).map(u)),e):r},e.ticks=function(n){return Vi(r,n)},e.tickFormat=function(n,t){return $i(r,n,t)},e.nice=function(n){return e.domain(Yi(r,n))},e.exponent=function(o){return arguments.length?(u=Gi(t=o),i=Gi(1/t),n.domain(r.map(u)),e):t},e.copy=function(){return Wi(n.copy(),t,r)},Ii(e,n)}function Gi(n){return function(t){return 0>t?-Math.pow(-t,n):Math.pow(t,n)}}function Ki(n,t){function r(r){return i[((u.get(r)||("range"===t.t?u.set(r,n.push(r)):0/0))-1)%i.length]}function e(t,r){return Bo.range(n.length).map(function(n){return t+r*n})}var u,i,a;return r.domain=function(e){if(!arguments.length)return n;n=[],u=new o;for(var i,a=-1,c=e.length;++a<c;)u.has(i=e[a])||u.set(i,n.push(i));return r[t.t].apply(r,t.a)},r.range=function(n){return arguments.length?(i=n,a=0,t={t:"range",a:arguments},r):i},r.rangePoints=function(u,o){arguments.length<2&&(o=0);var c=u[0],s=u[1],l=(s-c)/(Math.max(1,n.length-1)+o);return i=e(n.length<2?(c+s)/2:c+l*o/2,l),a=0,t={t:"rangePoints",a:arguments},r},r.rangeBands=function(u,o,c){arguments.length<2&&(o=0),arguments.length<3&&(c=o);var s=u[1]<u[0],l=u[s-0],f=u[1-s],h=(f-l)/(n.length-o+2*c);return i=e(l+h*c,h),s&&i.reverse(),a=h*(1-o),t={t:"rangeBands",a:arguments},r},r.rangeRoundBands=function(u,o,c){arguments.length<2&&(o=0),arguments.length<3&&(c=o);var s=u[1]<u[0],l=u[s-0],f=u[1-s],h=Math.floor((f-l)/(n.length-o+2*c)),g=f-l-(n.length-o)*h;return i=e(l+Math.round(g/2),h),s&&i.reverse(),a=Math.round(h*(1-o)),t={t:"rangeRoundBands",a:arguments},r},r.rangeBand=function(){return a},r.rangeExtent=function(){return Di(t.a[0])},r.copy=function(){return Ki(n,t)},r.domain(n)}function Qi(r,e){function u(){var n=0,t=e.length;for(o=[];++n<t;)o[n-1]=Bo.quantile(r,n/t);return i}function i(n){return isNaN(n=+n)?void 0:e[Bo.bisect(o,n)]}var o;return i.domain=function(e){return arguments.length?(r=e.filter(t).sort(n),u()):r},i.range=function(n){return arguments.length?(e=n,u()):e},i.quantiles=function(){return o},i.invertExtent=function(n){return n=e.indexOf(n),0>n?[0/0,0/0]:[n>0?o[n-1]:r[0],n<o.length?o[n]:r[r.length-1]]},i.copy=function(){return Qi(r,e)},u()}function no(n,t,r){function e(t){return r[Math.max(0,Math.min(o,Math.floor(i*(t-n))))]}function u(){return i=r.length/(t-n),o=r.length-1,e}var i,o;return e.domain=function(r){return arguments.length?(n=+r[0],t=+r[r.length-1],u()):[n,t]},e.range=function(n){return arguments.length?(r=n,u()):r},e.invertExtent=function(t){return t=r.indexOf(t),t=0>t?0/0:t/i+n,[t,t+1/i]},e.copy=function(){return no(n,t,r)},u()}function to(n,t){function r(r){return r>=r?t[Bo.bisect(n,r)]:void 0}return r.domain=function(t){return arguments.length?(n=t,r):n},r.range=function(n){return arguments.length?(t=n,r):t},r.invertExtent=function(r){return r=t.indexOf(r),[n[r-1],n[r]]},r.copy=function(){return to(n,t)},r}function ro(n){function t(n){return+n}return t.invert=t,t.domain=t.range=function(r){return arguments.length?(n=r.map(t),t):n},t.ticks=function(t){return Vi(n,t)},t.tickFormat=function(t,r){return $i(n,t,r)},t.copy=function(){return ro(n)},t}function eo(n){return n.innerRadius}function uo(n){return n.outerRadius}function io(n){return n.startAngle}function oo(n){return n.endAngle}function ao(n){function t(t){function o(){s.push("M",i(n(l),a))}for(var c,s=[],l=[],f=-1,h=t.length,g=Et(r),p=Et(e);++f<h;)u.call(this,c=t[f],f)?l.push([+g.call(this,c,f),+p.call(this,c,f)]):l.length&&(o(),l=[]);return l.length&&o(),s.length?s.join(""):null}var r=Ae,e=Ce,u=Ar,i=co,o=i.key,a=.7;return t.x=function(n){return arguments.length?(r=n,t):r},t.y=function(n){return arguments.length?(e=n,t):e},t.defined=function(n){return arguments.length?(u=n,t):u},t.interpolate=function(n){return arguments.length?(o="function"==typeof n?i=n:(i=bs.get(n)||co).key,t):o},t.tension=function(n){return arguments.length?(a=n,t):a},t}function co(n){return n.join("L")}function so(n){return co(n)+"Z"}function lo(n){for(var t=0,r=n.length,e=n[0],u=[e[0],",",e[1]];++t<r;)u.push("H",(e[0]+(e=n[t])[0])/2,"V",e[1]);return r>1&&u.push("H",e[0]),u.join("")}function fo(n){for(var t=0,r=n.length,e=n[0],u=[e[0],",",e[1]];++t<r;)u.push("V",(e=n[t])[1],"H",e[0]);return u.join("")}function ho(n){for(var t=0,r=n.length,e=n[0],u=[e[0],",",e[1]];++t<r;)u.push("H",(e=n[t])[0],"V",e[1]);return u.join("")}function go(n,t){return n.length<4?co(n):n[1]+mo(n.slice(1,n.length-1),yo(n,t))}function po(n,t){return n.length<3?co(n):n[0]+mo((n.push(n[0]),n),yo([n[n.length-2]].concat(n,[n[1]]),t))}function vo(n,t){return n.length<3?co(n):n[0]+mo(n,yo(n,t))}function mo(n,t){if(t.length<1||n.length!=t.length&&n.length!=t.length+2)return co(n);var r=n.length!=t.length,e="",u=n[0],i=n[1],o=t[0],a=o,c=1;if(r&&(e+="Q"+(i[0]-2*o[0]/3)+","+(i[1]-2*o[1]/3)+","+i[0]+","+i[1],u=n[1],c=2),t.length>1){a=t[1],i=n[c],c++,e+="C"+(u[0]+o[0])+","+(u[1]+o[1])+","+(i[0]-a[0])+","+(i[1]-a[1])+","+i[0]+","+i[1];for(var s=2;s<t.length;s++,c++)i=n[c],a=t[s],e+="S"+(i[0]-a[0])+","+(i[1]-a[1])+","+i[0]+","+i[1]}if(r){var l=n[c];e+="Q"+(i[0]+2*a[0]/3)+","+(i[1]+2*a[1]/3)+","+l[0]+","+l[1]}return e}function yo(n,t){for(var r,e=[],u=(1-t)/2,i=n[0],o=n[1],a=1,c=n.length;++a<c;)r=i,i=o,o=n[a],e.push([u*(o[0]-r[0]),u*(o[1]-r[1])]);return e}function xo(n){if(n.length<3)return co(n);var t=1,r=n.length,e=n[0],u=e[0],i=e[1],o=[u,u,u,(e=n[1])[0]],a=[i,i,i,e[1]],c=[u,",",i,"L",wo(ks,o),",",wo(ks,a)];for(n.push(n[r-1]);++t<=r;)e=n[t],o.shift(),o.push(e[0]),a.shift(),a.push(e[1]),So(c,o,a);return n.pop(),c.push("L",e),c.join("")}function Mo(n){if(n.length<4)return co(n);for(var t,r=[],e=-1,u=n.length,i=[0],o=[0];++e<3;)t=n[e],i.push(t[0]),o.push(t[1]);for(r.push(wo(ks,i)+","+wo(ks,o)),--e;++e<u;)t=n[e],i.shift(),i.push(t[0]),o.shift(),o.push(t[1]),So(r,i,o);return r.join("")}function _o(n){for(var t,r,e=-1,u=n.length,i=u+4,o=[],a=[];++e<4;)r=n[e%u],o.push(r[0]),a.push(r[1]);for(t=[wo(ks,o),",",wo(ks,a)],--e;++e<i;)r=n[e%u],o.shift(),o.push(r[0]),a.shift(),a.push(r[1]),So(t,o,a);return t.join("")}function bo(n,t){var r=n.length-1;if(r)for(var e,u,i=n[0][0],o=n[0][1],a=n[r][0]-i,c=n[r][1]-o,s=-1;++s<=r;)e=n[s],u=s/r,e[0]=t*e[0]+(1-t)*(i+u*a),e[1]=t*e[1]+(1-t)*(o+u*c);return xo(n)}function wo(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]+n[3]*t[3]}function So(n,t,r){n.push("C",wo(ws,t),",",wo(ws,r),",",wo(Ss,t),",",wo(Ss,r),",",wo(ks,t),",",wo(ks,r))}function ko(n,t){return(t[1]-n[1])/(t[0]-n[0])}function Eo(n){for(var t=0,r=n.length-1,e=[],u=n[0],i=n[1],o=e[0]=ko(u,i);++t<r;)e[t]=(o+(o=ko(u=i,i=n[t+1])))/2;return e[t]=o,e}function Ao(n){for(var t,r,e,u,i=[],o=Eo(n),a=-1,c=n.length-1;++a<c;)t=ko(n[a],n[a+1]),ca(t)<Ca?o[a]=o[a+1]=0:(r=o[a]/t,e=o[a+1]/t,u=r*r+e*e,u>9&&(u=3*t/Math.sqrt(u),o[a]=u*r,o[a+1]=u*e));for(a=-1;++a<=c;)u=(n[Math.min(c,a+1)][0]-n[Math.max(0,a-1)][0])/(6*(1+o[a]*o[a])),i.push([u||0,o[a]*u||0]);return i}function Co(n){return n.length<3?co(n):n[0]+mo(n,Ao(n))}function No(n){for(var t,r,e,u=-1,i=n.length;++u<i;)t=n[u],r=t[0],e=t[1]+Ms,t[0]=r*Math.cos(e),t[1]=r*Math.sin(e);return n}function zo(n){function t(t){function c(){v.push("M",a(n(m),f),l,s(n(d.reverse()),f),"Z")}for(var h,g,p,v=[],d=[],m=[],y=-1,x=t.length,M=Et(r),_=Et(u),b=r===e?function(){return g}:Et(e),w=u===i?function(){return p}:Et(i);++y<x;)o.call(this,h=t[y],y)?(d.push([g=+M.call(this,h,y),p=+_.call(this,h,y)]),m.push([+b.call(this,h,y),+w.call(this,h,y)])):d.length&&(c(),d=[],m=[]);return d.length&&c(),v.length?v.join(""):null}var r=Ae,e=Ae,u=0,i=Ce,o=Ar,a=co,c=a.key,s=a,l="L",f=.7;return t.x=function(n){return arguments.length?(r=e=n,t):e},t.x0=function(n){return arguments.length?(r=n,t):r},t.x1=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(u=i=n,t):i},t.y0=function(n){return arguments.length?(u=n,t):u},t.y1=function(n){return arguments.length?(i=n,t):i},t.defined=function(n){return arguments.length?(o=n,t):o},t.interpolate=function(n){return arguments.length?(c="function"==typeof n?a=n:(a=bs.get(n)||co).key,s=a.reverse||a,l=a.closed?"M":"L",t):c},t.tension=function(n){return arguments.length?(f=n,t):f},t}function Lo(n){return n.radius}function To(n){return[n.x,n.y]}function qo(n){return function(){var t=n.apply(this,arguments),r=t[0],e=t[1]+Ms;return[r*Math.cos(e),r*Math.sin(e)]}}function Ro(){return 64}function Do(){return"circle"}function Po(n){var t=Math.sqrt(n/ka);return"M0,"+t+"A"+t+","+t+" 0 1,1 0,"+-t+"A"+t+","+t+" 0 1,1 0,"+t+"Z"}function Uo(n,t){return ga(n,Ls),n.id=t,n}function jo(n,t,r,e){var u=n.id;return P(n,"function"==typeof r?function(n,i,o){n.__transition__[u].tween.set(t,e(r.call(n,n.__data__,i,o)))}:(r=e(r),function(n){n.__transition__[u].tween.set(t,r)}))}function Ho(n){return null==n&&(n=""),function(){this.textContent=n}}function Fo(n,t,r,e){var u=n.__transition__||(n.__transition__={active:0,count:0}),i=u[r];if(!i){var a=e.time;i=u[r]={tween:new o,time:a,ease:e.ease,delay:e.delay,duration:e.duration},++u.count,Bo.timer(function(e){function o(e){return u.active>r?s():(u.active=r,i.event&&i.event.start.call(n,l,t),i.tween.forEach(function(r,e){(e=e.call(n,l,t))&&v.push(e)}),Bo.timer(function(){return p.c=c(e||1)?Ar:c,1},0,a),void 0)}function c(e){if(u.active!==r)return s();for(var o=e/g,a=f(o),c=v.length;c>0;)v[--c].call(n,a);return o>=1?(i.event&&i.event.end.call(n,l,t),s()):void 0}function s(){return--u.count?delete u[r]:delete n.__transition__,1}var l=n.__data__,f=i.ease,h=i.delay,g=i.duration,p=Ga,v=[];return p.t=h+a,e>=h?o(e-h):(p.c=o,void 0)},0,a)}}function Oo(n,t){n.attr("transform",function(n){return"translate("+t(n)+",0)"})}function Io(n,t){n.attr("transform",function(n){return"translate(0,"+t(n)+")"})}function Yo(n){return n.toISOString()}function Zo(n,t,r){function e(t){return n(t)}function u(n,r){var e=n[1]-n[0],u=e/r,i=Bo.bisect(Fs,u);return i==Fs.length?[t.year,Zi(n.map(function(n){return n/31536e6}),r)[2]]:i?t[u/Fs[i-1]<Fs[i]/u?i-1:i]:[Ys,Zi(n,r)[2]]}return e.invert=function(t){return Vo(n.invert(t))
},e.domain=function(t){return arguments.length?(n.domain(t),e):n.domain().map(Vo)},e.nice=function(n,t){function r(r){return!isNaN(r)&&!n.range(r,Vo(+r+1),t).length}var i=e.domain(),o=Di(i),a=null==n?u(o,10):"number"==typeof n&&u(o,n);return a&&(n=a[0],t=a[1]),e.domain(ji(i,t>1?{floor:function(t){for(;r(t=n.floor(t));)t=Vo(t-1);return t},ceil:function(t){for(;r(t=n.ceil(t));)t=Vo(+t+1);return t}}:n))},e.ticks=function(n,t){var r=Di(e.domain()),i=null==n?u(r,10):"number"==typeof n?u(r,n):!n.range&&[{range:n},t];return i&&(n=i[0],t=i[1]),n.range(r[0],Vo(+r[1]+1),1>t?1:t)},e.tickFormat=function(){return r},e.copy=function(){return Zo(n.copy(),t,r)},Ii(e,n)}function Vo(n){return new Date(n)}function $o(n){return JSON.parse(n.responseText)}function Xo(n){var t=Go.createRange();return t.selectNode(Go.body),t.createContextualFragment(n.responseText)}var Bo={version:"3.4.8"};Date.now||(Date.now=function(){return+new Date});var Jo=[].slice,Wo=function(n){return Jo.call(n)},Go=document,Ko=Go.documentElement,Qo=window;try{Wo(Ko.childNodes)[0].nodeType}catch(na){Wo=function(n){for(var t=n.length,r=new Array(t);t--;)r[t]=n[t];return r}}try{Go.createElement("div").style.setProperty("opacity",0,"")}catch(ta){var ra=Qo.Element.prototype,ea=ra.setAttribute,ua=ra.setAttributeNS,ia=Qo.CSSStyleDeclaration.prototype,oa=ia.setProperty;ra.setAttribute=function(n,t){ea.call(this,n,t+"")},ra.setAttributeNS=function(n,t,r){ua.call(this,n,t,r+"")},ia.setProperty=function(n,t,r){oa.call(this,n,t+"",r)}}Bo.ascending=n,Bo.descending=function(n,t){return n>t?-1:t>n?1:t>=n?0:0/0},Bo.min=function(n,t){var r,e,u=-1,i=n.length;if(1===arguments.length){for(;++u<i&&!(null!=(r=n[u])&&r>=r);)r=void 0;for(;++u<i;)null!=(e=n[u])&&r>e&&(r=e)}else{for(;++u<i&&!(null!=(r=t.call(n,n[u],u))&&r>=r);)r=void 0;for(;++u<i;)null!=(e=t.call(n,n[u],u))&&r>e&&(r=e)}return r},Bo.max=function(n,t){var r,e,u=-1,i=n.length;if(1===arguments.length){for(;++u<i&&!(null!=(r=n[u])&&r>=r);)r=void 0;for(;++u<i;)null!=(e=n[u])&&e>r&&(r=e)}else{for(;++u<i&&!(null!=(r=t.call(n,n[u],u))&&r>=r);)r=void 0;for(;++u<i;)null!=(e=t.call(n,n[u],u))&&e>r&&(r=e)}return r},Bo.extent=function(n,t){var r,e,u,i=-1,o=n.length;if(1===arguments.length){for(;++i<o&&!(null!=(r=u=n[i])&&r>=r);)r=u=void 0;for(;++i<o;)null!=(e=n[i])&&(r>e&&(r=e),e>u&&(u=e))}else{for(;++i<o&&!(null!=(r=u=t.call(n,n[i],i))&&r>=r);)r=void 0;for(;++i<o;)null!=(e=t.call(n,n[i],i))&&(r>e&&(r=e),e>u&&(u=e))}return[r,u]},Bo.sum=function(n,t){var r,e=0,u=n.length,i=-1;if(1===arguments.length)for(;++i<u;)isNaN(r=+n[i])||(e+=r);else for(;++i<u;)isNaN(r=+t.call(n,n[i],i))||(e+=r);return e},Bo.mean=function(n,r){var e,u=0,i=n.length,o=-1,a=i;if(1===arguments.length)for(;++o<i;)t(e=n[o])?u+=e:--a;else for(;++o<i;)t(e=r.call(n,n[o],o))?u+=e:--a;return a?u/a:void 0},Bo.quantile=function(n,t){var r=(n.length-1)*t+1,e=Math.floor(r),u=+n[e-1],i=r-e;return i?u+i*(n[e]-u):u},Bo.median=function(r,e){return arguments.length>1&&(r=r.map(e)),r=r.filter(t),r.length?Bo.quantile(r.sort(n),.5):void 0};var aa=r(n);Bo.bisectLeft=aa.left,Bo.bisect=Bo.bisectRight=aa.right,Bo.bisector=function(t){return r(1===t.length?function(r,e){return n(t(r),e)}:t)},Bo.shuffle=function(n){for(var t,r,e=n.length;e;)r=0|Math.random()*e--,t=n[e],n[e]=n[r],n[r]=t;return n},Bo.permute=function(n,t){for(var r=t.length,e=new Array(r);r--;)e[r]=n[t[r]];return e},Bo.pairs=function(n){for(var t,r=0,e=n.length-1,u=n[0],i=new Array(0>e?0:e);e>r;)i[r]=[t=u,u=n[++r]];return i},Bo.zip=function(){if(!(u=arguments.length))return[];for(var n=-1,t=Bo.min(arguments,e),r=new Array(t);++n<t;)for(var u,i=-1,o=r[n]=new Array(u);++i<u;)o[i]=arguments[i][n];return r},Bo.transpose=function(n){return Bo.zip.apply(Bo,n)},Bo.keys=function(n){var t=[];for(var r in n)t.push(r);return t},Bo.values=function(n){var t=[];for(var r in n)t.push(n[r]);return t},Bo.entries=function(n){var t=[];for(var r in n)t.push({key:r,value:n[r]});return t},Bo.merge=function(n){for(var t,r,e,u=n.length,i=-1,o=0;++i<u;)o+=n[i].length;for(r=new Array(o);--u>=0;)for(e=n[u],t=e.length;--t>=0;)r[--o]=e[t];return r};var ca=Math.abs;Bo.range=function(n,t,r){if(arguments.length<3&&(r=1,arguments.length<2&&(t=n,n=0)),1/0===(t-n)/r)throw new Error("infinite range");var e,i=[],o=u(ca(r)),a=-1;if(n*=o,t*=o,r*=o,0>r)for(;(e=n+r*++a)>t;)i.push(e/o);else for(;(e=n+r*++a)<t;)i.push(e/o);return i},Bo.map=function(n){var t=new o;if(n instanceof o)n.forEach(function(n,r){t.set(n,r)});else for(var r in n)t.set(r,n[r]);return t},i(o,{has:a,get:function(n){return this[sa+n]},set:function(n,t){return this[sa+n]=t},remove:c,keys:s,values:function(){var n=[];return this.forEach(function(t,r){n.push(r)}),n},entries:function(){var n=[];return this.forEach(function(t,r){n.push({key:t,value:r})}),n},size:l,empty:f,forEach:function(n){for(var t in this)t.charCodeAt(0)===la&&n.call(this,t.substring(1),this[t])}});var sa="\x00",la=sa.charCodeAt(0);Bo.nest=function(){function n(t,a,c){if(c>=i.length)return e?e.call(u,a):r?a.sort(r):a;for(var s,l,f,h,g=-1,p=a.length,v=i[c++],d=new o;++g<p;)(h=d.get(s=v(l=a[g])))?h.push(l):d.set(s,[l]);return t?(l=t(),f=function(r,e){l.set(r,n(t,e,c))}):(l={},f=function(r,e){l[r]=n(t,e,c)}),d.forEach(f),l}function t(n,r){if(r>=i.length)return n;var e=[],u=a[r++];return n.forEach(function(n,u){e.push({key:n,values:t(u,r)})}),u?e.sort(function(n,t){return u(n.key,t.key)}):e}var r,e,u={},i=[],a=[];return u.map=function(t,r){return n(r,t,0)},u.entries=function(r){return t(n(Bo.map,r,0),0)},u.key=function(n){return i.push(n),u},u.sortKeys=function(n){return a[i.length-1]=n,u},u.sortValues=function(n){return r=n,u},u.rollup=function(n){return e=n,u},u},Bo.set=function(n){var t=new h;if(n)for(var r=0,e=n.length;e>r;++r)t.add(n[r]);return t},i(h,{has:a,add:function(n){return this[sa+n]=!0,n},remove:function(n){return n=sa+n,n in this&&delete this[n]},values:s,size:l,empty:f,forEach:function(n){for(var t in this)t.charCodeAt(0)===la&&n.call(this,t.substring(1))}}),Bo.behavior={},Bo.rebind=function(n,t){for(var r,e=1,u=arguments.length;++e<u;)n[r=arguments[e]]=g(n,t,t[r]);return n};var fa=["webkit","ms","moz","Moz","o","O"];Bo.dispatch=function(){for(var n=new d,t=-1,r=arguments.length;++t<r;)n[arguments[t]]=m(n);return n},d.prototype.on=function(n,t){var r=n.indexOf("."),e="";if(r>=0&&(e=n.substring(r+1),n=n.substring(0,r)),n)return arguments.length<2?this[n].on(e):this[n].on(e,t);if(2===arguments.length){if(null==t)for(n in this)this.hasOwnProperty(n)&&this[n].on(e,null);return this}},Bo.event=null,Bo.requote=function(n){return n.replace(ha,"\\$&")};var ha=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,ga={}.__proto__?function(n,t){n.__proto__=t}:function(n,t){for(var r in t)n[r]=t[r]},pa=function(n,t){return t.querySelector(n)},va=function(n,t){return t.querySelectorAll(n)},da=Ko[p(Ko,"matchesSelector")],ma=function(n,t){return da.call(n,t)};"function"==typeof Sizzle&&(pa=function(n,t){return Sizzle(n,t)[0]||null},va=Sizzle,ma=Sizzle.matchesSelector),Bo.selection=function(){return _a};var ya=Bo.selection.prototype=[];ya.select=function(n){var t,r,e,u,i=[];n=b(n);for(var o=-1,a=this.length;++o<a;){i.push(t=[]),t.parentNode=(e=this[o]).parentNode;for(var c=-1,s=e.length;++c<s;)(u=e[c])?(t.push(r=n.call(u,u.__data__,c,o)),r&&"__data__"in u&&(r.__data__=u.__data__)):t.push(null)}return _(i)},ya.selectAll=function(n){var t,r,e=[];n=w(n);for(var u=-1,i=this.length;++u<i;)for(var o=this[u],a=-1,c=o.length;++a<c;)(r=o[a])&&(e.push(t=Wo(n.call(r,r.__data__,a,u))),t.parentNode=r);return _(e)};var xa={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};Bo.ns={prefix:xa,qualify:function(n){var t=n.indexOf(":"),r=n;return t>=0&&(r=n.substring(0,t),n=n.substring(t+1)),xa.hasOwnProperty(r)?{space:xa[r],local:n}:n}},ya.attr=function(n,t){if(arguments.length<2){if("string"==typeof n){var r=this.node();return n=Bo.ns.qualify(n),n.local?r.getAttributeNS(n.space,n.local):r.getAttribute(n)}for(t in n)this.each(S(t,n[t]));return this}return this.each(S(n,t))},ya.classed=function(n,t){if(arguments.length<2){if("string"==typeof n){var r=this.node(),e=(n=A(n)).length,u=-1;if(t=r.classList){for(;++u<e;)if(!t.contains(n[u]))return!1}else for(t=r.getAttribute("class");++u<e;)if(!E(n[u]).test(t))return!1;return!0}for(t in n)this.each(C(t,n[t]));return this}return this.each(C(n,t))},ya.style=function(n,t,r){var e=arguments.length;if(3>e){if("string"!=typeof n){2>e&&(t="");for(r in n)this.each(z(r,n[r],t));return this}if(2>e)return Qo.getComputedStyle(this.node(),null).getPropertyValue(n);r=""}return this.each(z(n,t,r))},ya.property=function(n,t){if(arguments.length<2){if("string"==typeof n)return this.node()[n];for(t in n)this.each(L(t,n[t]));return this}return this.each(L(n,t))},ya.text=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.textContent=null==t?"":t}:null==n?function(){this.textContent=""}:function(){this.textContent=n}):this.node().textContent},ya.html=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.innerHTML=null==t?"":t}:null==n?function(){this.innerHTML=""}:function(){this.innerHTML=n}):this.node().innerHTML},ya.append=function(n){return n=T(n),this.select(function(){return this.appendChild(n.apply(this,arguments))})},ya.insert=function(n,t){return n=T(n),t=b(t),this.select(function(){return this.insertBefore(n.apply(this,arguments),t.apply(this,arguments)||null)})},ya.remove=function(){return this.each(function(){var n=this.parentNode;n&&n.removeChild(this)})},ya.data=function(n,t){function r(n,r){var e,u,i,a=n.length,f=r.length,h=Math.min(a,f),g=new Array(f),p=new Array(f),v=new Array(a);if(t){var d,m=new o,y=new o,x=[];for(e=-1;++e<a;)d=t.call(u=n[e],u.__data__,e),m.has(d)?v[e]=u:m.set(d,u),x.push(d);for(e=-1;++e<f;)d=t.call(r,i=r[e],e),(u=m.get(d))?(g[e]=u,u.__data__=i):y.has(d)||(p[e]=q(i)),y.set(d,i),m.remove(d);for(e=-1;++e<a;)m.has(x[e])&&(v[e]=n[e])}else{for(e=-1;++e<h;)u=n[e],i=r[e],u?(u.__data__=i,g[e]=u):p[e]=q(i);for(;f>e;++e)p[e]=q(r[e]);for(;a>e;++e)v[e]=n[e]}p.update=g,p.parentNode=g.parentNode=v.parentNode=n.parentNode,c.push(p),s.push(g),l.push(v)}var e,u,i=-1,a=this.length;if(!arguments.length){for(n=new Array(a=(e=this[0]).length);++i<a;)(u=e[i])&&(n[i]=u.__data__);return n}var c=U([]),s=_([]),l=_([]);if("function"==typeof n)for(;++i<a;)r(e=this[i],n.call(e,e.parentNode.__data__,i));else for(;++i<a;)r(e=this[i],n);return s.enter=function(){return c},s.exit=function(){return l},s},ya.datum=function(n){return arguments.length?this.property("__data__",n):this.property("__data__")},ya.filter=function(n){var t,r,e,u=[];"function"!=typeof n&&(n=R(n));for(var i=0,o=this.length;o>i;i++){u.push(t=[]),t.parentNode=(r=this[i]).parentNode;for(var a=0,c=r.length;c>a;a++)(e=r[a])&&n.call(e,e.__data__,a,i)&&t.push(e)}return _(u)},ya.order=function(){for(var n=-1,t=this.length;++n<t;)for(var r,e=this[n],u=e.length-1,i=e[u];--u>=0;)(r=e[u])&&(i&&i!==r.nextSibling&&i.parentNode.insertBefore(r,i),i=r);return this},ya.sort=function(n){n=D.apply(this,arguments);for(var t=-1,r=this.length;++t<r;)this[t].sort(n);return this.order()},ya.each=function(n){return P(this,function(t,r,e){n.call(t,t.__data__,r,e)})},ya.call=function(n){var t=Wo(arguments);return n.apply(t[0]=this,t),this},ya.empty=function(){return!this.node()},ya.node=function(){for(var n=0,t=this.length;t>n;n++)for(var r=this[n],e=0,u=r.length;u>e;e++){var i=r[e];if(i)return i}return null},ya.size=function(){var n=0;return this.each(function(){++n}),n};var Ma=[];Bo.selection.enter=U,Bo.selection.enter.prototype=Ma,Ma.append=ya.append,Ma.empty=ya.empty,Ma.node=ya.node,Ma.call=ya.call,Ma.size=ya.size,Ma.select=function(n){for(var t,r,e,u,i,o=[],a=-1,c=this.length;++a<c;){e=(u=this[a]).update,o.push(t=[]),t.parentNode=u.parentNode;for(var s=-1,l=u.length;++s<l;)(i=u[s])?(t.push(e[s]=r=n.call(u.parentNode,i.__data__,s,a)),r.__data__=i.__data__):t.push(null)}return _(o)},Ma.insert=function(n,t){return arguments.length<2&&(t=j(this)),ya.insert.call(this,n,t)},ya.transition=function(){for(var n,t,r=As||++Ts,e=[],u=Cs||{time:Date.now(),ease:wu,delay:0,duration:250},i=-1,o=this.length;++i<o;){e.push(n=[]);for(var a=this[i],c=-1,s=a.length;++c<s;)(t=a[c])&&Fo(t,c,r,u),n.push(t)}return Uo(e,r)},ya.interrupt=function(){return this.each(H)},Bo.select=function(n){var t=["string"==typeof n?pa(n,Go):n];return t.parentNode=Ko,_([t])},Bo.selectAll=function(n){var t=Wo("string"==typeof n?va(n,Go):n);return t.parentNode=Ko,_([t])};var _a=Bo.select(Ko);ya.on=function(n,t,r){var e=arguments.length;if(3>e){if("string"!=typeof n){2>e&&(t=!1);for(r in n)this.each(F(r,n[r],t));return this}if(2>e)return(e=this.node()["__on"+n])&&e._;r=!1}return this.each(F(n,t,r))};var ba=Bo.map({mouseenter:"mouseover",mouseleave:"mouseout"});ba.forEach(function(n){"on"+n in Go&&ba.remove(n)});var wa="onselectstart"in Go?null:p(Ko.style,"userSelect"),Sa=0;Bo.mouse=function(n){return Z(n,x())},Bo.touches=function(n,t){return arguments.length<2&&(t=x().touches),t?Wo(t).map(function(t){var r=Z(n,t);return r.identifier=t.identifier,r}):[]},Bo.behavior.drag=function(){function n(){this.on("mousedown.drag",u).on("touchstart.drag",i)}function t(n,t,u,i,o){return function(){function a(){var n,r,e=t(h,v);e&&(n=e[0]-x[0],r=e[1]-x[1],p|=n|r,x=e,g({type:"drag",x:e[0]+s[0],y:e[1]+s[1],dx:n,dy:r}))}function c(){t(h,v)&&(m.on(i+d,null).on(o+d,null),y(p&&Bo.event.target===f),g({type:"dragend"}))}var s,l=this,f=Bo.event.target,h=l.parentNode,g=r.of(l,arguments),p=0,v=n(),d=".drag"+(null==v?"":"-"+v),m=Bo.select(u()).on(i+d,a).on(o+d,c),y=Y(),x=t(h,v);e?(s=e.apply(l,arguments),s=[s.x-x[0],s.y-x[1]]):s=[0,0],g({type:"dragstart"})}}var r=M(n,"drag","dragstart","dragend"),e=null,u=t(v,Bo.mouse,X,"mousemove","mouseup"),i=t(V,Bo.touch,$,"touchmove","touchend");return n.origin=function(t){return arguments.length?(e=t,n):e},Bo.rebind(n,r,"on")};var ka=Math.PI,Ea=2*ka,Aa=ka/2,Ca=1e-6,Na=Ca*Ca,za=ka/180,La=180/ka,Ta=Math.SQRT2,qa=2,Ra=4;Bo.interpolateZoom=function(n,t){function r(n){var t=n*y;if(m){var r=Q(v),o=i/(qa*h)*(r*nt(Ta*t+v)-K(v));return[e+o*s,u+o*l,i*r/Q(Ta*t+v)]}return[e+n*s,u+n*l,i*Math.exp(Ta*t)]}var e=n[0],u=n[1],i=n[2],o=t[0],a=t[1],c=t[2],s=o-e,l=a-u,f=s*s+l*l,h=Math.sqrt(f),g=(c*c-i*i+Ra*f)/(2*i*qa*h),p=(c*c-i*i-Ra*f)/(2*c*qa*h),v=Math.log(Math.sqrt(g*g+1)-g),d=Math.log(Math.sqrt(p*p+1)-p),m=d-v,y=(m||Math.log(c/i))/Ta;return r.duration=1e3*y,r},Bo.behavior.zoom=function(){function n(n){n.on(A,s).on(Ua+".zoom",f).on(C,h).on("dblclick.zoom",g).on(z,l)}function t(n){return[(n[0]-S.x)/S.k,(n[1]-S.y)/S.k]}function r(n){return[n[0]*S.k+S.x,n[1]*S.k+S.y]}function e(n){S.k=Math.max(E[0],Math.min(E[1],n))}function u(n,t){t=r(t),S.x+=n[0]-t[0],S.y+=n[1]-t[1]}function i(){_&&_.domain(x.range().map(function(n){return(n-S.x)/S.k}).map(x.invert)),w&&w.domain(b.range().map(function(n){return(n-S.y)/S.k}).map(b.invert))}function o(n){n({type:"zoomstart"})}function a(n){i(),n({type:"zoom",scale:S.k,translate:[S.x,S.y]})}function c(n){n({type:"zoomend"})}function s(){function n(){l=1,u(Bo.mouse(e),g),a(s)}function r(){f.on(C,Qo===e?h:null).on(N,null),p(l&&Bo.event.target===i),c(s)}var e=this,i=Bo.event.target,s=L.of(e,arguments),l=0,f=Bo.select(Qo).on(C,n).on(N,r),g=t(Bo.mouse(e)),p=Y();H.call(e),o(s)}function l(){function n(){var n=Bo.touches(g);return h=S.k,n.forEach(function(n){n.identifier in v&&(v[n.identifier]=t(n))}),n}function r(){var t=Bo.event.target;Bo.select(t).on(M,i).on(_,f),b.push(t);for(var r=Bo.event.changedTouches,o=0,c=r.length;c>o;++o)v[r[o].identifier]=null;var s=n(),l=Date.now();if(1===s.length){if(500>l-m){var h=s[0],g=v[h.identifier];e(2*S.k),u(h,g),y(),a(p)}m=l}else if(s.length>1){var h=s[0],x=s[1],w=h[0]-x[0],k=h[1]-x[1];d=w*w+k*k}}function i(){for(var n,t,r,i,o=Bo.touches(g),c=0,s=o.length;s>c;++c,i=null)if(r=o[c],i=v[r.identifier]){if(t)break;n=r,t=i}if(i){var l=(l=r[0]-n[0])*l+(l=r[1]-n[1])*l,f=d&&Math.sqrt(l/d);n=[(n[0]+r[0])/2,(n[1]+r[1])/2],t=[(t[0]+i[0])/2,(t[1]+i[1])/2],e(f*h)}m=null,u(n,t),a(p)}function f(){if(Bo.event.touches.length){for(var t=Bo.event.changedTouches,r=0,e=t.length;e>r;++r)delete v[t[r].identifier];for(var u in v)return void n()}Bo.selectAll(b).on(x,null),w.on(A,s).on(z,l),k(),c(p)}var h,g=this,p=L.of(g,arguments),v={},d=0,x=".zoom-"+Bo.event.changedTouches[0].identifier,M="touchmove"+x,_="touchend"+x,b=[],w=Bo.select(g).on(A,null).on(z,r),k=Y();H.call(g),r(),o(p)}function f(){var n=L.of(this,arguments);d?clearTimeout(d):(H.call(this),o(n)),d=setTimeout(function(){d=null,c(n)},50),y();var r=v||Bo.mouse(this);p||(p=t(r)),e(Math.pow(2,.002*Da())*S.k),u(r,p),a(n)}function h(){p=null}function g(){var n=L.of(this,arguments),r=Bo.mouse(this),i=t(r),s=Math.log(S.k)/Math.LN2;o(n),e(Math.pow(2,Bo.event.shiftKey?Math.ceil(s)-1:Math.floor(s)+1)),u(r,i),a(n),c(n)}var p,v,d,m,x,_,b,w,S={x:0,y:0,k:1},k=[960,500],E=Pa,A="mousedown.zoom",C="mousemove.zoom",N="mouseup.zoom",z="touchstart.zoom",L=M(n,"zoomstart","zoom","zoomend");return n.event=function(n){n.each(function(){var n=L.of(this,arguments),t=S;As?Bo.select(this).transition().each("start.zoom",function(){S=this.__chart__||{x:0,y:0,k:1},o(n)}).tween("zoom:zoom",function(){var r=k[0],e=k[1],u=r/2,i=e/2,o=Bo.interpolateZoom([(u-S.x)/S.k,(i-S.y)/S.k,r/S.k],[(u-t.x)/t.k,(i-t.y)/t.k,r/t.k]);return function(t){var e=o(t),c=r/e[2];this.__chart__=S={x:u-e[0]*c,y:i-e[1]*c,k:c},a(n)}}).each("end.zoom",function(){c(n)}):(this.__chart__=S,o(n),a(n),c(n))})},n.translate=function(t){return arguments.length?(S={x:+t[0],y:+t[1],k:S.k},i(),n):[S.x,S.y]},n.scale=function(t){return arguments.length?(S={x:S.x,y:S.y,k:+t},i(),n):S.k},n.scaleExtent=function(t){return arguments.length?(E=null==t?Pa:[+t[0],+t[1]],n):E},n.center=function(t){return arguments.length?(v=t&&[+t[0],+t[1]],n):v},n.size=function(t){return arguments.length?(k=t&&[+t[0],+t[1]],n):k},n.x=function(t){return arguments.length?(_=t,x=t.copy(),S={x:0,y:0,k:1},n):_},n.y=function(t){return arguments.length?(w=t,b=t.copy(),S={x:0,y:0,k:1},n):w},Bo.rebind(n,L,"on")};var Da,Pa=[0,1/0],Ua="onwheel"in Go?(Da=function(){return-Bo.event.deltaY*(Bo.event.deltaMode?120:1)},"wheel"):"onmousewheel"in Go?(Da=function(){return Bo.event.wheelDelta},"mousewheel"):(Da=function(){return-Bo.event.detail},"MozMousePixelScroll");rt.prototype.toString=function(){return this.rgb()+""},Bo.hsl=function(n,t,r){return 1===arguments.length?n instanceof ut?et(n.h,n.s,n.l):_t(""+n,bt,et):et(+n,+t,+r)};var ja=ut.prototype=new rt;ja.brighter=function(n){return n=Math.pow(.7,arguments.length?n:1),et(this.h,this.s,this.l/n)},ja.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),et(this.h,this.s,n*this.l)},ja.rgb=function(){return it(this.h,this.s,this.l)},Bo.hcl=function(n,t,r){return 1===arguments.length?n instanceof at?ot(n.h,n.c,n.l):n instanceof lt?ht(n.l,n.a,n.b):ht((n=wt((n=Bo.rgb(n)).r,n.g,n.b)).l,n.a,n.b):ot(+n,+t,+r)};var Ha=at.prototype=new rt;Ha.brighter=function(n){return ot(this.h,this.c,Math.min(100,this.l+Fa*(arguments.length?n:1)))},Ha.darker=function(n){return ot(this.h,this.c,Math.max(0,this.l-Fa*(arguments.length?n:1)))},Ha.rgb=function(){return ct(this.h,this.c,this.l).rgb()},Bo.lab=function(n,t,r){return 1===arguments.length?n instanceof lt?st(n.l,n.a,n.b):n instanceof at?ct(n.l,n.c,n.h):wt((n=Bo.rgb(n)).r,n.g,n.b):st(+n,+t,+r)};var Fa=18,Oa=.95047,Ia=1,Ya=1.08883,Za=lt.prototype=new rt;Za.brighter=function(n){return st(Math.min(100,this.l+Fa*(arguments.length?n:1)),this.a,this.b)},Za.darker=function(n){return st(Math.max(0,this.l-Fa*(arguments.length?n:1)),this.a,this.b)},Za.rgb=function(){return ft(this.l,this.a,this.b)},Bo.rgb=function(n,t,r){return 1===arguments.length?n instanceof xt?yt(n.r,n.g,n.b):_t(""+n,yt,it):yt(~~n,~~t,~~r)};var Va=xt.prototype=new rt;Va.brighter=function(n){n=Math.pow(.7,arguments.length?n:1);var t=this.r,r=this.g,e=this.b,u=30;return t||r||e?(t&&u>t&&(t=u),r&&u>r&&(r=u),e&&u>e&&(e=u),yt(Math.min(255,~~(t/n)),Math.min(255,~~(r/n)),Math.min(255,~~(e/n)))):yt(u,u,u)},Va.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),yt(~~(n*this.r),~~(n*this.g),~~(n*this.b))},Va.hsl=function(){return bt(this.r,this.g,this.b)},Va.toString=function(){return"#"+Mt(this.r)+Mt(this.g)+Mt(this.b)};var $a=Bo.map({aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074});$a.forEach(function(n,t){$a.set(n,dt(t))}),Bo.functor=Et,Bo.xhr=Ct(At),Bo.dsv=function(n,t){function r(n,r,i){arguments.length<3&&(i=r,r=null);var o=Nt(n,t,null==r?e:u(r),i);return o.row=function(n){return arguments.length?o.response(null==(r=n)?e:u(n)):r},o}function e(n){return r.parse(n.responseText)}function u(n){return function(t){return r.parse(t.responseText,n)}}function i(t){return t.map(o).join(n)}function o(n){return a.test(n)?'"'+n.replace(/\"/g,'""')+'"':n}var a=new RegExp('["'+n+"\n]"),c=n.charCodeAt(0);return r.parse=function(n,t){var e;return r.parseRows(n,function(n,r){if(e)return e(n,r-1);var u=new Function("d","return {"+n.map(function(n,t){return JSON.stringify(n)+": d["+t+"]"}).join(",")+"}");e=t?function(n,r){return t(u(n),r)}:u})},r.parseRows=function(n,t){function r(){if(l>=s)return o;if(u)return u=!1,i;var t=l;if(34===n.charCodeAt(t)){for(var r=t;r++<s;)if(34===n.charCodeAt(r)){if(34!==n.charCodeAt(r+1))break;++r}l=r+2;var e=n.charCodeAt(r+1);return 13===e?(u=!0,10===n.charCodeAt(r+2)&&++l):10===e&&(u=!0),n.substring(t+1,r).replace(/""/g,'"')}for(;s>l;){var e=n.charCodeAt(l++),a=1;if(10===e)u=!0;else if(13===e)u=!0,10===n.charCodeAt(l)&&(++l,++a);else if(e!==c)continue;return n.substring(t,l-a)}return n.substring(t)}for(var e,u,i={},o={},a=[],s=n.length,l=0,f=0;(e=r())!==o;){for(var h=[];e!==i&&e!==o;)h.push(e),e=r();(!t||(h=t(h,f++)))&&a.push(h)}return a},r.format=function(t){if(Array.isArray(t[0]))return r.formatRows(t);var e=new h,u=[];return t.forEach(function(n){for(var t in n)e.has(t)||u.push(e.add(t))}),[u.map(o).join(n)].concat(t.map(function(t){return u.map(function(n){return o(t[n])}).join(n)})).join("\n")},r.formatRows=function(n){return n.map(i).join("\n")},r},Bo.csv=Bo.dsv(",","text/csv"),Bo.tsv=Bo.dsv("	","text/tab-separated-values"),Bo.touch=function(n,t,r){if(arguments.length<3&&(r=t,t=x().changedTouches),t)for(var e,u=0,i=t.length;i>u;++u)if((e=t[u]).identifier===r)return Z(n,e)};var Xa,Ba,Ja,Wa,Ga,Ka=Qo[p(Qo,"requestAnimationFrame")]||function(n){setTimeout(n,17)};Bo.timer=function(n,t,r){var e=arguments.length;2>e&&(t=0),3>e&&(r=Date.now());var u=r+t,i={c:n,t:u,f:!1,n:null};Ba?Ba.n=i:Xa=i,Ba=i,Ja||(Wa=clearTimeout(Wa),Ja=1,Ka(Lt))},Bo.timer.flush=function(){Tt(),qt()},Bo.round=function(n,t){return t?Math.round(n*(t=Math.pow(10,t)))/t:Math.round(n)};var Qa=["y","z","a","f","p","n","\xb5","m","","k","M","G","T","P","E","Z","Y"].map(Dt);Bo.formatPrefix=function(n,t){var r=0;return n&&(0>n&&(n*=-1),t&&(n=Bo.round(n,Rt(n,t))),r=1+Math.floor(1e-12+Math.log(n)/Math.LN10),r=Math.max(-24,Math.min(24,3*Math.floor((r-1)/3)))),Qa[8+r/3]};var nc=/(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,tc=Bo.map({b:function(n){return n.toString(2)},c:function(n){return String.fromCharCode(n)},o:function(n){return n.toString(8)},x:function(n){return n.toString(16)},X:function(n){return n.toString(16).toUpperCase()},g:function(n,t){return n.toPrecision(t)},e:function(n,t){return n.toExponential(t)},f:function(n,t){return n.toFixed(t)},r:function(n,t){return(n=Bo.round(n,Rt(n,t))).toFixed(Math.max(0,Math.min(20,Rt(n*(1+1e-15),t))))}}),rc=Bo.time={},ec=Date;jt.prototype={getDate:function(){return this._.getUTCDate()},getDay:function(){return this._.getUTCDay()},getFullYear:function(){return this._.getUTCFullYear()},getHours:function(){return this._.getUTCHours()},getMilliseconds:function(){return this._.getUTCMilliseconds()},getMinutes:function(){return this._.getUTCMinutes()},getMonth:function(){return this._.getUTCMonth()},getSeconds:function(){return this._.getUTCSeconds()},getTime:function(){return this._.getTime()},getTimezoneOffset:function(){return 0},valueOf:function(){return this._.valueOf()},setDate:function(){uc.setUTCDate.apply(this._,arguments)},setDay:function(){uc.setUTCDay.apply(this._,arguments)},setFullYear:function(){uc.setUTCFullYear.apply(this._,arguments)},setHours:function(){uc.setUTCHours.apply(this._,arguments)},setMilliseconds:function(){uc.setUTCMilliseconds.apply(this._,arguments)},setMinutes:function(){uc.setUTCMinutes.apply(this._,arguments)},setMonth:function(){uc.setUTCMonth.apply(this._,arguments)},setSeconds:function(){uc.setUTCSeconds.apply(this._,arguments)},setTime:function(){uc.setTime.apply(this._,arguments)}};var uc=Date.prototype;rc.year=Ht(function(n){return n=rc.day(n),n.setMonth(0,1),n},function(n,t){n.setFullYear(n.getFullYear()+t)},function(n){return n.getFullYear()}),rc.years=rc.year.range,rc.years.utc=rc.year.utc.range,rc.day=Ht(function(n){var t=new ec(2e3,0);return t.setFullYear(n.getFullYear(),n.getMonth(),n.getDate()),t},function(n,t){n.setDate(n.getDate()+t)},function(n){return n.getDate()-1}),rc.days=rc.day.range,rc.days.utc=rc.day.utc.range,rc.dayOfYear=function(n){var t=rc.year(n);return Math.floor((n-t-6e4*(n.getTimezoneOffset()-t.getTimezoneOffset()))/864e5)},["sunday","monday","tuesday","wednesday","thursday","friday","saturday"].forEach(function(n,t){t=7-t;var r=rc[n]=Ht(function(n){return(n=rc.day(n)).setDate(n.getDate()-(n.getDay()+t)%7),n},function(n,t){n.setDate(n.getDate()+7*Math.floor(t))},function(n){var r=rc.year(n).getDay();return Math.floor((rc.dayOfYear(n)+(r+t)%7)/7)-(r!==t)});rc[n+"s"]=r.range,rc[n+"s"].utc=r.utc.range,rc[n+"OfYear"]=function(n){var r=rc.year(n).getDay();return Math.floor((rc.dayOfYear(n)+(r+t)%7)/7)}}),rc.week=rc.sunday,rc.weeks=rc.sunday.range,rc.weeks.utc=rc.sunday.utc.range,rc.weekOfYear=rc.sundayOfYear;var ic={"-":"",_:" ",0:"0"},oc=/^\s*\d+/,ac=/^%/;Bo.locale=function(n){return{numberFormat:Pt(n),timeFormat:Ot(n)}};var cc=Bo.locale({decimal:".",thousands:",",grouping:[3],currency:["$",""],dateTime:"%a %b %e %X %Y",date:"%m/%d/%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});Bo.format=cc.numberFormat,Bo.geo={},cr.prototype={s:0,t:0,add:function(n){sr(n,this.t,sc),sr(sc.s,this.s,this),this.s?this.t+=sc.t:this.s=sc.t},reset:function(){this.s=this.t=0},valueOf:function(){return this.s}};var sc=new cr;Bo.geo.stream=function(n,t){n&&lc.hasOwnProperty(n.type)?lc[n.type](n,t):lr(n,t)};var lc={Feature:function(n,t){lr(n.geometry,t)},FeatureCollection:function(n,t){for(var r=n.features,e=-1,u=r.length;++e<u;)lr(r[e].geometry,t)}},fc={Sphere:function(n,t){t.sphere()},Point:function(n,t){n=n.coordinates,t.point(n[0],n[1],n[2])},MultiPoint:function(n,t){for(var r=n.coordinates,e=-1,u=r.length;++e<u;)n=r[e],t.point(n[0],n[1],n[2])},LineString:function(n,t){fr(n.coordinates,t,0)},MultiLineString:function(n,t){for(var r=n.coordinates,e=-1,u=r.length;++e<u;)fr(r[e],t,0)},Polygon:function(n,t){hr(n.coordinates,t)},MultiPolygon:function(n,t){for(var r=n.coordinates,e=-1,u=r.length;++e<u;)hr(r[e],t)},GeometryCollection:function(n,t){for(var r=n.geometries,e=-1,u=r.length;++e<u;)lr(r[e],t)}};Bo.geo.area=function(n){return hc=0,Bo.geo.stream(n,pc),hc};var hc,gc=new cr,pc={sphere:function(){hc+=4*ka},point:v,lineStart:v,lineEnd:v,polygonStart:function(){gc.reset(),pc.lineStart=gr},polygonEnd:function(){var n=2*gc;hc+=0>n?4*ka+n:n,pc.lineStart=pc.lineEnd=pc.point=v}};Bo.geo.bounds=function(){function n(n,t){x.push(M=[l=n,h=n]),f>t&&(f=t),t>g&&(g=t)}function t(t,r){var e=pr([t*za,r*za]);if(m){var u=dr(m,e),i=[u[1],-u[0],0],o=dr(i,u);xr(o),o=Mr(o);var c=t-p,s=c>0?1:-1,v=o[0]*La*s,d=ca(c)>180;if(d^(v>s*p&&s*t>v)){var y=o[1]*La;y>g&&(g=y)}else if(v=(v+360)%360-180,d^(v>s*p&&s*t>v)){var y=-o[1]*La;f>y&&(f=y)}else f>r&&(f=r),r>g&&(g=r);d?p>t?a(l,t)>a(l,h)&&(h=t):a(t,h)>a(l,h)&&(l=t):h>=l?(l>t&&(l=t),t>h&&(h=t)):t>p?a(l,t)>a(l,h)&&(h=t):a(t,h)>a(l,h)&&(l=t)}else n(t,r);m=e,p=t}function r(){_.point=t}function e(){M[0]=l,M[1]=h,_.point=n,m=null}function u(n,r){if(m){var e=n-p;y+=ca(e)>180?e+(e>0?360:-360):e}else v=n,d=r;pc.point(n,r),t(n,r)}function i(){pc.lineStart()}function o(){u(v,d),pc.lineEnd(),ca(y)>Ca&&(l=-(h=180)),M[0]=l,M[1]=h,m=null}function a(n,t){return(t-=n)<0?t+360:t}function c(n,t){return n[0]-t[0]}function s(n,t){return t[0]<=t[1]?t[0]<=n&&n<=t[1]:n<t[0]||t[1]<n}var l,f,h,g,p,v,d,m,y,x,M,_={point:n,lineStart:r,lineEnd:e,polygonStart:function(){_.point=u,_.lineStart=i,_.lineEnd=o,y=0,pc.polygonStart()},polygonEnd:function(){pc.polygonEnd(),_.point=n,_.lineStart=r,_.lineEnd=e,0>gc?(l=-(h=180),f=-(g=90)):y>Ca?g=90:-Ca>y&&(f=-90),M[0]=l,M[1]=h}};return function(n){g=h=-(l=f=1/0),x=[],Bo.geo.stream(n,_);var t=x.length;if(t){x.sort(c);for(var r,e=1,u=x[0],i=[u];t>e;++e)r=x[e],s(r[0],u)||s(r[1],u)?(a(u[0],r[1])>a(u[0],u[1])&&(u[1]=r[1]),a(r[0],u[1])>a(u[0],u[1])&&(u[0]=r[0])):i.push(u=r);for(var o,r,p=-1/0,t=i.length-1,e=0,u=i[t];t>=e;u=r,++e)r=i[e],(o=a(u[1],r[0]))>p&&(p=o,l=r[0],h=u[1])}return x=M=null,1/0===l||1/0===f?[[0/0,0/0],[0/0,0/0]]:[[l,f],[h,g]]
}}(),Bo.geo.centroid=function(n){vc=dc=mc=yc=xc=Mc=_c=bc=wc=Sc=kc=0,Bo.geo.stream(n,Ec);var t=wc,r=Sc,e=kc,u=t*t+r*r+e*e;return Na>u&&(t=Mc,r=_c,e=bc,Ca>dc&&(t=mc,r=yc,e=xc),u=t*t+r*r+e*e,Na>u)?[0/0,0/0]:[Math.atan2(r,t)*La,G(e/Math.sqrt(u))*La]};var vc,dc,mc,yc,xc,Mc,_c,bc,wc,Sc,kc,Ec={sphere:v,point:br,lineStart:Sr,lineEnd:kr,polygonStart:function(){Ec.lineStart=Er},polygonEnd:function(){Ec.lineStart=Sr}},Ac=Lr(Ar,Pr,jr,[-ka,-ka/2]),Cc=1e9;Bo.geo.clipExtent=function(){var n,t,r,e,u,i,o={stream:function(n){return u&&(u.valid=!1),u=i(n),u.valid=!0,u},extent:function(a){return arguments.length?(i=Or(n=+a[0][0],t=+a[0][1],r=+a[1][0],e=+a[1][1]),u&&(u.valid=!1,u=null),o):[[n,t],[r,e]]}};return o.extent([[0,0],[960,500]])},(Bo.geo.conicEqualArea=function(){return Yr(Zr)}).raw=Zr,Bo.geo.albers=function(){return Bo.geo.conicEqualArea().rotate([96,0]).center([-.6,38.7]).parallels([29.5,45.5]).scale(1070)},Bo.geo.albersUsa=function(){function n(n){var i=n[0],o=n[1];return t=null,r(i,o),t||(e(i,o),t)||u(i,o),t}var t,r,e,u,i=Bo.geo.albers(),o=Bo.geo.conicEqualArea().rotate([154,0]).center([-2,58.5]).parallels([55,65]),a=Bo.geo.conicEqualArea().rotate([157,0]).center([-3,19.9]).parallels([8,18]),c={point:function(n,r){t=[n,r]}};return n.invert=function(n){var t=i.scale(),r=i.translate(),e=(n[0]-r[0])/t,u=(n[1]-r[1])/t;return(u>=.12&&.234>u&&e>=-.425&&-.214>e?o:u>=.166&&.234>u&&e>=-.214&&-.115>e?a:i).invert(n)},n.stream=function(n){var t=i.stream(n),r=o.stream(n),e=a.stream(n);return{point:function(n,u){t.point(n,u),r.point(n,u),e.point(n,u)},sphere:function(){t.sphere(),r.sphere(),e.sphere()},lineStart:function(){t.lineStart(),r.lineStart(),e.lineStart()},lineEnd:function(){t.lineEnd(),r.lineEnd(),e.lineEnd()},polygonStart:function(){t.polygonStart(),r.polygonStart(),e.polygonStart()},polygonEnd:function(){t.polygonEnd(),r.polygonEnd(),e.polygonEnd()}}},n.precision=function(t){return arguments.length?(i.precision(t),o.precision(t),a.precision(t),n):i.precision()},n.scale=function(t){return arguments.length?(i.scale(t),o.scale(.35*t),a.scale(t),n.translate(i.translate())):i.scale()},n.translate=function(t){if(!arguments.length)return i.translate();var s=i.scale(),l=+t[0],f=+t[1];return r=i.translate(t).clipExtent([[l-.455*s,f-.238*s],[l+.455*s,f+.238*s]]).stream(c).point,e=o.translate([l-.307*s,f+.201*s]).clipExtent([[l-.425*s+Ca,f+.12*s+Ca],[l-.214*s-Ca,f+.234*s-Ca]]).stream(c).point,u=a.translate([l-.205*s,f+.212*s]).clipExtent([[l-.214*s+Ca,f+.166*s+Ca],[l-.115*s-Ca,f+.234*s-Ca]]).stream(c).point,n},n.scale(1070)};var Nc,zc,Lc,Tc,qc,Rc,Dc={point:v,lineStart:v,lineEnd:v,polygonStart:function(){zc=0,Dc.lineStart=Vr},polygonEnd:function(){Dc.lineStart=Dc.lineEnd=Dc.point=v,Nc+=ca(zc/2)}},Pc={point:$r,lineStart:v,lineEnd:v,polygonStart:v,polygonEnd:v},Uc={point:Jr,lineStart:Wr,lineEnd:Gr,polygonStart:function(){Uc.lineStart=Kr},polygonEnd:function(){Uc.point=Jr,Uc.lineStart=Wr,Uc.lineEnd=Gr}};Bo.geo.path=function(){function n(n){return n&&("function"==typeof a&&i.pointRadius(+a.apply(this,arguments)),o&&o.valid||(o=u(i)),Bo.geo.stream(n,o)),i.result()}function t(){return o=null,n}var r,e,u,i,o,a=4.5;return n.area=function(n){return Nc=0,Bo.geo.stream(n,u(Dc)),Nc},n.centroid=function(n){return mc=yc=xc=Mc=_c=bc=wc=Sc=kc=0,Bo.geo.stream(n,u(Uc)),kc?[wc/kc,Sc/kc]:bc?[Mc/bc,_c/bc]:xc?[mc/xc,yc/xc]:[0/0,0/0]},n.bounds=function(n){return qc=Rc=-(Lc=Tc=1/0),Bo.geo.stream(n,u(Pc)),[[Lc,Tc],[qc,Rc]]},n.projection=function(n){return arguments.length?(u=(r=n)?n.stream||te(n):At,t()):r},n.context=function(n){return arguments.length?(i=null==(e=n)?new Xr:new Qr(n),"function"!=typeof a&&i.pointRadius(a),t()):e},n.pointRadius=function(t){return arguments.length?(a="function"==typeof t?t:(i.pointRadius(+t),+t),n):a},n.projection(Bo.geo.albersUsa()).context(null)},Bo.geo.transform=function(n){return{stream:function(t){var r=new re(t);for(var e in n)r[e]=n[e];return r}}},re.prototype={point:function(n,t){this.stream.point(n,t)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}},Bo.geo.projection=ue,Bo.geo.projectionMutator=ie,(Bo.geo.equirectangular=function(){return ue(ae)}).raw=ae.invert=ae,Bo.geo.rotation=function(n){function t(t){return t=n(t[0]*za,t[1]*za),t[0]*=La,t[1]*=La,t}return n=se(n[0]%360*za,n[1]*za,n.length>2?n[2]*za:0),t.invert=function(t){return t=n.invert(t[0]*za,t[1]*za),t[0]*=La,t[1]*=La,t},t},ce.invert=ae,Bo.geo.circle=function(){function n(){var n="function"==typeof e?e.apply(this,arguments):e,t=se(-n[0]*za,-n[1]*za,0).invert,u=[];return r(null,null,1,{point:function(n,r){u.push(n=t(n,r)),n[0]*=La,n[1]*=La}}),{type:"Polygon",coordinates:[u]}}var t,r,e=[0,0],u=6;return n.origin=function(t){return arguments.length?(e=t,n):e},n.angle=function(e){return arguments.length?(r=ge((t=+e)*za,u*za),n):t},n.precision=function(e){return arguments.length?(r=ge(t*za,(u=+e)*za),n):u},n.angle(90)},Bo.geo.distance=function(n,t){var r,e=(t[0]-n[0])*za,u=n[1]*za,i=t[1]*za,o=Math.sin(e),a=Math.cos(e),c=Math.sin(u),s=Math.cos(u),l=Math.sin(i),f=Math.cos(i);return Math.atan2(Math.sqrt((r=f*o)*r+(r=s*l-c*f*a)*r),c*l+s*f*a)},Bo.geo.graticule=function(){function n(){return{type:"MultiLineString",coordinates:t()}}function t(){return Bo.range(Math.ceil(i/d)*d,u,d).map(h).concat(Bo.range(Math.ceil(s/m)*m,c,m).map(g)).concat(Bo.range(Math.ceil(e/p)*p,r,p).filter(function(n){return ca(n%d)>Ca}).map(l)).concat(Bo.range(Math.ceil(a/v)*v,o,v).filter(function(n){return ca(n%m)>Ca}).map(f))}var r,e,u,i,o,a,c,s,l,f,h,g,p=10,v=p,d=90,m=360,y=2.5;return n.lines=function(){return t().map(function(n){return{type:"LineString",coordinates:n}})},n.outline=function(){return{type:"Polygon",coordinates:[h(i).concat(g(c).slice(1),h(u).reverse().slice(1),g(s).reverse().slice(1))]}},n.extent=function(t){return arguments.length?n.majorExtent(t).minorExtent(t):n.minorExtent()},n.majorExtent=function(t){return arguments.length?(i=+t[0][0],u=+t[1][0],s=+t[0][1],c=+t[1][1],i>u&&(t=i,i=u,u=t),s>c&&(t=s,s=c,c=t),n.precision(y)):[[i,s],[u,c]]},n.minorExtent=function(t){return arguments.length?(e=+t[0][0],r=+t[1][0],a=+t[0][1],o=+t[1][1],e>r&&(t=e,e=r,r=t),a>o&&(t=a,a=o,o=t),n.precision(y)):[[e,a],[r,o]]},n.step=function(t){return arguments.length?n.majorStep(t).minorStep(t):n.minorStep()},n.majorStep=function(t){return arguments.length?(d=+t[0],m=+t[1],n):[d,m]},n.minorStep=function(t){return arguments.length?(p=+t[0],v=+t[1],n):[p,v]},n.precision=function(t){return arguments.length?(y=+t,l=ve(a,o,90),f=de(e,r,y),h=ve(s,c,90),g=de(i,u,y),n):y},n.majorExtent([[-180,-90+Ca],[180,90-Ca]]).minorExtent([[-180,-80-Ca],[180,80+Ca]])},Bo.geo.greatArc=function(){function n(){return{type:"LineString",coordinates:[t||e.apply(this,arguments),r||u.apply(this,arguments)]}}var t,r,e=me,u=ye;return n.distance=function(){return Bo.geo.distance(t||e.apply(this,arguments),r||u.apply(this,arguments))},n.source=function(r){return arguments.length?(e=r,t="function"==typeof r?null:r,n):e},n.target=function(t){return arguments.length?(u=t,r="function"==typeof t?null:t,n):u},n.precision=function(){return arguments.length?n:0},n},Bo.geo.interpolate=function(n,t){return xe(n[0]*za,n[1]*za,t[0]*za,t[1]*za)},Bo.geo.length=function(n){return jc=0,Bo.geo.stream(n,Hc),jc};var jc,Hc={sphere:v,point:v,lineStart:Me,lineEnd:v,polygonStart:v,polygonEnd:v},Fc=_e(function(n){return Math.sqrt(2/(1+n))},function(n){return 2*Math.asin(n/2)});(Bo.geo.azimuthalEqualArea=function(){return ue(Fc)}).raw=Fc;var Oc=_e(function(n){var t=Math.acos(n);return t&&t/Math.sin(t)},At);(Bo.geo.azimuthalEquidistant=function(){return ue(Oc)}).raw=Oc,(Bo.geo.conicConformal=function(){return Yr(be)}).raw=be,(Bo.geo.conicEquidistant=function(){return Yr(we)}).raw=we;var Ic=_e(function(n){return 1/n},Math.atan);(Bo.geo.gnomonic=function(){return ue(Ic)}).raw=Ic,Se.invert=function(n,t){return[n,2*Math.atan(Math.exp(t))-Aa]},(Bo.geo.mercator=function(){return ke(Se)}).raw=Se;var Yc=_e(function(){return 1},Math.asin);(Bo.geo.orthographic=function(){return ue(Yc)}).raw=Yc;var Zc=_e(function(n){return 1/(1+n)},function(n){return 2*Math.atan(n)});(Bo.geo.stereographic=function(){return ue(Zc)}).raw=Zc,Ee.invert=function(n,t){return[-t,2*Math.atan(Math.exp(n))-Aa]},(Bo.geo.transverseMercator=function(){var n=ke(Ee),t=n.center,r=n.rotate;return n.center=function(n){return n?t([-n[1],n[0]]):(n=t(),[-n[1],n[0]])},n.rotate=function(n){return n?r([n[0],n[1],n.length>2?n[2]+90:90]):(n=r(),[n[0],n[1],n[2]-90])},n.rotate([0,0])}).raw=Ee,Bo.geom={},Bo.geom.hull=function(n){function t(n){if(n.length<3)return[];var t,u=Et(r),i=Et(e),o=n.length,a=[],c=[];for(t=0;o>t;t++)a.push([+u.call(this,n[t],t),+i.call(this,n[t],t),t]);for(a.sort(ze),t=0;o>t;t++)c.push([a[t][0],-a[t][1]]);var s=Ne(a),l=Ne(c),f=l[0]===s[0],h=l[l.length-1]===s[s.length-1],g=[];for(t=s.length-1;t>=0;--t)g.push(n[a[s[t]][2]]);for(t=+f;t<l.length-h;++t)g.push(n[a[l[t]][2]]);return g}var r=Ae,e=Ce;return arguments.length?t(n):(t.x=function(n){return arguments.length?(r=n,t):r},t.y=function(n){return arguments.length?(e=n,t):e},t)},Bo.geom.polygon=function(n){return ga(n,Vc),n};var Vc=Bo.geom.polygon.prototype=[];Vc.area=function(){for(var n,t=-1,r=this.length,e=this[r-1],u=0;++t<r;)n=e,e=this[t],u+=n[1]*e[0]-n[0]*e[1];return.5*u},Vc.centroid=function(n){var t,r,e=-1,u=this.length,i=0,o=0,a=this[u-1];for(arguments.length||(n=-1/(6*this.area()));++e<u;)t=a,a=this[e],r=t[0]*a[1]-a[0]*t[1],i+=(t[0]+a[0])*r,o+=(t[1]+a[1])*r;return[i*n,o*n]},Vc.clip=function(n){for(var t,r,e,u,i,o,a=qe(n),c=-1,s=this.length-qe(this),l=this[s-1];++c<s;){for(t=n.slice(),n.length=0,u=this[c],i=t[(e=t.length-a)-1],r=-1;++r<e;)o=t[r],Le(o,l,u)?(Le(i,l,u)||n.push(Te(i,o,l,u)),n.push(o)):Le(i,l,u)&&n.push(Te(i,o,l,u)),i=o;a&&n.push(n[0]),l=u}return n};var $c,Xc,Bc,Jc,Wc,Gc=[],Kc=[];Oe.prototype.prepare=function(){for(var n,t=this.edges,r=t.length;r--;)n=t[r].edge,n.b&&n.a||t.splice(r,1);return t.sort(Ye),t.length},Qe.prototype={start:function(){return this.edge.l===this.site?this.edge.a:this.edge.b},end:function(){return this.edge.l===this.site?this.edge.b:this.edge.a}},nu.prototype={insert:function(n,t){var r,e,u;if(n){if(t.P=n,t.N=n.N,n.N&&(n.N.P=t),n.N=t,n.R){for(n=n.R;n.L;)n=n.L;n.L=t}else n.R=t;r=n}else this._?(n=uu(this._),t.P=null,t.N=n,n.P=n.L=t,r=n):(t.P=t.N=null,this._=t,r=null);for(t.L=t.R=null,t.U=r,t.C=!0,n=t;r&&r.C;)e=r.U,r===e.L?(u=e.R,u&&u.C?(r.C=u.C=!1,e.C=!0,n=e):(n===r.R&&(ru(this,r),n=r,r=n.U),r.C=!1,e.C=!0,eu(this,e))):(u=e.L,u&&u.C?(r.C=u.C=!1,e.C=!0,n=e):(n===r.L&&(eu(this,r),n=r,r=n.U),r.C=!1,e.C=!0,ru(this,e))),r=n.U;this._.C=!1},remove:function(n){n.N&&(n.N.P=n.P),n.P&&(n.P.N=n.N),n.N=n.P=null;var t,r,e,u=n.U,i=n.L,o=n.R;if(r=i?o?uu(o):i:o,u?u.L===n?u.L=r:u.R=r:this._=r,i&&o?(e=r.C,r.C=n.C,r.L=i,i.U=r,r!==o?(u=r.U,r.U=n.U,n=r.R,u.L=n,r.R=o,o.U=r):(r.U=u,u=r,n=r.R)):(e=n.C,n=r),n&&(n.U=u),!e){if(n&&n.C)return n.C=!1,void 0;do{if(n===this._)break;if(n===u.L){if(t=u.R,t.C&&(t.C=!1,u.C=!0,ru(this,u),t=u.R),t.L&&t.L.C||t.R&&t.R.C){t.R&&t.R.C||(t.L.C=!1,t.C=!0,eu(this,t),t=u.R),t.C=u.C,u.C=t.R.C=!1,ru(this,u),n=this._;break}}else if(t=u.L,t.C&&(t.C=!1,u.C=!0,eu(this,u),t=u.L),t.L&&t.L.C||t.R&&t.R.C){t.L&&t.L.C||(t.R.C=!1,t.C=!0,ru(this,t),t=u.L),t.C=u.C,u.C=t.L.C=!1,eu(this,u),n=this._;break}t.C=!0,n=u,u=u.U}while(!n.C);n&&(n.C=!1)}}},Bo.geom.voronoi=function(n){function t(n){var t=new Array(n.length),e=a[0][0],u=a[0][1],i=a[1][0],o=a[1][1];return iu(r(n),a).cells.forEach(function(r,a){var c=r.edges,s=r.site,l=t[a]=c.length?c.map(function(n){var t=n.start();return[t.x,t.y]}):s.x>=e&&s.x<=i&&s.y>=u&&s.y<=o?[[e,o],[i,o],[i,u],[e,u]]:[];l.point=n[a]}),t}function r(n){return n.map(function(n,t){return{x:Math.round(i(n,t)/Ca)*Ca,y:Math.round(o(n,t)/Ca)*Ca,i:t}})}var e=Ae,u=Ce,i=e,o=u,a=Qc;return n?t(n):(t.links=function(n){return iu(r(n)).edges.filter(function(n){return n.l&&n.r}).map(function(t){return{source:n[t.l.i],target:n[t.r.i]}})},t.triangles=function(n){var t=[];return iu(r(n)).cells.forEach(function(r,e){for(var u,i,o=r.site,a=r.edges.sort(Ye),c=-1,s=a.length,l=a[s-1].edge,f=l.l===o?l.r:l.l;++c<s;)u=l,i=f,l=a[c].edge,f=l.l===o?l.r:l.l,e<i.i&&e<f.i&&au(o,i,f)<0&&t.push([n[e],n[i.i],n[f.i]])}),t},t.x=function(n){return arguments.length?(i=Et(e=n),t):e},t.y=function(n){return arguments.length?(o=Et(u=n),t):u},t.clipExtent=function(n){return arguments.length?(a=null==n?Qc:n,t):a===Qc?null:a},t.size=function(n){return arguments.length?t.clipExtent(n&&[[0,0],n]):a===Qc?null:a&&a[1]},t)};var Qc=[[-1e6,-1e6],[1e6,1e6]];Bo.geom.delaunay=function(n){return Bo.geom.voronoi().triangles(n)},Bo.geom.quadtree=function(n,t,r,e,u){function i(n){function i(n,t,r,e,u,i,o,a){if(!isNaN(r)&&!isNaN(e))if(n.leaf){var c=n.x,l=n.y;if(null!=c)if(ca(c-r)+ca(l-e)<.01)s(n,t,r,e,u,i,o,a);else{var f=n.point;n.x=n.y=n.point=null,s(n,f,c,l,u,i,o,a),s(n,t,r,e,u,i,o,a)}else n.x=r,n.y=e,n.point=t}else s(n,t,r,e,u,i,o,a)}function s(n,t,r,e,u,o,a,c){var s=.5*(u+a),l=.5*(o+c),f=r>=s,h=e>=l,g=(h<<1)+f;n.leaf=!1,n=n.nodes[g]||(n.nodes[g]=lu()),f?u=s:a=s,h?o=l:c=l,i(n,t,r,e,u,o,a,c)}var l,f,h,g,p,v,d,m,y,x=Et(a),M=Et(c);if(null!=t)v=t,d=r,m=e,y=u;else if(m=y=-(v=d=1/0),f=[],h=[],p=n.length,o)for(g=0;p>g;++g)l=n[g],l.x<v&&(v=l.x),l.y<d&&(d=l.y),l.x>m&&(m=l.x),l.y>y&&(y=l.y),f.push(l.x),h.push(l.y);else for(g=0;p>g;++g){var _=+x(l=n[g],g),b=+M(l,g);v>_&&(v=_),d>b&&(d=b),_>m&&(m=_),b>y&&(y=b),f.push(_),h.push(b)}var w=m-v,S=y-d;w>S?y=d+w:m=v+S;var k=lu();if(k.add=function(n){i(k,n,+x(n,++g),+M(n,g),v,d,m,y)},k.visit=function(n){fu(n,k,v,d,m,y)},g=-1,null==t){for(;++g<p;)i(k,n[g],f[g],h[g],v,d,m,y);--g}else n.forEach(k.add);return f=h=n=l=null,k}var o,a=Ae,c=Ce;return(o=arguments.length)?(a=cu,c=su,3===o&&(u=r,e=t,r=t=0),i(n)):(i.x=function(n){return arguments.length?(a=n,i):a},i.y=function(n){return arguments.length?(c=n,i):c},i.extent=function(n){return arguments.length?(null==n?t=r=e=u=null:(t=+n[0][0],r=+n[0][1],e=+n[1][0],u=+n[1][1]),i):null==t?null:[[t,r],[e,u]]},i.size=function(n){return arguments.length?(null==n?t=r=e=u=null:(t=r=0,e=+n[0],u=+n[1]),i):null==t?null:[e-t,u-r]},i)},Bo.interpolateRgb=hu,Bo.interpolateObject=gu,Bo.interpolateNumber=pu,Bo.interpolateString=vu;var ns=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,ts=new RegExp(ns.source,"g");Bo.interpolate=du,Bo.interpolators=[function(n,t){var r=typeof t;return("string"===r?$a.has(t)||/^(#|rgb\(|hsl\()/.test(t)?hu:vu:t instanceof rt?hu:Array.isArray(t)?mu:"object"===r&&isNaN(t)?gu:pu)(n,t)}],Bo.interpolateArray=mu;var rs=function(){return At},es=Bo.map({linear:rs,poly:Su,quad:function(){return _u},cubic:function(){return bu},sin:function(){return ku},exp:function(){return Eu},circle:function(){return Au},elastic:Cu,back:Nu,bounce:function(){return zu}}),us=Bo.map({"in":At,out:xu,"in-out":Mu,"out-in":function(n){return Mu(xu(n))}});Bo.ease=function(n){var t=n.indexOf("-"),r=t>=0?n.substring(0,t):n,e=t>=0?n.substring(t+1):"in";return r=es.get(r)||rs,e=us.get(e)||At,yu(e(r.apply(null,Jo.call(arguments,1))))},Bo.interpolateHcl=Lu,Bo.interpolateHsl=Tu,Bo.interpolateLab=qu,Bo.interpolateRound=Ru,Bo.transform=function(n){var t=Go.createElementNS(Bo.ns.prefix.svg,"g");return(Bo.transform=function(n){if(null!=n){t.setAttribute("transform",n);var r=t.transform.baseVal.consolidate()}return new Du(r?r.matrix:is)})(n)},Du.prototype.toString=function(){return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")"};var is={a:1,b:0,c:0,d:1,e:0,f:0};Bo.interpolateTransform=Hu,Bo.layout={},Bo.layout.bundle=function(){return function(n){for(var t=[],r=-1,e=n.length;++r<e;)t.push(Iu(n[r]));return t}},Bo.layout.chord=function(){function n(){var n,s,f,h,g,p={},v=[],d=Bo.range(i),m=[];for(r=[],e=[],n=0,h=-1;++h<i;){for(s=0,g=-1;++g<i;)s+=u[h][g];v.push(s),m.push(Bo.range(i)),n+=s}for(o&&d.sort(function(n,t){return o(v[n],v[t])}),a&&m.forEach(function(n,t){n.sort(function(n,r){return a(u[t][n],u[t][r])})}),n=(Ea-l*i)/n,s=0,h=-1;++h<i;){for(f=s,g=-1;++g<i;){var y=d[h],x=m[y][g],M=u[y][x],_=s,b=s+=M*n;p[y+"-"+x]={index:y,subindex:x,startAngle:_,endAngle:b,value:M}}e[y]={index:y,startAngle:f,endAngle:s,value:(s-f)/n},s+=l}for(h=-1;++h<i;)for(g=h-1;++g<i;){var w=p[h+"-"+g],S=p[g+"-"+h];(w.value||S.value)&&r.push(w.value<S.value?{source:S,target:w}:{source:w,target:S})}c&&t()}function t(){r.sort(function(n,t){return c((n.source.value+n.target.value)/2,(t.source.value+t.target.value)/2)})}var r,e,u,i,o,a,c,s={},l=0;return s.matrix=function(n){return arguments.length?(i=(u=n)&&u.length,r=e=null,s):u},s.padding=function(n){return arguments.length?(l=n,r=e=null,s):l},s.sortGroups=function(n){return arguments.length?(o=n,r=e=null,s):o},s.sortSubgroups=function(n){return arguments.length?(a=n,r=null,s):a},s.sortChords=function(n){return arguments.length?(c=n,r&&t(),s):c},s.chords=function(){return r||n(),r},s.groups=function(){return e||n(),e},s},Bo.layout.force=function(){function n(n){return function(t,r,e,u){if(t.point!==n){var i=t.cx-n.x,o=t.cy-n.y,a=u-r,c=i*i+o*o;if(c>a*a/d){if(p>c){var s=t.charge/c;n.px-=i*s,n.py-=o*s}return!0}if(t.point&&c&&p>c){var s=t.pointCharge/c;n.px-=i*s,n.py-=o*s}}return!t.charge}}function t(n){n.px=Bo.event.x,n.py=Bo.event.y,a.resume()}var r,e,u,i,o,a={},c=Bo.dispatch("start","tick","end"),s=[1,1],l=.9,f=os,h=as,g=-30,p=cs,v=.1,d=.64,m=[],y=[];return a.tick=function(){if((e*=.99)<.005)return c.end({type:"end",alpha:e=0}),!0;var t,r,a,f,h,p,d,x,M,_=m.length,b=y.length;for(r=0;b>r;++r)a=y[r],f=a.source,h=a.target,x=h.x-f.x,M=h.y-f.y,(p=x*x+M*M)&&(p=e*i[r]*((p=Math.sqrt(p))-u[r])/p,x*=p,M*=p,h.x-=x*(d=f.weight/(h.weight+f.weight)),h.y-=M*d,f.x+=x*(d=1-d),f.y+=M*d);if((d=e*v)&&(x=s[0]/2,M=s[1]/2,r=-1,d))for(;++r<_;)a=m[r],a.x+=(x-a.x)*d,a.y+=(M-a.y)*d;if(g)for(Ju(t=Bo.geom.quadtree(m),e,o),r=-1;++r<_;)(a=m[r]).fixed||t.visit(n(a));for(r=-1;++r<_;)a=m[r],a.fixed?(a.x=a.px,a.y=a.py):(a.x-=(a.px-(a.px=a.x))*l,a.y-=(a.py-(a.py=a.y))*l);c.tick({type:"tick",alpha:e})},a.nodes=function(n){return arguments.length?(m=n,a):m},a.links=function(n){return arguments.length?(y=n,a):y},a.size=function(n){return arguments.length?(s=n,a):s},a.linkDistance=function(n){return arguments.length?(f="function"==typeof n?n:+n,a):f},a.distance=a.linkDistance,a.linkStrength=function(n){return arguments.length?(h="function"==typeof n?n:+n,a):h},a.friction=function(n){return arguments.length?(l=+n,a):l},a.charge=function(n){return arguments.length?(g="function"==typeof n?n:+n,a):g},a.chargeDistance=function(n){return arguments.length?(p=n*n,a):Math.sqrt(p)},a.gravity=function(n){return arguments.length?(v=+n,a):v},a.theta=function(n){return arguments.length?(d=n*n,a):Math.sqrt(d)},a.alpha=function(n){return arguments.length?(n=+n,e?e=n>0?n:0:n>0&&(c.start({type:"start",alpha:e=n}),Bo.timer(a.tick)),a):e},a.start=function(){function n(n,e){if(!r){for(r=new Array(c),a=0;c>a;++a)r[a]=[];for(a=0;s>a;++a){var u=y[a];r[u.source.index].push(u.target),r[u.target.index].push(u.source)}}for(var i,o=r[t],a=-1,s=o.length;++a<s;)if(!isNaN(i=o[a][n]))return i;return Math.random()*e}var t,r,e,c=m.length,l=y.length,p=s[0],v=s[1];for(t=0;c>t;++t)(e=m[t]).index=t,e.weight=0;for(t=0;l>t;++t)e=y[t],"number"==typeof e.source&&(e.source=m[e.source]),"number"==typeof e.target&&(e.target=m[e.target]),++e.source.weight,++e.target.weight;for(t=0;c>t;++t)e=m[t],isNaN(e.x)&&(e.x=n("x",p)),isNaN(e.y)&&(e.y=n("y",v)),isNaN(e.px)&&(e.px=e.x),isNaN(e.py)&&(e.py=e.y);if(u=[],"function"==typeof f)for(t=0;l>t;++t)u[t]=+f.call(this,y[t],t);else for(t=0;l>t;++t)u[t]=f;if(i=[],"function"==typeof h)for(t=0;l>t;++t)i[t]=+h.call(this,y[t],t);else for(t=0;l>t;++t)i[t]=h;if(o=[],"function"==typeof g)for(t=0;c>t;++t)o[t]=+g.call(this,m[t],t);else for(t=0;c>t;++t)o[t]=g;return a.resume()},a.resume=function(){return a.alpha(.1)},a.stop=function(){return a.alpha(0)},a.drag=function(){return r||(r=Bo.behavior.drag().origin(At).on("dragstart.force",Vu).on("drag.force",t).on("dragend.force",$u)),arguments.length?(this.on("mouseover.force",Xu).on("mouseout.force",Bu).call(r),void 0):r},Bo.rebind(a,c,"on")};var os=20,as=1,cs=1/0;Bo.layout.hierarchy=function(){function n(u){var i,o=[u],a=[];for(u.depth=0;null!=(i=o.pop());)if(a.push(i),(s=r.call(n,i,i.depth))&&(c=s.length)){for(var c,s,l;--c>=0;)o.push(l=s[c]),l.parent=i,l.depth=i.depth+1;e&&(i.value=0),i.children=s}else e&&(i.value=+e.call(n,i,i.depth)||0),delete i.children;return Ku(u,function(n){var r,u;t&&(r=n.children)&&r.sort(t),e&&(u=n.parent)&&(u.value+=n.value)}),a}var t=ti,r=Qu,e=ni;return n.sort=function(r){return arguments.length?(t=r,n):t},n.children=function(t){return arguments.length?(r=t,n):r},n.value=function(t){return arguments.length?(e=t,n):e},n.revalue=function(t){return e&&(Gu(t,function(n){n.children&&(n.value=0)}),Ku(t,function(t){var r;t.children||(t.value=+e.call(n,t,t.depth)||0),(r=t.parent)&&(r.value+=t.value)})),t},n},Bo.layout.partition=function(){function n(t,r,e,u){var i=t.children;if(t.x=r,t.y=t.depth*u,t.dx=e,t.dy=u,i&&(o=i.length)){var o,a,c,s=-1;for(e=t.value?e/t.value:0;++s<o;)n(a=i[s],r,c=a.value*e,u),r+=c}}function t(n){var r=n.children,e=0;if(r&&(u=r.length))for(var u,i=-1;++i<u;)e=Math.max(e,t(r[i]));return 1+e}function r(r,i){var o=e.call(this,r,i);return n(o[0],0,u[0],u[1]/t(o[0])),o}var e=Bo.layout.hierarchy(),u=[1,1];return r.size=function(n){return arguments.length?(u=n,r):u},Wu(r,e)},Bo.layout.pie=function(){function n(i){var o=i.map(function(r,e){return+t.call(n,r,e)}),a=+("function"==typeof e?e.apply(this,arguments):e),c=(("function"==typeof u?u.apply(this,arguments):u)-a)/Bo.sum(o),s=Bo.range(i.length);null!=r&&s.sort(r===ss?function(n,t){return o[t]-o[n]}:function(n,t){return r(i[n],i[t])});var l=[];return s.forEach(function(n){var t;l[n]={data:i[n],value:t=o[n],startAngle:a,endAngle:a+=t*c}}),l}var t=Number,r=ss,e=0,u=Ea;return n.value=function(r){return arguments.length?(t=r,n):t},n.sort=function(t){return arguments.length?(r=t,n):r},n.startAngle=function(t){return arguments.length?(e=t,n):e},n.endAngle=function(t){return arguments.length?(u=t,n):u},n};var ss={};Bo.layout.stack=function(){function n(a,c){var s=a.map(function(r,e){return t.call(n,r,e)}),l=s.map(function(t){return t.map(function(t,r){return[i.call(n,t,r),o.call(n,t,r)]})}),f=r.call(n,l,c);s=Bo.permute(s,f),l=Bo.permute(l,f);var h,g,p,v=e.call(n,l,c),d=s.length,m=s[0].length;for(g=0;m>g;++g)for(u.call(n,s[0][g],p=v[g],l[0][g][1]),h=1;d>h;++h)u.call(n,s[h][g],p+=l[h-1][g][1],l[h][g][1]);return a}var t=At,r=oi,e=ai,u=ii,i=ei,o=ui;return n.values=function(r){return arguments.length?(t=r,n):t},n.order=function(t){return arguments.length?(r="function"==typeof t?t:ls.get(t)||oi,n):r},n.offset=function(t){return arguments.length?(e="function"==typeof t?t:fs.get(t)||ai,n):e},n.x=function(t){return arguments.length?(i=t,n):i},n.y=function(t){return arguments.length?(o=t,n):o},n.out=function(t){return arguments.length?(u=t,n):u},n};var ls=Bo.map({"inside-out":function(n){var t,r,e=n.length,u=n.map(ci),i=n.map(si),o=Bo.range(e).sort(function(n,t){return u[n]-u[t]}),a=0,c=0,s=[],l=[];for(t=0;e>t;++t)r=o[t],c>a?(a+=i[r],s.push(r)):(c+=i[r],l.push(r));return l.reverse().concat(s)},reverse:function(n){return Bo.range(n.length).reverse()},"default":oi}),fs=Bo.map({silhouette:function(n){var t,r,e,u=n.length,i=n[0].length,o=[],a=0,c=[];for(r=0;i>r;++r){for(t=0,e=0;u>t;t++)e+=n[t][r][1];e>a&&(a=e),o.push(e)}for(r=0;i>r;++r)c[r]=(a-o[r])/2;return c},wiggle:function(n){var t,r,e,u,i,o,a,c,s,l=n.length,f=n[0],h=f.length,g=[];for(g[0]=c=s=0,r=1;h>r;++r){for(t=0,u=0;l>t;++t)u+=n[t][r][1];for(t=0,i=0,a=f[r][0]-f[r-1][0];l>t;++t){for(e=0,o=(n[t][r][1]-n[t][r-1][1])/(2*a);t>e;++e)o+=(n[e][r][1]-n[e][r-1][1])/a;i+=o*n[t][r][1]}g[r]=c-=u?i/u*a:0,s>c&&(s=c)}for(r=0;h>r;++r)g[r]-=s;return g},expand:function(n){var t,r,e,u=n.length,i=n[0].length,o=1/u,a=[];for(r=0;i>r;++r){for(t=0,e=0;u>t;t++)e+=n[t][r][1];if(e)for(t=0;u>t;t++)n[t][r][1]/=e;else for(t=0;u>t;t++)n[t][r][1]=o}for(r=0;i>r;++r)a[r]=0;return a},zero:ai});Bo.layout.histogram=function(){function n(n,i){for(var o,a,c=[],s=n.map(r,this),l=e.call(this,s,i),f=u.call(this,l,s,i),i=-1,h=s.length,g=f.length-1,p=t?1:1/h;++i<g;)o=c[i]=[],o.dx=f[i+1]-(o.x=f[i]),o.y=0;if(g>0)for(i=-1;++i<h;)a=s[i],a>=l[0]&&a<=l[1]&&(o=c[Bo.bisect(f,a,1,g)-1],o.y+=p,o.push(n[i]));return c}var t=!0,r=Number,e=gi,u=fi;return n.value=function(t){return arguments.length?(r=t,n):r},n.range=function(t){return arguments.length?(e=Et(t),n):e},n.bins=function(t){return arguments.length?(u="number"==typeof t?function(n){return hi(n,t)}:Et(t),n):u},n.frequency=function(r){return arguments.length?(t=!!r,n):t},n},Bo.layout.pack=function(){function n(n,i){var o=r.call(this,n,i),a=o[0],c=u[0],s=u[1],l=null==t?Math.sqrt:"function"==typeof t?t:function(){return t};if(a.x=a.y=0,Ku(a,function(n){n.r=+l(n.value)}),Ku(a,yi),e){var f=e*(t?1:Math.max(2*a.r/c,2*a.r/s))/2;Ku(a,function(n){n.r+=f}),Ku(a,yi),Ku(a,function(n){n.r-=f})}return _i(a,c/2,s/2,t?1:1/Math.max(2*a.r/c,2*a.r/s)),o}var t,r=Bo.layout.hierarchy().sort(pi),e=0,u=[1,1];return n.size=function(t){return arguments.length?(u=t,n):u},n.radius=function(r){return arguments.length?(t=null==r||"function"==typeof r?r:+r,n):t},n.padding=function(t){return arguments.length?(e=+t,n):e},Wu(n,r)},Bo.layout.tree=function(){function n(n,u){var l=o.call(this,n,u),f=l[0],h=t(f);if(Ku(h,r),h.parent.m=-h.z,Gu(h,e),s)Gu(f,i);else{var g=f,p=f,v=f;Gu(f,function(n){n.x<g.x&&(g=n),n.x>p.x&&(p=n),n.depth>v.depth&&(v=n)});var d=a(g,p)/2-g.x,m=c[0]/(p.x+a(p,g)/2+d),y=c[1]/(v.depth||1);Gu(f,function(n){n.x=(n.x+d)*m,n.y=n.depth*y})}return l}function t(n){for(var t,r={A:null,children:[n]},e=[r];null!=(t=e.pop());)for(var u,i=t.children,o=0,a=i.length;a>o;++o)e.push((i[o]=u={_:i[o],parent:t,children:(u=i[o].children)&&u.slice()||[],A:null,a:null,z:0,m:0,c:0,s:0,t:null,i:o}).a=u);return r.children[0]}function r(n){var t=n.children,r=n.parent.children,e=n.i?r[n.i-1]:null;if(t.length){Ai(n);var i=(t[0].z+t[t.length-1].z)/2;e?(n.z=e.z+a(n._,e._),n.m=n.z-i):n.z=i}else e&&(n.z=e.z+a(n._,e._));n.parent.A=u(n,e,n.parent.A||r[0])}function e(n){n._.x=n.z+n.parent.m,n.m+=n.parent.m}function u(n,t,r){if(t){for(var e,u=n,i=n,o=t,c=u.parent.children[0],s=u.m,l=i.m,f=o.m,h=c.m;o=ki(o),u=Si(u),o&&u;)c=Si(c),i=ki(i),i.a=n,e=o.z+f-u.z-s+a(o._,u._),e>0&&(Ei(Ci(o,n,r),n,e),s+=e,l+=e),f+=o.m,s+=u.m,h+=c.m,l+=i.m;o&&!ki(i)&&(i.t=o,i.m+=f-l),u&&!Si(c)&&(c.t=u,c.m+=s-h,r=n)}return r}function i(n){n.x*=c[0],n.y=n.depth*c[1]}var o=Bo.layout.hierarchy().sort(null).value(null),a=wi,c=[1,1],s=null;return n.separation=function(t){return arguments.length?(a=t,n):a},n.size=function(t){return arguments.length?(s=null==(c=t)?i:null,n):s?null:c},n.nodeSize=function(t){return arguments.length?(s=null==(c=t)?null:i,n):s?c:null},Wu(n,o)},Bo.layout.cluster=function(){function n(n,i){var o,a=t.call(this,n,i),c=a[0],s=0;Ku(c,function(n){var t=n.children;t&&t.length?(n.x=zi(t),n.y=Ni(t)):(n.x=o?s+=r(n,o):0,n.y=0,o=n)});var l=Li(c),f=Ti(c),h=l.x-r(l,f)/2,g=f.x+r(f,l)/2;return Ku(c,u?function(n){n.x=(n.x-c.x)*e[0],n.y=(c.y-n.y)*e[1]}:function(n){n.x=(n.x-h)/(g-h)*e[0],n.y=(1-(c.y?n.y/c.y:1))*e[1]}),a}var t=Bo.layout.hierarchy().sort(null).value(null),r=wi,e=[1,1],u=!1;return n.separation=function(t){return arguments.length?(r=t,n):r},n.size=function(t){return arguments.length?(u=null==(e=t),n):u?null:e},n.nodeSize=function(t){return arguments.length?(u=null!=(e=t),n):u?e:null},Wu(n,t)},Bo.layout.treemap=function(){function n(n,t){for(var r,e,u=-1,i=n.length;++u<i;)e=(r=n[u]).value*(0>t?0:t),r.area=isNaN(e)||0>=e?0:e}function t(r){var i=r.children;if(i&&i.length){var o,a,c,s=f(r),l=[],h=i.slice(),p=1/0,v="slice"===g?s.dx:"dice"===g?s.dy:"slice-dice"===g?1&r.depth?s.dy:s.dx:Math.min(s.dx,s.dy);for(n(h,s.dx*s.dy/r.value),l.area=0;(c=h.length)>0;)l.push(o=h[c-1]),l.area+=o.area,"squarify"!==g||(a=e(l,v))<=p?(h.pop(),p=a):(l.area-=l.pop().area,u(l,v,s,!1),v=Math.min(s.dx,s.dy),l.length=l.area=0,p=1/0);l.length&&(u(l,v,s,!0),l.length=l.area=0),i.forEach(t)}}function r(t){var e=t.children;if(e&&e.length){var i,o=f(t),a=e.slice(),c=[];for(n(a,o.dx*o.dy/t.value),c.area=0;i=a.pop();)c.push(i),c.area+=i.area,null!=i.z&&(u(c,i.z?o.dx:o.dy,o,!a.length),c.length=c.area=0);e.forEach(r)}}function e(n,t){for(var r,e=n.area,u=0,i=1/0,o=-1,a=n.length;++o<a;)(r=n[o].area)&&(i>r&&(i=r),r>u&&(u=r));return e*=e,t*=t,e?Math.max(t*u*p/e,e/(t*i*p)):1/0}function u(n,t,r,e){var u,i=-1,o=n.length,a=r.x,s=r.y,l=t?c(n.area/t):0;if(t==r.dx){for((e||l>r.dy)&&(l=r.dy);++i<o;)u=n[i],u.x=a,u.y=s,u.dy=l,a+=u.dx=Math.min(r.x+r.dx-a,l?c(u.area/l):0);u.z=!0,u.dx+=r.x+r.dx-a,r.y+=l,r.dy-=l}else{for((e||l>r.dx)&&(l=r.dx);++i<o;)u=n[i],u.x=a,u.y=s,u.dx=l,s+=u.dy=Math.min(r.y+r.dy-s,l?c(u.area/l):0);u.z=!1,u.dy+=r.y+r.dy-s,r.x+=l,r.dx-=l}}function i(e){var u=o||a(e),i=u[0];return i.x=0,i.y=0,i.dx=s[0],i.dy=s[1],o&&a.revalue(i),n([i],i.dx*i.dy/i.value),(o?r:t)(i),h&&(o=u),u}var o,a=Bo.layout.hierarchy(),c=Math.round,s=[1,1],l=null,f=qi,h=!1,g="squarify",p=.5*(1+Math.sqrt(5));return i.size=function(n){return arguments.length?(s=n,i):s},i.padding=function(n){function t(t){var r=n.call(i,t,t.depth);return null==r?qi(t):Ri(t,"number"==typeof r?[r,r,r,r]:r)}function r(t){return Ri(t,n)}if(!arguments.length)return l;var e;return f=null==(l=n)?qi:"function"==(e=typeof n)?t:"number"===e?(n=[n,n,n,n],r):r,i},i.round=function(n){return arguments.length?(c=n?Math.round:Number,i):c!=Number},i.sticky=function(n){return arguments.length?(h=n,o=null,i):h},i.ratio=function(n){return arguments.length?(p=n,i):p},i.mode=function(n){return arguments.length?(g=n+"",i):g},Wu(i,a)},Bo.random={normal:function(n,t){var r=arguments.length;return 2>r&&(t=1),1>r&&(n=0),function(){var r,e,u;do r=2*Math.random()-1,e=2*Math.random()-1,u=r*r+e*e;while(!u||u>1);return n+t*r*Math.sqrt(-2*Math.log(u)/u)}},logNormal:function(){var n=Bo.random.normal.apply(Bo,arguments);return function(){return Math.exp(n())}},bates:function(n){var t=Bo.random.irwinHall(n);return function(){return t()/n}},irwinHall:function(n){return function(){for(var t=0,r=0;n>r;r++)t+=Math.random();return t}}},Bo.scale={};var hs={floor:At,ceil:At};Bo.scale.linear=function(){return Oi([0,1],[0,1],du,!1)};var gs={s:1,g:1,p:1,r:1,e:1};Bo.scale.log=function(){return Ji(Bo.scale.linear().domain([0,1]),10,!0,[1,10])};var ps=Bo.format(".0e"),vs={floor:function(n){return-Math.ceil(-n)},ceil:function(n){return-Math.floor(-n)}};Bo.scale.pow=function(){return Wi(Bo.scale.linear(),1,[0,1])},Bo.scale.sqrt=function(){return Bo.scale.pow().exponent(.5)},Bo.scale.ordinal=function(){return Ki([],{t:"range",a:[[]]})},Bo.scale.category10=function(){return Bo.scale.ordinal().range(ds)},Bo.scale.category20=function(){return Bo.scale.ordinal().range(ms)},Bo.scale.category20b=function(){return Bo.scale.ordinal().range(ys)},Bo.scale.category20c=function(){return Bo.scale.ordinal().range(xs)};var ds=[2062260,16744206,2924588,14034728,9725885,9197131,14907330,8355711,12369186,1556175].map(mt),ms=[2062260,11454440,16744206,16759672,2924588,10018698,14034728,16750742,9725885,12955861,9197131,12885140,14907330,16234194,8355711,13092807,12369186,14408589,1556175,10410725].map(mt),ys=[3750777,5395619,7040719,10264286,6519097,9216594,11915115,13556636,9202993,12426809,15186514,15190932,8666169,11356490,14049643,15177372,8077683,10834324,13528509,14589654].map(mt),xs=[3244733,7057110,10406625,13032431,15095053,16616764,16625259,16634018,3253076,7652470,10607003,13101504,7695281,10394312,12369372,14342891,6513507,9868950,12434877,14277081].map(mt);Bo.scale.quantile=function(){return Qi([],[])},Bo.scale.quantize=function(){return no(0,1,[0,1])},Bo.scale.threshold=function(){return to([.5],[0,1])},Bo.scale.identity=function(){return ro([0,1])},Bo.svg={},Bo.svg.arc=function(){function n(){var n=t.apply(this,arguments),i=r.apply(this,arguments),o=e.apply(this,arguments)+Ms,a=u.apply(this,arguments)+Ms,c=(o>a&&(c=o,o=a,a=c),a-o),s=ka>c?"0":"1",l=Math.cos(o),f=Math.sin(o),h=Math.cos(a),g=Math.sin(a);
return c>=_s?n?"M0,"+i+"A"+i+","+i+" 0 1,1 0,"+-i+"A"+i+","+i+" 0 1,1 0,"+i+"M0,"+n+"A"+n+","+n+" 0 1,0 0,"+-n+"A"+n+","+n+" 0 1,0 0,"+n+"Z":"M0,"+i+"A"+i+","+i+" 0 1,1 0,"+-i+"A"+i+","+i+" 0 1,1 0,"+i+"Z":n?"M"+i*l+","+i*f+"A"+i+","+i+" 0 "+s+",1 "+i*h+","+i*g+"L"+n*h+","+n*g+"A"+n+","+n+" 0 "+s+",0 "+n*l+","+n*f+"Z":"M"+i*l+","+i*f+"A"+i+","+i+" 0 "+s+",1 "+i*h+","+i*g+"L0,0"+"Z"}var t=eo,r=uo,e=io,u=oo;return n.innerRadius=function(r){return arguments.length?(t=Et(r),n):t},n.outerRadius=function(t){return arguments.length?(r=Et(t),n):r},n.startAngle=function(t){return arguments.length?(e=Et(t),n):e},n.endAngle=function(t){return arguments.length?(u=Et(t),n):u},n.centroid=function(){var n=(t.apply(this,arguments)+r.apply(this,arguments))/2,i=(e.apply(this,arguments)+u.apply(this,arguments))/2+Ms;return[Math.cos(i)*n,Math.sin(i)*n]},n};var Ms=-Aa,_s=Ea-Ca;Bo.svg.line=function(){return ao(At)};var bs=Bo.map({linear:co,"linear-closed":so,step:lo,"step-before":fo,"step-after":ho,basis:xo,"basis-open":Mo,"basis-closed":_o,bundle:bo,cardinal:vo,"cardinal-open":go,"cardinal-closed":po,monotone:Co});bs.forEach(function(n,t){t.key=n,t.closed=/-closed$/.test(n)});var ws=[0,2/3,1/3,0],Ss=[0,1/3,2/3,0],ks=[0,1/6,2/3,1/6];Bo.svg.line.radial=function(){var n=ao(No);return n.radius=n.x,delete n.x,n.angle=n.y,delete n.y,n},fo.reverse=ho,ho.reverse=fo,Bo.svg.area=function(){return zo(At)},Bo.svg.area.radial=function(){var n=zo(No);return n.radius=n.x,delete n.x,n.innerRadius=n.x0,delete n.x0,n.outerRadius=n.x1,delete n.x1,n.angle=n.y,delete n.y,n.startAngle=n.y0,delete n.y0,n.endAngle=n.y1,delete n.y1,n},Bo.svg.chord=function(){function n(n,a){var c=t(this,i,n,a),s=t(this,o,n,a);return"M"+c.p0+e(c.r,c.p1,c.a1-c.a0)+(r(c,s)?u(c.r,c.p1,c.r,c.p0):u(c.r,c.p1,s.r,s.p0)+e(s.r,s.p1,s.a1-s.a0)+u(s.r,s.p1,c.r,c.p0))+"Z"}function t(n,t,r,e){var u=t.call(n,r,e),i=a.call(n,u,e),o=c.call(n,u,e)+Ms,l=s.call(n,u,e)+Ms;return{r:i,a0:o,a1:l,p0:[i*Math.cos(o),i*Math.sin(o)],p1:[i*Math.cos(l),i*Math.sin(l)]}}function r(n,t){return n.a0==t.a0&&n.a1==t.a1}function e(n,t,r){return"A"+n+","+n+" 0 "+ +(r>ka)+",1 "+t}function u(n,t,r,e){return"Q 0,0 "+e}var i=me,o=ye,a=Lo,c=io,s=oo;return n.radius=function(t){return arguments.length?(a=Et(t),n):a},n.source=function(t){return arguments.length?(i=Et(t),n):i},n.target=function(t){return arguments.length?(o=Et(t),n):o},n.startAngle=function(t){return arguments.length?(c=Et(t),n):c},n.endAngle=function(t){return arguments.length?(s=Et(t),n):s},n},Bo.svg.diagonal=function(){function n(n,u){var i=t.call(this,n,u),o=r.call(this,n,u),a=(i.y+o.y)/2,c=[i,{x:i.x,y:a},{x:o.x,y:a},o];return c=c.map(e),"M"+c[0]+"C"+c[1]+" "+c[2]+" "+c[3]}var t=me,r=ye,e=To;return n.source=function(r){return arguments.length?(t=Et(r),n):t},n.target=function(t){return arguments.length?(r=Et(t),n):r},n.projection=function(t){return arguments.length?(e=t,n):e},n},Bo.svg.diagonal.radial=function(){var n=Bo.svg.diagonal(),t=To,r=n.projection;return n.projection=function(n){return arguments.length?r(qo(t=n)):t},n},Bo.svg.symbol=function(){function n(n,e){return(Es.get(t.call(this,n,e))||Po)(r.call(this,n,e))}var t=Do,r=Ro;return n.type=function(r){return arguments.length?(t=Et(r),n):t},n.size=function(t){return arguments.length?(r=Et(t),n):r},n};var Es=Bo.map({circle:Po,cross:function(n){var t=Math.sqrt(n/5)/2;return"M"+-3*t+","+-t+"H"+-t+"V"+-3*t+"H"+t+"V"+-t+"H"+3*t+"V"+t+"H"+t+"V"+3*t+"H"+-t+"V"+t+"H"+-3*t+"Z"},diamond:function(n){var t=Math.sqrt(n/(2*zs)),r=t*zs;return"M0,"+-t+"L"+r+",0"+" 0,"+t+" "+-r+",0"+"Z"},square:function(n){var t=Math.sqrt(n)/2;return"M"+-t+","+-t+"L"+t+","+-t+" "+t+","+t+" "+-t+","+t+"Z"},"triangle-down":function(n){var t=Math.sqrt(n/Ns),r=t*Ns/2;return"M0,"+r+"L"+t+","+-r+" "+-t+","+-r+"Z"},"triangle-up":function(n){var t=Math.sqrt(n/Ns),r=t*Ns/2;return"M0,"+-r+"L"+t+","+r+" "+-t+","+r+"Z"}});Bo.svg.symbolTypes=Es.keys();var As,Cs,Ns=Math.sqrt(3),zs=Math.tan(30*za),Ls=[],Ts=0;Ls.call=ya.call,Ls.empty=ya.empty,Ls.node=ya.node,Ls.size=ya.size,Bo.transition=function(n){return arguments.length?As?n.transition():n:_a.transition()},Bo.transition.prototype=Ls,Ls.select=function(n){var t,r,e,u=this.id,i=[];n=b(n);for(var o=-1,a=this.length;++o<a;){i.push(t=[]);for(var c=this[o],s=-1,l=c.length;++s<l;)(e=c[s])&&(r=n.call(e,e.__data__,s,o))?("__data__"in e&&(r.__data__=e.__data__),Fo(r,s,u,e.__transition__[u]),t.push(r)):t.push(null)}return Uo(i,u)},Ls.selectAll=function(n){var t,r,e,u,i,o=this.id,a=[];n=w(n);for(var c=-1,s=this.length;++c<s;)for(var l=this[c],f=-1,h=l.length;++f<h;)if(e=l[f]){i=e.__transition__[o],r=n.call(e,e.__data__,f,c),a.push(t=[]);for(var g=-1,p=r.length;++g<p;)(u=r[g])&&Fo(u,g,o,i),t.push(u)}return Uo(a,o)},Ls.filter=function(n){var t,r,e,u=[];"function"!=typeof n&&(n=R(n));for(var i=0,o=this.length;o>i;i++){u.push(t=[]);for(var r=this[i],a=0,c=r.length;c>a;a++)(e=r[a])&&n.call(e,e.__data__,a,i)&&t.push(e)}return Uo(u,this.id)},Ls.tween=function(n,t){var r=this.id;return arguments.length<2?this.node().__transition__[r].tween.get(n):P(this,null==t?function(t){t.__transition__[r].tween.remove(n)}:function(e){e.__transition__[r].tween.set(n,t)})},Ls.attr=function(n,t){function r(){this.removeAttribute(a)}function e(){this.removeAttributeNS(a.space,a.local)}function u(n){return null==n?r:(n+="",function(){var t,r=this.getAttribute(a);return r!==n&&(t=o(r,n),function(n){this.setAttribute(a,t(n))})})}function i(n){return null==n?e:(n+="",function(){var t,r=this.getAttributeNS(a.space,a.local);return r!==n&&(t=o(r,n),function(n){this.setAttributeNS(a.space,a.local,t(n))})})}if(arguments.length<2){for(t in n)this.attr(t,n[t]);return this}var o="transform"==n?Hu:du,a=Bo.ns.qualify(n);return jo(this,"attr."+n,t,a.local?i:u)},Ls.attrTween=function(n,t){function r(n,r){var e=t.call(this,n,r,this.getAttribute(u));return e&&function(n){this.setAttribute(u,e(n))}}function e(n,r){var e=t.call(this,n,r,this.getAttributeNS(u.space,u.local));return e&&function(n){this.setAttributeNS(u.space,u.local,e(n))}}var u=Bo.ns.qualify(n);return this.tween("attr."+n,u.local?e:r)},Ls.style=function(n,t,r){function e(){this.style.removeProperty(n)}function u(t){return null==t?e:(t+="",function(){var e,u=Qo.getComputedStyle(this,null).getPropertyValue(n);return u!==t&&(e=du(u,t),function(t){this.style.setProperty(n,e(t),r)})})}var i=arguments.length;if(3>i){if("string"!=typeof n){2>i&&(t="");for(r in n)this.style(r,n[r],t);return this}r=""}return jo(this,"style."+n,t,u)},Ls.styleTween=function(n,t,r){function e(e,u){var i=t.call(this,e,u,Qo.getComputedStyle(this,null).getPropertyValue(n));return i&&function(t){this.style.setProperty(n,i(t),r)}}return arguments.length<3&&(r=""),this.tween("style."+n,e)},Ls.text=function(n){return jo(this,"text",n,Ho)},Ls.remove=function(){return this.each("end.transition",function(){var n;this.__transition__.count<2&&(n=this.parentNode)&&n.removeChild(this)})},Ls.ease=function(n){var t=this.id;return arguments.length<1?this.node().__transition__[t].ease:("function"!=typeof n&&(n=Bo.ease.apply(Bo,arguments)),P(this,function(r){r.__transition__[t].ease=n}))},Ls.delay=function(n){var t=this.id;return arguments.length<1?this.node().__transition__[t].delay:P(this,"function"==typeof n?function(r,e,u){r.__transition__[t].delay=+n.call(r,r.__data__,e,u)}:(n=+n,function(r){r.__transition__[t].delay=n}))},Ls.duration=function(n){var t=this.id;return arguments.length<1?this.node().__transition__[t].duration:P(this,"function"==typeof n?function(r,e,u){r.__transition__[t].duration=Math.max(1,n.call(r,r.__data__,e,u))}:(n=Math.max(1,n),function(r){r.__transition__[t].duration=n}))},Ls.each=function(n,t){var r=this.id;if(arguments.length<2){var e=Cs,u=As;As=r,P(this,function(t,e,u){Cs=t.__transition__[r],n.call(t,t.__data__,e,u)}),Cs=e,As=u}else P(this,function(e){var u=e.__transition__[r];(u.event||(u.event=Bo.dispatch("start","end"))).on(n,t)});return this},Ls.transition=function(){for(var n,t,r,e,u=this.id,i=++Ts,o=[],a=0,c=this.length;c>a;a++){o.push(n=[]);for(var t=this[a],s=0,l=t.length;l>s;s++)(r=t[s])&&(e=Object.create(r.__transition__[u]),e.delay+=e.duration,Fo(r,s,i,e)),n.push(r)}return Uo(o,i)},Bo.svg.axis=function(){function n(n){n.each(function(){var n,s=Bo.select(this),l=this.__chart__||r,f=this.__chart__=r.copy(),h=null==c?f.ticks?f.ticks.apply(f,a):f.domain():c,g=null==t?f.tickFormat?f.tickFormat.apply(f,a):At:t,p=s.selectAll(".tick").data(h,f),v=p.enter().insert("g",".domain").attr("class","tick").style("opacity",Ca),d=Bo.transition(p.exit()).style("opacity",Ca).remove(),m=Bo.transition(p.order()).style("opacity",1),y=Pi(f),x=s.selectAll(".domain").data([0]),M=(x.enter().append("path").attr("class","domain"),Bo.transition(x));v.append("line"),v.append("text");var _=v.select("line"),b=m.select("line"),w=p.select("text").text(g),S=v.select("text"),k=m.select("text");switch(e){case"bottom":n=Oo,_.attr("y2",u),S.attr("y",Math.max(u,0)+o),b.attr("x2",0).attr("y2",u),k.attr("x",0).attr("y",Math.max(u,0)+o),w.attr("dy",".71em").style("text-anchor","middle"),M.attr("d","M"+y[0]+","+i+"V0H"+y[1]+"V"+i);break;case"top":n=Oo,_.attr("y2",-u),S.attr("y",-(Math.max(u,0)+o)),b.attr("x2",0).attr("y2",-u),k.attr("x",0).attr("y",-(Math.max(u,0)+o)),w.attr("dy","0em").style("text-anchor","middle"),M.attr("d","M"+y[0]+","+-i+"V0H"+y[1]+"V"+-i);break;case"left":n=Io,_.attr("x2",-u),S.attr("x",-(Math.max(u,0)+o)),b.attr("x2",-u).attr("y2",0),k.attr("x",-(Math.max(u,0)+o)).attr("y",0),w.attr("dy",".32em").style("text-anchor","end"),M.attr("d","M"+-i+","+y[0]+"H0V"+y[1]+"H"+-i);break;case"right":n=Io,_.attr("x2",u),S.attr("x",Math.max(u,0)+o),b.attr("x2",u).attr("y2",0),k.attr("x",Math.max(u,0)+o).attr("y",0),w.attr("dy",".32em").style("text-anchor","start"),M.attr("d","M"+i+","+y[0]+"H0V"+y[1]+"H"+i)}if(f.rangeBand){var E=f,A=E.rangeBand()/2;l=f=function(n){return E(n)+A}}else l.rangeBand?l=f:d.call(n,f);v.call(n,l),m.call(n,f)})}var t,r=Bo.scale.linear(),e=qs,u=6,i=6,o=3,a=[10],c=null;return n.scale=function(t){return arguments.length?(r=t,n):r},n.orient=function(t){return arguments.length?(e=t in Rs?t+"":qs,n):e},n.ticks=function(){return arguments.length?(a=arguments,n):a},n.tickValues=function(t){return arguments.length?(c=t,n):c},n.tickFormat=function(r){return arguments.length?(t=r,n):t},n.tickSize=function(t){var r=arguments.length;return r?(u=+t,i=+arguments[r-1],n):u},n.innerTickSize=function(t){return arguments.length?(u=+t,n):u},n.outerTickSize=function(t){return arguments.length?(i=+t,n):i},n.tickPadding=function(t){return arguments.length?(o=+t,n):o},n.tickSubdivide=function(){return arguments.length&&n},n};var qs="bottom",Rs={top:1,right:1,bottom:1,left:1};Bo.svg.brush=function(){function n(i){i.each(function(){var i=Bo.select(this).style("pointer-events","all").style("-webkit-tap-highlight-color","rgba(0,0,0,0)").on("mousedown.brush",u).on("touchstart.brush",u),o=i.selectAll(".background").data([0]);o.enter().append("rect").attr("class","background").style("visibility","hidden").style("cursor","crosshair"),i.selectAll(".extent").data([0]).enter().append("rect").attr("class","extent").style("cursor","move");var a=i.selectAll(".resize").data(p,At);a.exit().remove(),a.enter().append("g").attr("class",function(n){return"resize "+n}).style("cursor",function(n){return Ds[n]}).append("rect").attr("x",function(n){return/[ew]$/.test(n)?-3:null}).attr("y",function(n){return/^[ns]/.test(n)?-3:null}).attr("width",6).attr("height",6).style("visibility","hidden"),a.style("display",n.empty()?"none":null);var l,f=Bo.transition(i),h=Bo.transition(o);c&&(l=Pi(c),h.attr("x",l[0]).attr("width",l[1]-l[0]),r(f)),s&&(l=Pi(s),h.attr("y",l[0]).attr("height",l[1]-l[0]),e(f)),t(f)})}function t(n){n.selectAll(".resize").attr("transform",function(n){return"translate("+l[+/e$/.test(n)]+","+f[+/^s/.test(n)]+")"})}function r(n){n.select(".extent").attr("x",l[0]),n.selectAll(".extent,.n>rect,.s>rect").attr("width",l[1]-l[0])}function e(n){n.select(".extent").attr("y",f[0]),n.selectAll(".extent,.e>rect,.w>rect").attr("height",f[1]-f[0])}function u(){function u(){32==Bo.event.keyCode&&(C||(x=null,z[0]-=l[1],z[1]-=f[1],C=2),y())}function p(){32==Bo.event.keyCode&&2==C&&(z[0]+=l[1],z[1]+=f[1],C=0,y())}function v(){var n=Bo.mouse(_),u=!1;M&&(n[0]+=M[0],n[1]+=M[1]),C||(Bo.event.altKey?(x||(x=[(l[0]+l[1])/2,(f[0]+f[1])/2]),z[0]=l[+(n[0]<x[0])],z[1]=f[+(n[1]<x[1])]):x=null),E&&d(n,c,0)&&(r(S),u=!0),A&&d(n,s,1)&&(e(S),u=!0),u&&(t(S),w({type:"brush",mode:C?"move":"resize"}))}function d(n,t,r){var e,u,a=Pi(t),c=a[0],s=a[1],p=z[r],v=r?f:l,d=v[1]-v[0];return C&&(c-=p,s-=d+p),e=(r?g:h)?Math.max(c,Math.min(s,n[r])):n[r],C?u=(e+=p)+d:(x&&(p=Math.max(c,Math.min(s,2*x[r]-e))),e>p?(u=e,e=p):u=p),v[0]!=e||v[1]!=u?(r?o=null:i=null,v[0]=e,v[1]=u,!0):void 0}function m(){v(),S.style("pointer-events","all").selectAll(".resize").style("display",n.empty()?"none":null),Bo.select("body").style("cursor",null),L.on("mousemove.brush",null).on("mouseup.brush",null).on("touchmove.brush",null).on("touchend.brush",null).on("keydown.brush",null).on("keyup.brush",null),N(),w({type:"brushend"})}var x,M,_=this,b=Bo.select(Bo.event.target),w=a.of(_,arguments),S=Bo.select(_),k=b.datum(),E=!/^(n|s)$/.test(k)&&c,A=!/^(e|w)$/.test(k)&&s,C=b.classed("extent"),N=Y(),z=Bo.mouse(_),L=Bo.select(Qo).on("keydown.brush",u).on("keyup.brush",p);if(Bo.event.changedTouches?L.on("touchmove.brush",v).on("touchend.brush",m):L.on("mousemove.brush",v).on("mouseup.brush",m),S.interrupt().selectAll("*").interrupt(),C)z[0]=l[0]-z[0],z[1]=f[0]-z[1];else if(k){var T=+/w$/.test(k),q=+/^n/.test(k);M=[l[1-T]-z[0],f[1-q]-z[1]],z[0]=l[T],z[1]=f[q]}else Bo.event.altKey&&(x=z.slice());S.style("pointer-events","none").selectAll(".resize").style("display",null),Bo.select("body").style("cursor",b.style("cursor")),w({type:"brushstart"}),v()}var i,o,a=M(n,"brushstart","brush","brushend"),c=null,s=null,l=[0,0],f=[0,0],h=!0,g=!0,p=Ps[0];return n.event=function(n){n.each(function(){var n=a.of(this,arguments),t={x:l,y:f,i:i,j:o},r=this.__chart__||t;this.__chart__=t,As?Bo.select(this).transition().each("start.brush",function(){i=r.i,o=r.j,l=r.x,f=r.y,n({type:"brushstart"})}).tween("brush:brush",function(){var r=mu(l,t.x),e=mu(f,t.y);return i=o=null,function(u){l=t.x=r(u),f=t.y=e(u),n({type:"brush",mode:"resize"})}}).each("end.brush",function(){i=t.i,o=t.j,n({type:"brush",mode:"resize"}),n({type:"brushend"})}):(n({type:"brushstart"}),n({type:"brush",mode:"resize"}),n({type:"brushend"}))})},n.x=function(t){return arguments.length?(c=t,p=Ps[!c<<1|!s],n):c},n.y=function(t){return arguments.length?(s=t,p=Ps[!c<<1|!s],n):s},n.clamp=function(t){return arguments.length?(c&&s?(h=!!t[0],g=!!t[1]):c?h=!!t:s&&(g=!!t),n):c&&s?[h,g]:c?h:s?g:null},n.extent=function(t){var r,e,u,a,h;return arguments.length?(c&&(r=t[0],e=t[1],s&&(r=r[0],e=e[0]),i=[r,e],c.invert&&(r=c(r),e=c(e)),r>e&&(h=r,r=e,e=h),(r!=l[0]||e!=l[1])&&(l=[r,e])),s&&(u=t[0],a=t[1],c&&(u=u[1],a=a[1]),o=[u,a],s.invert&&(u=s(u),a=s(a)),u>a&&(h=u,u=a,a=h),(u!=f[0]||a!=f[1])&&(f=[u,a])),n):(c&&(i?(r=i[0],e=i[1]):(r=l[0],e=l[1],c.invert&&(r=c.invert(r),e=c.invert(e)),r>e&&(h=r,r=e,e=h))),s&&(o?(u=o[0],a=o[1]):(u=f[0],a=f[1],s.invert&&(u=s.invert(u),a=s.invert(a)),u>a&&(h=u,u=a,a=h))),c&&s?[[r,u],[e,a]]:c?[r,e]:s&&[u,a])},n.clear=function(){return n.empty()||(l=[0,0],f=[0,0],i=o=null),n},n.empty=function(){return!!c&&l[0]==l[1]||!!s&&f[0]==f[1]},Bo.rebind(n,a,"on")};var Ds={n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},Ps=[["n","e","s","w","nw","ne","se","sw"],["e","w"],["n","s"],[]],Us=rc.format=cc.timeFormat,js=Us.utc,Hs=js("%Y-%m-%dT%H:%M:%S.%LZ");Us.iso=Date.prototype.toISOString&&+new Date("2000-01-01T00:00:00.000Z")?Yo:Hs,Yo.parse=function(n){var t=new Date(n);return isNaN(t)?null:t},Yo.toString=Hs.toString,rc.second=Ht(function(n){return new ec(1e3*Math.floor(n/1e3))},function(n,t){n.setTime(n.getTime()+1e3*Math.floor(t))},function(n){return n.getSeconds()}),rc.seconds=rc.second.range,rc.seconds.utc=rc.second.utc.range,rc.minute=Ht(function(n){return new ec(6e4*Math.floor(n/6e4))},function(n,t){n.setTime(n.getTime()+6e4*Math.floor(t))},function(n){return n.getMinutes()}),rc.minutes=rc.minute.range,rc.minutes.utc=rc.minute.utc.range,rc.hour=Ht(function(n){var t=n.getTimezoneOffset()/60;return new ec(36e5*(Math.floor(n/36e5-t)+t))},function(n,t){n.setTime(n.getTime()+36e5*Math.floor(t))},function(n){return n.getHours()}),rc.hours=rc.hour.range,rc.hours.utc=rc.hour.utc.range,rc.month=Ht(function(n){return n=rc.day(n),n.setDate(1),n},function(n,t){n.setMonth(n.getMonth()+t)},function(n){return n.getMonth()}),rc.months=rc.month.range,rc.months.utc=rc.month.utc.range;var Fs=[1e3,5e3,15e3,3e4,6e4,3e5,9e5,18e5,36e5,108e5,216e5,432e5,864e5,1728e5,6048e5,2592e6,7776e6,31536e6],Os=[[rc.second,1],[rc.second,5],[rc.second,15],[rc.second,30],[rc.minute,1],[rc.minute,5],[rc.minute,15],[rc.minute,30],[rc.hour,1],[rc.hour,3],[rc.hour,6],[rc.hour,12],[rc.day,1],[rc.day,2],[rc.week,1],[rc.month,1],[rc.month,3],[rc.year,1]],Is=Us.multi([[".%L",function(n){return n.getMilliseconds()}],[":%S",function(n){return n.getSeconds()}],["%I:%M",function(n){return n.getMinutes()}],["%I %p",function(n){return n.getHours()}],["%a %d",function(n){return n.getDay()&&1!=n.getDate()}],["%b %d",function(n){return 1!=n.getDate()}],["%B",function(n){return n.getMonth()}],["%Y",Ar]]),Ys={range:function(n,t,r){return Bo.range(Math.ceil(n/r)*r,+t,r).map(Vo)},floor:At,ceil:At};Os.year=rc.year,rc.scale=function(){return Zo(Bo.scale.linear(),Os,Is)};var Zs=Os.map(function(n){return[n[0].utc,n[1]]}),Vs=js.multi([[".%L",function(n){return n.getUTCMilliseconds()}],[":%S",function(n){return n.getUTCSeconds()}],["%I:%M",function(n){return n.getUTCMinutes()}],["%I %p",function(n){return n.getUTCHours()}],["%a %d",function(n){return n.getUTCDay()&&1!=n.getUTCDate()}],["%b %d",function(n){return 1!=n.getUTCDate()}],["%B",function(n){return n.getUTCMonth()}],["%Y",Ar]]);Zs.year=rc.year.utc,rc.scale.utc=function(){return Zo(Bo.scale.linear(),Zs,Vs)},Bo.text=Ct(function(n){return n.responseText}),Bo.json=function(n,t){return Nt(n,"application/json",$o,t)},Bo.html=function(n,t){return Nt(n,"text/html",Xo,t)},Bo.xml=Ct(function(n){return n.responseXML}),"function"==typeof define&&define.amd?define(Bo):"object"==typeof module&&module.exports?module.exports=Bo:this.d3=Bo}();(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ResourceModel    = require('./model/resource');
var ClassModel       = require('./model/class');
var MeModel          = require('./model/me');
var ClassViewCreate  = require('./view/class_create');
var ClassViewList    = require('./view/class_selectable_list');

module.exports = function ClassAddController (context) {
    var self = {};
    var resource_data;
    var resource_model;
    var class_models;
    var me;
    var view;

    self.render = function (d) {
        console.log('ClassAddController.render');
        console.log(d);

        me = MeModel()
            .data(context.datastore.get('me', 'me'));

        // class_id: class_model
        class_models = [];
        me.classes().forEach(function (d, i) {
            var class_data = context.datastore.get('classes', d);
            class_models.push(ClassModel().data(class_data));
        });


        resource_data  = context.datastore
                                .get('resources', d.resource_id);

        resource_model = ResourceModel()
                            .data(resource_data);

        // views
        class_list_view = ClassViewList()
            .classes(class_models);

        class_create = ClassViewCreate();

        // dispatchers
        class_list_view.dispatch
            .on('classSelected', function (d) {
                // d => ClassModel
                console.log('class selected', d.title());

                d.resources.add(resource_model.id());
                context.datastore
                       .set('classes', d.id(), d.data());

                context.hash.is({
                    controller: 'class',
                    action: 'view',
                    class_id: d.id(),
                    class_title: d.title()
                });
            });

        class_create.dispatch
            .on('classCreated', function (d) {
                // d => new class title
                var class_data = {
                    title: d,
                    id: context.datastore
                               .get('classes')
                               .count
                };
                console.log('created a new class: ', class_data);
                var new_class = ClassModel().data(class_data);

                me.classes.add(new_class.id());

                class_list_view
                    .add_class(new_class)
                    .update();

                // save data
                context.datastore.set('me', 'me', me.data());
                context.datastore
                       .set('classes',
                            new_class.id(),
                            new_class.data());

            });

        // layout
        context.body_sel.html('');
        class_list_view
            .container(
                context
                    .body_sel
                    .append('div')
                        .attr('class', 'class-list-container'));
        class_create
            .container(
                context
                    .body_sel
                    .append('div')
                        .attr('class', 'class-add-container'));

        class_list_view.render();
        class_create.render();
        
    };

    return self;
};
},{"./model/class":10,"./model/me":12,"./model/resource":13,"./view/class_create":16,"./view/class_selectable_list":18}],2:[function(require,module,exports){
var ResourceModel = require('./model/resource');
var ClassModel = require('./model/class');
var ClassViewResourceList = require('./view/class_resource_list');
var ClassAdd = require('./ClassAddController');

module.exports = function ClassController (context) {
    var self = {};

    self.actions = {};

    self.actions.add = ClassAdd(context);

    self.render = function (hash) {
        console.log('ClassAddController.render - '+
                    'overview of classes.');
        var class_data =
            context.datastore.get('classes', hash.class_id);

        var resource_models = [];
        var class_model = ClassModel().data(class_data);

        class_model.resources().forEach(function (d, i) {
            var resource_data = context.datastore
                                       .get('resources', d);
            var resource_model = ResourceModel()
                                    .data(resource_data);
            resource_models.push(resource_model);
        });

        class_view_resource_list = ClassViewResourceList()
            .container(context.body_sel)
            .classModel(class_model)
            .resourceModels(resource_models);

        class_view_resource_list.render();

        return self;
    };

    return self;
};
},{"./ClassAddController":1,"./model/class":10,"./model/resource":13,"./view/class_resource_list":17}],3:[function(require,module,exports){
var IndexView  = require('./view/index');

module.exports = function IndexController (context) {
    var self = {};

    self.render = function (d) {
        view  = IndexView()
                    .container(context.body_sel);

        view.render();
    };
    
    return self;
};
},{"./view/index":19}],4:[function(require,module,exports){
var MeModel = require('./model/me');

module.exports = function MeController (context) {
    var self = {};
    var view;

    self.model = MeModel();

    return self;
};
},{"./model/me":12}],5:[function(require,module,exports){
var TagModel      = require('./model/tag');
var EducatorModel = require('./model/educator');
var ResourceModel = require('./model/resource');
var ResourceView  = require('./view/resource');

module.exports = function ResourceController (context) {
    var self = {};
    var resource_data;
    var resource_model;
    var tag_models;
    var educator_models;
    var view;

    self.render = function (d) {
        resource_data  = context.datastore.get('resources', d.id);
        resource_model = ResourceModel().data(resource_data);

        tag_models = {};
        var tag_ids = resource_model.tags();
        tag_ids.forEach(function (d, i) {
            var tag = context.datastore.get('tags', d);
            tag_models[tag.id] = TagModel().data(tag);
        });

        educator_models = {};
        var educator_ids = resource_model.educators();
        educator_ids.forEach(function (d, i) {
            console.log('educator ids');
            console.log(d);
            var educator = context.datastore.get('educators', d);
            educator_models
                [educator.id] = EducatorModel()
                                    .data(educator);
        });

        view  = ResourceView()
                    .container(context.body_sel)
                    .resourceModel(resource_model)
                    .tags(tag_models)
                    .educators(educator_models);

        if (d.version) {
            view.version(d.version);
        }
        if (d.edit) {
            view.edit(d.edit);
        }

        view.dispatch
            .on('changeViewToTag.controller', function (d) {
                context.hash.is({
                    controller: 'tag',
                    action: 'view',
                    tag_id: d.id,
                    tag_name: d.name
                });
            })
            .on('addToClass.controller', function () {
                var version_number = view.version();
                var version = resource_model
                                    .versions
                                    .get(version_number);
                context.hash.is({
                    controller: 'class',
                    action: 'add',
                    type: 'resource',
                    resource_id: resource_model.id(),
                    resource_title: version.title
                });

            })
            .on('changeViewToClass.controller', function (d) {
                console.log('changeViewToClass');
                console.log(d);
            })
            .on('changeViewToEducator.controller', function (d) {
                console.log('changeViewToEducator');
                console.log(d);
            })
            .on('setVersion.controller', function () {
                stash_and_rerender_state();
                console.log('cancelEditable');
            })
            .on('setEditable.controller', function () {
                stash_and_rerender_state();
                console.log('cancelEditable');
            })
            .on('cancelEditable.controller', function () {
                stash_and_rerender_state();
                console.log('cancelEditable');
            })
            .on('saveEditable.controller', function (d) {
                console.log('save editable.');
                resource_model.versions.add(d);
                context.datastore.set('resources',
                                      resource_model.id(),
                                      resource_model.data());

                var version_number = resource_model
                                        .versions
                                        .count();
                var version = resource_model
                                    .versions
                                    .get(version_number);

                context.hash.is({
                    controller: 'resource',
                    action: view.edit() ? 'edit' : 'view',
                    id: resource_model.id(),
                    title: version.title,
                    version: version_number
                });
            });

        view.render();
    };

    function stash_and_rerender_state () {
        var version_number = view.version();
        var version = resource_model
                        .versions
                        .get(version_number);
        context.hash.is({
            controller: 'resource',
            action: view.edit() ? 'edit' : 'view',
            id: resource_model.id(),
            title: version.title,
            version: version_number
        });
    }
    
    return self;
};
},{"./model/educator":11,"./model/resource":13,"./model/tag":14,"./view/resource":20}],6:[function(require,module,exports){
var TagView = require('./view/tag');

module.exports = function TagController (context) {
    var self = {};
    var view;

    self.render = function (d) {
        console.log('ResourceController.render');

        view  = TagView();
                    // .container(context.body_sel);

        // attach dispatch messaging to view

        view.render();
    };

    return self;
};
},{"./view/tag":21}],7:[function(require,module,exports){
module.exports = function () {
    var self = {};
    var data = {
        resources: [{
            id: 0,
            versions: [{
            title: 'Mapping: The Journey as Context for narrative',
            body: {
                html: '<p><strong>Maps</strong><p>'+
                  '<p>'+
                  'They are fascinating because the context, '+
                  'representation, and conventions are all '+
                  'foreign to us. Some of the most interesting '+
                  'may be the stick charts from the Marshall '+
                  'Islands. These charts are generally made '+
                  'locally grown fiber plants. The arrangement '+
                  'or wave masses caused by winds, rather that '+
                  'approximately by shells ... or coral.'+
                  '</p>'+
                  '<p><strong>Defining the Location</strong></p>'+
                  '<p>'+
                  'Locate sites within the defined area that '+
                  'represent historical, political, cultural, ' +
                  'social,or environmental events.For example, '+
                  'you may note architectural landmarks, '+
                  'monuments, factories, rivers or other '+
                  'significant landformations. Thoroughly '+
                  'research your location. Be as creative '+
                  'as possible when examining your location.'+
                  '</p>'
            },
            tags: ["maps", "doug-scott", "making-meaning"]
            }],
            educators: ['colin@email.com']
        }, {
            id: 1,
            versions: [{
            title: 'Mapping: The Journey as Context for narrative',
            body: {
                html: '<p><strong>Maps</strong><p>'+
                  '<p>'+
                  'They are fascinating because the context, '+
                  'representation, and conventions are all '+
                  'foreign to us. Some of the most interesting '+
                  'may be the stick charts from the Marshall '+
                  'Islands. These charts are generally made '+
                  'locally grown fiber plants. The arrangement '+
                  'or wave masses caused by winds, rather that '+
                  'approximately by shells ... or coral.'+
                  '</p>'+
                  '<p><strong>Defining the Location</strong></p>'+
                  '<p>'+
                  'Locate sites within the defined area that '+
                  'represent historical, political, cultural, ' +
                  'social,or environmental events.For example, '+
                  'you may note architectural landmarks, '+
                  'monuments, factories, rivers or other '+
                  'significant landformations. Thoroughly '+
                  'research your location. Be as creative '+
                  'as possible when examining your location.'+
                  '</p>'
            },
            tags: ["maps", "doug-scott", "making-meaning"]
            }, {
            title: 'Mapping: The Journey as Context for Narrative',
            body: {
                html: '<p><strong>Maps!</strong><p>'+
                  '<p>'+
                  'They are fascinating because the context, '+
                  'representation, and conventions are all '+
                  'foreign to us. Some of the most interesting '+
                  'may be the stick charts from the Marshall '+
                  'Islands. These charts are generally made '+
                  'locally grown fiber plants. The arrangement '+
                  'or wave masses caused by winds, rather that '+
                  'approximately by shells ... or coral.'+
                  '</p>'+
                  '<p><strong>Defining the Location</strong></p>'+
                  '<p>'+
                  'Locate sites within the defined area that '+
                  'represent historical, political, cultural, ' +
                  'social,or environmental events.For example, '+
                  'you may note architectural landmarks, '+
                  'monuments, factories, rivers or other '+
                  'significant landformations. Thoroughly '+
                  'research your location. Be as creative '+
                  'as possible when examining your location.'+
                  '</p>'
            },
            tags: ["maps", "doug-scott", "making-meaning"]
            }],
            educators: ['anther@email.com']
        }],
        classes: [{
            id: 0,
            title: 'Colin\'s Class',
            resources: [0],
            educators: ['colin@email.com']
        }, {
            id: 1,
            title: 'Anther\'s Class',
            resources: [1],
            educators: ['anther@email.com']
        }],
        educators: [{
            id: 'colin@email.com',
            email: 'colin@email.com',
            first_name: 'Colin',
            last_name: 'Frazer',
            resources: [0],
            classes: [0]
        }, {
            id: 'anther@email.com',
            email: 'anther@email.com',
            first_name: 'Anther',
            last_name: 'Kiley',
            resources: [1],
            classes: [1]
        }],
        tags: [{
            id: "maps",
            name: "Maps"
        }, {
            id: "doug-scott",
            name: "Doug Scott"
        }, {
            id: "making-meaning",
            name: "Making Meaning"
        }],
        me: [{
          id: 'me',
          classes: [],
          resources: []
        }]
    };

    var meta = {
        resources: {
            count: data.resources.length
        },
        classes: {
            count: data.classes.length
        },
        educators: {
            count: data.educators.length
        },
        tags: {
            count: data.tags.length
        }
    };


    // initialize the data
    data.resources.forEach(function (d) {
        localStorage.setItem('resources!' + d.id,
                             JSON.stringify(d));
    });
    data.classes.forEach(function (d) {
        localStorage.setItem('classes!' + d.id,
                             JSON.stringify(d));
    });
    data.educators.forEach(function (d) {
        localStorage.setItem('educators!' + d.id,
                             JSON.stringify(d));
    });
    data.tags.forEach(function (d) {
      localStorage.setItem('tags!' + d.id,
                           JSON.stringify(d));
    });
    data.me.forEach(function (d) {
        localStorage.setItem('me!' + d.id,
                           JSON.stringify(d));
    });

    // initialize the metadata
    for (var key in meta) {
        localStorage
            .setItem(
                key,
                JSON.stringify(meta[key]));
    }

    self.set = function (namespace, id, d) {
        var update_metadata = false;
        var item_id = namespace;
        if (arguments.length === 3) {
            item_id += ('!' + id);

            if ((namespace !== 'me') &
                (!self.get(namespace, id))) {
                // `me` does not get updated
                // if this is a new namespace+id combo,
                // increment the metadata
                update_metadata = true;
            }
        }
        console.log('setting: ' + item_id);
        localStorage.setItem(item_id,
                             JSON.stringify(d));

        if (update_metadata) {
            var meta = self.get(namespace);
            meta.count += 1;
            localStorage.setItem(namespace,
                                 JSON.stringify(meta));
        }
    };

    self.get = function (namespace, id) {
        var item_id = namespace;
        if (arguments.length === 2) {
            item_id += ('!' + id);
        }

        return JSON.parse(
            localStorage.getItem(item_id));
    };


    return self;
};
},{}],8:[function(require,module,exports){
module.exports = function hashFactory () {
    var self = {};

    self.dispatch = d3.dispatch('change');

    d3.select(window)
        .on('hashchange', function () {
            var current = self.is();
            self.dispatch.change(current);
        });

    self.is = function (d) {
        // getter
        if (!arguments.length) {
            return parse_hash(window.location.hash);
        }

        // setter
        var hash = '/';
        if (d.controller === 'resource') {
            hash = format_resource_hash(d);
        }
        else
        if (d.controller === 'class') {
            hash = format_class_hash(d);
        }
        else
        if (d.controller === 'tag') {
            hash = format_tag_hash(d);
        }

        window.location = hash;
        console.log('set hash: ', hash);

        return hash;
    };

    function parse_hash (hash) {
        var integer_regex = /^\d+$/;

        if (hash.indexOf('#') === 0) {
            hash = hash.substr(1);
        }

        var args = (function (input) {
            output = [];
            input.forEach(function (d) {
                if (d.length > 0) {
                    output.push(d);
                }
            });
            return output;
        })(hash.split('/'));

        var parsed = {
            controller: 'index'
        };

        if (args[0] === 'resource') {
            parsed = {
                controller: 'resource',
                id: args[1],
                edit: false
            };
            if (args.length >= 3) {
                parsed.title = args[2];
            }
            if (args.length >= 4) {
                parsed.version = args[3];
            }
            if (args.length >= 5) {
                parsed.edit = true;
            }
        }
        else
        if (args[0] === 'class') {
            parsed = {
                controller: 'class',
                action: undefined
            };

            if (args.length >= 2) {
                if (args[1].match(integer_regex)) {
                    // viewing a particular class
                    parsed.class_id = args[1];
                    if (args.length >= 3) {
                        parsed.class_title = args[2];
                    }
                    if ((args.length >= 4) &
                        (args[3] === 'edit')) {
                        parsed.action = args[3];
                    }
                } else {
                    // some action is being taken on the class

                    if (args[1] === 'add') {
                        parsed.action = args[1];
                        if (args[2] === 'resource') {
                            parsed.type = args[2];

                            if (args.length >= 4) {
                                parsed.resource_id = args[3];
                            }
                        }
                    }
                }
            }
        }
        else
        if (args[0] === 'tag') {
            parsed = {
                controller: 'tag',
                action: 'view'
            }
        }

        return parsed;
    }

    function format_resource_hash(d) {
        var args = ['resource',
                    d.id,
                    d.title ?
                        escape_for_url(d.title) : 'resource',
                    d.version];

        if (d.action === 'edit') {
            args.push('edit');
        }

        return '#/' + args.join('/');
    }

    function format_class_hash (d) {
        var args = ['class'];
        // default action is to view
        if (d.action === 'add') {
            // action taken on the class
            // such as 'add' -- 'add to class'
            args.push(d.action);
            args.push(d.type);
            args.push(d.resource_id);
            args.push(escape_for_url(d.resource_title));
        } else {
            args.push(d.class_id);
            args.push(escape_for_url(d.class_title));
        }

        if (d.action === 'edit') {
            // should never be a state where
            // edit is true & action is a string
            args.push(d.action);
        }

        return '#/' + args.join('/');
    }

    function format_tag_hash (d) {
        var args = ['tag'];
        if (d.action === 'add') {
            args.push(d.action);
        }

        args.push(d.tag_id);
        args.push(d.name);

        return '#/' + args.join('/');
    }

    function escape_for_url (string) {
        return string.replace(/ /g, '-');
    }


    return self;
};
},{}],9:[function(require,module,exports){
var Hash     = require('./hash');
var Router   = require('./router');
var Data     = require('./fake_data');
var Resource = require('./ResourceViewController');
var Class    = require('./ClassViewController');
var Index    = require('./IndexViewController');
var Tag      = require('./TagViewController');
var Me       = require('./MeViewController');

var body_sel = d3.select('body');


database();


function database () {
    var context      = {};

    context.body_sel  = body_sel;
    context.hash      = Hash();
    context.datastore = Data();

    // view controllers
    context.resource  = Resource(context);
    context.class_    = Class(context);
    context.index     = Index(context);
    context.router    = Router(context);
    context.tag       = Tag(context);
    context.me        = Me(context);

    (function initialize () {
        context.router.initialize();
    })();
}
},{"./ClassViewController":2,"./IndexViewController":3,"./MeViewController":4,"./ResourceViewController":5,"./TagViewController":6,"./fake_data":7,"./hash":8,"./router":15}],10:[function(require,module,exports){
module.exports = function ClassModel () {
    var self = {};
    var id;
    var title;
    var educators = [];
    var resources = [];

    self.id = function () {
        return id;
    };

    self.title = function (x) {
        if (!arguments.length) return title;
        title = x;
        return self;
    };

    self.educators = function () {
        return educators;
    };
    self.educators.add = function (educator_id) {
        if (!arguments.length) throw "Need educator_id";
        
        var in_educators = false;
        educators.forEach(function (d, i) {
            if (d === educator_id) {
                in_educators = true;
            }
        });

        if (!in_educators) {
            educators.push(educator_id);
        }

        return self;
    };
    self.educators.remove = function (educator_id) {
        if (!arguments.length) throw "Need educator_id";
        var index_to_remove;
        educators.forEach(function (d, i) {
            if (d === educator_id) {
                index_to_remove = i;
            }
        });
        if (index_to_remove) {
            educators.splice(index_to_remove, 1);
        }
        return self;
    };

    self.resources = function () {
        return resources;
    };
    self.resources.add = function (resource_id) {
        if (!arguments.length) throw "Need resource_id";

        var in_resources = false;
        resources.forEach(function (d, i) {
            if (d === resource_id) {
                in_resources = true;
            }
        });

        if (!in_resources) {
            resources.push(resource_id);
        }

        return self;
    };
    self.resources.remove = function (resource_id) {
        if (!arguments.length) throw "Need resource_id";

        var index_to_remove;
        resources.forEach(function (d, i) {
            if (d === resource_id) {
                index_to_remove = i;
            }
        });

        if (index_to_remove) {
            resources.splice(index_to_remove, 1);
        }

        return self;
    };

    self.data = function (x) {
        if (!arguments.length) {
            return {
                id: id,
                title: title,
                educators: educators,
                resources: resources
            };
        }

        id = x.id;
        title = x.title;
        educators = x.educators || [];
        resources = x.resources || [];

        return self;
    };

    return self;
};
},{}],11:[function(require,module,exports){
module.exports = function EducatorModel () {
    var self = {};
    var email;
    var first_name = '';
    var last_name  = '';


    self.id = function () {
        return email_to_id(email);
    };

    self.email = function () {
        return email;
    };

    self.name = function () {
        return ((first_name) ? (first_name + ' ') : '') +
               last_name;
    };

    self.name.first = function () {
        return first_name;
    };

    self.name.last = function () {
        return last_name;
    };

    self.data = function (d) {
        if (!arguments.length) {
            return {
                id        : email_to_id(email),
                email     : email,
                first_name: first_name,
                last_name : last_name
            };
        }

        id         = d.id;
        email      = d.email;
        first_name = d.first_name;
        last_name  = d.last_name;

        return self;
    };

    function email_to_id (e) {
        return e.toLowerCase();
    }

    return self;
};
},{}],12:[function(require,module,exports){
// Tracks Educator logged in state, and
// keeps a reference to their Educator id

module.exports = function MeModel () {
    var self = {};
    var authenticated = false;

    var id;
    var classes   = [];
    var resources = [];

    self.id = function () {
        return id;
    };

    self.authenticated = function (x) {
        if (!arguments.length) return authenticated;
        authenticated = x;
        return self;
    };

    self.classes = function () {
        return classes;
    };
    self.classes.add = function (class_id) {
        if (!arguments.length) throw "Need class_id";

        var in_classes = false;
        classes.forEach(function (d, i) {
            if (d === class_id) {
                in_classes = true;
            }
        });

        if (!in_classes) {
            classes.push(class_id);
        }

        return self;
    };
    self.classes.remove = function (class_id) {
        if (!arguments.length) throw "Need class_id";

        var index_to_remove;
        classes.forEach(function (d, i) {
            if (d === class_id) {
                index_to_remove = i;
            }
        });

        if (index_to_remove) {
            classes.splice(index_to_remove, 1);
        }

        return self;
    };

    self.resources = function () {
        return resources;
    };

    self.data = function (x) {
        if (!arguments.length) {
            return {
                id       : id,
                classes  : classes,
                resources: resources
            };
        }

        id        = x.id;
        classes   = x.classes;
        resources = x.resources;

        return self;
    };

    return self;
};
},{}],13:[function(require,module,exports){
module.exports = function ResourceModel () {
    var self = {};

    var id;
    var versions = [];
    var educators  = [];
    var classes  = [];

    self.id = function () {
        return id;
    };

    self.versions = {};
    self.versions.add = function (resource) {
        // resources are not unique.
        // the view ensures a change has occured
        // before passing a new version in
        versions.push(resource);
        return self;
    };
    self.versions.get = function (version_id) {
        // don't make the user think about the fact
        // that counting starts from 0. Because
        // there will never be a version 0.
        if (version_id > versions.length) return undefined;
        
        return versions[version_id-1];
    };
    self.versions.count = function () {
        return versions.length;
    };
    self.versions.latest = function () {
        return self.versions.get(self.versions.count());
    };

    self.educators = function () {
        return educators;
    };
    self.educators.add = function (educator_id) {
        if (!arguments.length) throw "Need educator_id";

        var in_educators = false;
        educators.forEach(function (d, i) {
            if (d === educator_id) {
                in_educators = true;
            }
        });

        if (!in_educators) {
            educators.push(educator_id);
        }

        return self;
    };
    self.educators.remove = function (educator_id) {
        if (!arguments.length) throw "Need educator_id";

        var index_to_remove;
        educators.forEach(function (d, i) {
            if (d === educator_id) {
                index_to_remove = i;
            }
        });

        if (index_to_remove) {
            educators.splice(index_to_remove, 1);
        }

        return self;
    };

    self.tags = function () {
        var tags = [];
        versions.forEach(function (d, i) {
            tags = tags.concat(d.tags);
        });
        return get_unique(tags);
    };

    self.data = function (x) {
        if (!arguments.length) {
            return {
                id      : id,
                versions: versions,
                educators : educators,
                tags    : tags,
                classes : classes
            };
        }

        id       = x.id;
        versions = x.versions;
        educators  = x.educators;
        tags     = x.tags;
        classes  = x.classes;

        return self;
    };

    function get_unique (arr) {
        var u = {};
        var a = [];

        for (var i = 0; i < arr.length; i++) {
            if (u.hasOwnProperty(arr[i])) {
                continue;
            }
            a.push(arr[i]);
            u[arr[i]] = 1;
        }

        return a;
    }

    return self;
};
},{}],14:[function(require,module,exports){
// Tags are indexed by an escaped tag name
// this way, tags are normalized, and there
// will be no duplicate tags.

// 'tag!graphic-design' = { tag: 'Graphic Design'}

module.exports = function TagModel () {
    var self = {};
    var name;
    var resources = [];

    self.id = function () {
        return tag_to_id(name);
    };

    self.name = function () {
        return name;
    };

    self.resources = function () {
        return resources;
    };
    self.resources.add = function (resource_id) {
        if (!arguments.length) throw "Need resource_id";

        var clean = false;
        resources.forEach(function (d, i) {
            if (d === resource_id) {
                clean = true;
            }
        });

        if (!clean) {
            resources.push(resource_id);
        }

        return self;
    };
    self.resources.remove = function (resource_id) {
        if (!arguments.length) throw "Need resource_id";

        var index_to_remove;
        resources.forEach(function (d, i) {
            if (d === resource_id) {
                index_to_remove = i;
            }
        });

        if (index_to_remove) {
            resources.splice(index_to_remove, 1);
        }

        return self;
    };

    self.data = function (x) {
        if (!arguments.length) {
            return {
                id: self.id(),
                name: name,
                resources: resources
            };
        }

        id = x.id;
        name = x.name;
        resources = x.resources;

        return self;
    };

    function tag_to_id (t) {
        return t.toLowerCase().replace(/ /g, '-');
    }

    return self;
};
},{}],15:[function(require,module,exports){
module.exports = function router (context) {
    var self = {};
    var previous_view = {
        controller: 'index'
    };

    context.hash.dispatch
        .on('change.router', function (d) {
            set(d);
        });

    self.initialize = function () {
        set(context.hash.is());
        return self;
    };

    function set (d) {
        if (d.controller === 'resource') {
            context.resource.render(d);
        }
        else
        if (d.controller === 'class') {
            if (d.action) {
                context.class_.actions.add.render(d);
            } else {
                context.class_.render(d);
            }
        }
        else
        if (d.controller === 'tag') {
            console.log('route to tag');
            console.log(d);
            context.tag.render(d);
        }
        else
        if (d.controller === 'index') {
            context.index.render();
        }
        else
        if (d.controller === '404') {
            // context.error.render('404')
        }

        previous_view = d;
    }

    return self;
};
},{}],16:[function(require,module,exports){
module.exports = function ClassCreateView () {
    var self = {};
    var classes = [];

    var container_sel;

    self.dispatch = d3.dispatch('classCreated');

    self.container = function (sel) {
        if (!arguments.length) return container_sel;
        container_sel = sel;
        return self;
    };

    self.classes = function (x) {
        if (!arguments.length) return classes;
        classes = x;
        return self;
    };

    self.render = function () {
        var form = container_sel
            .append('div')
                .attr('class', 'class-create--wrapper')
            .append('form')
                .attr('name', 'class-create--form')
                .attr('onSubmit', 'return false;');

        var input =
            form.append('label')
                .attr('class', 'class-create--label')
                .text('New class title')
            .append('input')
                .attr('class', 'class-create--input')
                .attr('type', 'text');

        form.append('button')
                .attr('class', 'class-create--button')
                .attr('type', 'button')
                .attr('value', 'Create')
                .text('Create')
                .on('click', function () {
                    var new_class_name = input.property('value');
                    if (new_class_name.length > 0) {
                        self.dispatch
                            .classCreated(new_class_name);
                        input.property('value', '');
                    }
                });

        return self;
    };


    return self;
};
},{}],17:[function(require,module,exports){
module.exports = function ClassViewResourceList () {
    var self = {};
    var class_model;
    var resource_models;

    var container_sel;

    self.dispatch = d3.dispatch('x');

    self.container = function (sel) {
        if (!arguments.length) return container_sel;
        container_sel = sel;
        return self;
    };

    self.classModel = function (x) {
        if (!arguments.length) return class_model;
        class_model = x;
        return self;
    };

    self.resourceModels = function (x) {
        if (!arguments.length) return resource_models;
        resource_models = x;
        return self;
    };

    self.render = function () {
        container_sel
            .html('')
            .append('div')
                .attr('class',
                      'class-view-resource-list--wrapper')
            .append('h2')
                .text(class_model.title())
            .append('ul')
                .attr('class',
                      'class-view-resource-list--list')
            .selectAll('.class-view-resource-list--list-item')
            .data(resource_models)
            .enter()
            .append('li')
            .attr('class',
                  'class-view-resource-list--list-item')
            .append('p')
            .text(function (d) {
                return d.versions.latest().title;
            });

        return self;
    };


    return self;
};
},{}],18:[function(require,module,exports){
module.exports = function ClassSelectableListView () {
    var self = {};
    var classes = [];

    var container_sel;
    var list_sel_wrapper;

    self.dispatch = d3.dispatch('classSelected');

    self.container = function (sel) {
        if (!arguments.length) return container_sel;
        container_sel = sel;
        return self;
    };

    self.classes = function (x) {
        if (!arguments.length) return classes;
        classes = x;
        return self;
    };

    self.add_class = function (x) {
        if (!arguments.length) throw "Requires Class Model";
        classes.push(x);
        console.log('class selectable list view - add class');
        console.log(classes);
        return self;
    };

    self.render = function () {
        list_sel_wrapper = container_sel
            .append('div')
                .attr('class', 'selectable-class-list-wrapper')
            .append('ul')
                .attr('class', 'selectable-class-list');

        

        return self.update();
    };

    self.update = function () {
        list_sel_wrapper
            .selectAll('.selectable-class-list-item')
            .data(classes, function (d) { return d.id(); })
            .enter()
            .append('li')
                .attr('class', 'selectable-class-list-item')
                .on('click', function (d) {
                    self.dispatch.classSelected(d);
                })
            .append('p')
                .text(function (d) {
                    return d.title();
                });

        return self;
    };


    return self;
};
},{}],19:[function(require,module,exports){
module.exports = function IndexView () {
    var self = {};
    var container_sel;

    self.dispatch = d3.dispatch();

    self.container = function (sel) {
        if (!arguments.length) return container_sel;
        container_sel = sel;
        return self;
    };

    

    self.render = function () {
        var grid = container_sel
                        .html('')
                        .append('div')
                        .attr('class', 'grid');


        grid.append('h1').text('Databank.');
        grid.append('h4').text('The beginning.');

        grid.append('a')
            .attr('href', '#/resource/0/')
            .append('p')
            .text('A resource');

        grid.append('a')
            .attr('href', '#/resource/1/')
            .append('p')
            .text('Another resource');
        

        return self;
    };

    return self;
};
},{}],20:[function(require,module,exports){
module.exports = function ResourceView () {
    var self = {};

    var resource_model = {};
    var educators      = {};
    var tags           = {};
    var container_sel;

    var edit = false;
    var version_displayed;

    self.dispatch = d3.dispatch('addToClass',
                                'changeViewToClass',
                                'changeViewToTag',
                                'setEditable',
                                'cancelEditable',
                                'saveEditable',
                                'setVersion',
                                'changeViewToEducator');

    var layout_actionable_data = [{
        type: 'resource-structure',
        name: 'resource-actions',
        cls: 'col--resource--actions left fixed',
        layout: layout_actionable_actions
    }, {
        type: 'resource-structure',
        name: 'resource-content',
        cls: 'col--resource--body right',
        layout: layout_actionable_content
    }];

    var layout_editable_data = [{
        type: 'resource-structure',
        name: 'resource-content',
        cls: 'col--resource--body editable right',
        layout: layout_editable_content
    }];

    self.resourceModel = function (model) {
        if (!arguments.length) return resource_model;
        resource_model = model;
        return self;
    };

    self.tags = function (x) {
        if (!arguments.length) return tags;
        tags = x;
        return self;
    };

    self.educators = function (x) {
        if (!arguments.length) return educators;
        educators = x;
        return self;
    };

    self.container = function (sel) {
        if (!arguments.length) return container_sel;
        container_sel = sel;
        return self;
    };

    self.version = function (x) {
        if (!arguments.length) return version_displayed;
        version_displayed = +x;
        return self;
    };

    self.edit = function (x) {
        if (!arguments.length) return edit;
        edit = x;
        return self;
    };

    self.render = function () {
        if ((!self.version()) |
            (self.version() > resource_model
                                    .versions
                                    .count())) {

            self.version(resource_model
                            .versions
                            .count());
        }

        var grid = container_sel
                        .html('')
                        .append('div')
                        .attr('class', 'grid');

        var render_method;
        if (edit) {
            render_method = render_editable;
        } else {
            render_method = render_actionable;
        }

        grid.call(render_method);

        return self;
    };

    function render_editable (sel) {
        var layout = sel.selectAll('.resource-structure')
            .data(layout_editable_data)
            .enter()
            .append('div')
            .attr('class', function (d) {
                return d.cls + ' ' + d.type;
            })
            .each(function (d, i) {
                d3.select(this).call(d.layout);
            });
    }

    function render_actionable (sel) {

        var layout = sel.selectAll('.resource-structure')
            .data(layout_actionable_data)
            .enter()
            .append('div')
            .attr('class', function (d) {
                return d.cls + ' ' + d.type;
            })
            .each(function (d, i) {
                var sel = d3.select(this);
                sel.call(d.layout);
            });
    }

    function layout_actionable_actions (sel) {
        // edit
        sel.append('div')
            .attr('class', 'resource-action--edit')
            .on('click', function (d) {
                console.log('set editable');
                self.edit(true);
                self.dispatch.setEditable();
            })
            .append('p')
            .text('Edit this assignment.');

        console.log(resource_model.versions.count());
        // versions
        sel.append('div')
            .attr('class', 'resource-action--versions')
            .append('ul')
            .selectAll('.resource-action--versions--version')
            .data(d3.range(resource_model.versions.count()))
            .enter()
            .append('li')
            .attr('class', function (d) {
                var cls = 'resource-action--versions--version';
                if ((d + 1) === self.version()) {
                    cls += ' selected';
                }
                return cls;
            })
            .on('click', function (d) {
                console.log('set version');
                console.log(d+1);
                self.version(d+1);
                self.dispatch.setVersion();
            })
            .append('p')
            .text(function (d) {
                return 'v.' + (d+1);
            });

        // class
        var actions_class = sel.append('div')
            .attr('class', 'resource-action--class');

        actions_class.append('div')
            .attr('class', 'resource-action--class--add')
            .on('click', function () {
                self.dispatch.addToClass();
            })
            .append('p')
            .text('Add to Class');

        actions_class.append('div')
            .attr('class', 'resource-action--class--view')
            .on('click', function () {
                self.dispatch.changeViewToClass();
            })
            .append('p')
            .text('View Class');

    }

    function layout_actionable_content (sel) {
        var data = resource_model.data();

        var version = resource_model
                            .versions
                            .get(version_displayed);

        sel.append('h3')
            .attr('class', 'resource-content--title')
            .text(version.title);

        sel.append('div')
            .attr('class', 'resource-content--body')
            .html(version.body.html);

        sel.append('div')
            .attr('class', 'resource-content--tags')
            .append('p')
            .text('Tags')
            .append('ul')
            .selectAll('.resource-content--tags--tag')
            .data(version.tags)
            .enter()
            .append('li')
            .on('click', function (d) {
                console.log('change view to tag: ', d);
                self.dispatch.changeViewToTag({
                    id: d,
                    name: tags[d].name()
                });
            })
            .attr('class', 'resource-content--tags--tag')
            .append('p')
            .text(function (d) {
                return tags[d].name();
            });

        sel.append('div')
            .attr('class', 'resource-content--educators')
            .append('p')
            .text('Author')
            .append('ul')
            .selectAll('.resource-content'+
                       '--educators--educator')
            .data(resource_model.educators())
            .enter()
            .append('li')
            .on('click', function (d) {
                console.log('change view to educator: ', d);
                self.dispatch.changeViewToEducator({
                    id: d,
                    name: educators[d].name()
                });
            })
            .attr('class', 'resource-content'+
                           '--educators--educator')
            .append('p')
            .text(function (d) {
                console.log(educators);
                console.log(d);
                return educators[d].name();
            });
    }

    function layout_editable_content (sel) {
        var data = resource_model.data();

        var version = resource_model
                            .versions
                            .get(version_displayed);

        var form = sel.append('form')
            .attr('name', 'resource-content-form')
            .attr('onSubmit', 'return false;');

        var editable_title = form.append('input')
            .attr('type', 'text')
            .attr('name', 'resource-content--title--editable')
            .property('value', version.title);

        // replace with an html editor.
        // body.html in, pull out value and
        // stash it back into body.html
        var editable_body_html = form.append('textarea')
            .attr('id', 'resource-content--body--editable')
            .attr('name', 'resource-content--body--editable')
            .property('value', version.body.html);

        var editable_tags = form
            .selectAll('.resource-content--tags--editable')
            .data(version.tags)
            .enter()
            .append('label')
            .text(function (d) {
                return tags[d].name();
            })
            .append('input')
            .attr('class', 'resource-content--tags--editable')
            .attr('type', 'checkbox')
            .property('checked', true)
            .attr('value', function (d) {
                return d;
            });

        form.append('button')
            .attr('class', 'resource-content-form--button')
            .attr('type', 'button')
            .attr('value', 'Cancel')
            .text('Cancel')
            .on('click', function () {
                self.edit(false);
                self.dispatch.cancelEditable();
            });

        form.append('button')
            .attr('class', 'resource-content-form--button')
            .attr('type', 'submit')
            .attr('value', 'Save')
            .text('Save')
            .on('click', function () {
                self.edit(false);
                console.log('saved');
                var selected_tags_id = [];
                editable_tags.each(function (d, i) {
                    if (d3.select(this).property('checked')) {
                        selected_tags_id.push(d);
                    }
                });
                var new_version = {
                    title: editable_title.property('value'),
                    body: {
                        html: editable_body_html.property('value')
                    },
                    tags: selected_tags_id
                };

                if ((new_version.title !== version.title) |
                    (new_version.body.html !== version.body.html) |
                    (!(arrayEquals(new_version.tags,
                                 version.tags)))) {

                   self.dispatch.saveEditable(new_version);
                } else {
                    self.dispatch.cancelEditable();
                }
            });
    }

    function arrayEquals (arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        for (var i = arr1.length; i--; ) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }

    return self;
};
},{}],21:[function(require,module,exports){
module.exports = function ResourceView () {
    var self = {};

    self.render = function () {
  
        return self;
    };

    return self;
};
},{}]},{},[9])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9DbGFzc0FkZENvbnRyb2xsZXIuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9DbGFzc1ZpZXdDb250cm9sbGVyLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvSW5kZXhWaWV3Q29udHJvbGxlci5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL01lVmlld0NvbnRyb2xsZXIuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9SZXNvdXJjZVZpZXdDb250cm9sbGVyLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvVGFnVmlld0NvbnRyb2xsZXIuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9mYWtlX2RhdGEuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9oYXNoLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9tb2RlbC9jbGFzcy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL21vZGVsL2VkdWNhdG9yLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvbW9kZWwvbWUuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy9tb2RlbC9yZXNvdXJjZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL21vZGVsL3RhZy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL3JvdXRlci5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL3ZpZXcvY2xhc3NfY3JlYXRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvdmlldy9jbGFzc19yZXNvdXJjZV9saXN0LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvdmlldy9jbGFzc19zZWxlY3RhYmxlX2xpc3QuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvaW50ZXJuYXRpb25hbF9iaWVuaWFsX2dyYXBoaWNfZGVzaWduL2RhdGFiYW5rLWZyb250L3NyYy92aWV3L2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL2ludGVybmF0aW9uYWxfYmllbmlhbF9ncmFwaGljX2Rlc2lnbi9kYXRhYmFuay1mcm9udC9zcmMvdmlldy9yZXNvdXJjZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9pbnRlcm5hdGlvbmFsX2JpZW5pYWxfZ3JhcGhpY19kZXNpZ24vZGF0YWJhbmstZnJvbnQvc3JjL3ZpZXcvdGFnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVzb3VyY2VNb2RlbCAgICA9IHJlcXVpcmUoJy4vbW9kZWwvcmVzb3VyY2UnKTtcbnZhciBDbGFzc01vZGVsICAgICAgID0gcmVxdWlyZSgnLi9tb2RlbC9jbGFzcycpO1xudmFyIE1lTW9kZWwgICAgICAgICAgPSByZXF1aXJlKCcuL21vZGVsL21lJyk7XG52YXIgQ2xhc3NWaWV3Q3JlYXRlICA9IHJlcXVpcmUoJy4vdmlldy9jbGFzc19jcmVhdGUnKTtcbnZhciBDbGFzc1ZpZXdMaXN0ICAgID0gcmVxdWlyZSgnLi92aWV3L2NsYXNzX3NlbGVjdGFibGVfbGlzdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIENsYXNzQWRkQ29udHJvbGxlciAoY29udGV4dCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIHJlc291cmNlX2RhdGE7XG4gICAgdmFyIHJlc291cmNlX21vZGVsO1xuICAgIHZhciBjbGFzc19tb2RlbHM7XG4gICAgdmFyIG1lO1xuICAgIHZhciB2aWV3O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoZCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xhc3NBZGRDb250cm9sbGVyLnJlbmRlcicpO1xuICAgICAgICBjb25zb2xlLmxvZyhkKTtcblxuICAgICAgICBtZSA9IE1lTW9kZWwoKVxuICAgICAgICAgICAgLmRhdGEoY29udGV4dC5kYXRhc3RvcmUuZ2V0KCdtZScsICdtZScpKTtcblxuICAgICAgICAvLyBjbGFzc19pZDogY2xhc3NfbW9kZWxcbiAgICAgICAgY2xhc3NfbW9kZWxzID0gW107XG4gICAgICAgIG1lLmNsYXNzZXMoKS5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgY2xhc3NfZGF0YSA9IGNvbnRleHQuZGF0YXN0b3JlLmdldCgnY2xhc3NlcycsIGQpO1xuICAgICAgICAgICAgY2xhc3NfbW9kZWxzLnB1c2goQ2xhc3NNb2RlbCgpLmRhdGEoY2xhc3NfZGF0YSkpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIHJlc291cmNlX2RhdGEgID0gY29udGV4dC5kYXRhc3RvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgncmVzb3VyY2VzJywgZC5yZXNvdXJjZV9pZCk7XG5cbiAgICAgICAgcmVzb3VyY2VfbW9kZWwgPSBSZXNvdXJjZU1vZGVsKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0YShyZXNvdXJjZV9kYXRhKTtcblxuICAgICAgICAvLyB2aWV3c1xuICAgICAgICBjbGFzc19saXN0X3ZpZXcgPSBDbGFzc1ZpZXdMaXN0KClcbiAgICAgICAgICAgIC5jbGFzc2VzKGNsYXNzX21vZGVscyk7XG5cbiAgICAgICAgY2xhc3NfY3JlYXRlID0gQ2xhc3NWaWV3Q3JlYXRlKCk7XG5cbiAgICAgICAgLy8gZGlzcGF0Y2hlcnNcbiAgICAgICAgY2xhc3NfbGlzdF92aWV3LmRpc3BhdGNoXG4gICAgICAgICAgICAub24oJ2NsYXNzU2VsZWN0ZWQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIC8vIGQgPT4gQ2xhc3NNb2RlbFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjbGFzcyBzZWxlY3RlZCcsIGQudGl0bGUoKSk7XG5cbiAgICAgICAgICAgICAgICBkLnJlc291cmNlcy5hZGQocmVzb3VyY2VfbW9kZWwuaWQoKSk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5kYXRhc3RvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgLnNldCgnY2xhc3NlcycsIGQuaWQoKSwgZC5kYXRhKCkpO1xuXG4gICAgICAgICAgICAgICAgY29udGV4dC5oYXNoLmlzKHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NsYXNzJyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAndmlldycsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzX2lkOiBkLmlkKCksXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzX3RpdGxlOiBkLnRpdGxlKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNsYXNzX2NyZWF0ZS5kaXNwYXRjaFxuICAgICAgICAgICAgLm9uKCdjbGFzc0NyZWF0ZWQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIC8vIGQgPT4gbmV3IGNsYXNzIHRpdGxlXG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzX2RhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBkLFxuICAgICAgICAgICAgICAgICAgICBpZDogY29udGV4dC5kYXRhc3RvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCdjbGFzc2VzJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY291bnRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGEgbmV3IGNsYXNzOiAnLCBjbGFzc19kYXRhKTtcbiAgICAgICAgICAgICAgICB2YXIgbmV3X2NsYXNzID0gQ2xhc3NNb2RlbCgpLmRhdGEoY2xhc3NfZGF0YSk7XG5cbiAgICAgICAgICAgICAgICBtZS5jbGFzc2VzLmFkZChuZXdfY2xhc3MuaWQoKSk7XG5cbiAgICAgICAgICAgICAgICBjbGFzc19saXN0X3ZpZXdcbiAgICAgICAgICAgICAgICAgICAgLmFkZF9jbGFzcyhuZXdfY2xhc3MpXG4gICAgICAgICAgICAgICAgICAgIC51cGRhdGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIHNhdmUgZGF0YVxuICAgICAgICAgICAgICAgIGNvbnRleHQuZGF0YXN0b3JlLnNldCgnbWUnLCAnbWUnLCBtZS5kYXRhKCkpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZGF0YXN0b3JlXG4gICAgICAgICAgICAgICAgICAgICAgIC5zZXQoJ2NsYXNzZXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld19jbGFzcy5pZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld19jbGFzcy5kYXRhKCkpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBsYXlvdXRcbiAgICAgICAgY29udGV4dC5ib2R5X3NlbC5odG1sKCcnKTtcbiAgICAgICAgY2xhc3NfbGlzdF92aWV3XG4gICAgICAgICAgICAuY29udGFpbmVyKFxuICAgICAgICAgICAgICAgIGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgLmJvZHlfc2VsXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY2xhc3MtbGlzdC1jb250YWluZXInKSk7XG4gICAgICAgIGNsYXNzX2NyZWF0ZVxuICAgICAgICAgICAgLmNvbnRhaW5lcihcbiAgICAgICAgICAgICAgICBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgIC5ib2R5X3NlbFxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NsYXNzLWFkZC1jb250YWluZXInKSk7XG5cbiAgICAgICAgY2xhc3NfbGlzdF92aWV3LnJlbmRlcigpO1xuICAgICAgICBjbGFzc19jcmVhdGUucmVuZGVyKCk7XG4gICAgICAgIFxuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIFJlc291cmNlTW9kZWwgPSByZXF1aXJlKCcuL21vZGVsL3Jlc291cmNlJyk7XG52YXIgQ2xhc3NNb2RlbCA9IHJlcXVpcmUoJy4vbW9kZWwvY2xhc3MnKTtcbnZhciBDbGFzc1ZpZXdSZXNvdXJjZUxpc3QgPSByZXF1aXJlKCcuL3ZpZXcvY2xhc3NfcmVzb3VyY2VfbGlzdCcpO1xudmFyIENsYXNzQWRkID0gcmVxdWlyZSgnLi9DbGFzc0FkZENvbnRyb2xsZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBDbGFzc0NvbnRyb2xsZXIgKGNvbnRleHQpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuXG4gICAgc2VsZi5hY3Rpb25zID0ge307XG5cbiAgICBzZWxmLmFjdGlvbnMuYWRkID0gQ2xhc3NBZGQoY29udGV4dCk7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uIChoYXNoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGFzc0FkZENvbnRyb2xsZXIucmVuZGVyIC0gJytcbiAgICAgICAgICAgICAgICAgICAgJ292ZXJ2aWV3IG9mIGNsYXNzZXMuJyk7XG4gICAgICAgIHZhciBjbGFzc19kYXRhID1cbiAgICAgICAgICAgIGNvbnRleHQuZGF0YXN0b3JlLmdldCgnY2xhc3NlcycsIGhhc2guY2xhc3NfaWQpO1xuXG4gICAgICAgIHZhciByZXNvdXJjZV9tb2RlbHMgPSBbXTtcbiAgICAgICAgdmFyIGNsYXNzX21vZGVsID0gQ2xhc3NNb2RlbCgpLmRhdGEoY2xhc3NfZGF0YSk7XG5cbiAgICAgICAgY2xhc3NfbW9kZWwucmVzb3VyY2VzKCkuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIHJlc291cmNlX2RhdGEgPSBjb250ZXh0LmRhdGFzdG9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgncmVzb3VyY2VzJywgZCk7XG4gICAgICAgICAgICB2YXIgcmVzb3VyY2VfbW9kZWwgPSBSZXNvdXJjZU1vZGVsKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRhKHJlc291cmNlX2RhdGEpO1xuICAgICAgICAgICAgcmVzb3VyY2VfbW9kZWxzLnB1c2gocmVzb3VyY2VfbW9kZWwpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjbGFzc192aWV3X3Jlc291cmNlX2xpc3QgPSBDbGFzc1ZpZXdSZXNvdXJjZUxpc3QoKVxuICAgICAgICAgICAgLmNvbnRhaW5lcihjb250ZXh0LmJvZHlfc2VsKVxuICAgICAgICAgICAgLmNsYXNzTW9kZWwoY2xhc3NfbW9kZWwpXG4gICAgICAgICAgICAucmVzb3VyY2VNb2RlbHMocmVzb3VyY2VfbW9kZWxzKTtcblxuICAgICAgICBjbGFzc192aWV3X3Jlc291cmNlX2xpc3QucmVuZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgSW5kZXhWaWV3ICA9IHJlcXVpcmUoJy4vdmlldy9pbmRleCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEluZGV4Q29udHJvbGxlciAoY29udGV4dCkge1xuICAgIHZhciBzZWxmID0ge307XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHZpZXcgID0gSW5kZXhWaWV3KClcbiAgICAgICAgICAgICAgICAgICAgLmNvbnRhaW5lcihjb250ZXh0LmJvZHlfc2VsKTtcblxuICAgICAgICB2aWV3LnJlbmRlcigpO1xuICAgIH07XG4gICAgXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBNZU1vZGVsID0gcmVxdWlyZSgnLi9tb2RlbC9tZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIE1lQ29udHJvbGxlciAoY29udGV4dCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIHZpZXc7XG5cbiAgICBzZWxmLm1vZGVsID0gTWVNb2RlbCgpO1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBUYWdNb2RlbCAgICAgID0gcmVxdWlyZSgnLi9tb2RlbC90YWcnKTtcbnZhciBFZHVjYXRvck1vZGVsID0gcmVxdWlyZSgnLi9tb2RlbC9lZHVjYXRvcicpO1xudmFyIFJlc291cmNlTW9kZWwgPSByZXF1aXJlKCcuL21vZGVsL3Jlc291cmNlJyk7XG52YXIgUmVzb3VyY2VWaWV3ICA9IHJlcXVpcmUoJy4vdmlldy9yZXNvdXJjZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFJlc291cmNlQ29udHJvbGxlciAoY29udGV4dCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIHJlc291cmNlX2RhdGE7XG4gICAgdmFyIHJlc291cmNlX21vZGVsO1xuICAgIHZhciB0YWdfbW9kZWxzO1xuICAgIHZhciBlZHVjYXRvcl9tb2RlbHM7XG4gICAgdmFyIHZpZXc7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJlc291cmNlX2RhdGEgID0gY29udGV4dC5kYXRhc3RvcmUuZ2V0KCdyZXNvdXJjZXMnLCBkLmlkKTtcbiAgICAgICAgcmVzb3VyY2VfbW9kZWwgPSBSZXNvdXJjZU1vZGVsKCkuZGF0YShyZXNvdXJjZV9kYXRhKTtcblxuICAgICAgICB0YWdfbW9kZWxzID0ge307XG4gICAgICAgIHZhciB0YWdfaWRzID0gcmVzb3VyY2VfbW9kZWwudGFncygpO1xuICAgICAgICB0YWdfaWRzLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciB0YWcgPSBjb250ZXh0LmRhdGFzdG9yZS5nZXQoJ3RhZ3MnLCBkKTtcbiAgICAgICAgICAgIHRhZ19tb2RlbHNbdGFnLmlkXSA9IFRhZ01vZGVsKCkuZGF0YSh0YWcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlZHVjYXRvcl9tb2RlbHMgPSB7fTtcbiAgICAgICAgdmFyIGVkdWNhdG9yX2lkcyA9IHJlc291cmNlX21vZGVsLmVkdWNhdG9ycygpO1xuICAgICAgICBlZHVjYXRvcl9pZHMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2VkdWNhdG9yIGlkcycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZCk7XG4gICAgICAgICAgICB2YXIgZWR1Y2F0b3IgPSBjb250ZXh0LmRhdGFzdG9yZS5nZXQoJ2VkdWNhdG9ycycsIGQpO1xuICAgICAgICAgICAgZWR1Y2F0b3JfbW9kZWxzXG4gICAgICAgICAgICAgICAgW2VkdWNhdG9yLmlkXSA9IEVkdWNhdG9yTW9kZWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEoZWR1Y2F0b3IpO1xuICAgICAgICB9KTtcblxuICAgICAgICB2aWV3ICA9IFJlc291cmNlVmlldygpXG4gICAgICAgICAgICAgICAgICAgIC5jb250YWluZXIoY29udGV4dC5ib2R5X3NlbClcbiAgICAgICAgICAgICAgICAgICAgLnJlc291cmNlTW9kZWwocmVzb3VyY2VfbW9kZWwpXG4gICAgICAgICAgICAgICAgICAgIC50YWdzKHRhZ19tb2RlbHMpXG4gICAgICAgICAgICAgICAgICAgIC5lZHVjYXRvcnMoZWR1Y2F0b3JfbW9kZWxzKTtcblxuICAgICAgICBpZiAoZC52ZXJzaW9uKSB7XG4gICAgICAgICAgICB2aWV3LnZlcnNpb24oZC52ZXJzaW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZC5lZGl0KSB7XG4gICAgICAgICAgICB2aWV3LmVkaXQoZC5lZGl0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZpZXcuZGlzcGF0Y2hcbiAgICAgICAgICAgIC5vbignY2hhbmdlVmlld1RvVGFnLmNvbnRyb2xsZXInLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuaGFzaC5pcyh7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd0YWcnLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICd2aWV3JyxcbiAgICAgICAgICAgICAgICAgICAgdGFnX2lkOiBkLmlkLFxuICAgICAgICAgICAgICAgICAgICB0YWdfbmFtZTogZC5uYW1lXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdhZGRUb0NsYXNzLmNvbnRyb2xsZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZlcnNpb25fbnVtYmVyID0gdmlldy52ZXJzaW9uKCk7XG4gICAgICAgICAgICAgICAgdmFyIHZlcnNpb24gPSByZXNvdXJjZV9tb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZlcnNpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KHZlcnNpb25fbnVtYmVyKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmhhc2guaXMoe1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY2xhc3MnLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICdhZGQnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncmVzb3VyY2UnLFxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZV9pZDogcmVzb3VyY2VfbW9kZWwuaWQoKSxcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VfdGl0bGU6IHZlcnNpb24udGl0bGVcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2hhbmdlVmlld1RvQ2xhc3MuY29udHJvbGxlcicsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZVZpZXdUb0NsYXNzJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjaGFuZ2VWaWV3VG9FZHVjYXRvci5jb250cm9sbGVyJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlVmlld1RvRWR1Y2F0b3InKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3NldFZlcnNpb24uY29udHJvbGxlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzdGFzaF9hbmRfcmVyZW5kZXJfc3RhdGUoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2FuY2VsRWRpdGFibGUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3NldEVkaXRhYmxlLmNvbnRyb2xsZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc3Rhc2hfYW5kX3JlcmVuZGVyX3N0YXRlKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbmNlbEVkaXRhYmxlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjYW5jZWxFZGl0YWJsZS5jb250cm9sbGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHN0YXNoX2FuZF9yZXJlbmRlcl9zdGF0ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYW5jZWxFZGl0YWJsZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignc2F2ZUVkaXRhYmxlLmNvbnRyb2xsZXInLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzYXZlIGVkaXRhYmxlLicpO1xuICAgICAgICAgICAgICAgIHJlc291cmNlX21vZGVsLnZlcnNpb25zLmFkZChkKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmRhdGFzdG9yZS5zZXQoJ3Jlc291cmNlcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlX21vZGVsLmlkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlX21vZGVsLmRhdGEoKSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgdmVyc2lvbl9udW1iZXIgPSByZXNvdXJjZV9tb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52ZXJzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jb3VudCgpO1xuICAgICAgICAgICAgICAgIHZhciB2ZXJzaW9uID0gcmVzb3VyY2VfbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52ZXJzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCh2ZXJzaW9uX251bWJlcik7XG5cbiAgICAgICAgICAgICAgICBjb250ZXh0Lmhhc2guaXMoe1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncmVzb3VyY2UnLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHZpZXcuZWRpdCgpID8gJ2VkaXQnIDogJ3ZpZXcnLFxuICAgICAgICAgICAgICAgICAgICBpZDogcmVzb3VyY2VfbW9kZWwuaWQoKSxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHZlcnNpb24udGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb246IHZlcnNpb25fbnVtYmVyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB2aWV3LnJlbmRlcigpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzdGFzaF9hbmRfcmVyZW5kZXJfc3RhdGUgKCkge1xuICAgICAgICB2YXIgdmVyc2lvbl9udW1iZXIgPSB2aWV3LnZlcnNpb24oKTtcbiAgICAgICAgdmFyIHZlcnNpb24gPSByZXNvdXJjZV9tb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgLnZlcnNpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KHZlcnNpb25fbnVtYmVyKTtcbiAgICAgICAgY29udGV4dC5oYXNoLmlzKHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyZXNvdXJjZScsXG4gICAgICAgICAgICBhY3Rpb246IHZpZXcuZWRpdCgpID8gJ2VkaXQnIDogJ3ZpZXcnLFxuICAgICAgICAgICAgaWQ6IHJlc291cmNlX21vZGVsLmlkKCksXG4gICAgICAgICAgICB0aXRsZTogdmVyc2lvbi50aXRsZSxcbiAgICAgICAgICAgIHZlcnNpb246IHZlcnNpb25fbnVtYmVyXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIFRhZ1ZpZXcgPSByZXF1aXJlKCcuL3ZpZXcvdGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gVGFnQ29udHJvbGxlciAoY29udGV4dCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIHZpZXc7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXNvdXJjZUNvbnRyb2xsZXIucmVuZGVyJyk7XG5cbiAgICAgICAgdmlldyAgPSBUYWdWaWV3KCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIC5jb250YWluZXIoY29udGV4dC5ib2R5X3NlbCk7XG5cbiAgICAgICAgLy8gYXR0YWNoIGRpc3BhdGNoIG1lc3NhZ2luZyB0byB2aWV3XG5cbiAgICAgICAgdmlldy5yZW5kZXIoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHJlc291cmNlczogW3tcbiAgICAgICAgICAgIGlkOiAwLFxuICAgICAgICAgICAgdmVyc2lvbnM6IFt7XG4gICAgICAgICAgICB0aXRsZTogJ01hcHBpbmc6IFRoZSBKb3VybmV5IGFzIENvbnRleHQgZm9yIG5hcnJhdGl2ZScsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgaHRtbDogJzxwPjxzdHJvbmc+TWFwczwvc3Ryb25nPjxwPicrXG4gICAgICAgICAgICAgICAgICAnPHA+JytcbiAgICAgICAgICAgICAgICAgICdUaGV5IGFyZSBmYXNjaW5hdGluZyBiZWNhdXNlIHRoZSBjb250ZXh0LCAnK1xuICAgICAgICAgICAgICAgICAgJ3JlcHJlc2VudGF0aW9uLCBhbmQgY29udmVudGlvbnMgYXJlIGFsbCAnK1xuICAgICAgICAgICAgICAgICAgJ2ZvcmVpZ24gdG8gdXMuIFNvbWUgb2YgdGhlIG1vc3QgaW50ZXJlc3RpbmcgJytcbiAgICAgICAgICAgICAgICAgICdtYXkgYmUgdGhlIHN0aWNrIGNoYXJ0cyBmcm9tIHRoZSBNYXJzaGFsbCAnK1xuICAgICAgICAgICAgICAgICAgJ0lzbGFuZHMuIFRoZXNlIGNoYXJ0cyBhcmUgZ2VuZXJhbGx5IG1hZGUgJytcbiAgICAgICAgICAgICAgICAgICdsb2NhbGx5IGdyb3duIGZpYmVyIHBsYW50cy4gVGhlIGFycmFuZ2VtZW50ICcrXG4gICAgICAgICAgICAgICAgICAnb3Igd2F2ZSBtYXNzZXMgY2F1c2VkIGJ5IHdpbmRzLCByYXRoZXIgdGhhdCAnK1xuICAgICAgICAgICAgICAgICAgJ2FwcHJveGltYXRlbHkgYnkgc2hlbGxzIC4uLiBvciBjb3JhbC4nK1xuICAgICAgICAgICAgICAgICAgJzwvcD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPjxzdHJvbmc+RGVmaW5pbmcgdGhlIExvY2F0aW9uPC9zdHJvbmc+PC9wPicrXG4gICAgICAgICAgICAgICAgICAnPHA+JytcbiAgICAgICAgICAgICAgICAgICdMb2NhdGUgc2l0ZXMgd2l0aGluIHRoZSBkZWZpbmVkIGFyZWEgdGhhdCAnK1xuICAgICAgICAgICAgICAgICAgJ3JlcHJlc2VudCBoaXN0b3JpY2FsLCBwb2xpdGljYWwsIGN1bHR1cmFsLCAnICtcbiAgICAgICAgICAgICAgICAgICdzb2NpYWwsb3IgZW52aXJvbm1lbnRhbCBldmVudHMuRm9yIGV4YW1wbGUsICcrXG4gICAgICAgICAgICAgICAgICAneW91IG1heSBub3RlIGFyY2hpdGVjdHVyYWwgbGFuZG1hcmtzLCAnK1xuICAgICAgICAgICAgICAgICAgJ21vbnVtZW50cywgZmFjdG9yaWVzLCByaXZlcnMgb3Igb3RoZXIgJytcbiAgICAgICAgICAgICAgICAgICdzaWduaWZpY2FudCBsYW5kZm9ybWF0aW9ucy4gVGhvcm91Z2hseSAnK1xuICAgICAgICAgICAgICAgICAgJ3Jlc2VhcmNoIHlvdXIgbG9jYXRpb24uIEJlIGFzIGNyZWF0aXZlICcrXG4gICAgICAgICAgICAgICAgICAnYXMgcG9zc2libGUgd2hlbiBleGFtaW5pbmcgeW91ciBsb2NhdGlvbi4nK1xuICAgICAgICAgICAgICAgICAgJzwvcD4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFnczogW1wibWFwc1wiLCBcImRvdWctc2NvdHRcIiwgXCJtYWtpbmctbWVhbmluZ1wiXVxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBlZHVjYXRvcnM6IFsnY29saW5AZW1haWwuY29tJ11cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICB2ZXJzaW9uczogW3tcbiAgICAgICAgICAgIHRpdGxlOiAnTWFwcGluZzogVGhlIEpvdXJuZXkgYXMgQ29udGV4dCBmb3IgbmFycmF0aXZlJyxcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICBodG1sOiAnPHA+PHN0cm9uZz5NYXBzPC9zdHJvbmc+PHA+JytcbiAgICAgICAgICAgICAgICAgICc8cD4nK1xuICAgICAgICAgICAgICAgICAgJ1RoZXkgYXJlIGZhc2NpbmF0aW5nIGJlY2F1c2UgdGhlIGNvbnRleHQsICcrXG4gICAgICAgICAgICAgICAgICAncmVwcmVzZW50YXRpb24sIGFuZCBjb252ZW50aW9ucyBhcmUgYWxsICcrXG4gICAgICAgICAgICAgICAgICAnZm9yZWlnbiB0byB1cy4gU29tZSBvZiB0aGUgbW9zdCBpbnRlcmVzdGluZyAnK1xuICAgICAgICAgICAgICAgICAgJ21heSBiZSB0aGUgc3RpY2sgY2hhcnRzIGZyb20gdGhlIE1hcnNoYWxsICcrXG4gICAgICAgICAgICAgICAgICAnSXNsYW5kcy4gVGhlc2UgY2hhcnRzIGFyZSBnZW5lcmFsbHkgbWFkZSAnK1xuICAgICAgICAgICAgICAgICAgJ2xvY2FsbHkgZ3Jvd24gZmliZXIgcGxhbnRzLiBUaGUgYXJyYW5nZW1lbnQgJytcbiAgICAgICAgICAgICAgICAgICdvciB3YXZlIG1hc3NlcyBjYXVzZWQgYnkgd2luZHMsIHJhdGhlciB0aGF0ICcrXG4gICAgICAgICAgICAgICAgICAnYXBwcm94aW1hdGVseSBieSBzaGVsbHMgLi4uIG9yIGNvcmFsLicrXG4gICAgICAgICAgICAgICAgICAnPC9wPicrXG4gICAgICAgICAgICAgICAgICAnPHA+PHN0cm9uZz5EZWZpbmluZyB0aGUgTG9jYXRpb248L3N0cm9uZz48L3A+JytcbiAgICAgICAgICAgICAgICAgICc8cD4nK1xuICAgICAgICAgICAgICAgICAgJ0xvY2F0ZSBzaXRlcyB3aXRoaW4gdGhlIGRlZmluZWQgYXJlYSB0aGF0ICcrXG4gICAgICAgICAgICAgICAgICAncmVwcmVzZW50IGhpc3RvcmljYWwsIHBvbGl0aWNhbCwgY3VsdHVyYWwsICcgK1xuICAgICAgICAgICAgICAgICAgJ3NvY2lhbCxvciBlbnZpcm9ubWVudGFsIGV2ZW50cy5Gb3IgZXhhbXBsZSwgJytcbiAgICAgICAgICAgICAgICAgICd5b3UgbWF5IG5vdGUgYXJjaGl0ZWN0dXJhbCBsYW5kbWFya3MsICcrXG4gICAgICAgICAgICAgICAgICAnbW9udW1lbnRzLCBmYWN0b3JpZXMsIHJpdmVycyBvciBvdGhlciAnK1xuICAgICAgICAgICAgICAgICAgJ3NpZ25pZmljYW50IGxhbmRmb3JtYXRpb25zLiBUaG9yb3VnaGx5ICcrXG4gICAgICAgICAgICAgICAgICAncmVzZWFyY2ggeW91ciBsb2NhdGlvbi4gQmUgYXMgY3JlYXRpdmUgJytcbiAgICAgICAgICAgICAgICAgICdhcyBwb3NzaWJsZSB3aGVuIGV4YW1pbmluZyB5b3VyIGxvY2F0aW9uLicrXG4gICAgICAgICAgICAgICAgICAnPC9wPidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWdzOiBbXCJtYXBzXCIsIFwiZG91Zy1zY290dFwiLCBcIm1ha2luZy1tZWFuaW5nXCJdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICB0aXRsZTogJ01hcHBpbmc6IFRoZSBKb3VybmV5IGFzIENvbnRleHQgZm9yIE5hcnJhdGl2ZScsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgaHRtbDogJzxwPjxzdHJvbmc+TWFwcyE8L3N0cm9uZz48cD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPicrXG4gICAgICAgICAgICAgICAgICAnVGhleSBhcmUgZmFzY2luYXRpbmcgYmVjYXVzZSB0aGUgY29udGV4dCwgJytcbiAgICAgICAgICAgICAgICAgICdyZXByZXNlbnRhdGlvbiwgYW5kIGNvbnZlbnRpb25zIGFyZSBhbGwgJytcbiAgICAgICAgICAgICAgICAgICdmb3JlaWduIHRvIHVzLiBTb21lIG9mIHRoZSBtb3N0IGludGVyZXN0aW5nICcrXG4gICAgICAgICAgICAgICAgICAnbWF5IGJlIHRoZSBzdGljayBjaGFydHMgZnJvbSB0aGUgTWFyc2hhbGwgJytcbiAgICAgICAgICAgICAgICAgICdJc2xhbmRzLiBUaGVzZSBjaGFydHMgYXJlIGdlbmVyYWxseSBtYWRlICcrXG4gICAgICAgICAgICAgICAgICAnbG9jYWxseSBncm93biBmaWJlciBwbGFudHMuIFRoZSBhcnJhbmdlbWVudCAnK1xuICAgICAgICAgICAgICAgICAgJ29yIHdhdmUgbWFzc2VzIGNhdXNlZCBieSB3aW5kcywgcmF0aGVyIHRoYXQgJytcbiAgICAgICAgICAgICAgICAgICdhcHByb3hpbWF0ZWx5IGJ5IHNoZWxscyAuLi4gb3IgY29yYWwuJytcbiAgICAgICAgICAgICAgICAgICc8L3A+JytcbiAgICAgICAgICAgICAgICAgICc8cD48c3Ryb25nPkRlZmluaW5nIHRoZSBMb2NhdGlvbjwvc3Ryb25nPjwvcD4nK1xuICAgICAgICAgICAgICAgICAgJzxwPicrXG4gICAgICAgICAgICAgICAgICAnTG9jYXRlIHNpdGVzIHdpdGhpbiB0aGUgZGVmaW5lZCBhcmVhIHRoYXQgJytcbiAgICAgICAgICAgICAgICAgICdyZXByZXNlbnQgaGlzdG9yaWNhbCwgcG9saXRpY2FsLCBjdWx0dXJhbCwgJyArXG4gICAgICAgICAgICAgICAgICAnc29jaWFsLG9yIGVudmlyb25tZW50YWwgZXZlbnRzLkZvciBleGFtcGxlLCAnK1xuICAgICAgICAgICAgICAgICAgJ3lvdSBtYXkgbm90ZSBhcmNoaXRlY3R1cmFsIGxhbmRtYXJrcywgJytcbiAgICAgICAgICAgICAgICAgICdtb251bWVudHMsIGZhY3Rvcmllcywgcml2ZXJzIG9yIG90aGVyICcrXG4gICAgICAgICAgICAgICAgICAnc2lnbmlmaWNhbnQgbGFuZGZvcm1hdGlvbnMuIFRob3JvdWdobHkgJytcbiAgICAgICAgICAgICAgICAgICdyZXNlYXJjaCB5b3VyIGxvY2F0aW9uLiBCZSBhcyBjcmVhdGl2ZSAnK1xuICAgICAgICAgICAgICAgICAgJ2FzIHBvc3NpYmxlIHdoZW4gZXhhbWluaW5nIHlvdXIgbG9jYXRpb24uJytcbiAgICAgICAgICAgICAgICAgICc8L3A+J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhZ3M6IFtcIm1hcHNcIiwgXCJkb3VnLXNjb3R0XCIsIFwibWFraW5nLW1lYW5pbmdcIl1cbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgZWR1Y2F0b3JzOiBbJ2FudGhlckBlbWFpbC5jb20nXVxuICAgICAgICB9XSxcbiAgICAgICAgY2xhc3NlczogW3tcbiAgICAgICAgICAgIGlkOiAwLFxuICAgICAgICAgICAgdGl0bGU6ICdDb2xpblxcJ3MgQ2xhc3MnLFxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbMF0sXG4gICAgICAgICAgICBlZHVjYXRvcnM6IFsnY29saW5AZW1haWwuY29tJ11cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICB0aXRsZTogJ0FudGhlclxcJ3MgQ2xhc3MnLFxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbMV0sXG4gICAgICAgICAgICBlZHVjYXRvcnM6IFsnYW50aGVyQGVtYWlsLmNvbSddXG4gICAgICAgIH1dLFxuICAgICAgICBlZHVjYXRvcnM6IFt7XG4gICAgICAgICAgICBpZDogJ2NvbGluQGVtYWlsLmNvbScsXG4gICAgICAgICAgICBlbWFpbDogJ2NvbGluQGVtYWlsLmNvbScsXG4gICAgICAgICAgICBmaXJzdF9uYW1lOiAnQ29saW4nLFxuICAgICAgICAgICAgbGFzdF9uYW1lOiAnRnJhemVyJyxcbiAgICAgICAgICAgIHJlc291cmNlczogWzBdLFxuICAgICAgICAgICAgY2xhc3NlczogWzBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAnYW50aGVyQGVtYWlsLmNvbScsXG4gICAgICAgICAgICBlbWFpbDogJ2FudGhlckBlbWFpbC5jb20nLFxuICAgICAgICAgICAgZmlyc3RfbmFtZTogJ0FudGhlcicsXG4gICAgICAgICAgICBsYXN0X25hbWU6ICdLaWxleScsXG4gICAgICAgICAgICByZXNvdXJjZXM6IFsxXSxcbiAgICAgICAgICAgIGNsYXNzZXM6IFsxXVxuICAgICAgICB9XSxcbiAgICAgICAgdGFnczogW3tcbiAgICAgICAgICAgIGlkOiBcIm1hcHNcIixcbiAgICAgICAgICAgIG5hbWU6IFwiTWFwc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiBcImRvdWctc2NvdHRcIixcbiAgICAgICAgICAgIG5hbWU6IFwiRG91ZyBTY290dFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiBcIm1ha2luZy1tZWFuaW5nXCIsXG4gICAgICAgICAgICBuYW1lOiBcIk1ha2luZyBNZWFuaW5nXCJcbiAgICAgICAgfV0sXG4gICAgICAgIG1lOiBbe1xuICAgICAgICAgIGlkOiAnbWUnLFxuICAgICAgICAgIGNsYXNzZXM6IFtdLFxuICAgICAgICAgIHJlc291cmNlczogW11cbiAgICAgICAgfV1cbiAgICB9O1xuXG4gICAgdmFyIG1ldGEgPSB7XG4gICAgICAgIHJlc291cmNlczoge1xuICAgICAgICAgICAgY291bnQ6IGRhdGEucmVzb3VyY2VzLmxlbmd0aFxuICAgICAgICB9LFxuICAgICAgICBjbGFzc2VzOiB7XG4gICAgICAgICAgICBjb3VudDogZGF0YS5jbGFzc2VzLmxlbmd0aFxuICAgICAgICB9LFxuICAgICAgICBlZHVjYXRvcnM6IHtcbiAgICAgICAgICAgIGNvdW50OiBkYXRhLmVkdWNhdG9ycy5sZW5ndGhcbiAgICAgICAgfSxcbiAgICAgICAgdGFnczoge1xuICAgICAgICAgICAgY291bnQ6IGRhdGEudGFncy5sZW5ndGhcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8vIGluaXRpYWxpemUgdGhlIGRhdGFcbiAgICBkYXRhLnJlc291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXNvdXJjZXMhJyArIGQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGQpKTtcbiAgICB9KTtcbiAgICBkYXRhLmNsYXNzZXMuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2xhc3NlcyEnICsgZC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZCkpO1xuICAgIH0pO1xuICAgIGRhdGEuZWR1Y2F0b3JzLmZvckVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2VkdWNhdG9ycyEnICsgZC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZCkpO1xuICAgIH0pO1xuICAgIGRhdGEudGFncy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGFncyEnICsgZC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGQpKTtcbiAgICB9KTtcbiAgICBkYXRhLm1lLmZvckVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ21lIScgKyBkLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZCkpO1xuICAgIH0pO1xuXG4gICAgLy8gaW5pdGlhbGl6ZSB0aGUgbWV0YWRhdGFcbiAgICBmb3IgKHZhciBrZXkgaW4gbWV0YSkge1xuICAgICAgICBsb2NhbFN0b3JhZ2VcbiAgICAgICAgICAgIC5zZXRJdGVtKFxuICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShtZXRhW2tleV0pKTtcbiAgICB9XG5cbiAgICBzZWxmLnNldCA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIGlkLCBkKSB7XG4gICAgICAgIHZhciB1cGRhdGVfbWV0YWRhdGEgPSBmYWxzZTtcbiAgICAgICAgdmFyIGl0ZW1faWQgPSBuYW1lc3BhY2U7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICBpdGVtX2lkICs9ICgnIScgKyBpZCk7XG5cbiAgICAgICAgICAgIGlmICgobmFtZXNwYWNlICE9PSAnbWUnKSAmXG4gICAgICAgICAgICAgICAgKCFzZWxmLmdldChuYW1lc3BhY2UsIGlkKSkpIHtcbiAgICAgICAgICAgICAgICAvLyBgbWVgIGRvZXMgbm90IGdldCB1cGRhdGVkXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBhIG5ldyBuYW1lc3BhY2UraWQgY29tYm8sXG4gICAgICAgICAgICAgICAgLy8gaW5jcmVtZW50IHRoZSBtZXRhZGF0YVxuICAgICAgICAgICAgICAgIHVwZGF0ZV9tZXRhZGF0YSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ3NldHRpbmc6ICcgKyBpdGVtX2lkKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oaXRlbV9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZCkpO1xuXG4gICAgICAgIGlmICh1cGRhdGVfbWV0YWRhdGEpIHtcbiAgICAgICAgICAgIHZhciBtZXRhID0gc2VsZi5nZXQobmFtZXNwYWNlKTtcbiAgICAgICAgICAgIG1ldGEuY291bnQgKz0gMTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWVzcGFjZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KG1ldGEpKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBzZWxmLmdldCA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIGlkKSB7XG4gICAgICAgIHZhciBpdGVtX2lkID0gbmFtZXNwYWNlO1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgaXRlbV9pZCArPSAoJyEnICsgaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShpdGVtX2lkKSk7XG4gICAgfTtcblxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFzaEZhY3RvcnkgKCkge1xuICAgIHZhciBzZWxmID0ge307XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2NoYW5nZScpO1xuXG4gICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgLm9uKCdoYXNoY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBzZWxmLmlzKCk7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmNoYW5nZShjdXJyZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICBzZWxmLmlzID0gZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgLy8gZ2V0dGVyXG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlX2hhc2god2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0dGVyXG4gICAgICAgIHZhciBoYXNoID0gJy8nO1xuICAgICAgICBpZiAoZC5jb250cm9sbGVyID09PSAncmVzb3VyY2UnKSB7XG4gICAgICAgICAgICBoYXNoID0gZm9ybWF0X3Jlc291cmNlX2hhc2goZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICBpZiAoZC5jb250cm9sbGVyID09PSAnY2xhc3MnKSB7XG4gICAgICAgICAgICBoYXNoID0gZm9ybWF0X2NsYXNzX2hhc2goZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICBpZiAoZC5jb250cm9sbGVyID09PSAndGFnJykge1xuICAgICAgICAgICAgaGFzaCA9IGZvcm1hdF90YWdfaGFzaChkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGhhc2g7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXQgaGFzaDogJywgaGFzaCk7XG5cbiAgICAgICAgcmV0dXJuIGhhc2g7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHBhcnNlX2hhc2ggKGhhc2gpIHtcbiAgICAgICAgdmFyIGludGVnZXJfcmVnZXggPSAvXlxcZCskLztcblxuICAgICAgICBpZiAoaGFzaC5pbmRleE9mKCcjJykgPT09IDApIHtcbiAgICAgICAgICAgIGhhc2ggPSBoYXNoLnN1YnN0cigxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhcmdzID0gKGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICAgICAgb3V0cHV0ID0gW107XG4gICAgICAgICAgICBpbnB1dC5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgIH0pKGhhc2guc3BsaXQoJy8nKSk7XG5cbiAgICAgICAgdmFyIHBhcnNlZCA9IHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdpbmRleCdcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYXJnc1swXSA9PT0gJ3Jlc291cmNlJykge1xuICAgICAgICAgICAgcGFyc2VkID0ge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyZXNvdXJjZScsXG4gICAgICAgICAgICAgICAgaWQ6IGFyZ3NbMV0sXG4gICAgICAgICAgICAgICAgZWRpdDogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPj0gMykge1xuICAgICAgICAgICAgICAgIHBhcnNlZC50aXRsZSA9IGFyZ3NbMl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPj0gNCkge1xuICAgICAgICAgICAgICAgIHBhcnNlZC52ZXJzaW9uID0gYXJnc1szXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+PSA1KSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkLmVkaXQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgaWYgKGFyZ3NbMF0gPT09ICdjbGFzcycpIHtcbiAgICAgICAgICAgIHBhcnNlZCA9IHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY2xhc3MnLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogdW5kZWZpbmVkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgICAgIGlmIChhcmdzWzFdLm1hdGNoKGludGVnZXJfcmVnZXgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHZpZXdpbmcgYSBwYXJ0aWN1bGFyIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZC5jbGFzc19pZCA9IGFyZ3NbMV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWQuY2xhc3NfdGl0bGUgPSBhcmdzWzJdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICgoYXJncy5sZW5ndGggPj0gNCkgJlxuICAgICAgICAgICAgICAgICAgICAgICAgKGFyZ3NbM10gPT09ICdlZGl0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZC5hY3Rpb24gPSBhcmdzWzNdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc29tZSBhY3Rpb24gaXMgYmVpbmcgdGFrZW4gb24gdGhlIGNsYXNzXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3NbMV0gPT09ICdhZGQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWQuYWN0aW9uID0gYXJnc1sxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcmdzWzJdID09PSAncmVzb3VyY2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkLnR5cGUgPSBhcmdzWzJdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID49IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkLnJlc291cmNlX2lkID0gYXJnc1szXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICBpZiAoYXJnc1swXSA9PT0gJ3RhZycpIHtcbiAgICAgICAgICAgIHBhcnNlZCA9IHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAndGFnJyxcbiAgICAgICAgICAgICAgICBhY3Rpb246ICd2aWV3J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcnNlZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRfcmVzb3VyY2VfaGFzaChkKSB7XG4gICAgICAgIHZhciBhcmdzID0gWydyZXNvdXJjZScsXG4gICAgICAgICAgICAgICAgICAgIGQuaWQsXG4gICAgICAgICAgICAgICAgICAgIGQudGl0bGUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgZXNjYXBlX2Zvcl91cmwoZC50aXRsZSkgOiAncmVzb3VyY2UnLFxuICAgICAgICAgICAgICAgICAgICBkLnZlcnNpb25dO1xuXG4gICAgICAgIGlmIChkLmFjdGlvbiA9PT0gJ2VkaXQnKSB7XG4gICAgICAgICAgICBhcmdzLnB1c2goJ2VkaXQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnIy8nICsgYXJncy5qb2luKCcvJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0X2NsYXNzX2hhc2ggKGQpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbJ2NsYXNzJ107XG4gICAgICAgIC8vIGRlZmF1bHQgYWN0aW9uIGlzIHRvIHZpZXdcbiAgICAgICAgaWYgKGQuYWN0aW9uID09PSAnYWRkJykge1xuICAgICAgICAgICAgLy8gYWN0aW9uIHRha2VuIG9uIHRoZSBjbGFzc1xuICAgICAgICAgICAgLy8gc3VjaCBhcyAnYWRkJyAtLSAnYWRkIHRvIGNsYXNzJ1xuICAgICAgICAgICAgYXJncy5wdXNoKGQuYWN0aW9uKTtcbiAgICAgICAgICAgIGFyZ3MucHVzaChkLnR5cGUpO1xuICAgICAgICAgICAgYXJncy5wdXNoKGQucmVzb3VyY2VfaWQpO1xuICAgICAgICAgICAgYXJncy5wdXNoKGVzY2FwZV9mb3JfdXJsKGQucmVzb3VyY2VfdGl0bGUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaChkLmNsYXNzX2lkKTtcbiAgICAgICAgICAgIGFyZ3MucHVzaChlc2NhcGVfZm9yX3VybChkLmNsYXNzX3RpdGxlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZC5hY3Rpb24gPT09ICdlZGl0Jykge1xuICAgICAgICAgICAgLy8gc2hvdWxkIG5ldmVyIGJlIGEgc3RhdGUgd2hlcmVcbiAgICAgICAgICAgIC8vIGVkaXQgaXMgdHJ1ZSAmIGFjdGlvbiBpcyBhIHN0cmluZ1xuICAgICAgICAgICAgYXJncy5wdXNoKGQuYWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnIy8nICsgYXJncy5qb2luKCcvJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0X3RhZ19oYXNoIChkKSB7XG4gICAgICAgIHZhciBhcmdzID0gWyd0YWcnXTtcbiAgICAgICAgaWYgKGQuYWN0aW9uID09PSAnYWRkJykge1xuICAgICAgICAgICAgYXJncy5wdXNoKGQuYWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFyZ3MucHVzaChkLnRhZ19pZCk7XG4gICAgICAgIGFyZ3MucHVzaChkLm5hbWUpO1xuXG4gICAgICAgIHJldHVybiAnIy8nICsgYXJncy5qb2luKCcvJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXNjYXBlX2Zvcl91cmwgKHN0cmluZykge1xuICAgICAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyAvZywgJy0nKTtcbiAgICB9XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgSGFzaCAgICAgPSByZXF1aXJlKCcuL2hhc2gnKTtcbnZhciBSb3V0ZXIgICA9IHJlcXVpcmUoJy4vcm91dGVyJyk7XG52YXIgRGF0YSAgICAgPSByZXF1aXJlKCcuL2Zha2VfZGF0YScpO1xudmFyIFJlc291cmNlID0gcmVxdWlyZSgnLi9SZXNvdXJjZVZpZXdDb250cm9sbGVyJyk7XG52YXIgQ2xhc3MgICAgPSByZXF1aXJlKCcuL0NsYXNzVmlld0NvbnRyb2xsZXInKTtcbnZhciBJbmRleCAgICA9IHJlcXVpcmUoJy4vSW5kZXhWaWV3Q29udHJvbGxlcicpO1xudmFyIFRhZyAgICAgID0gcmVxdWlyZSgnLi9UYWdWaWV3Q29udHJvbGxlcicpO1xudmFyIE1lICAgICAgID0gcmVxdWlyZSgnLi9NZVZpZXdDb250cm9sbGVyJyk7XG5cbnZhciBib2R5X3NlbCA9IGQzLnNlbGVjdCgnYm9keScpO1xuXG5cbmRhdGFiYXNlKCk7XG5cblxuZnVuY3Rpb24gZGF0YWJhc2UgKCkge1xuICAgIHZhciBjb250ZXh0ICAgICAgPSB7fTtcblxuICAgIGNvbnRleHQuYm9keV9zZWwgID0gYm9keV9zZWw7XG4gICAgY29udGV4dC5oYXNoICAgICAgPSBIYXNoKCk7XG4gICAgY29udGV4dC5kYXRhc3RvcmUgPSBEYXRhKCk7XG5cbiAgICAvLyB2aWV3IGNvbnRyb2xsZXJzXG4gICAgY29udGV4dC5yZXNvdXJjZSAgPSBSZXNvdXJjZShjb250ZXh0KTtcbiAgICBjb250ZXh0LmNsYXNzXyAgICA9IENsYXNzKGNvbnRleHQpO1xuICAgIGNvbnRleHQuaW5kZXggICAgID0gSW5kZXgoY29udGV4dCk7XG4gICAgY29udGV4dC5yb3V0ZXIgICAgPSBSb3V0ZXIoY29udGV4dCk7XG4gICAgY29udGV4dC50YWcgICAgICAgPSBUYWcoY29udGV4dCk7XG4gICAgY29udGV4dC5tZSAgICAgICAgPSBNZShjb250ZXh0KTtcblxuICAgIChmdW5jdGlvbiBpbml0aWFsaXplICgpIHtcbiAgICAgICAgY29udGV4dC5yb3V0ZXIuaW5pdGlhbGl6ZSgpO1xuICAgIH0pKCk7XG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBDbGFzc01vZGVsICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBpZDtcbiAgICB2YXIgdGl0bGU7XG4gICAgdmFyIGVkdWNhdG9ycyA9IFtdO1xuICAgIHZhciByZXNvdXJjZXMgPSBbXTtcblxuICAgIHNlbGYuaWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9O1xuXG4gICAgc2VsZi50aXRsZSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRpdGxlO1xuICAgICAgICB0aXRsZSA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmVkdWNhdG9ycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGVkdWNhdG9ycztcbiAgICB9O1xuICAgIHNlbGYuZWR1Y2F0b3JzLmFkZCA9IGZ1bmN0aW9uIChlZHVjYXRvcl9pZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiTmVlZCBlZHVjYXRvcl9pZFwiO1xuICAgICAgICBcbiAgICAgICAgdmFyIGluX2VkdWNhdG9ycyA9IGZhbHNlO1xuICAgICAgICBlZHVjYXRvcnMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPT09IGVkdWNhdG9yX2lkKSB7XG4gICAgICAgICAgICAgICAgaW5fZWR1Y2F0b3JzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFpbl9lZHVjYXRvcnMpIHtcbiAgICAgICAgICAgIGVkdWNhdG9ycy5wdXNoKGVkdWNhdG9yX2lkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gICAgc2VsZi5lZHVjYXRvcnMucmVtb3ZlID0gZnVuY3Rpb24gKGVkdWNhdG9yX2lkKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgXCJOZWVkIGVkdWNhdG9yX2lkXCI7XG4gICAgICAgIHZhciBpbmRleF90b19yZW1vdmU7XG4gICAgICAgIGVkdWNhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoZCA9PT0gZWR1Y2F0b3JfaWQpIHtcbiAgICAgICAgICAgICAgICBpbmRleF90b19yZW1vdmUgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGluZGV4X3RvX3JlbW92ZSkge1xuICAgICAgICAgICAgZWR1Y2F0b3JzLnNwbGljZShpbmRleF90b19yZW1vdmUsIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlc291cmNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJlc291cmNlcztcbiAgICB9O1xuICAgIHNlbGYucmVzb3VyY2VzLmFkZCA9IGZ1bmN0aW9uIChyZXNvdXJjZV9pZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiTmVlZCByZXNvdXJjZV9pZFwiO1xuXG4gICAgICAgIHZhciBpbl9yZXNvdXJjZXMgPSBmYWxzZTtcbiAgICAgICAgcmVzb3VyY2VzLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGlmIChkID09PSByZXNvdXJjZV9pZCkge1xuICAgICAgICAgICAgICAgIGluX3Jlc291cmNlcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghaW5fcmVzb3VyY2VzKSB7XG4gICAgICAgICAgICByZXNvdXJjZXMucHVzaChyZXNvdXJjZV9pZCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuICAgIHNlbGYucmVzb3VyY2VzLnJlbW92ZSA9IGZ1bmN0aW9uIChyZXNvdXJjZV9pZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiTmVlZCByZXNvdXJjZV9pZFwiO1xuXG4gICAgICAgIHZhciBpbmRleF90b19yZW1vdmU7XG4gICAgICAgIHJlc291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoZCA9PT0gcmVzb3VyY2VfaWQpIHtcbiAgICAgICAgICAgICAgICBpbmRleF90b19yZW1vdmUgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaW5kZXhfdG9fcmVtb3ZlKSB7XG4gICAgICAgICAgICByZXNvdXJjZXMuc3BsaWNlKGluZGV4X3RvX3JlbW92ZSwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICAgICAgZWR1Y2F0b3JzOiBlZHVjYXRvcnMsXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzOiByZXNvdXJjZXNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZCA9IHguaWQ7XG4gICAgICAgIHRpdGxlID0geC50aXRsZTtcbiAgICAgICAgZWR1Y2F0b3JzID0geC5lZHVjYXRvcnMgfHwgW107XG4gICAgICAgIHJlc291cmNlcyA9IHgucmVzb3VyY2VzIHx8IFtdO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBFZHVjYXRvck1vZGVsICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBlbWFpbDtcbiAgICB2YXIgZmlyc3RfbmFtZSA9ICcnO1xuICAgIHZhciBsYXN0X25hbWUgID0gJyc7XG5cblxuICAgIHNlbGYuaWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBlbWFpbF90b19pZChlbWFpbCk7XG4gICAgfTtcblxuICAgIHNlbGYuZW1haWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBlbWFpbDtcbiAgICB9O1xuXG4gICAgc2VsZi5uYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKChmaXJzdF9uYW1lKSA/IChmaXJzdF9uYW1lICsgJyAnKSA6ICcnKSArXG4gICAgICAgICAgICAgICBsYXN0X25hbWU7XG4gICAgfTtcblxuICAgIHNlbGYubmFtZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZpcnN0X25hbWU7XG4gICAgfTtcblxuICAgIHNlbGYubmFtZS5sYXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbGFzdF9uYW1lO1xuICAgIH07XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQgICAgICAgIDogZW1haWxfdG9faWQoZW1haWwpLFxuICAgICAgICAgICAgICAgIGVtYWlsICAgICA6IGVtYWlsLFxuICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6IGZpcnN0X25hbWUsXG4gICAgICAgICAgICAgICAgbGFzdF9uYW1lIDogbGFzdF9uYW1lXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWQgICAgICAgICA9IGQuaWQ7XG4gICAgICAgIGVtYWlsICAgICAgPSBkLmVtYWlsO1xuICAgICAgICBmaXJzdF9uYW1lID0gZC5maXJzdF9uYW1lO1xuICAgICAgICBsYXN0X25hbWUgID0gZC5sYXN0X25hbWU7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGVtYWlsX3RvX2lkIChlKSB7XG4gICAgICAgIHJldHVybiBlLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIi8vIFRyYWNrcyBFZHVjYXRvciBsb2dnZWQgaW4gc3RhdGUsIGFuZFxuLy8ga2VlcHMgYSByZWZlcmVuY2UgdG8gdGhlaXIgRWR1Y2F0b3IgaWRcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBNZU1vZGVsICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBhdXRoZW50aWNhdGVkID0gZmFsc2U7XG5cbiAgICB2YXIgaWQ7XG4gICAgdmFyIGNsYXNzZXMgICA9IFtdO1xuICAgIHZhciByZXNvdXJjZXMgPSBbXTtcblxuICAgIHNlbGYuaWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9O1xuXG4gICAgc2VsZi5hdXRoZW50aWNhdGVkID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gYXV0aGVudGljYXRlZDtcbiAgICAgICAgYXV0aGVudGljYXRlZCA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmNsYXNzZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjbGFzc2VzO1xuICAgIH07XG4gICAgc2VsZi5jbGFzc2VzLmFkZCA9IGZ1bmN0aW9uIChjbGFzc19pZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiTmVlZCBjbGFzc19pZFwiO1xuXG4gICAgICAgIHZhciBpbl9jbGFzc2VzID0gZmFsc2U7XG4gICAgICAgIGNsYXNzZXMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPT09IGNsYXNzX2lkKSB7XG4gICAgICAgICAgICAgICAgaW5fY2xhc3NlcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghaW5fY2xhc3Nlcykge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKGNsYXNzX2lkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gICAgc2VsZi5jbGFzc2VzLnJlbW92ZSA9IGZ1bmN0aW9uIChjbGFzc19pZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiTmVlZCBjbGFzc19pZFwiO1xuXG4gICAgICAgIHZhciBpbmRleF90b19yZW1vdmU7XG4gICAgICAgIGNsYXNzZXMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPT09IGNsYXNzX2lkKSB7XG4gICAgICAgICAgICAgICAgaW5kZXhfdG9fcmVtb3ZlID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4X3RvX3JlbW92ZSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5zcGxpY2UoaW5kZXhfdG9fcmVtb3ZlLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlc291cmNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJlc291cmNlcztcbiAgICB9O1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkICAgICAgIDogaWQsXG4gICAgICAgICAgICAgICAgY2xhc3NlcyAgOiBjbGFzc2VzLFxuICAgICAgICAgICAgICAgIHJlc291cmNlczogcmVzb3VyY2VzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWQgICAgICAgID0geC5pZDtcbiAgICAgICAgY2xhc3NlcyAgID0geC5jbGFzc2VzO1xuICAgICAgICByZXNvdXJjZXMgPSB4LnJlc291cmNlcztcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUmVzb3VyY2VNb2RlbCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcblxuICAgIHZhciBpZDtcbiAgICB2YXIgdmVyc2lvbnMgPSBbXTtcbiAgICB2YXIgZWR1Y2F0b3JzICA9IFtdO1xuICAgIHZhciBjbGFzc2VzICA9IFtdO1xuXG4gICAgc2VsZi5pZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH07XG5cbiAgICBzZWxmLnZlcnNpb25zID0ge307XG4gICAgc2VsZi52ZXJzaW9ucy5hZGQgPSBmdW5jdGlvbiAocmVzb3VyY2UpIHtcbiAgICAgICAgLy8gcmVzb3VyY2VzIGFyZSBub3QgdW5pcXVlLlxuICAgICAgICAvLyB0aGUgdmlldyBlbnN1cmVzIGEgY2hhbmdlIGhhcyBvY2N1cmVkXG4gICAgICAgIC8vIGJlZm9yZSBwYXNzaW5nIGEgbmV3IHZlcnNpb24gaW5cbiAgICAgICAgdmVyc2lvbnMucHVzaChyZXNvdXJjZSk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gICAgc2VsZi52ZXJzaW9ucy5nZXQgPSBmdW5jdGlvbiAodmVyc2lvbl9pZCkge1xuICAgICAgICAvLyBkb24ndCBtYWtlIHRoZSB1c2VyIHRoaW5rIGFib3V0IHRoZSBmYWN0XG4gICAgICAgIC8vIHRoYXQgY291bnRpbmcgc3RhcnRzIGZyb20gMC4gQmVjYXVzZVxuICAgICAgICAvLyB0aGVyZSB3aWxsIG5ldmVyIGJlIGEgdmVyc2lvbiAwLlxuICAgICAgICBpZiAodmVyc2lvbl9pZCA+IHZlcnNpb25zLmxlbmd0aCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB2ZXJzaW9uc1t2ZXJzaW9uX2lkLTFdO1xuICAgIH07XG4gICAgc2VsZi52ZXJzaW9ucy5jb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZlcnNpb25zLmxlbmd0aDtcbiAgICB9O1xuICAgIHNlbGYudmVyc2lvbnMubGF0ZXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc2VsZi52ZXJzaW9ucy5nZXQoc2VsZi52ZXJzaW9ucy5jb3VudCgpKTtcbiAgICB9O1xuXG4gICAgc2VsZi5lZHVjYXRvcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBlZHVjYXRvcnM7XG4gICAgfTtcbiAgICBzZWxmLmVkdWNhdG9ycy5hZGQgPSBmdW5jdGlvbiAoZWR1Y2F0b3JfaWQpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB0aHJvdyBcIk5lZWQgZWR1Y2F0b3JfaWRcIjtcblxuICAgICAgICB2YXIgaW5fZWR1Y2F0b3JzID0gZmFsc2U7XG4gICAgICAgIGVkdWNhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoZCA9PT0gZWR1Y2F0b3JfaWQpIHtcbiAgICAgICAgICAgICAgICBpbl9lZHVjYXRvcnMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWluX2VkdWNhdG9ycykge1xuICAgICAgICAgICAgZWR1Y2F0b3JzLnB1c2goZWR1Y2F0b3JfaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcbiAgICBzZWxmLmVkdWNhdG9ycy5yZW1vdmUgPSBmdW5jdGlvbiAoZWR1Y2F0b3JfaWQpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB0aHJvdyBcIk5lZWQgZWR1Y2F0b3JfaWRcIjtcblxuICAgICAgICB2YXIgaW5kZXhfdG9fcmVtb3ZlO1xuICAgICAgICBlZHVjYXRvcnMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPT09IGVkdWNhdG9yX2lkKSB7XG4gICAgICAgICAgICAgICAgaW5kZXhfdG9fcmVtb3ZlID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4X3RvX3JlbW92ZSkge1xuICAgICAgICAgICAgZWR1Y2F0b3JzLnNwbGljZShpbmRleF90b19yZW1vdmUsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYudGFncyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRhZ3MgPSBbXTtcbiAgICAgICAgdmVyc2lvbnMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdGFncyA9IHRhZ3MuY29uY2F0KGQudGFncyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZ2V0X3VuaXF1ZSh0YWdzKTtcbiAgICB9O1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkICAgICAgOiBpZCxcbiAgICAgICAgICAgICAgICB2ZXJzaW9uczogdmVyc2lvbnMsXG4gICAgICAgICAgICAgICAgZWR1Y2F0b3JzIDogZWR1Y2F0b3JzLFxuICAgICAgICAgICAgICAgIHRhZ3MgICAgOiB0YWdzLFxuICAgICAgICAgICAgICAgIGNsYXNzZXMgOiBjbGFzc2VzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWQgICAgICAgPSB4LmlkO1xuICAgICAgICB2ZXJzaW9ucyA9IHgudmVyc2lvbnM7XG4gICAgICAgIGVkdWNhdG9ycyAgPSB4LmVkdWNhdG9ycztcbiAgICAgICAgdGFncyAgICAgPSB4LnRhZ3M7XG4gICAgICAgIGNsYXNzZXMgID0geC5jbGFzc2VzO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRfdW5pcXVlIChhcnIpIHtcbiAgICAgICAgdmFyIHUgPSB7fTtcbiAgICAgICAgdmFyIGEgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHUuaGFzT3duUHJvcGVydHkoYXJyW2ldKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYS5wdXNoKGFycltpXSk7XG4gICAgICAgICAgICB1W2FycltpXV0gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIi8vIFRhZ3MgYXJlIGluZGV4ZWQgYnkgYW4gZXNjYXBlZCB0YWcgbmFtZVxuLy8gdGhpcyB3YXksIHRhZ3MgYXJlIG5vcm1hbGl6ZWQsIGFuZCB0aGVyZVxuLy8gd2lsbCBiZSBubyBkdXBsaWNhdGUgdGFncy5cblxuLy8gJ3RhZyFncmFwaGljLWRlc2lnbicgPSB7IHRhZzogJ0dyYXBoaWMgRGVzaWduJ31cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBUYWdNb2RlbCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgbmFtZTtcbiAgICB2YXIgcmVzb3VyY2VzID0gW107XG5cbiAgICBzZWxmLmlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGFnX3RvX2lkKG5hbWUpO1xuICAgIH07XG5cbiAgICBzZWxmLm5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgIH07XG5cbiAgICBzZWxmLnJlc291cmNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJlc291cmNlcztcbiAgICB9O1xuICAgIHNlbGYucmVzb3VyY2VzLmFkZCA9IGZ1bmN0aW9uIChyZXNvdXJjZV9pZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiTmVlZCByZXNvdXJjZV9pZFwiO1xuXG4gICAgICAgIHZhciBjbGVhbiA9IGZhbHNlO1xuICAgICAgICByZXNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPT09IHJlc291cmNlX2lkKSB7XG4gICAgICAgICAgICAgICAgY2xlYW4gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWNsZWFuKSB7XG4gICAgICAgICAgICByZXNvdXJjZXMucHVzaChyZXNvdXJjZV9pZCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuICAgIHNlbGYucmVzb3VyY2VzLnJlbW92ZSA9IGZ1bmN0aW9uIChyZXNvdXJjZV9pZCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiTmVlZCByZXNvdXJjZV9pZFwiO1xuXG4gICAgICAgIHZhciBpbmRleF90b19yZW1vdmU7XG4gICAgICAgIHJlc291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoZCA9PT0gcmVzb3VyY2VfaWQpIHtcbiAgICAgICAgICAgICAgICBpbmRleF90b19yZW1vdmUgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaW5kZXhfdG9fcmVtb3ZlKSB7XG4gICAgICAgICAgICByZXNvdXJjZXMuc3BsaWNlKGluZGV4X3RvX3JlbW92ZSwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkOiBzZWxmLmlkKCksXG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICByZXNvdXJjZXM6IHJlc291cmNlc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlkID0geC5pZDtcbiAgICAgICAgbmFtZSA9IHgubmFtZTtcbiAgICAgICAgcmVzb3VyY2VzID0geC5yZXNvdXJjZXM7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHRhZ190b19pZCAodCkge1xuICAgICAgICByZXR1cm4gdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyAvZywgJy0nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByb3V0ZXIgKGNvbnRleHQpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBwcmV2aW91c192aWV3ID0ge1xuICAgICAgICBjb250cm9sbGVyOiAnaW5kZXgnXG4gICAgfTtcblxuICAgIGNvbnRleHQuaGFzaC5kaXNwYXRjaFxuICAgICAgICAub24oJ2NoYW5nZS5yb3V0ZXInLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgc2V0KGQpO1xuICAgICAgICB9KTtcblxuICAgIHNlbGYuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0KGNvbnRleHQuaGFzaC5pcygpKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldCAoZCkge1xuICAgICAgICBpZiAoZC5jb250cm9sbGVyID09PSAncmVzb3VyY2UnKSB7XG4gICAgICAgICAgICBjb250ZXh0LnJlc291cmNlLnJlbmRlcihkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIGlmIChkLmNvbnRyb2xsZXIgPT09ICdjbGFzcycpIHtcbiAgICAgICAgICAgIGlmIChkLmFjdGlvbikge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuY2xhc3NfLmFjdGlvbnMuYWRkLnJlbmRlcihkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5jbGFzc18ucmVuZGVyKGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgaWYgKGQuY29udHJvbGxlciA9PT0gJ3RhZycpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyb3V0ZSB0byB0YWcnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGQpO1xuICAgICAgICAgICAgY29udGV4dC50YWcucmVuZGVyKGQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgaWYgKGQuY29udHJvbGxlciA9PT0gJ2luZGV4Jykge1xuICAgICAgICAgICAgY29udGV4dC5pbmRleC5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIGlmIChkLmNvbnRyb2xsZXIgPT09ICc0MDQnKSB7XG4gICAgICAgICAgICAvLyBjb250ZXh0LmVycm9yLnJlbmRlcignNDA0JylcbiAgICAgICAgfVxuXG4gICAgICAgIHByZXZpb3VzX3ZpZXcgPSBkO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIENsYXNzQ3JlYXRlVmlldyAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgY2xhc3NlcyA9IFtdO1xuXG4gICAgdmFyIGNvbnRhaW5lcl9zZWw7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2NsYXNzQ3JlYXRlZCcpO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcl9zZWw7XG4gICAgICAgIGNvbnRhaW5lcl9zZWwgPSBzZWw7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmNsYXNzZXMgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjbGFzc2VzO1xuICAgICAgICBjbGFzc2VzID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZm9ybSA9IGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NsYXNzLWNyZWF0ZS0td3JhcHBlcicpXG4gICAgICAgICAgICAuYXBwZW5kKCdmb3JtJylcbiAgICAgICAgICAgICAgICAuYXR0cignbmFtZScsICdjbGFzcy1jcmVhdGUtLWZvcm0nKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdvblN1Ym1pdCcsICdyZXR1cm4gZmFsc2U7Jyk7XG5cbiAgICAgICAgdmFyIGlucHV0ID1cbiAgICAgICAgICAgIGZvcm0uYXBwZW5kKCdsYWJlbCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NsYXNzLWNyZWF0ZS0tbGFiZWwnKVxuICAgICAgICAgICAgICAgIC50ZXh0KCdOZXcgY2xhc3MgdGl0bGUnKVxuICAgICAgICAgICAgLmFwcGVuZCgnaW5wdXQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdjbGFzcy1jcmVhdGUtLWlucHV0JylcbiAgICAgICAgICAgICAgICAuYXR0cigndHlwZScsICd0ZXh0Jyk7XG5cbiAgICAgICAgZm9ybS5hcHBlbmQoJ2J1dHRvbicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NsYXNzLWNyZWF0ZS0tYnV0dG9uJylcbiAgICAgICAgICAgICAgICAuYXR0cigndHlwZScsICdidXR0b24nKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd2YWx1ZScsICdDcmVhdGUnKVxuICAgICAgICAgICAgICAgIC50ZXh0KCdDcmVhdGUnKVxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdfY2xhc3NfbmFtZSA9IGlucHV0LnByb3BlcnR5KCd2YWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3X2NsYXNzX25hbWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbGFzc0NyZWF0ZWQobmV3X2NsYXNzX25hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQucHJvcGVydHkoJ3ZhbHVlJywgJycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQ2xhc3NWaWV3UmVzb3VyY2VMaXN0ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBjbGFzc19tb2RlbDtcbiAgICB2YXIgcmVzb3VyY2VfbW9kZWxzO1xuXG4gICAgdmFyIGNvbnRhaW5lcl9zZWw7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ3gnKTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKHNlbCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gc2VsO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5jbGFzc01vZGVsID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY2xhc3NfbW9kZWw7XG4gICAgICAgIGNsYXNzX21vZGVsID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVzb3VyY2VNb2RlbHMgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiByZXNvdXJjZV9tb2RlbHM7XG4gICAgICAgIHJlc291cmNlX21vZGVscyA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmh0bWwoJycpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsXG4gICAgICAgICAgICAgICAgICAgICAgJ2NsYXNzLXZpZXctcmVzb3VyY2UtbGlzdC0td3JhcHBlcicpXG4gICAgICAgICAgICAuYXBwZW5kKCdoMicpXG4gICAgICAgICAgICAgICAgLnRleHQoY2xhc3NfbW9kZWwudGl0bGUoKSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICdjbGFzcy12aWV3LXJlc291cmNlLWxpc3QtLWxpc3QnKVxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnLmNsYXNzLXZpZXctcmVzb3VyY2UtbGlzdC0tbGlzdC1pdGVtJylcbiAgICAgICAgICAgIC5kYXRhKHJlc291cmNlX21vZGVscylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLFxuICAgICAgICAgICAgICAgICAgJ2NsYXNzLXZpZXctcmVzb3VyY2UtbGlzdC0tbGlzdC1pdGVtJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC52ZXJzaW9ucy5sYXRlc3QoKS50aXRsZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIENsYXNzU2VsZWN0YWJsZUxpc3RWaWV3ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBjbGFzc2VzID0gW107XG5cbiAgICB2YXIgY29udGFpbmVyX3NlbDtcbiAgICB2YXIgbGlzdF9zZWxfd3JhcHBlcjtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnY2xhc3NTZWxlY3RlZCcpO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcl9zZWw7XG4gICAgICAgIGNvbnRhaW5lcl9zZWwgPSBzZWw7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmNsYXNzZXMgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjbGFzc2VzO1xuICAgICAgICBjbGFzc2VzID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYWRkX2NsYXNzID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB0aHJvdyBcIlJlcXVpcmVzIENsYXNzIE1vZGVsXCI7XG4gICAgICAgIGNsYXNzZXMucHVzaCh4KTtcbiAgICAgICAgY29uc29sZS5sb2coJ2NsYXNzIHNlbGVjdGFibGUgbGlzdCB2aWV3IC0gYWRkIGNsYXNzJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGNsYXNzZXMpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxpc3Rfc2VsX3dyYXBwZXIgPSBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzZWxlY3RhYmxlLWNsYXNzLWxpc3Qtd3JhcHBlcicpXG4gICAgICAgICAgICAuYXBwZW5kKCd1bCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3NlbGVjdGFibGUtY2xhc3MtbGlzdCcpO1xuXG4gICAgICAgIFxuXG4gICAgICAgIHJldHVybiBzZWxmLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBzZWxmLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGlzdF9zZWxfd3JhcHBlclxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnLnNlbGVjdGFibGUtY2xhc3MtbGlzdC1pdGVtJylcbiAgICAgICAgICAgIC5kYXRhKGNsYXNzZXMsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLmlkKCk7IH0pXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzZWxlY3RhYmxlLWNsYXNzLWxpc3QtaXRlbScpXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2xhc3NTZWxlY3RlZChkKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQudGl0bGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBJbmRleFZpZXcgKCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIGNvbnRhaW5lcl9zZWw7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goKTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKHNlbCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gc2VsO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgXG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGdyaWQgPSBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAuaHRtbCgnJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpO1xuXG5cbiAgICAgICAgZ3JpZC5hcHBlbmQoJ2gxJykudGV4dCgnRGF0YWJhbmsuJyk7XG4gICAgICAgIGdyaWQuYXBwZW5kKCdoNCcpLnRleHQoJ1RoZSBiZWdpbm5pbmcuJyk7XG5cbiAgICAgICAgZ3JpZC5hcHBlbmQoJ2EnKVxuICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAnIy9yZXNvdXJjZS8wLycpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KCdBIHJlc291cmNlJyk7XG5cbiAgICAgICAgZ3JpZC5hcHBlbmQoJ2EnKVxuICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAnIy9yZXNvdXJjZS8xLycpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KCdBbm90aGVyIHJlc291cmNlJyk7XG4gICAgICAgIFxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBSZXNvdXJjZVZpZXcgKCkge1xuICAgIHZhciBzZWxmID0ge307XG5cbiAgICB2YXIgcmVzb3VyY2VfbW9kZWwgPSB7fTtcbiAgICB2YXIgZWR1Y2F0b3JzICAgICAgPSB7fTtcbiAgICB2YXIgdGFncyAgICAgICAgICAgPSB7fTtcbiAgICB2YXIgY29udGFpbmVyX3NlbDtcblxuICAgIHZhciBlZGl0ID0gZmFsc2U7XG4gICAgdmFyIHZlcnNpb25fZGlzcGxheWVkO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdhZGRUb0NsYXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NoYW5nZVZpZXdUb0NsYXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NoYW5nZVZpZXdUb1RhZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzZXRFZGl0YWJsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjYW5jZWxFZGl0YWJsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzYXZlRWRpdGFibGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc2V0VmVyc2lvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjaGFuZ2VWaWV3VG9FZHVjYXRvcicpO1xuXG4gICAgdmFyIGxheW91dF9hY3Rpb25hYmxlX2RhdGEgPSBbe1xuICAgICAgICB0eXBlOiAncmVzb3VyY2Utc3RydWN0dXJlJyxcbiAgICAgICAgbmFtZTogJ3Jlc291cmNlLWFjdGlvbnMnLFxuICAgICAgICBjbHM6ICdjb2wtLXJlc291cmNlLS1hY3Rpb25zIGxlZnQgZml4ZWQnLFxuICAgICAgICBsYXlvdXQ6IGxheW91dF9hY3Rpb25hYmxlX2FjdGlvbnNcbiAgICB9LCB7XG4gICAgICAgIHR5cGU6ICdyZXNvdXJjZS1zdHJ1Y3R1cmUnLFxuICAgICAgICBuYW1lOiAncmVzb3VyY2UtY29udGVudCcsXG4gICAgICAgIGNsczogJ2NvbC0tcmVzb3VyY2UtLWJvZHkgcmlnaHQnLFxuICAgICAgICBsYXlvdXQ6IGxheW91dF9hY3Rpb25hYmxlX2NvbnRlbnRcbiAgICB9XTtcblxuICAgIHZhciBsYXlvdXRfZWRpdGFibGVfZGF0YSA9IFt7XG4gICAgICAgIHR5cGU6ICdyZXNvdXJjZS1zdHJ1Y3R1cmUnLFxuICAgICAgICBuYW1lOiAncmVzb3VyY2UtY29udGVudCcsXG4gICAgICAgIGNsczogJ2NvbC0tcmVzb3VyY2UtLWJvZHkgZWRpdGFibGUgcmlnaHQnLFxuICAgICAgICBsYXlvdXQ6IGxheW91dF9lZGl0YWJsZV9jb250ZW50XG4gICAgfV07XG5cbiAgICBzZWxmLnJlc291cmNlTW9kZWwgPSBmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gcmVzb3VyY2VfbW9kZWw7XG4gICAgICAgIHJlc291cmNlX21vZGVsID0gbW9kZWw7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnRhZ3MgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0YWdzO1xuICAgICAgICB0YWdzID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZWR1Y2F0b3JzID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZWR1Y2F0b3JzO1xuICAgICAgICBlZHVjYXRvcnMgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcl9zZWw7XG4gICAgICAgIGNvbnRhaW5lcl9zZWwgPSBzZWw7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnZlcnNpb24gPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB2ZXJzaW9uX2Rpc3BsYXllZDtcbiAgICAgICAgdmVyc2lvbl9kaXNwbGF5ZWQgPSAreDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZWRpdCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGVkaXQ7XG4gICAgICAgIGVkaXQgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgoIXNlbGYudmVyc2lvbigpKSB8XG4gICAgICAgICAgICAoc2VsZi52ZXJzaW9uKCkgPiByZXNvdXJjZV9tb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZlcnNpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY291bnQoKSkpIHtcblxuICAgICAgICAgICAgc2VsZi52ZXJzaW9uKHJlc291cmNlX21vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZlcnNpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvdW50KCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGdyaWQgPSBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAuaHRtbCgnJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpO1xuXG4gICAgICAgIHZhciByZW5kZXJfbWV0aG9kO1xuICAgICAgICBpZiAoZWRpdCkge1xuICAgICAgICAgICAgcmVuZGVyX21ldGhvZCA9IHJlbmRlcl9lZGl0YWJsZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlbmRlcl9tZXRob2QgPSByZW5kZXJfYWN0aW9uYWJsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdyaWQuY2FsbChyZW5kZXJfbWV0aG9kKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcmVuZGVyX2VkaXRhYmxlIChzZWwpIHtcbiAgICAgICAgdmFyIGxheW91dCA9IHNlbC5zZWxlY3RBbGwoJy5yZXNvdXJjZS1zdHJ1Y3R1cmUnKVxuICAgICAgICAgICAgLmRhdGEobGF5b3V0X2VkaXRhYmxlX2RhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuY2xzICsgJyAnICsgZC50eXBlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNhbGwoZC5sYXlvdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyX2FjdGlvbmFibGUgKHNlbCkge1xuXG4gICAgICAgIHZhciBsYXlvdXQgPSBzZWwuc2VsZWN0QWxsKCcucmVzb3VyY2Utc3RydWN0dXJlJylcbiAgICAgICAgICAgIC5kYXRhKGxheW91dF9hY3Rpb25hYmxlX2RhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuY2xzICsgJyAnICsgZC50eXBlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgICAgICBzZWwuY2FsbChkLmxheW91dCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsYXlvdXRfYWN0aW9uYWJsZV9hY3Rpb25zIChzZWwpIHtcbiAgICAgICAgLy8gZWRpdFxuICAgICAgICBzZWwuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWFjdGlvbi0tZWRpdCcpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2V0IGVkaXRhYmxlJyk7XG4gICAgICAgICAgICAgICAgc2VsZi5lZGl0KHRydWUpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guc2V0RWRpdGFibGUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KCdFZGl0IHRoaXMgYXNzaWdubWVudC4nKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhyZXNvdXJjZV9tb2RlbC52ZXJzaW9ucy5jb3VudCgpKTtcbiAgICAgICAgLy8gdmVyc2lvbnNcbiAgICAgICAgc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1hY3Rpb24tLXZlcnNpb25zJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5yZXNvdXJjZS1hY3Rpb24tLXZlcnNpb25zLS12ZXJzaW9uJylcbiAgICAgICAgICAgIC5kYXRhKGQzLnJhbmdlKHJlc291cmNlX21vZGVsLnZlcnNpb25zLmNvdW50KCkpKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2xpJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNscyA9ICdyZXNvdXJjZS1hY3Rpb24tLXZlcnNpb25zLS12ZXJzaW9uJztcbiAgICAgICAgICAgICAgICBpZiAoKGQgKyAxKSA9PT0gc2VsZi52ZXJzaW9uKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xzICs9ICcgc2VsZWN0ZWQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gY2xzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZXQgdmVyc2lvbicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGQrMSk7XG4gICAgICAgICAgICAgICAgc2VsZi52ZXJzaW9uKGQrMSk7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5zZXRWZXJzaW9uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAndi4nICsgKGQrMSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBjbGFzc1xuICAgICAgICB2YXIgYWN0aW9uc19jbGFzcyA9IHNlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtYWN0aW9uLS1jbGFzcycpO1xuXG4gICAgICAgIGFjdGlvbnNfY2xhc3MuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWFjdGlvbi0tY2xhc3MtLWFkZCcpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYWRkVG9DbGFzcygpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoJ0FkZCB0byBDbGFzcycpO1xuXG4gICAgICAgIGFjdGlvbnNfY2xhc3MuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWFjdGlvbi0tY2xhc3MtLXZpZXcnKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmNoYW5nZVZpZXdUb0NsYXNzKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dCgnVmlldyBDbGFzcycpO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGF5b3V0X2FjdGlvbmFibGVfY29udGVudCAoc2VsKSB7XG4gICAgICAgIHZhciBkYXRhID0gcmVzb3VyY2VfbW9kZWwuZGF0YSgpO1xuXG4gICAgICAgIHZhciB2ZXJzaW9uID0gcmVzb3VyY2VfbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmVyc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KHZlcnNpb25fZGlzcGxheWVkKTtcblxuICAgICAgICBzZWwuYXBwZW5kKCdoMycpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudC0tdGl0bGUnKVxuICAgICAgICAgICAgLnRleHQodmVyc2lvbi50aXRsZSk7XG5cbiAgICAgICAgc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50LS1ib2R5JylcbiAgICAgICAgICAgIC5odG1sKHZlcnNpb24uYm9keS5odG1sKTtcblxuICAgICAgICBzZWwuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtLXRhZ3MnKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dCgnVGFncycpXG4gICAgICAgICAgICAuYXBwZW5kKCd1bCcpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcucmVzb3VyY2UtY29udGVudC0tdGFncy0tdGFnJylcbiAgICAgICAgICAgIC5kYXRhKHZlcnNpb24udGFncylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlIHZpZXcgdG8gdGFnOiAnLCBkKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmNoYW5nZVZpZXdUb1RhZyh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBkLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0YWdzW2RdLm5hbWUoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50LS10YWdzLS10YWcnKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0YWdzW2RdLm5hbWUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHNlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudC0tZWR1Y2F0b3JzJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoJ0F1dGhvcicpXG4gICAgICAgICAgICAuYXBwZW5kKCd1bCcpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcucmVzb3VyY2UtY29udGVudCcrXG4gICAgICAgICAgICAgICAgICAgICAgICctLWVkdWNhdG9ycy0tZWR1Y2F0b3InKVxuICAgICAgICAgICAgLmRhdGEocmVzb3VyY2VfbW9kZWwuZWR1Y2F0b3JzKCkpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZSB2aWV3IHRvIGVkdWNhdG9yOiAnLCBkKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmNoYW5nZVZpZXdUb0VkdWNhdG9yKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGQsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGVkdWNhdG9yc1tkXS5uYW1lKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmVzb3VyY2UtY29udGVudCcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnLS1lZHVjYXRvcnMtLWVkdWNhdG9yJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlZHVjYXRvcnMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBlZHVjYXRvcnNbZF0ubmFtZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGF5b3V0X2VkaXRhYmxlX2NvbnRlbnQgKHNlbCkge1xuICAgICAgICB2YXIgZGF0YSA9IHJlc291cmNlX21vZGVsLmRhdGEoKTtcblxuICAgICAgICB2YXIgdmVyc2lvbiA9IHJlc291cmNlX21vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZlcnNpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCh2ZXJzaW9uX2Rpc3BsYXllZCk7XG5cbiAgICAgICAgdmFyIGZvcm0gPSBzZWwuYXBwZW5kKCdmb3JtJylcbiAgICAgICAgICAgIC5hdHRyKCduYW1lJywgJ3Jlc291cmNlLWNvbnRlbnQtZm9ybScpXG4gICAgICAgICAgICAuYXR0cignb25TdWJtaXQnLCAncmV0dXJuIGZhbHNlOycpO1xuXG4gICAgICAgIHZhciBlZGl0YWJsZV90aXRsZSA9IGZvcm0uYXBwZW5kKCdpbnB1dCcpXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICd0ZXh0JylcbiAgICAgICAgICAgIC5hdHRyKCduYW1lJywgJ3Jlc291cmNlLWNvbnRlbnQtLXRpdGxlLS1lZGl0YWJsZScpXG4gICAgICAgICAgICAucHJvcGVydHkoJ3ZhbHVlJywgdmVyc2lvbi50aXRsZSk7XG5cbiAgICAgICAgLy8gcmVwbGFjZSB3aXRoIGFuIGh0bWwgZWRpdG9yLlxuICAgICAgICAvLyBib2R5Lmh0bWwgaW4sIHB1bGwgb3V0IHZhbHVlIGFuZFxuICAgICAgICAvLyBzdGFzaCBpdCBiYWNrIGludG8gYm9keS5odG1sXG4gICAgICAgIHZhciBlZGl0YWJsZV9ib2R5X2h0bWwgPSBmb3JtLmFwcGVuZCgndGV4dGFyZWEnKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ3Jlc291cmNlLWNvbnRlbnQtLWJvZHktLWVkaXRhYmxlJylcbiAgICAgICAgICAgIC5hdHRyKCduYW1lJywgJ3Jlc291cmNlLWNvbnRlbnQtLWJvZHktLWVkaXRhYmxlJylcbiAgICAgICAgICAgIC5wcm9wZXJ0eSgndmFsdWUnLCB2ZXJzaW9uLmJvZHkuaHRtbCk7XG5cbiAgICAgICAgdmFyIGVkaXRhYmxlX3RhZ3MgPSBmb3JtXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcucmVzb3VyY2UtY29udGVudC0tdGFncy0tZWRpdGFibGUnKVxuICAgICAgICAgICAgLmRhdGEodmVyc2lvbi50YWdzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2xhYmVsJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhZ3NbZF0ubmFtZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2lucHV0JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyZXNvdXJjZS1jb250ZW50LS10YWdzLS1lZGl0YWJsZScpXG4gICAgICAgICAgICAuYXR0cigndHlwZScsICdjaGVja2JveCcpXG4gICAgICAgICAgICAucHJvcGVydHkoJ2NoZWNrZWQnLCB0cnVlKVxuICAgICAgICAgICAgLmF0dHIoJ3ZhbHVlJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGZvcm0uYXBwZW5kKCdidXR0b24nKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtZm9ybS0tYnV0dG9uJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ2J1dHRvbicpXG4gICAgICAgICAgICAuYXR0cigndmFsdWUnLCAnQ2FuY2VsJylcbiAgICAgICAgICAgIC50ZXh0KCdDYW5jZWwnKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmVkaXQoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2FuY2VsRWRpdGFibGUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGZvcm0uYXBwZW5kKCdidXR0b24nKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jlc291cmNlLWNvbnRlbnQtZm9ybS0tYnV0dG9uJylcbiAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3N1Ym1pdCcpXG4gICAgICAgICAgICAuYXR0cigndmFsdWUnLCAnU2F2ZScpXG4gICAgICAgICAgICAudGV4dCgnU2F2ZScpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZWRpdChmYWxzZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NhdmVkJyk7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkX3RhZ3NfaWQgPSBbXTtcbiAgICAgICAgICAgICAgICBlZGl0YWJsZV90YWdzLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQzLnNlbGVjdCh0aGlzKS5wcm9wZXJ0eSgnY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZF90YWdzX2lkLnB1c2goZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgbmV3X3ZlcnNpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBlZGl0YWJsZV90aXRsZS5wcm9wZXJ0eSgndmFsdWUnKSxcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogZWRpdGFibGVfYm9keV9odG1sLnByb3BlcnR5KCd2YWx1ZScpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHRhZ3M6IHNlbGVjdGVkX3RhZ3NfaWRcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKChuZXdfdmVyc2lvbi50aXRsZSAhPT0gdmVyc2lvbi50aXRsZSkgfFxuICAgICAgICAgICAgICAgICAgICAobmV3X3ZlcnNpb24uYm9keS5odG1sICE9PSB2ZXJzaW9uLmJvZHkuaHRtbCkgfFxuICAgICAgICAgICAgICAgICAgICAoIShhcnJheUVxdWFscyhuZXdfdmVyc2lvbi50YWdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbi50YWdzKSkpKSB7XG5cbiAgICAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLnNhdmVFZGl0YWJsZShuZXdfdmVyc2lvbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jYW5jZWxFZGl0YWJsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFycmF5RXF1YWxzIChhcnIxLCBhcnIyKSB7XG4gICAgICAgIGlmIChhcnIxLmxlbmd0aCAhPT0gYXJyMi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gYXJyMS5sZW5ndGg7IGktLTsgKSB7XG4gICAgICAgICAgICBpZiAoYXJyMVtpXSAhPT0gYXJyMltpXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBSZXNvdXJjZVZpZXcgKCkge1xuICAgIHZhciBzZWxmID0ge307XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07Il19
