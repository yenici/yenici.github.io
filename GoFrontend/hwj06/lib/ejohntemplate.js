// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};

  // Added by Mindon
  this.tmplCall = {
    nohtml: function(v) {
      return typeof v == 'string'
        ? v.replace(/&/g,'&amp;').replace(/</g,'&lt;')
           .replace(/>/g,'&gt;').replace(/[ ]{2}/g, '&nbsp; ')
        : v;
    }
  , br: function(v) {
      return typeof v == 'string'
        ? v.replace(/\n{2,}/g, '<br/><br/>').replace(/\n/g, '<br/>')
        : v;
    }
  };

  // Updated by mindon@gmail.com Nov. 3, 2011 ( options parameter append )
  this.tmpl = function tmpl(str, data, opt){
    var _t, _f; // added by Mindon

    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML, 0, opt) : // updated by Mindon

      // Appended by Mindon
      ( (_t = opt && opt.html ? 1: 'tmplCall.nohtml') &&
        (_f = opt && opt.fields ? '(' +opt.fields +')(d)' : 1) &&
        ((_t===1&&(_t=0)) || (_f===1&&(_f=0))) && 0
        // fields: function(){return {fieldName: handlefn(v){}}}
      ) ||

      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("d",
        "var p=[],print=function(){p.push.apply(p,arguments);}, _f=" + _f +", _t="
          +_t +",_v=function(k,v){"
          +'return tmplCall.br('
          +(_f?'_f[k]?_f[k](':'') +(_t?'_t(v)':'v') +(_f?'):'
          +(_t?'_t(v)':'v'):'') +")};" + // updated

        // Introduce the data as local variables using with(){}
        "p.push('" +

        // Convert the template into pure JavaScript
        str.replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',_v('$1',d['$1']),'") // updated
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');return p.join('');");

    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();
