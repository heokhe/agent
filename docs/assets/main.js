(function($) {
    'use strict';
    const todo = function () {
        if ( $(this).scrollTop() > $('.header')[0].offsetHeight - 60 ) {
            $('nav').addClass('raised')
        } else {
            $('nav').removeClass('raised')
        }
        if ( $(this).scrollTop() > $('.header')[0].offsetHeight - 105 ) {
            $('.clinfo').addClass('hidden')
        } else {
            $('.clinfo').removeClass('hidden')
        }
    }
    todo()
    $(window).scroll(todo)

    const ghpa = new Agent();

    $('[data-collect-info]').each(function () {
        var $this = $(this),
        text = $this.data('collect-info');
        text = text.split(' => ');
        if ( text.length == 1 ) {
            text = text.join();
            $this.html( ghpa[text]() )
        } else if ( text.length == 2 ) {
            const method = text[0],
            result = text[1];
            var a = ghpa[method]();
            var final = a[result] !== '' ? a[result] : 'Unknown';

            $this.html( final );
        }
    })

    $('.clinfo').each(function () {
        var clinfo = $(this),
        item = clinfo.find('.info-part'),
        activeItem = clinfo.find('.info-part.active'),
        activeIndex = item.index(activeItem);

        clinfo.attr('data-mode', 1).click(function (e) {
            if (e.button == 2) {
                return false;
            }

            activeIndex++;

            if ( activeIndex == item.length ){
                activeIndex = 0;
            }

            clinfo.attr('data-mode', activeIndex + 1)

            item.eq(activeIndex).addClass('active')
            item.eq(activeIndex - 1).removeClass('active')
        })

    })

    $('[data-lang]').each(function(){
        var $this = $(this),
        code = $this.text();
        var highlighter = {
            js: function(){
                var dec_var = new RegExp(get_keywords('var const'), 'gi'),
                values = new RegExp(get_keywords('NaN null undefined true false'), 'gi'),
                keywords = new RegExp(get_keywords('new function if else while for switch case'), 'gi');
                code = code.replace(dec_var,'<span class="syntax-decvar">$1</span>$2')
                .replace(keywords, '<span class="syntax-keyword">$1</span>$2')
                .replace(/([a-z\_\$][a-z0-9_]*)\(/gi,'<span class="syntax-function">$1</span>(')
                .replace(/\/\/(.*$)/gm,'<span class="syntax-comment">//  $1</span>')
                .replace(/('.*?')/g,'<span class="syntax-string">$1</span>');
                $this.html(code)
            },
            html: function () {
                code = $this.html();
                code = code
				.replace(/\s+([a-zA-Z\-]{0,15})\=\"([-a-z0-9_ \/\.\#\:\=\;]{0,70})\"/gi,' <span class="syntax-decvar">$1</span>=<span class="syntax-function">"$2"</span>')
				.replace(/(&lt;)(\w{0,15})(\s+|&gt;|>)/gi,'$1<span class="syntax-keyword">$2</span>$3')
				.replace(/(&lt;)\/(\w{0,15})(&gt;|>)/gi,'$1/<span class="syntax-keyword">$2</span>$3')
				// .replace(/(&lt;!)([-a-z0-9_ \/\.\#\:\"]{0,150})(&gt;|>)/gi,'<span class="dec">$1$2$3</span>')
				.replace(/(&lt;|<)!--([\s\S]*?)--(&gt;|>)/gm,'<span class="syntax-comment">$1!--$2--$3</span>');
                $this.html(code)
            },
            gutter: function () {
                var lines = code.split(/\n/);
                $this.html('')
                // $this.prepend('<div class="gutter"></div>')
                // for (var i = 0; i < (lines.length - 1); i++) {
                //     $this.find('.gutter').append('<div class="line" title="Line ' + (i+1) + '">' + (i+1) + '</div>')
                // }
                for (var i = 0; i < (lines.length - 1); i++) {
                    $('<div class="line"><div class="code">' + lines[i] + '</div></div>').appendTo($this).prepend('<div class="index" title="Line ' + (i+1) +'">' + (i+1) + '</div>')
                };
            }
        }
        function get_keywords(str){
            return '(\\b' + str.replace(/ /g, '\\b|\\b') + '\\b)([^a-z0-9\$_])';
        }

        highlighter[$this.data('lang')]()
        highlighter.gutter()

    })
}(jQuery));
