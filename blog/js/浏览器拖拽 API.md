# 浏览器拖拽 API

- 文档：
  - https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API
  - https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent
  - https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer

## 简单介绍

> 一个拖放（ `drap` ）的实现：用户用鼠标选中一个可拖动的（ `draggable` ）元素，移动鼠标到一个可放置的（ `droppable` ）元素，然后释放鼠标。 期间会触发一系列事件，回调中都包含了一个事件对象
> 在进行拖放操作时，回调函数里的事件对象参数（ `DragEvent` ），包含一个 `DataTransfer` 属性。 `DataTransfer` 对象用来保存被拖动的数据。它可以保存一项或多项数据、一种或者多种数据类型

### 事件类型

- `drag` 事件在元素或者选取的文本被拖动时触发,但必须设有 `draggable="true"` ；在拖动元素时，每隔 350 毫秒会触发此事件
- `dragstart` 用户开始拖动元素时触发
- `dragend` 用户完成元素拖动后触发
- `dragenter` 当被鼠标拖动的对象进入其容器范围内时触发此事件
- `dragover` 当某被拖动的对象在另一对象容器范围内拖动时触发此事件（每 100 毫秒触发一次）
- `dragleave` 当被鼠标拖动的对象离开其容器范围内时触发此事件
- `drop` 在一个拖动过程中，释放鼠标键时触发此事件

> 还有一个 `dragexit` 表示当元素变得不再是拖拽操作的选中目标时触发

### 使用示例

```html
<style>
  #div1 {
    width: 100px;
    height: 100px;
    background-color: aquamarine;
  }
  #div2 {
    width: 100px;
    height: 100px;
    background-color: cadetblue;
  }
</style>
<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)">
  <!-- 让一个元素被拖动需要添加 draggable 属性，再加上全局事件处理函数ondragstart -->
  <span ondragstart="drag(event)" id="drag" draggable="true">hello world</span>
</div>
<div id="div2" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
<script>
  function allowDrop(ev) {
    // 默认地，无法将数据/元素放置到其他元素中。如果需要设置允许放置，我们必须阻止对元素的默认处理方式。
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text_name", ev.target.id);
  }

  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text_name");
    ev.target.appendChild(document.getElementById(data));
  }
</script>
```
