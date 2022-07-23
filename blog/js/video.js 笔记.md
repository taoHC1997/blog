# video.js 笔记

- github：https://github.com/videojs/video.js
- 文档：https://docs.videojs.com/tutorial-options.html

## 开始

### CDN 导入

```html
<link href="//vjs.zencdn.net/7.3.0/video-js.min.css" rel="stylesheet" />
<script src="//vjs.zencdn.net/7.3.0/video.min.js"></script>
```

```html
<!-- 使用最新版本的Video.js -->
<link
  href="https://unpkg.com/video.js/dist/video-js.min.css"
  rel="stylesheet"
/>
<script src="https://unpkg.com/video.js/dist/video.min.js"></script>

<!-- 使用的Video.js特定版本（如果更改版本号为必要） -->
<link
  href="https://unpkg.com/video.js@6.11.0/dist/video-js.min.css"
  rel="stylesheet"
/>
<script src="https://unpkg.com/video.js@6.11.0/dist/video.min.js"></script>

<!-- 使用的Video.js特定版本（如果更改版本号为必要） -->
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/video.js/6.7.3/video-js.min.css"
  rel="stylesheet"
/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/video.js/6.7.3/video.min.js"></script>
```

### 本地导入

```html
<link href="./css/video-js.min.css" rel="stylesheet" />
<script src="./js/video.min.js"></script>
```

## 使用

### 初始化

#### 标签方式

此方式必须要有 `class="video-js"` 和 `data-setup=‘{}’` 属性

```html
<video
  id="my-player"
  class="video-js"
  controls
  preload="auto"
  poster="//vjs.zencdn.net/v/oceans.png"
  data-setup="{}"
>
  // 。。。
</video>
```

#### JS 方式

此方式需要传入 `id` 值。

```html
<video id="video_1">
  // 。。。
</video>
<script>
  var options = {
    autoplay: true,
  };
  var player = videojs("video_1", options, function onPlayerReady() {
    videojs.log("播放器已经准备好了!");
    this.play();
    this.on("ended", function () {
      videojs.log("播放结束了!");
    });
  });
</script>
```

### 一般设置（css）

### options 设置（json）

```json
//宽string|number
width:1000,
//高：string|number
height:450,
//控制条：boolean
controls:true,
//预加载：string；'auto'|'true'|'metadata'|'none'
preload:"none",
//预览图：string
poster:'source/suoluetu.jpg',
//自动播放：boolean
autoplay:false,
//循环：boolean
loop:true,
//静音：boolean
muted:true,
//
sources:[
	{
		src:'source/test.mp4',
		type:'video/mp4'
	}
],
//
controlBar: {
	muteToggle: false,
	volumeMenuButton:false//静音按钮
}
```

### 字幕标签 `<track/>`

```html
<video
       //...
    >
	//...
    <track
           //定义字幕内容类型，只能是这五种之一: subtitles, captions, descriptions, chapters, metadata.
           kind="subtitles"
           //字幕标签，每个字幕元素必需设置一个唯一不重复的标签，切换字幕时显示的名称。
           label="Chinese subtitles"
           //字幕文件的URL地址
           src="D:\CloudMusic\MV\st.vtt"
           //字幕文件的语言类型，标识信息的作用，播放器不使用这个属性。
           srclang="zh"
           //还有一个 default 指定是否默认字幕
           ></track>
</video>
```

## 其他

- `4.9` 版本后支持 audio 标签播放音乐，使用方式差不多。
- 参考网站
  - https://www.awaimai.com/2053.html
  - https://www.cnblogs.com/stoneniqiu/p/5807568.html
