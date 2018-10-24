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
 *    FullPageCaptureWithVideo.capture(document.getElementById('video_chat_container'), function (data) {
 *       // 新窗口打开图片
 *       window.open().document.write("<img src=" + data + " />");
 *       // 当然，你也可以直接上传保存图片
 *       // Upload(data)
 *   });
 *
 * @date 2018-10-24 （程序猿节）
 * @author zhaoxianlie
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
     */
    var installHtml2Canvas = function (resolve) {
        if (typeof html2canvas === 'undefined') {
            console.log('即将安装 html2canvas ...');

            var script = document.createElement('script');
            script.setAttribute('src', 'https://html2canvas.hertzen.com/dist/html2canvas.min.js');
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
     * @param dom
     * @param resolve
     */
    var capture = function (dom, resolve) {

        if (typeof html2canvas === 'function') {

            try {
                dom = dom || document.body;
                html2canvas(dom || document.body).then(function (canvas) {
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
            installHtml2Canvas(function () {
                capture(dom, resolve);
            });
        }
    };

    return {
        capture: capture
    }

})();