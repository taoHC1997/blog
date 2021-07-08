# tsParticles 使用记录

> `tsParticles` 基于 `particles.js` 开发，是一个可搭配现代前端框架的背景动画库。
> 该库仍在更新开发当中，部分功能可能未使用好，具体使用最好参考示例实现。

- 仓库地址： https://github.com/matteobruni/tsparticles
- 官网： https://particles.matteobruni.it/
- 可视化配置修改网址： https://particles.matteobruni.it/Samples#
- 更多示例： https://codepen.io/tag/tsparticles
- CDN 地址： https://cdnjs.com/libraries/tsparticles
- 文档： https://particles.js.org/

## 基础使用

### 网页使用

网页：

```html
<div id="tsparticles"></div>
<script src="tsparticles.min.js"></script>
```

使用：

- 读取配置
  ```js
  tsParticles.load("tsparticles", {
    /* options here */
  });
  ```
- 读取文件
  ```js
  tsParticles
    .loadJSON("tsparticles", "presets/default.json")
    .then((container) => {
      console.log("成功回调！");
    })
    .catch((error) => {
      console.error(error);
    });
  ```
- 数组型配置读取（此时会随机显示）
  ```js
  tsParticles.loadFromArray("tsparticles", [
    {
      /* options here */
    },
    {
      /* other options here */
    },
  ]);
  // 可带数字参数固定配置
  ```
- 动画设置
  ```js
  // 动画获取
  const particles = tsParticles.domItem(0);
  // 动画开始
  particles.play();
  // 动画暂停
  particles.pause();
  ```

各项配置示例：

- `Angular` ：
  https://github.com/matteobruni/tsparticles/blob/master/components/angular/README.md
- `Inferno` ：
  https://github.com/matteobruni/tsparticles/blob/master/components/inferno/README.md
- `jQuery` ：
  https://github.com/matteobruni/tsparticles/blob/master/components/jquery/README.md
- `Preact` ：
  https://github.com/matteobruni/tsparticles/blob/master/components/preact/README.md
- `ReactJS` ：
  https://github.com/matteobruni/tsparticles/blob/master/components/react/README.md
- `Svelte` ：
  https://github.com/matteobruni/tsparticles/blob/master/components/svelte/README.md
- `VueJ` S
  2.x： https://github.com/matteobruni/tsparticles/blob/master/components/vue/README.md
- `VueJ` S
  3.x： https://github.com/matteobruni/tsparticles/blob/master/components/vue3/README.md

### npm & yarn 使用

安装：

```s
npm install tsparticles
# or
yarn add tsparticles
```

使用：

```js
const tsParticles = require("tsparticles");
// or
import { tsParticles } from "tsparticles";
```

## 语法配置

### 配置

> 注意， `particles.js` 的配置可直接使用

