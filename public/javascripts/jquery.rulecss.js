$(function(){
    (function($){
        var cssCache = {}; //각 셀렉터마다 ruleCSS객체를 저장.
        $.fn.ruleCSS = function( property, value ){
            var selectors = this.selector.split(',').map(function(item){
                return $.trim(item); //셀렉터를 빼내고
            });

            if(!property && !value){  // 아무런 값이 넘어오지 않을 경우, 해당 셀렉터의 스타일을 모두 지운다.
                $.each(selectors, function(index, selector){
                    var node = $(selector);
                    if(node.length > 0){
                        var css = node.data('rulecssobj');
                        css.destroy();
                        cssCache[selector] = null;
                    }
                });
            }else{
                var propertyValues = {};
                if($.isPlainObject(property)){
                    propertyValues = property;
                }else if($.type(property) === 'string' && $.type(value) === 'string'){
                    propertyValues[property] = value;
                }else {
                    return;
                }
                $.each(selectors, function(index, selector){ //셀렉터들을 순환하면서 스타일을 입힌다.
                    var node = $(selector);
                    if(node.length > 0){
                        var css = cssCache[selector];
                        if(css instanceof ruleCSS){
                            foreachCSS(css, propertyValues);
                        }else{
                            css = new ruleCSS(selector);
                            foreachCSS(css, propertyValues);
                            cssCache[selector] = css;
                        }
                    }
                });
            }
        }

        function foreachCSS(css, propertyValues){
            $.each(propertyValues, function(prop, value){
                css.set(prop, value);
            });
        }

    })(jQuery);
});
