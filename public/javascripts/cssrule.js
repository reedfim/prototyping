var ruleCSS = (function( doc ){
    var sheet, ruleSet, css;

    sheet = doc.createElement('style');
    doc.getElementsByTagName('head')[0].appendChild(sheet);
    sheet = sheet.styleSheet || sheet.sheet;
    ruleSet = sheet.cssRules || sheet.rules;

    //ruleSet은 index로만 접근 가능하기 때문에 해당 selector에 맞는 index를 찾는 함수를 작성한다.
    var index = function( selector ){
        for(var i= 0,len=ruleSet.length,tIdx; i<len; i++){
            if(ruleSet[tIdx = i].selectorText.toLowerCase() === selector || ruleSet[tIdx = len - i - 1].selectorText.toLowerCase() === selector){
                return tIdx;
            }
        }
    };

    //객체 탐지
    if( sheet.insertRule ){
        var add = function( selector ){
            sheet.insertRule(selector+'{}', ruleSet.length);//마지막 인덱스에 셀렉터를 추가한다.
        };
        var remove = function( selector ){
            sheet.deleteRule( index(selector) ); //해당 인덱스의 셀렉터를 삭제한다.
        };
    }else{
        var add = function( selector ){
            sheet.addRule(selector+'{}', ruleSet.length);
        };
        var remove = function( selector ){
            sheet.removeRule( index(selector) );
        };
    }


    var prefix = ['webkit', 'moz']; //script로 컨트롤 하기 때문에 - 없이 소문자와 camelCase사용
    var prefixTarget = {
        'transform':true,
        'transform-origin':true,
        'transform-style':true,
        'transition':true,
        'transition-property':true,
        'transition-duration':true,
        'transition-timing-function':true,
        'transition-delay':true,
        'animation-name':true,
        'animation-duration':true,
        'animation-timing-function':true,
        'animation-iteration-count':true,
        'animation-direction':true,
        'animation-play-state':true,
        'animation-delay':true,
        'text-shadow':true,
        'box-shadow':true,
        'box-sizing':true,
        'border-radius':true,
        'border-top-left-radius':true,
        'border-top-right-radius':true,
        'border-bottom-left-radius':true,
        'border-bottom-right-radius':true,
        'border-image':true,
        'border-image-source':true,
        'border-image-slice':true,
        'border-image-width':true,
        'border-image-outset':true,
        'border-image-repeat':true
    };

    css = function( selector ){
        add(selector);
        this.selector = selector;
        this.rule = ruleSet[ruleSet.length - 1];
        this.style = this.rule.style;
    };
    css.prototype.destroy = function(){
        remove(this.selector);
        this.style = this.rule = this.selector = null;
    }
    css.prototype.set = function( property, value ){
        if(prefixTarget[property]){
            for(var i= 0,len=prefix.length; i<len; i++){
                property = prefix[i] + property.charAt(0).toUpperCase() + property.substr(1); //스크립트에서 제어하기 때문에 -webkit-transform이 아니라 webkitTransform이다.
                this.style[property] = value;
            }
        }else{
            this.style[property] = value;
        }
    }

    return css;

})(document);