```json
{
  // 自动播放
  "autoPlay": true,
  // 背景，css 选项
  "background": {
    // 颜色
    "color": {
      "value": "#000000"
    },
    // 背景图片
    "image": "",
    // 背景图片位置设置，见 CSS 属性
    "position": "50% 50%",
    // 背景图片摆放设置，见 CSS 属性
    "repeat": "no-repeat",
    // 背景图片大小设置，见 CSS 属性
    "size": "cover",
    // 透明度
    "opacity": 1
  },
  // 背景遮罩
  "backgroundMask": {
    // canvas 覆盖策略
    "composite": "destination-out",
    // 遮罩颜色
    "cover": {
      "color": {
        "value": "#fff"
      },
      // 透明度
      "opacity": 1
    },
    // 是否遮罩
    "enable": false
  },
  // 背景模式，其实就是 z-index
  "backgroundMode": {
    // 粒子画布设置动画背景模式
    "enable": true,
    // 设置画布 z-index
    "zIndex": 0
  },
  // 视网膜检测，高分辨率好效果
  "detectRetina": true,
  // fps 限制
  "fpsLimit": 60,
  // 感染，粒子互动的一种（似乎未完成，待更新）
  "infection": {
    // 感染是否可被治愈
    "cure": false,
    // 感染后发作时间
    "delay": 0,
    // 是否启用
    "enable": false,
    // 初始感染粒子数目
    "infections": 0,
    // 感染症状描述，对象描述
    "stages": [
      {
        // 当前颜色
        "color": "#900",
        // 感染半径
        "radius": 1,
        // 感染概率
        "rate": 1,
        // 持续多少秒判断感染
        "duration": 1,
        // 感染阶段
        "infectedStage": 0
      }
    ]
  },
  // 粒子互动
  "interactivity": {
    // 事件互动主体： "canvas", "window", "parent"
    "detectsOn": "canvas",
    "events": {
      // 点击事件
      "onClick": {
        "enable": true,
        // 可为： "attract" "bubble" "pause" "push" "remove" "repulse" "trail" "emitter" "absorber"
        "mode": "push"
      },
      // 鼠标覆盖至某 div
      "onDiv": {
        // 使用 CSS 选择器
        "selectors": [],
        "enable": false,
        // 可为： "bounce" "bubble" "repulse"
        "mode": [],
        // div检测模式，可为： "circle" "rectangle"
        "type": "circle"
      },
      // 鼠标覆盖画布
      "onHover": {
        "enable": true,
        // 可为： "grab" "bubble" "repulse" "connect" ["grab", "bubble"]
        "mode": "repulse",
        // 视差（是否展示 3D 感）
        "parallax": {
          "enable": false,
          "force": 2,
          "smooth": 10
        }
      },
      // 视口改变检测
      "resize": true
    },
    // 触发事件后动作
    "modes": {
      // 吸引粒子
      "attract": {
        // 吸引半径
        "distance": 200,
        // 吸引时间
        "duration": 0.4,
        // 吸引速度
        "speed": 1
      },
      // 反弹
      "bounce": {
        // 反弹半径
        "distance": 200
      },
      // 鼠标压制
      "bubble": {
        // 压制范围半径
        "distance": 400,
        // 压制时间
        "duration": 2,
        // 压制后透明度
        "opacity": 0.8,
        // 压制后大小
        "size": 40
      },
      // 连线（粒子间）
      "connect": {
        // 连线检测半径
        "distance": 80,
        // 线设置透明度
        "links": {
          "opacity": 0.5
        },
        // 粒子连线检测半径
        "radius": 60
      },
      // 连线（鼠标与粒子间）
      "grab": {
        //连线半径
        "distance": 400,
        // 线设置
        "links": {
          // 使用新连接（不推荐）
          "blink": false,
          // 使用新连接（不推荐）
          "consent": false,
          "opacity": 1
        }
      },
      // 鼠标开启光源模式
      "light": {
        // 光源径向渐变
        "area": {
          "gradient": {
            "start": {
              "value": "#ffffff"
            },
            "stop": {
              "value": "#000000"
            }
          },
          // 光源半径
          "radius": 1000
        },
        // 光源阴影设置（光源照不到的地方颜色设置）
        "shadow": {
          "color": {
            "value": "#000000"
          },
          // 影子长度设置（设置短了就不像影子了）
          "length": 2000
        }
      },
      // 添加粒子
      "push": {
        // 添加粒子数
        "quantity": 4
      },
      // 移除粒子
      "remove": {
        // 移除粒子数
        "quantity": 2
      },
      // 击退
      "repulse": {
        // 击退检测半径
        "distance": 200,
        // 击退时间
        "duration": 0.4,
        // 击退速度
        "speed": 1
      },
      // 速度减慢
      "slow": {
        // 因子数
        "factor": 3,
        // 检测半径
        "radius": 200
      },
      // 不断落下粒子
      "trail": {
        // 循环延迟
        "delay": 1,
        // 粒子数目
        "quantity": 1,
        // 粒子描述，见下面示例
        "particles": {}
      }
    }
  },
  // 自定义粒子，见： https://particles.js.org/interfaces/_options_interfaces_imanualparticle_.imanualparticle.html
  "manualParticles": [],
  // 运动设置，不太懂什么意思
  "motion": {
    "disable": false,
    "reduce": {
      "factor": 4,
      "value": false
    }
  },
  // 粒子
  "particles": {
    // 反弹（球与边界）
    "bounce": {
      // 水平
      "horizontal": {
        // 随机
        "random": {
          "enable": false,
          "minimumValue": 0.1
        },
        // 值设置
        "value": 1
      },
      // 垂直
      "vertical": {
        "random": {
          "enable": false,
          "minimumValue": 0.1
        },
        "value": 1
      }
    },
    // 碰撞（球与球）
    "collisions": {
      // 弹跳
      "bounce": {
        // 水平
        "horizontal": {
          "random": {
            "enable": false,
            "minimumValue": 0.1
          },
          "value": 1
        },
        // 垂直
        "vertical": {
          "random": {
            "enable": false,
            "minimumValue": 0.1
          },
          "value": 1
        }
      },
      "enable": false,
      // 模式，"absorb"表示吸收；"bounce"表示碰撞；"destroy"表示破坏
      "mode": "bounce"
    },
    // 颜色设置
    "color": {
      "value": "#ff0000",
      // 动画设置
      "animation": {
        "enable": true,
        // 似乎是旋转角度
        "speed": 20,
        // 异步，为 true 表示所有新粒子均遵从
        "sync": true
      }
    },
    // 粒子生命周期
    "life": {
      // 计数
      "count": 0,
      // 间隔
      "delay": {
        "random": {
          "enable": false,
          "minimumValue": 0
        },
        "value": 0,
        "sync": false
      },
      // 持续时间
      "duration": {
        "random": {
          "enable": false,
          "minimumValue": 0.0001
        },
        "value": 0,
        "sync": false
      }
    },
    // 连线
    "links": {
      // 闪烁，配合颜色设置 random 使用
      "blink": false,
      // 颜色
      "color": {
        "value": "#ffffff"
      },
      // 启用则连线为单一随机颜色
      "consent": false,
      // 距离检测
      "distance": 100,
      // 是否启用连线
      "enable": true,
      // 频率
      "frequency": 1,
      // 透明度
      "opacity": 0.4,
      // 线阴影
      "shadow": {
        // 模糊度
        "blur": 5,
        // 颜色
        "color": {
          "value": "#00ff00"
        },
        "enable": false
      },
      // 填充链接线制成的三角形
      "triangles": {
        "enable": false,
        "frequency": 1
      },
      // 线宽
      "width": 1,
      // 是否弯曲
      "warp": false
    },
    // 粒子移动
    "move": {
      // 角度
      "angle": {
        "offset": 45,
        "value": 90
      },
      // 吸引
      "attract": {
        "enable": false,
        "rotate": {
          "x": 600,
          "y": 1200
        }
      },
      // 方向，可为： "none" "top" "top-right" "right" "bottom-right" "bottom" "bottom-left" "left" "top-left"
      "direction": "none",
      // 粒子吸引距离？？
      "distance": 0,
      // 移动开启
      "enable": true,
      // 重力
      "gravity": {
        // 加速度
        "acceleration": 9.81,
        // 重力开启
        "enable": false,
        // 最大速度
        "maxSpeed": 50
      },
      // 噪音
      "noise": {
        // 间隔
        "delay": {
          "random": {
            "enable": false,
            "minimumValue": 0
          },
          "value": 0
        },
        "enable": false
      },
      // 超出边界时判定
      "outModes": {
        // 此处可对于各边界，值范围为： "out"过界； "destroy"破坏； "bounce"弹跳； "bounce-vertical"水平弹跳； "bounce-horizontal"垂直弹跳
        "default": "out",
        "bottom": "out",
        "left": "out",
        "right": "out",
        "top": "out"
      },
      // 随机
      "random": false,
      // ？？？
      "size": false,
      // 速度
      "speed": 6,
      // 直线运动
      "straight": false,
      // 拖动效果（粒子尾巴）
      "trail": {
        "enable": false,
        // 尾部长度
        "length": 10,
        // 背景颜色
        "fillColor": {
          "value": "#000000"
        }
      },
      // 抖动效果
      "vibrate": false,
      // 弯曲效果
      "warp": false
    },
    // 粒子数
    "number": {
      // 密度
      "density": {
        "enable": true,
        "area": 800,
        "factor": 1000
      },
      // 限制最大数目
      "limit": 0,
      // 数目设置
      "value": 80
    },
    // 透明度设置
    "opacity": {
      "random": {
        "enable": false,
        "minimumValue": 0.1
      },
      "value": 0.5,
      // 运动透明度设置动态效果
      "animation": {
        "enable": false,
        "minimumValue": 0.1,
        "speed": 3,
        "sync": false
      }
    },
    // 减少重复粒子
    "reduceDuplicates": false,
    // 粒子旋转
    "rotate": {
      // 随机旋转角度
      "random": {
        "enable": false,
        "minimumValue": 0
      },
      // 角度
      "value": 0,
      // 变化旋转角度
      "animation": {
        "enable": false,
        "speed": 0,
        "sync": false
      },
      // 方向，clockwise 顺时针 ； counter-clockwise 逆时针
      "direction": "clockwise",
      // 路径
      "path": false
    },
    // 粒子阴影
    "shadow": {
      // 模糊度
      "blur": 0,
      "color": {
        "value": "#000000"
      },
      // 是否开启阴影
      "enable": false,
      // 阴影偏移
      "offset": {
        "x": 0,
        "y": 0
      }
    },
    // 粒子形状
    "shape": {
      "options": {
        // 多边形设置
        "polygon": {
          "sides": 5
        },
        // 图片设置
        "image": {
          "src": "https://cdn.matteobruni.it/images/particles/github.svg",
          "width": 100,
          "height": 100
        },
        // 星
        "star": {
          "sides": 5,
          "inset": 2
        },
        // 字
        "character": {
          "value": "*",
          "font": "Verdana",
          "style": "",
          "weight": ""
        }
      },
      // 使用内置形状，可为："circle" "line" "edge" "triangle" "polygon" "star" "image" ["circle", "triangle", "image"] 这里为兼容做了一些设置
      "type": "circle"
    },
    // 粒子大小
    "size": {
      // 随机
      "random": {
        "enable": true,
        "minimumValue": 1
      },
      // 值
      "value": 3,
      // 运动中的变化
      "animation": {
        // 自毁
        "destroy": "none",
        "enable": false,
        "minimumValue": 0.1,
        "speed": 20,
        "startValue": "max",
        "sync": false
      }
    },
    // 粒子边界
    "stroke": {
      // 边宽
      "width": 0,
      // 颜色
      "color": {
        "value": "",
        // 颜色变化
        "animation": {
          "enable": false,
          "speed": 0,
          "sync": false
        }
      }
    },
    // 粒子闪烁
    "twinkle": {
      // 线的闪烁
      "lines": {
        "enable": false,
        // 频率
        "frequency": 0.05,
        // 透明度
        "opacity": 1
      },
      // 粒子的闪烁
      "particles": {
        "enable": false,
        "frequency": 0.05,
        "opacity": 1
      }
    }
  },
  // 启用或禁用窗口模糊动画
  "pauseOnBlur": true,
  // 元素在视区之外时启用或禁用动画
  "pauseOnOutsideViewport": false,
  // 主题
  "themes": [],
  // 粒子吸收器（黑洞效果）
  "absorbers": {
    // 颜色
    "color": {
      "value": "#000000"
    },
    // 是否可拖动
    "draggable": false,
    // 透明度
    "opacity": 1,
    // 吸收越多力越大
    "destroy": true,
    // 轨道开启
    "orbits": false,
    // 大小
    "size": {
      // 随机半径
      "random": {
        "enable": true,
        "minimumValue": 30
      },
      // 固定半径
      "value": 50,
      // 密度设置
      "density": 20,
      // 最大半径
      "limit": 100
    },
    // 位置，以百分比为单位
    "position": {
      "x": 50,
      "y": 50
    }
  },
  // 粒子发射器
  "emitters": [
    {
      // 产生粒子的方向，可为： "none" "top" "top-right" "right" "bottom-right" "bottom" "bottom-left" "left" "top-left"
      "direction": "top-right",
      // 发射器位置，可不要
      "position": {
        "x": 50,
        "y": 50
      },
      // 发射器大小，可不要
      "size": {
        "width": 10,
        "height": 10,
        // 大小判定模式，precise 使用像素；"percent"使用百分比
        "mode": "precise"
      },
      // 发射周期设置，可不设置或任意设置
      "life": {
        // 发射次数
        "count": 100,
        // 发射寿命
        "duration": 100,
        // 发射间隔
        "delay": 0.1
      },
      // 概率生成粒子
      "rate": {
        // 生成数
        "quantity": 1,
        // 发射间隔
        "delay": 0.1
      },
      // 粒子选项，见下面示例
      "particles": {}
    }
  ]
}
```

