(function() {
    'use strict';
    $('[data-lang]').each(function(){
        var $this = $(this),
        code = $this.text();
        function get_keywords(str){
            return '(\\b' + str.replace(/ /g, '\\b|\\b') + '\\b)([^a-z0-9\$_])';
        }
        var dec_var = new RegExp(get_keywords('var const'), 'gi'),
        values = new RegExp(get_keywords('NaN null undefined true false'), 'gi'),
        keywords = new RegExp(get_keywords('new function if else while for switch case'), 'gi');
        code = code.replace(dec_var,'<span class="syntax-decvar">$1</span>$2')
        .replace(keywords, '<span class="syntax-keyword">$1</span>$2')
        .replace(/([a-z\_\$][a-z0-9_]*)\(/gi,'<span class="syntax-function">$1</span>(')
        .replace(/\/\/(.*$)/gm,'<span class="syntax-comment">//  $1</span>')
        .replace(/('.*?')/g,'<span class="syntax-string">$1</span>');
        var lines = code.split(/\n/);
        // console.log(lines.length - 1);
        $this.html(code)
        $this.append('<div class="gutter"></div>')
        for (var i = 0; i < (lines.length - 1); i++) {
            $this.find('.gutter')[0].innerHTML += i+1 + '<br>'
        }
        // var highlighter = {
        //     js: (code) => {
        //         // return code;
        //         $this.html(code)
        //     }
        // }
        // if ( $this.data('lang') == 'js' ) {
        //     $this.html(highlighter.js(code))
        //     // highlighter.js(code)
        // }
    })
}());
