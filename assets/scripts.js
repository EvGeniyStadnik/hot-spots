var spots = (function(){
    var self = this;
    self.init = function(options){
        options = Object.assign({}, spotsOptions || {}, options);
        if(options.screen){
            var img = new Image();
            img.onload = function(){
                document.body.style.maxWidth = img.width + 'px';
                document.body.appendChild(img);
                
                var ratio = img.width / img.height;
                if(options.clickableAreas && options.clickableAreas.length){
                    var backgroundColor;
                    if(options.color){
                        backgroundColor = 'rgba(' + [
                            parseInt(options.color.substring(1,3), 16),
                            parseInt(options.color.substring(3,5), 16),
                            parseInt(options.color.substring(5,7), 16),
                            0.3
                        ].join(',') + ')';
                    };
                    options.clickableAreas.forEach(function(area){
                        var
                        ancher = document.createElement('A'),
                        measure = area.measure || '%';
                        
                        area = Object.assign({x:0, y:0, href:'#'}, area);
                        ancher.setAttribute('href', area.href);
                        ancher.style.left = area.x + measure;
                        ancher.style.top = area.y * ratio + measure;
                        if(typeof(area.x1) != 'undefined'){
                            ancher.style.width = (area.x1 - area.x) + measure;
                        };
                        if(typeof(area.y1) != 'undefined'){
                            ancher.style.height = (area.y1 - area.y) * ratio + measure;
                        };
                        if(typeof(area.width) != 'undefined'){
                            ancher.style.width = area.width + measure;
                        };
                        if(typeof(area.height) != 'undefined'){
                            ancher.style.height = area.height * ratio + measure;
                        };
                        if(options.color){
                            ancher.style.backgroundColor = backgroundColor;
                            ancher.style.borderColor = options.color;
                        };
                        ancher.onclick = function () {
                            localStorage.setItem('img', area.href.slice(0, -5));
                            localStorage.setItem('scrollTop', window.pageYOffset || document.documentElement.scrollTop);
                        };

                        document.body.appendChild(ancher);
                    })
                };
            };
            img.onerror = function(){
                alert('Image "' + options.screen + '" not found!');  
            };
            img.src = options.screen;
        }else{
            alert('"screen" parameter (link to the Image) is mandatory!');
            return
        };
        if(typeof(options.title) !== 'undefined'){
            var title = document.querySelector('title') || document.createElement('TITLE');
            title.innerText = options.title;
            !title.parent && document.querySelector('head').appendChild(title);
        };        
        if(options.debug){
            document.documentElement.classList.add('debug');
            var span = document.createElement('SPAN');
            if(options.color){
                span.style.backgroundColor = options.color;
            };
            document.body.appendChild(span);
            document.addEventListener('mousemove', function(e){
                //console.log(e);
                var 
                r = document.body.getBoundingClientRect(),
                x = e.pageX - scrollX - r.left,
                y = e.pageY - scrollY - r.top,
                l = Math.round(x / r.width * 10000) / 100,
                t = Math.round(y / r.width * 10000) / 100;
                
                span.dataset.x = l;
                span.dataset.y = t;

                if(e.pageX < scrollX + innerWidth / 2){
                    span.style.left = x + 'px';
                    span.style.right = 'inherit';
                }else{
                    span.style.right = (r.width - x) + 'px';
                    span.style.left = 'inherit';
                };
                if(e.pageY < scrollY + innerHeight / 2){
                    span.style.top = y + 'px';
                    span.style.bottom = 'inherit';
                }else{
                    span.style.bottom = (r.height - y) + 'px';
                    span.style.top = 'inherit';
                };
                span.style.visibility = e.target.nodeName === 'HTML' ? 'hidden' : 'visible';
                span.innerHTML = ['x:<b>', l, '</b><br/>y:<b>', t, '</b>'].join('');
            });
            document.addEventListener('contextmenu', function(e){
                window.prompt('Copy coordinates to clipboard: Ctrl+C, Enter', 'x:' + span.dataset.x + ', y:' + span.dataset.y);
                e.preventDefault();
                return false;
            });
        };
        var timeoutId;
        document.addEventListener('click', function(e){
            if(e.target.nodeName === 'A'){
                //e.stopPropagation();
                //e.preventDefault();
                return false;
            }
            document.body.classList.add('active');
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function(){document.body.classList.remove('active');}, 250)
        });
    };
    return self;
}).call({})