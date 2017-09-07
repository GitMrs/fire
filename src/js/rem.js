 //设置rem单位为屏幕宽度,适配神器
        ! function() {
            function rem() {
                var width = document.documentElement.clientWidth || document.body.clientWidth;
                // if(width > 1024){
                // 	width = 1024
                // }
                document.documentElement.style.fontSize = width/7.2 + 'px';
                //设置body字体大小，不影响body内字体大小
                document.body.style.fontSize = '16px';
            }
            rem();
            window.addEventListener('resize', rem, false);
        }();