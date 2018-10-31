/**
 * 全网页截图，就算网页包含了视频标签，也截
 *
 * @example
 *
 *    // 全网页截图
 *    FullPageCaptureWithVideo.capture(null, function (data) {
 *       // 新窗口打开图片
 *       window.open().document.write("<img src=" + data + " />");
 *       // 当然，你也可以直接上传保存图片
 *       // Upload(data)
 *   });
 *
 *
 *    // 只截取指定节点
 *    FullPageCaptureWithVideo.capture({
 *          dom: document.getElementById('video_chat_container'),
 *          h2cUrl: 'your html2canvas.min.js absolute url here...'
 *    }, function (data) {
 *       // 新窗口打开图片
 *       window.open().document.write("<img src=" + data + " />");
 *       // 当然，你也可以直接上传保存图片
 *       // Upload(data)
 *   });
 *
 *
 * @github https://github.com/zxlie/FullPageCaptureWithVideo
 * @date 2018-10-24 （程序猿节）
 * @author zhaoxianlie (阿烈叔)
 */
var FullPageCaptureWithVideo = (function () {

    /**
     * 获取节点offset
     * @param el
     * @param rootEl
     * @returns {{top: number, left: number}}
     */
    var getOffset = function (el, rootEl) {
        var top = 0,
            left = 0;

        while (el && el != rootEl && el.offsetParent) {
            top += el.offsetTop;
            left += el.offsetLeft;
            el = el.offsetParent
        }

        return {
            top: top,
            left: left
        };
    };

    /**
     * 安装 html2canvas.js
     * @param h2cUrl html2canvas.js的URL地址
     * @param resolve
     */
    var installHtml2Canvas = function (h2cUrl,resolve) {
        if (typeof html2canvas === 'undefined') {
            console.log('即将安装 html2canvas ...');

            if(!h2cUrl || !/^http(s)?:\/\/[^\s]+$/.test(h2cUrl)) {
                h2cUrl = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
                console.log('传入的html2canvas.js地址不合法 或 未指定 ，将采用官方地址替换');
            }

            var script = document.createElement('script');
            script.setAttribute('src', h2cUrl);
            document.head.appendChild(script);

            var intervalId = window.setInterval(function () {
                if (typeof html2canvas === 'function') {
                    console.log('html2canvas安装成功！');
                    window.clearInterval(intervalId);
                    resolve && resolve();
                }
            }, 50);
        } else {
            resolve && resolve();
        }
    };

    /**
     * 抓屏，有video标签都自动带上
     * @param options 配置参数
     * @config dom 需要截取的DOM节点，默认是document.body
     * @config h2cUrl html2canvas.js的URL地址
     * @param resolve 抓图回调
     */
    var capture = function (options, resolve) {

        options = options || {};

        if (typeof html2canvas === 'function') {

            try {
                var dom = options.dom || document.body;
                html2canvas(dom || document.body, {
                    useCORS : true,
                    foreignObjectRendering : true,
                    allowTaint :false
                }).then(function (canvas) {
                    console.log('屏幕截取即将开始 ...');

                    // 将 视频区域还原回去
                    var context = canvas.getContext('2d');

                    var videos = Array.prototype.slice.call(document.getElementsByTagName('video'), 0);

                    if (videos.length) {
                        videos.forEach(function (video, index) {
                            var offset = getOffset(video, dom);
                            context.drawImage(video, offset.left, offset.top, video.offsetWidth, video.offsetHeight);

                            if (index === videos.length - 1) {
                                console.log('屏幕截取成功！');
                                resolve && resolve(canvas.toDataURL('image/png'));
                            }
                        });
                    } else {
                        console.log('屏幕截取成功！');
                        resolve && resolve(canvas.toDataURL('image/png'));
                    }

                });
            } catch (e) {
                console.log('sth happened : ', e)
            }
        } else {
            installHtml2Canvas(options.h2cUrl,function () {
                capture(options, resolve);
            });
        }
    };

    return {
        capture: capture
    }

})();
