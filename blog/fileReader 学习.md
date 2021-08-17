# fileReader 学习

> 此 API 辅助文件图片预览

## 基础使用

> 首先兼容性检查
>
> ```js
> if (!(window.FileReader && window.File && window.FileList && window.Blob)) {
>   show.innerHTML = "您的浏览器不支持fileReader";
>   upimg.setAttribute("disabled", "disabled");
>   return false;
> }
> ```

这里以单张图片预览为示例：

```html
<input type="file" id="upimg" />
<div id="show"></div>
<script>
  var upimg = document.querySelector("#upimg");
  var show = document.querySelector("#show");
  upimg.addEventListener("change", function (e) {
    var files = this.files;
    if (files.length) {
      checkFile(this.files);
    }
  });
  // 图片处理
  function checkFile(files) {
    var file = files[0];
    // 创建流
    var reader = new FileReader();
    if (!/image\/\w+/.test(file.type)) {
      show.innerHTML = "请确保文件为图像类型";
      return false;
    }
    // onload 是异步操作
    reader.onload = function (e) {
      show.innerHTML = '<img src="' + e.target.result + '" alt="img">';
    };
    // 读取流
    reader.readAsDataURL(file);
  }
</script>
```

## API 介绍

方法：

| 方法名             | 参数             | 描述                                          |
| ------------------ | ---------------- | --------------------------------------------- |
| readAsBinaryString | file             | 将文件读取为二进制编码                        |
| readAsText         | file[, encoding] | 按照格式将文件读取为文本，encode 默认为 UTF-8 |
| readAsDataURL      | file             | 将文件读取为 DataUrl                          |
| abort              | (none)           | 终端读取操作                                  |

事件绑定：

| 事件        | 描述                   |
| ----------- | ---------------------- |
| onabort     | 中断                   |
| onerror     | 出错                   |
| onloadstart | 开始                   |
| onprogress  | 正在读取               |
| onload      | 成功读取               |
| onloadend   | 读取完成，无论成功失败 |

## 使用技巧

### 多图片预览

```html
<input type="file" id="upimg" />
<div id="show"></div>
<script>
  var upimg = document.querySelector("#upimg");
  var show = document.querySelector("#show");
  upimg.addEventListener("change", function (e) {
    var files = this.files;
    if (files.length) {
      checkFile(this.files);
    }
  });
  // 图片处理
  function checkFile(files) {
    var html = "",
      i = 0;
    var func = function () {
      if (i >= files.length) {
        // 若已经读取完毕，则把html添加页面中
        show.innerHTML = html;
      }
      var file = files[i];
      var reader = new FileReader();
      if (!/image\/\w+/.test(file.type)) {
        show.innerHTML = "请确保文件为图像类型";
        return false;
      }
      reader.onload = function (e) {
        html += '<img src="' + e.target.result + '" alt="img">';
        i++;
        func(); //选取下一张图片
      };
      reader.readAsDataURL(file);
    };
    func();
  }
</script>
```

### 拖拽拉取图片

```html
<!-- 注意 checkFile() 使用不变 -->
<style>
  .drag {
    width: 400px;
    height: 100px;
    border: 1px dotted #333;
    text-align: center;
    line-height: 100px;
    color: #aaa;
    display: inline-block;
  }
  .drag_hover {
    background: #fad6f9;
  }
</style>
<span class="drag" id="drag">拖拽区域</span>
<div id="show"></div>
<script>
  var drag = document.getElementById("drag");
  drag.addEventListener(
    "dragenter",
    function (e) {
      // 拖拽鼠标进入区域时
      this.className = "drag_hover";
    },
    false
  );
  drag.addEventListener(
    "dragleave",
    function (e) {
      // 拖拽鼠标离开区域时
      this.className = "";
    },
    false
  );
  drag.addEventListener(
    "drop",
    function (e) {
      // 当鼠标执行‘放’的动作时，执行读取文件操作
      var files = e.dataTransfer.files;
      this.className = "";
      if (files.length != 0) {
        checkFile(files);
      }
      e.preventDefault();
    },
    false
  );
  drag.addEventListener(
    "dragover",
    function (e) {
      // 当对象拖动到目标对象时触发
      e.dataTransfer.dragEffect = "copy";
      e.preventDefault();
    },
    false
  );
</script>
```

### 配合 Blob （二进制对象）使用

- Blob 文档： https://developer.mozilla.org/zh-CN/docs/Web/API/Blob/Blob

```js
var obj = { hello: "world" };
var blob = new Blob([JSON.stringify(debug, obj, 4)]);

console.log(blob); // Blob(24) {size: 24, type: ""}

var fr = new FileReader();
fr.readAsDataURL(blob);
fr.addEventListener("loadend", function (e) {
  console.log(e.target.result); // data:;base64,ewogICAgImhlbGxvIjogIndvcmxkIgp9
});
```