在某些情况会生成其他粒子（非初始化使用粒子），下面给出一个其他粒子的示例：

> 更多参见粒子选项，或： https://particles.js.org/interfaces/_options_interfaces_particles_iparticles_.iparticles.html

```json
{
  "particles": {
    "shape": {
      "type": "circle"
    },
    "color": {
      "value": "random"
    },
    "lineLinked": {
      "enable": false
    },
    "opacity": {
      "value": 0.3
    },
    "rotate": {
      "value": 0,
      "random": true,
      "direction": "counter-clockwise",
      "animation": {
        "enable": true,
        "speed": 15,
        "sync": false
      }
    },
    "size": {
      "value": 10,
      "random": {
        "enable": true,
        "minimumValue": 5
      }
    },
    "move": {
      "speed": 5,
      "random": false,
      "outMode": "bounce"
    }
  },
  "position": {
    "x": 0,
    "y": 100
  }
}
```

### 颜色规范

> 透明度单独设置，故此处透明度会被忽略

- hex 表示法
  ```
  color: '#fff'
  color: '#ffffff'
  ```
  ```
  color: {
    value: '#000000'
  }
  ```
- rgb 表示法
  ```
  color: 'rgb(255, 255, 255)'
  ```
  ```
  color: {
    value: {
      r: 0,
      g: 0,
      b: 0
    }
  }
  ```
- hsl 表示法
  ```
  color: 'hsl(0, 100%, 100%)'
  ```
  ```
  color: {
    value: {
      h: 0,
      s: 0,
      l: 0
    }
  }
  ```
- hsv 表示法
  ```
  color: 'hsv(0°, 100%, 100%)'
  ```
  ```
  color: {
    value: {
      h: 0,
      s: 0,
      v: 0
    }
  }
  ```
- 随机
  ```
  random: 'random'
  color: 'random'
  ```

### 其他

- 可以自定义插件使用
  > 见文档： https://particles.js.org/modules/_core_interfaces_iplugin_.html#pluginscustomizations
