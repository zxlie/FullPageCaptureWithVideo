# FullPageCaptureWithVideo

JS网页截图，支持Video截图

## 使用方法
```html
<script type="text/javascript" src="name/to/path/FullPageCaptureWithVideo.js"></script>
<script type="text/javascript">
    FullPageCaptureWithVideo.capture(YourDomElement, function (imageDataURL) {
        // TODO：处理图片
    });
</script>
```

## 示例1：全网页截图
```javascript
FullPageCaptureWithVideo.capture(null, function (data) {
    // 新窗口打开图片
    window.open().document.write("<img src=" + data + " />");
    // 当然，你也可以直接上传保存图片
    // Upload(data)
});
```

## 示例2：截取某个节点/区域
```javascript
FullPageCaptureWithVideo.capture(document.getElementById('video_chat_container'), function (data) {
    // 新窗口打开图片
    window.open().document.write("<img src=" + data + " />");
    // 当然，你也可以直接上传保存图片
    // Upload(data)
});
```