# 浏览器剪贴 API

- 文档：
  - https://developer.mozilla.org/zh-CN/docs/Web/API/Element/copy_event
  - https://developer.mozilla.org/zh-CN/docs/Web/API/Element/cut_event
  - https://developer.mozilla.org/zh-CN/docs/Web/API/Element/paste_event

## 简单使用

> `cut` 剪切可参考 `copy`

### `copy` 复制

```html
<!-- 点击复制 + 修改复制内容 -->
<input type="text" id="input" value="" /> <br />
<button type="button" id="btn">复制输入框中内容</button>
<script>
  var btn = document.querySelector("#btn");
  var input = document.querySelector("#input");
  input.addEventListener("copy", function (event) {
    // 使用ClipboardApi来设置剪贴板里的内容
    var clipboardData = event.clipboardData || window.clipboardData;
    if (!clipboardData) {
      return;
    }
    var text = window.getSelection().toString();
    if (text) {
      event.preventDefault();
      console.log(text);
      // 此函数修改默认行为
      clipboardData.setData("text/plain", "前缀" + text);
    }
    input.value = "";
  });
  btn.addEventListener("click", function () {
    input.select();
    // 执行复制操作
    if ((successful = document.execCommand("copy"))) {
      // console.log(successful);
    } else {
      console.log("复制失败");
    }
  });
</script>
```

### `paste` 粘贴

- 更多信息参考： https://segmentfault.com/a/1190000004288686

```html
<div>abcdefg</div>
<div class="target" contenteditable="true">在此粘贴...</div>
<script>
  const target = document.querySelector("div.target");

  target.addEventListener("paste", (event) => {
    let clipboardData = event.clipboardData || window.clipboardData;
    if (!clipboardData) {
      return;
    }
    // 转大写
    let text = clipboardData.getData("text").toUpperCase();
    console.log(text);
    // 这里将获取的数据覆盖添加到 div 后，因为默认行为不会改 div
    const selection = window.getSelection();
    if (!selection.rangeCount) return false;
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(text));
    // event.preventDefault();
  });
</script>
```
