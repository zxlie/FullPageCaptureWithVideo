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
FullPageCaptureWithVideo.capture({
    dom: document.getElementById('video_chat_container')
}, function (data) {
    // 新窗口打开图片
    window.open().document.write("<img src=" + data + " />");
    // 当然，你也可以直接上传保存图片
    // Upload(data)
});
```


## 示例3：还可以自行指定html2canvas.min.js的地址
```javascript
FullPageCaptureWithVideo.capture({
    // 默认: 'https://html2canvas.hertzen.com/dist/html2canvas.min.js'
    h2cUrl: 'your html2canvas.min.js absolute url here...' 
}, function (data) {
    // 新窗口打开图片
    window.open().document.write("<img src=" + data + " />");
    // 当然，你也可以直接上传保存图片
    // Upload(data)
});
```

## 示例4：加个水印也是OK的
```javascript
// 设置水印
FullPageCaptureWithVideo.capture({ 
    waterMark: {
        text:'抓取于：' + new Date().toLocaleString(),
        font: "20px Arial",
        color: '#f00',
        position: {
            x: 20,
            y: 20
        } 
    }
}, function (data) {
    // 新窗口打开图片
    window.open().document.write("<img src=" + data + " />");
    // 当然，你也可以直接上传保存图片
    // Upload(data)
});
```