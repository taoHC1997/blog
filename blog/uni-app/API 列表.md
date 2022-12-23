# uni-app API 列表

> 相对文档进行了简单重排加更新

- https://uniapp.dcloud.net.cn/api/

## API 列表

### 基础功能项

#### 日志

| API                                              | 说明                 |
| ------------------------------------------------ | -------------------- |
| [日志打印](https://uniapp.dcloud.net.cn/api/log) | 向控制台打印日志信息 |

#### 定时器

| API                                              | 说明                             |
| ------------------------------------------------ | -------------------------------- |
| [定时器](https://uniapp.dcloud.net.cn/api/timer) | 在定时到期以后执行注册的回调函数 |

#### 键盘

| API                                                                                              | 说明                                                   |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| [uni.hideKeyboard](https://uniapp.dcloud.net.cn/api/key.html#hidekeyboard)                       | 隐藏已经显示的软键盘，如果软键盘没有显示则不做任何操作 |
| [uni.onKeyboardHeightChange](https://uniapp.dcloud.net.cn/api/key.html#onkeyboardheightchange)   | 监听键盘高度变化                                       |
| [uni.offKeyboardHeightChange](https://uniapp.dcloud.net.cn/api/key.html#offkeyboardheightchange) | 取消监听键盘高度变化事件                               |
| [uni.getSelectedTextRange](https://uniapp.dcloud.net.cn/api/key#getselectedtextrange)            | 在 input、textarea 等 focus 之后，获取输入框的光标位置 |

#### 数据处理

| API                                                                             | 说明                                  |
| ------------------------------------------------------------------------------- | ------------------------------------- |
| [uni.base64ToArrayBuffer](https://uniapp.dcloud.net.cn/api/base64ToArrayBuffer) | 将 Base64 字符串转成 ArrayBuffer 对象 |
| [uni.arrayBufferToBase64](https://uniapp.dcloud.net.cn/api/arrayBufferToBase64) | 将 ArrayBuffer 对象转成 Base64 字符串 |

#### 启动时参数

| API                                                                               | 说明             |
| --------------------------------------------------------------------------------- | ---------------- |
| [uni.getLaunchOptionsSync](https://uniapp.dcloud.net.cn/api/getLaunchOptionsSync) | 获取启动时的参数 |
| [uni.getEnterOptionsSync](https://uniapp.dcloud.net.cn/api/getEnterOptionsSync)   | 获取启动时的参数 |

#### 国际化

| API                                                                             | 说明               |
| ------------------------------------------------------------------------------- | ------------------ |
| [uni.getLocale](https://uniapp.dcloud.net.cn/api/ui/locale.html#getlocale)      | 获取当前设置的语言 |
| [uni.setLocale](https://uniapp.dcloud.net.cn/api/ui/locale.html#setlocale)      | 设置当前语言       |
| [uni.onLocaleChange](https://uniapp.dcloud.net.cn/api/ui/locale.html#setlocale) | 监听应用语言切换   |

#### 其他

| API                                                        | 说明                                                 |
| ---------------------------------------------------------- | ---------------------------------------------------- |
| [应用级事件](https://uniapp.dcloud.net.cn/api/application) | 监听应用事件（多种）                                 |
| [拦截器](https://uniapp.dcloud.net.cn/api/interceptor)     | 拦截 Api 等调用并执行回调                            |
| [全局 API](https://uniapp.dcloud.net.cn/api/global)        | 可全局调用 Api                                       |
| [uni.canIUse](https://uniapp.dcloud.net.cn/api/caniuse)    | 判断应用的 API，回调，参数，组件等是否在当前版本可用 |

### 网络

#### 请求

| API                                                                           | 说明                                |
| ----------------------------------------------------------------------------- | ----------------------------------- |
| [uni.request](https://uniapp.dcloud.net.cn/api/request/request#request)       | 发起网络请求                        |
| [uni.configMTLS](https://uniapp.dcloud.net.cn/api/request/request#configmtls) | https 请求配置自签名证书（仅 App ） |

#### 上传、下载

| API                                                                                    | 说明     |
| -------------------------------------------------------------------------------------- | -------- |
| [uni.uploadFile](https://uniapp.dcloud.net.cn/api/request/network-file#uploadfile)     | 上传文件 |
| [uni.downloadFile](https://uniapp.dcloud.net.cn/api/request/network-file#downloadfile) | 下载文件 |

#### WebSocket

| API                                                                                           | 说明                |
| --------------------------------------------------------------------------------------------- | ------------------- |
| [uni.connectSocket](https://uniapp.dcloud.net.cn/api/request/websocket#connectsocket)         | 创建 WebSocket 连接 |
| [uni.onSocketOpen](https://uniapp.dcloud.net.cn/api/request/websocket#onsocketopen)           | 监听 WebSocket 打开 |
| [uni.onSocketError](https://uniapp.dcloud.net.cn/api/request/websocket#onsocketerror)         | 监听 WebSocket 错误 |
| [uni.sendSocketMessage](https://uniapp.dcloud.net.cn/api/request/websocket#sendsocketmessage) | 发送 WebSocket 消息 |
| [uni.onSocketMessage](https://uniapp.dcloud.net.cn/api/request/websocket#onsocketmessage)     | 接受 WebSocket 消息 |
| [uni.closeSocket](https://uniapp.dcloud.net.cn/api/request/websocket#closesocket)             | 关闭 WebSocket 连接 |
| [uni.onSocketClose](https://uniapp.dcloud.net.cn/api/request/websocket#onsocketclose)         | 监听 WebSocket 关闭 |

#### SocketTask

> SocketTask 由 `uni.connectSocket()` 接口创建

| API                                                                                              | 说明                                  |
| ------------------------------------------------------------------------------------------------ | ------------------------------------- |
| [SocketTask.send](https://uniapp.dcloud.net.cn/api/request/socket-task#sockettasksend)           | 通过 WebSocket 连接发送数据           |
| [SocketTask.close](https://uniapp.dcloud.net.cn/api/request/socket-task#sockettaskclose)         | 关闭 WebSocket 连接                   |
| [SocketTask.onOpen](https://uniapp.dcloud.net.cn/api/request/socket-task#sockettaskonopen)       | 监听 WebSocket 连接打开事件           |
| [SocketTask.onClose](https://uniapp.dcloud.net.cn/api/request/socket-task#sockettaskonclose)     | 监听 WebSocket 连接关闭事件           |
| [SocketTask.onError](https://uniapp.dcloud.net.cn/api/request/socket-task#sockettaskonerror)     | 监听 WebSocket 错误事件               |
| [SocketTask.onMessage](https://uniapp.dcloud.net.cn/api/request/socket-task#sockettaskonmessage) | 监听 WebSocket 接受到服务器的消息事件 |

#### 网络状态

| API                                                                                                  | 说明                 |
| ---------------------------------------------------------------------------------------------------- | -------------------- |
| [uni.getNetworkType](https://uniapp.dcloud.net.cn/api/system/network#getnetworktype)                 | 获取网络类型         |
| [uni.onNetworkStatusChange](https://uniapp.dcloud.net.cn/api/system/network#onnetworkstatuschange)   | 监听网络状态变化     |
| [uni.offNetworkStatusChange](https://uniapp.dcloud.net.cn/api/system/network#offnetworkstatuschange) | 取消监听网络状态变化 |

#### 其他

| API                                                        | 说明             |
| ---------------------------------------------------------- | ---------------- |
| [mDNS 服务](https://uniapp.dcloud.net.cn/api/request/mDNS) | mDNS 服务        |
| [UDP](https://uniapp.dcloud.net.cn/api/request/UDP)        | UDP （仅小程序） |
| [Wi-Fi](https://uniapp.dcloud.net.cn/api/system/wifi.html) | Wi-Fi            |

### 页面和路由

#### 跳转

| API                                                                           | 说明                                             |
| ----------------------------------------------------------------------------- | ------------------------------------------------ |
| [uni.navigateTo](https://uniapp.dcloud.net.cn/api/router.html#navigateto)     | 保留当前页面，跳转到应用内的某个页面             |
| [uni.redirectTo](https://uniapp.dcloud.net.cn/api/router.html#redirectto)     | 关闭当前页面，跳转到应用内的某个页面             |
| [uni.reLaunch](https://uniapp.dcloud.net.cn/api/router.html#relaunch)         | 关闭所有页面，打开到应用内的某个页面             |
| [uni.switchTab](https://uniapp.dcloud.net.cn/api/router.html#switchtab)       | 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面 |
| [uni.navigateBack](https://uniapp.dcloud.net.cn/api/router.html#navigateback) | 关闭当前页面，返回上一页面或多级页面             |

> 有一个 [EventChannel](https://uniapp.dcloud.net.cn/api/router.html#event-channel) 对象表示页面间事件**通信**通道

#### 页面部分

| API                                                                   | 说明                |
| --------------------------------------------------------------------- | ------------------- |
| [uni.preloadPage](https://uniapp.dcloud.net.cn/api/preload-page.html) | 预加载页面          |
| [页面](https://uniapp.dcloud.net.cn/api/window/window.html)           | 页面相关实例获取    |
| [窗口动画](https://uniapp.dcloud.net.cn/api/router.html#animation)    | 窗口动画（仅 App ） |

#### 页面通讯

| API                                                                          | 说明                               |
| ---------------------------------------------------------------------------- | ---------------------------------- |
| [uni.$emit](https://uniapp.dcloud.net.cn/api/window/communication.html#emit) | 触发全局的自定义事件               |
| [uni.$on](https://uniapp.dcloud.net.cn/api/window/communication.html#on)     | 监听全局的自定义事件               |
| [uni.$once](https://uniapp.dcloud.net.cn/api/window/communication.html#once) | 监听全局的自定义事件（仅触发一次） |
| [uni.$off](https://uniapp.dcloud.net.cn/api/window/communication.html#off)   | 移除全局自定义事件监听器           |

#### subNvue

> subNVue 是 vue 页面的子窗体，它不是全屏页面，就是用于解决 vue 页面中的层级覆盖和原生界面自定义用的。它也不是组件，就是一个原生子窗体

- https://uniapp.dcloud.net.cn/api/window/subNVues.html
- https://ask.dcloud.net.cn/article/35948

### 数据存储（缓存）

| API                                                                                                | 说明                                |
| -------------------------------------------------------------------------------------------------- | ----------------------------------- |
| [uni.setStorage](https://uniapp.dcloud.net.cn/api/storage/storage.html#setstorage)                 | 数据存储（异步）                    |
| [uni.setStorageSync](https://uniapp.dcloud.net.cn/api/storage/storage.html#setstoragesync)         | 数据存储（同步）                    |
| [uni.getStorage](https://uniapp.dcloud.net.cn/api/storage/storage.html#getstorage)                 | 数据获取（异步）                    |
| [uni.getStorageSync](https://uniapp.dcloud.net.cn/api/storage/storage.html#getstoragesync)         | 数据获取（同步）                    |
| [uni.getStorageInfo](https://uniapp.dcloud.net.cn/api/storage/storage.html#getstorageinfo)         | 获取当前 storage 的相关信息（异步） |
| [uni.getStorageInfoSync](https://uniapp.dcloud.net.cn/api/storage/storage.html#getstorageinfosync) | 获取当前 storage 的相关信息（同步） |
| [uni.removeStorage](https://uniapp.dcloud.net.cn/api/storage/storage.html#removestorage)           | 数据移除某项（异步）                |
| [uni.removeStorageSync](https://uniapp.dcloud.net.cn/api/storage/storage.html#removestoragesync)   | 数据移除某项（同步）                |
| [uni.clearStorage](https://uniapp.dcloud.net.cn/api/storage/storage.html#clearstorage)             | 数据清空（异步）                    |
| [uni.clearStorageSync](https://uniapp.dcloud.net.cn/api/storage/storage.html#clearstoragesync)     | 数据清空（同步）                    |

### 媒体

#### 图片

| API                                                                                               | 说明                       |
| ------------------------------------------------------------------------------------------------- | -------------------------- |
| [uni.chooseImage](https://uniapp.dcloud.net.cn/api/media/image#chooseimage)                       | 从相册选择图片，或者拍照   |
| [uni.previewImage](https://uniapp.dcloud.net.cn/api/media/image#unipreviewimageobject)            | 预览图片                   |
| [uni.closePreviewImage](https://uniapp.dcloud.net.cn/api/media/image#closepreviewimage)           | 关闭预览图片               |
| [uni.getImageInfo](https://uniapp.dcloud.net.cn/api/media/image#getimageinfo)                     | 获取图片信息               |
| [uni.saveImageToPhotosAlbum](https://uniapp.dcloud.net.cn/api/media/image#saveimagetophotosalbum) | 保存图片到系统相册         |
| [uni.compressImage](https://uniapp.dcloud.net.cn/api/media/image#compressimage)                   | 压缩图片接口，可选压缩质量 |

#### 文件

| API                                                                      | 说明           |
| ------------------------------------------------------------------------ | -------------- |
| [uni.chooseFile](https://uniapp.dcloud.net.cn/api/media/file#chooseFile) | 从本地选择文件 |

> 微信有一个 [wx.chooseMessageFile](https://uniapp.dcloud.net.cn/api/media/file.html#wx-choosemessagefile) 从微信聊天会话中选择文件

#### 录音管理

| API                                                                             | 说明     |
| ------------------------------------------------------------------------------- | -------- |
| [uni.getRecorderManager](https://uniapp.dcloud.net.cn/api/media/record-manager) | 录音管理 |

#### 音频

| API                                                                                              | 说明                           |
| ------------------------------------------------------------------------------------------------ | ------------------------------ |
| [uni.getBackgroundAudioManager](https://uniapp.dcloud.net.cn/api/media/background-audio-manager) | 背景音频播放管理（后台仍播放） |
| [uni.createInnerAudioContext](https://uniapp.dcloud.net.cn/api/media/audio-context)              | 音频组件管理                   |

#### 视频

| API                                                                                               | 说明                                                 |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [uni.chooseVideo](https://uniapp.dcloud.net.cn/api/media/video#choosevideo)                       | 拍摄视频或从手机相册中选视频，返回视频的临时文件路径 |
| [uni.chooseMedia](https://uniapp.dcloud.net.cn/api/media/video#choosemedia)                       | 拍摄或从手机相册中选择**图片或视频**                 |
| [uni.saveVideoToPhotosAlbum](https://uniapp.dcloud.net.cn/api/media/video#savevideotophotosalbum) | 保存视频到系统相册                                   |
| [uni.getVideoInfo](https://uniapp.dcloud.net.cn/api/media/video#getvideoinfo)                     | 获取视频详细信息                                     |
| [uni.compressVideo](https://uniapp.dcloud.net.cn/api/media/video.html#compressvideo)              | 压缩视频接口                                         |
| [uni.openVideoEditor](https://uniapp.dcloud.net.cn/api/media/video.html#openvideoeditor)          | 打开视频编辑器                                       |
| [uni.createVideoContext](https://uniapp.dcloud.net.cn/api/media/video-context#createvideocontext) | 视频组件管理                                         |

#### 相机

| API                                                                              | 说明         |
| -------------------------------------------------------------------------------- | ------------ |
| [uni.createCameraContext](https://uniapp.dcloud.net.cn/api/media/camera-context) | 相机组件管理 |

#### 直播组件管理

| API                                                                                                                    | 说明             |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------- |
| [uni.createLivePlayerContext](https://uniapp.dcloud.net.cn/api/media/live-player-context.html#createliveplayercontext) | 直播组件（播放） |
| [uni.createLivePusherContext](https://uniapp.dcloud.net.cn/api/media/live-player-context.html#createlivepushercontext) | 直播组件（推流） |

#### 其他

| API                                                                                     | 说明               |
| --------------------------------------------------------------------------------------- | ------------------ |
| [editorContext](https://uniapp.dcloud.net.cn/api/media/editor-context.html)             | 富文本组件配合 API |
| [uni.createMediaContainer](https://uniapp.dcloud.net.cn/api/media/media-container.html) | 音视频处理         |

### 设备

#### 系统信息及权限

| API                                                                                                 | 说明                    |
| --------------------------------------------------------------------------------------------------- | ----------------------- |
| [uni.getSystemInfo](https://uniapp.dcloud.net.cn/api/system/info#getsysteminfo)                     | 获取系统信息（异步）    |
| [uni.getSystemInfoSync](https://uniapp.dcloud.net.cn/api/system/info#getsysteminfosync)             | 获取系统信息（同步）    |
| [uni.getDeviceInfo](https://uniapp.dcloud.net.cn/api/system/getDeviceInfo.html)                     | 获取设备基础信息        |
| [uni.getWindowInfo](https://uniapp.dcloud.net.cn/api/system/getWindowInfo.html)                     | 获取窗口信息            |
| [uni.getAppBaseInfo](https://uniapp.dcloud.net.cn/api/system/getAppBaseInfo.html)                   | 获取微信及 APP 基础信息 |
| [uni.getAppAuthorizeSetting](https://uniapp.dcloud.net.cn/api/system/getappauthorizesetting.html)   | 获取 APP 授权设置       |
| [uni.getSystemSetting](https://uniapp.dcloud.net.cn/api/system/getsystemsetting.html)               | 获取设备设置            |
| [uni.openAppAuthorizeSetting](https://uniapp.dcloud.net.cn/api/system/openappauthorizesetting.html) | 跳转系统授权管理页      |

#### 地理位置

| API                                                                                      | 说明             |
| ---------------------------------------------------------------------------------------- | ---------------- |
| [uni.getLocation](https://uniapp.dcloud.net.cn/api/location/location#getlocation)        | 获取当前位置     |
| [uni.chooseLocation](https://uniapp.dcloud.net.cn/api/location/location#chooselocation)  | 打开地图选择位置 |
| [uni.openLocation](https://uniapp.dcloud.net.cn/api/location/open-location#openlocation) | 打开内置地图     |
| [uni.createMapContext](https://uniapp.dcloud.net.cn/api/location/map#createmapcontext)   | 地图组件控制     |
| [位置变化事件监听](https://uniapp.dcloud.net.cn/api/location/location-change.html)       | 位置变化事件监听 |

#### 内存

| API                                                                                          | 说明                     |
| -------------------------------------------------------------------------------------------- | ------------------------ |
| [uni.onMemoryWarning](https://uniapp.dcloud.net.cn/api/system/memory#wxonmemorywarning)      | 监听内存不足告警事件     |
| [uni.offMemoryWarning](https://uniapp.dcloud.net.cn/api/system/memory.html#offmemorywarning) | 取消监听内存不足告警事件 |

#### 主题

| API                                                                                     | 说明                     |
| --------------------------------------------------------------------------------------- | ------------------------ |
| [uni.onThemeChange](https://uniapp.dcloud.net.cn/api/system/theme.html#onthemechange)   | 监听系统主题状态变化     |
| [uni.offThemeChange](https://uniapp.dcloud.net.cn/api/system/theme.html#offthemechange) | 取消监听系统主题状态变化 |

#### 加速度计

| API                                                                                                        | 说明               |
| ---------------------------------------------------------------------------------------------------------- | ------------------ |
| [uni.onAccelerometerChange](https://uniapp.dcloud.net.cn/api/system/accelerometer#onaccelerometerchange)   | 监听加速度数据     |
| [uni.offAccelerometerChange](https://uniapp.dcloud.net.cn/api/system/accelerometer#offaccelerometerchange) | 取消监听加速度数据 |
| [uni.startAccelerometer](https://uniapp.dcloud.net.cn/api/system/accelerometer#startaccelerometer)         | 开始监听加速度数据 |
| [uni.stopAccelerometer](https://uniapp.dcloud.net.cn/api/system/accelerometer#stopaccelerometer)           | 停止监听加速度数据 |

#### 罗盘

| API                                                                                      | 说明             |
| ---------------------------------------------------------------------------------------- | ---------------- |
| [uni.onCompassChange](https://uniapp.dcloud.net.cn/api/system/compass#oncompasschange)   | 监听罗盘数据     |
| [uni.offCompassChange](https://uniapp.dcloud.net.cn/api/system/compass#offcompasschange) | 取消监听罗盘数据 |
| [uni.startCompass](https://uniapp.dcloud.net.cn/api/system/compass#startcompass)         | 开始监听罗盘数据 |
| [uni.stopCompass](https://uniapp.dcloud.net.cn/api/system/compass#stopcompass)           | 停止监听罗盘数据 |

#### 陀螺仪

| API                                                                                          | 说明               |
| -------------------------------------------------------------------------------------------- | ------------------ |
| [uni.onGyroscopeChange](https://uniapp.dcloud.net.cn/api/system/gyroscope#ongyroscopechange) | 监听陀螺仪数据     |
| [uni.startGyroscope](https://uniapp.dcloud.net.cn/api/system/gyroscope#startgyroscope)       | 开始监听陀螺仪数据 |
| [uni.stopGyroscope](https://uniapp.dcloud.net.cn/api/system/gyroscope#stopgyroscope)         | 停止监听陀螺仪数据 |

#### 拨打电话

| API                                                                              | 说明     |
| -------------------------------------------------------------------------------- | -------- |
| [uni.makePhoneCall](https://uniapp.dcloud.net.cn/api/system/phone#makephonecall) | 拨打电话 |

#### 扫码

| API                                                                      | 说明 |
| ------------------------------------------------------------------------ | ---- |
| [uni.scanCode](https://uniapp.dcloud.net.cn/api/system/barcode#scancode) | 扫码 |

#### 剪切板

| API                                                                                        | 说明           |
| ------------------------------------------------------------------------------------------ | -------------- |
| [uni.setClipboardData](https://uniapp.dcloud.net.cn/api/system/clipboard#setclipboarddata) | 设置剪贴板内容 |
| [uni.getClipboardData](https://uniapp.dcloud.net.cn/api/system/clipboard#getclipboarddata) | 获取剪贴板内容 |

#### 屏幕亮度

| API                                                                                               | 说明                 |
| ------------------------------------------------------------------------------------------------- | -------------------- |
| [uni.setScreenBrightness](https://uniapp.dcloud.net.cn/api/system/brightness#setscreenbrightness) | 设置屏幕亮度         |
| [uni.getScreenBrightness](https://uniapp.dcloud.net.cn/api/system/brightness#getscreenbrightness) | 获取屏幕亮度         |
| [uni.setKeepScreenOn](https://uniapp.dcloud.net.cn/api/system/brightness#setkeepscreenon)         | 设置是否保持常亮状态 |

#### 用户截屏事件

| API                                                                                                          | 说明                 |
| ------------------------------------------------------------------------------------------------------------ | -------------------- |
| [uni.onUserCaptureScreen](https://uniapp.dcloud.net.cn/api/system/capture-screen.html#onusercapturescreen)   | 监听用户截屏事件     |
| [uni.offUserCaptureScreen](https://uniapp.dcloud.net.cn/api/system/capture-screen.html#offusercapturescreen) | 取消监听用户截屏事件 |

#### 振动

| API                                                                              | 说明                     |
| -------------------------------------------------------------------------------- | ------------------------ |
| [uni.vibrate](https://uniapp.dcloud.net.cn/api/system/vibrate#vibrate)           | 使手机发生振动           |
| [uni.vibrateLong](https://uniapp.dcloud.net.cn/api/system/vibrate#vibratelong)   | 使手机发生较长时间的振动 |
| [uni.vibrateShort](https://uniapp.dcloud.net.cn/api/system/vibrate#vibrateshort) | 使手机发生较短时间的振动 |

#### 手机联系人

| API                                                                                    | 说明           |
| -------------------------------------------------------------------------------------- | -------------- |
| [uni.addPhoneContact](https://uniapp.dcloud.net.cn/api/system/contact#addphonecontact) | 添加手机通讯录 |

#### 蓝牙

| API                                                                                                                    | 说明                               |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| [uni.openBluetoothAdapter](https://uniapp.dcloud.net.cn/api/system/bluetooth#openbluetoothadapter)                     | 初始化蓝牙模块                     |
| [uni.startBluetoothDevicesDiscovery](https://uniapp.dcloud.net.cn/api/system/bluetooth#startbluetoothdevicesdiscovery) | 搜寻附近的蓝牙外围设备             |
| [uni.onBluetoothDeviceFound](https://uniapp.dcloud.net.cn/api/system/bluetooth#onbluetoothdevicefound)                 | 监听寻找到新设备的事件             |
| [uni.stopBluetoothDevicesDiscovery](https://uniapp.dcloud.net.cn/api/system/bluetooth#stopbluetoothdevicesdiscovery)   | 停止搜寻                           |
| [uni.onBluetoothAdapterStateChange](https://uniapp.dcloud.net.cn/api/system/bluetooth#onbluetoothadapterstatechange)   | 监听蓝牙适配器状态变化事件         |
| [uni.getConnectedBluetoothDevices](https://uniapp.dcloud.net.cn/api/system/bluetooth#getconnectedbluetoothdevices)     | 根据 uuid 获取处于已连接状态的设备 |
| [uni.getBluetoothDevices](https://uniapp.dcloud.net.cn/api/system/bluetooth#getbluetoothdevices)                       | 获取已发现的蓝牙设备               |
| [uni.getBluetoothAdapterState](https://uniapp.dcloud.net.cn/api/system/bluetooth#getbluetoothadapterstate)             | 获取本机蓝牙适配器状态             |
| [uni.closeBluetoothAdapter](https://uniapp.dcloud.net.cn/api/system/bluetooth#closebluetoothadapter)                   | 关闭蓝牙模块                       |

#### 低耗蓝牙

| API                                                                                                                      | 说明                                                     |
| ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| [uni.setBLEMTU](https://uniapp.dcloud.net.cn/api/system/ble.html#setblemtu)                                              | 设置蓝牙最大传输单元                                     |
| [uni.writeBLECharacteristicValue](https://uniapp.dcloud.net.cn/api/system/ble#writeblecharacteristicvalue)               | 向低功耗蓝牙设备特征值中写入二进制数据                   |
| [uni.readBLECharacteristicValue](https://uniapp.dcloud.net.cn/api/system/ble#readblecharacteristicvalue)                 | 读取低功耗蓝牙设备的特征值的二进制数据值                 |
| [uni.onBLEConnectionStateChange](https://uniapp.dcloud.net.cn/api/system/ble#onbleconnectionstatechange)                 | 监听低功耗蓝牙连接状态的改变事件                         |
| [uni.onBLECharacteristicValueChange](https://uniapp.dcloud.net.cn/api/system/ble#onblecharacteristicvaluechange)         | 监听低功耗蓝牙设备的特征值变化事件                       |
| [uni.notifyBLECharacteristicValueChange](https://uniapp.dcloud.net.cn/api/system/ble#notifyblecharacteristicvaluechange) | 启用蓝牙低功耗设备特征值变化时的 notify 功能，订阅特征值 |
| [uni.getBLEDeviceServices](https://uniapp.dcloud.net.cn/api/system/ble#getbledeviceservices)                             | 获取蓝牙设备所有服务(service)                            |
| [uni.getBLEDeviceRSSI](https://uniapp.dcloud.net.cn/api/system/ble.html#getbledevicerssi)                                | 获取蓝牙设备的信号强度                                   |
| [uni.getBLEDeviceCharacteristics](https://uniapp.dcloud.net.cn/api/system/ble#getbledevicecharacteristics)               | 获取蓝牙设备某个服务中所有特征值(characteristic)         |
| [uni.createBLEConnection](https://uniapp.dcloud.net.cn/api/system/ble#createbleconnection)                               | 连接低功耗蓝牙设备                                       |
| [uni.closeBLEConnection](https://uniapp.dcloud.net.cn/api/system/ble#closebleconnection)                                 | 断开与低功耗蓝牙设备的连接                               |

#### iBeacon

| API                                                                                                | 说明                            |
| -------------------------------------------------------------------------------------------------- | ------------------------------- |
| [uni.onBeaconServiceChange](https://uniapp.dcloud.net.cn/api/system/ibeacon#onbeaconservicechange) | 监听 iBeacon 服务状态变化事件   |
| [uni.onBeaconUpdate](https://uniapp.dcloud.net.cn/api/system/ibeacon#onbeaconupdate)               | 监听 iBeacon 设备更新事件       |
| [uni.getBeacons](https://uniapp.dcloud.net.cn/api/system/ibeacon#getbeacons)                       | 获取所有已搜索到的 iBeacon 设备 |
| [uni.startBeaconDiscovery](https://uniapp.dcloud.net.cn/api/system/ibeacon#startbeacondiscovery)   | 停止搜索附近的 iBeacon 设备     |
| [uni.stopBeaconDiscovery](https://uniapp.dcloud.net.cn/api/system/ibeacon#stopbeacondiscovery)     | 开始搜索附近的 iBeacon 设备     |

#### 电量

| API                                                                                           | 说明         |
| --------------------------------------------------------------------------------------------- | ------------ |
| [uni.getBatteryInfo](https://uniapp.dcloud.net.cn/api/system/batteryInfo.html#getbatteryinfo) | 获取设备电量 |

#### 生物认证

| API                                                                                                                               | 说明                                     |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| [uni.startSoterAuthentication](https://uniapp.dcloud.net.cn/api/system/authentication#startsoterauthentication)                   | 开始生物认证                             |
| [uni.checkIsSupportSoterAuthentication](https://uniapp.dcloud.net.cn/api/system/authentication#checkissupportsoterauthentication) | 获取本机支持的生物认证方式               |
| [uni.checkIsSoterEnrolledInDevice](https://uniapp.dcloud.net.cn/api/system/authentication#checkissoterenrolledindevice)           | 获取设备内是否录入如指纹等生物信息的接口 |

#### 其他

| API                                                                   | 说明     |
| --------------------------------------------------------------------- | -------- |
| [NFC](https://uniapp.dcloud.net.cn/api/system/nfc.html)               | NFC      |
| [设备方向](https://uniapp.dcloud.net.cn/api/system/deviceMotion.html) | 设备方向 |

### 界面交互

#### 节点信息

| API                                                                                                              | 说明                            |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [uni.createSelectorQuery](https://uniapp.dcloud.net.cn/api/ui/nodes-info#createselectorquery)                    | 创建查询请求                    |
| [selectorQuery.in](https://uniapp.dcloud.net.cn/api/ui/nodes-info.html#selectorquery-in)                         | 更改选择器的选取范围            |
| [selectorQuery.select](https://uniapp.dcloud.net.cn/api/ui/nodes-info.html#selectorquery-select)                 | 根据选择器选择单个节点          |
| [selectorQuery.selectAll](https://uniapp.dcloud.net.cn/api/ui/nodes-info.html#selectorquery-selectall)           | 根据选择器选择全部节点          |
| [selectorQuery.selectViewport](https://uniapp.dcloud.net.cn/api/ui/nodes-info.html#selectorquery-selectviewport) | 选择显示区域                    |
| [selectorQuery.exec](https://uniapp.dcloud.net.cn/api/ui/nodes-info.html#selectorquery-exec)                     | 执行查询请求                    |
| [nodesRef.fields](https://uniapp.dcloud.net.cn/api/ui/nodes-info.html#nodesref-fields)                           | 获取任意字段                    |
| [nodesRef.boundingClientRect](https://uniapp.dcloud.net.cn/api/ui/nodes-info.html#nodesref-boundingclientrect)   | 获取布局位置和尺寸              |
| [nodesRef.scrollOffset](https://uniapp.dcloud.net.cn/api/ui/nodes-info.html#nodesref-scrolloffset)               | 获取滚动位置                    |
| [nodesRef.context](https://uniapp.dcloud.net.cn/api/ui/nodes-info.html#nodesref-context)                         | 添加节点的 Context 对象查询请求 |
| [nodesRef.node](https://uniapp.dcloud.net.cn/api/ui/nodes-info.html#nodesref-node)                               | 获取 Node 节点实例              |

#### 信息提示框

| API                                                                               | 说明                   |
| --------------------------------------------------------------------------------- | ---------------------- |
| [uni.showToast](https://uniapp.dcloud.net.cn/api/ui/prompt#showtoast)             | 显示提示框             |
| [uni.hideToast](https://uniapp.dcloud.net.cn/api/ui/prompt#hidetoast)             | 隐藏提示框             |
| [uni.showLoading](https://uniapp.dcloud.net.cn/api/ui/prompt#showloading)         | 显示加载提示框         |
| [uni.hideLoading](https://uniapp.dcloud.net.cn/api/ui/prompt#hideloading)         | 隐藏加载提示框         |
| [uni.showModal](https://uniapp.dcloud.net.cn/api/ui/prompt#showmodal)             | 显示模态弹窗           |
| [uni.showActionSheet](https://uniapp.dcloud.net.cn/api/ui/prompt#showactionsheet) | 从底部向上弹出操作菜单 |

#### 导航条

| API                                                                                                        | 说明               |
| ---------------------------------------------------------------------------------------------------------- | ------------------ |
| [uni.setNavigationBarTitle](https://uniapp.dcloud.net.cn/api/ui/navigationbar#setnavigationbartitle)       | 设置当前页面标题   |
| [uni.setNavigationBarColor](https://uniapp.dcloud.net.cn/api/ui/navigationbar#setnavigationbarcolor)       | 设置页面导航条颜色 |
| [uni.showNavigationBarLoading](https://uniapp.dcloud.net.cn/api/ui/navigationbar#shownavigationbarloading) | 显示导航条加载动画 |
| [uni.hideNavigationBarLoading](https://uniapp.dcloud.net.cn/api/ui/navigationbar#hidenavigationbarloading) | 隐藏导航条加载动画 |
| [uni.hideHomeButton](https://uniapp.dcloud.net.cn/api/ui/navigationbar.html#hidehomebutton)                | 隐藏返回首页按钮   |

#### TabBar

| API                                                                                              | 说明                             |
| ------------------------------------------------------------------------------------------------ | -------------------------------- |
| [uni.setTabBarItem](https://uniapp.dcloud.net.cn/api/ui/tabbar#settabbaritem)                    | 动态设置 tabBar 某一项的内容     |
| [uni.setTabBarStyle](https://uniapp.dcloud.net.cn/api/ui/tabbar#settabbarstyle)                  | 动态设置 tabBar 的整体样式       |
| [uni.hideTabBar](https://uniapp.dcloud.net.cn/api/ui/tabbar#hidetabbar)                          | 隐藏 tabBar                      |
| [uni.showTabBar](https://uniapp.dcloud.net.cn/api/ui/tabbar#showtabbar)                          | 显示 tabBar                      |
| [uni.setTabBarBadge](https://uniapp.dcloud.net.cn/api/ui/tabbar#settabbarbadge)                  | 为 tabBar 某一项的右上角添加文本 |
| [uni.removeTabBarBadge](https://uniapp.dcloud.net.cn/api/ui/tabbar#removetabbarbadge)            | 移除 tabBar 某一项右上角的文本   |
| [uni.showTabBarRedDot](https://uniapp.dcloud.net.cn/api/ui/tabbar#showtabbarreddot)              | 显示 tabBar 某一项的右上角的红点 |
| [uni.hideTabBarRedDot](https://uniapp.dcloud.net.cn/api/ui/tabbar#hidetabbarreddot)              | 隐藏 tabBar 某一项的右上角的红点 |
| [uni.onTabBarMidButtonTap](https://uniapp.dcloud.net.cn/api/ui/tabbar.html#ontabbarmidbuttontap) | 监听中间按钮的点击事件           |

#### 背景

| API                                                                                              | 说明                                   |
| ------------------------------------------------------------------------------------------------ | -------------------------------------- |
| [uni.setBackgroundColor](https://uniapp.dcloud.net.cn/api/ui/bgcolor#setbackgroundcolor)         | 动态设置窗口的背景色                   |
| [uni.setBackgroundTextStyle](https://uniapp.dcloud.net.cn/api/ui/bgcolor#setbackgroundtextstyle) | 动态设置下拉背景字体、loading 图的样式 |

#### 动画

| API                                                                                  | 说明                       |
| ------------------------------------------------------------------------------------ | -------------------------- |
| [uni.createAnimation](https://uniapp.dcloud.net.cn/api/ui/animation#createanimation) | 创建一个动画实例 animation |

#### 滚动

| API                                                                         | 说明                 |
| --------------------------------------------------------------------------- | -------------------- |
| [uni.pageScrollTo](https://uniapp.dcloud.net.cn/api/ui/scroll#pagescrollto) | 将页面滚动到目标位置 |

#### 窗口

| API                                                                                           | 说明                     |
| --------------------------------------------------------------------------------------------- | ------------------------ |
| [uni.getTopWindowStyle](https://uniapp.dcloud.net.cn/api/ui/adapt.html#gettopwindowstyle)     | 获取 topWindow 的样式    |
| [uni.getLeftWindowStyle](https://uniapp.dcloud.net.cn/api/ui/adapt.html#getleftwindowstyle)   | 获取 leftWindow 的样式   |
| [uni.getRightWindowStyle](https://uniapp.dcloud.net.cn/api/ui/adapt.html#getrightwindowstyle) | 获取 rightWindow 的样式  |
| [uni.setTopWindowStyle](https://uniapp.dcloud.net.cn/api/ui/adapt.html#settopwindowstyle)     | 设置 topWindow 的样式    |
| [uni.setLeftWindowStyle](https://uniapp.dcloud.net.cn/api/ui/adapt.html#setleftwindowstyle)   | 设置 leftWindow 的样式   |
| [uni.setRightWindowStyle](https://uniapp.dcloud.net.cn/api/ui/adapt.html#setrightwindowstyle) | 设置 rightWindow 的样式  |
| [uni.onWindowResize](https://uniapp.dcloud.net.cn/api/ui/window.html#onwindowresize)          | 监听窗口尺寸变化事件     |
| [uni.offWindowResize](https://uniapp.dcloud.net.cn/api/ui/window.html#offwindowresize)        | 取消监听窗口尺寸变化事件 |

#### 字体

| API                                                                            | 说明                   |
| ------------------------------------------------------------------------------ | ---------------------- |
| [uni.loadFontFace](https://uniapp.dcloud.net.cn/api/ui/font.html#loadfontface) | 动态加载网络字体       |
| [uni.upx2px](https://uniapp.dcloud.net.cn/api/ui/font.html#upx2px)             | 将 rpx 单位值转换成 px |

#### 下拉刷新

| API                                                                                           | 说明                       |
| --------------------------------------------------------------------------------------------- | -------------------------- |
| [onPullDownRefresh](https://uniapp.dcloud.net.cn/api/ui/pulldown#onpulldownrefresh)           | 监听该页面用户下拉刷新事件 |
| [uni.startPullDownRefresh](https://uniapp.dcloud.net.cn/api/ui/pulldown#startpulldownrefresh) | 开始下拉刷新               |
| [uni.stopPullDownRefresh](https://uniapp.dcloud.net.cn/api/ui/pulldown#stoppulldownrefresh)   | 停止当前页面下拉刷新       |

#### 节点布局相交状态（可视位置变化）

| API                                                                                                                                           | 说明                           |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| [uni.createIntersectionObserver](https://uniapp.dcloud.net.cn/api/ui/intersection-observer#createintersectionobserver)                        | 创建 IntersectionObserver 对象 |
| [intersectionObserver.relativeTo](https://uniapp.dcloud.net.cn/api/ui/intersection-observer.html#intersectionobserver-对象的方法列表)         | 指定参照节点                   |
| [intersectionObserver.relativeToViewport](https://uniapp.dcloud.net.cn/api/ui/intersection-observer.html#intersectionobserver-对象的方法列表) | 指定页面显示区域作为参照区域   |
| [intersectionObserver.observe](https://uniapp.dcloud.net.cn/api/ui/intersection-observer.html#intersectionobserver-对象的方法列表)            | 指定目标节点并开始监听         |
| [intersectionObserver.disconnect](https://uniapp.dcloud.net.cn/api/ui/intersection-observer.html#intersectionobserver-对象的方法列表)         | 停止监听                       |

#### 媒体查询（界面宽高变化）

| API                                                                                                                              | 说明                                       |
| -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| [uni.createMediaQueryObserver](https://uniapp.dcloud.net.cn/api/ui/media-query-observer.html#createmediaqueryobserver)           | 创建并返回一个 MediaQueryObserver 对象实例 |
| [MediaQueryObserver.observe](https://uniapp.dcloud.net.cn/api/ui/media-query-observer.html#mediaqueryobserver-对象的方法列表)    | 开始监听页面 media query 变化情况          |
| [MediaQueryObserver.disconnect](https://uniapp.dcloud.net.cn/api/ui/media-query-observer.html#mediaqueryobserver-对象的方法列表) | 停止监听                                   |

#### 其他

| API                                                                                                                    | 说明                                 |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| [nextTick](https://uniapp.dcloud.net.cn/api/ui/nextTick.html)                                                          | 延迟操作到下时间片再执行             |
| [getMenuButtonBoundingClientRect](https://uniapp.dcloud.net.cn/api/ui/menuButton.html#getmenubuttonboundingclientrect) | 获取小程序下该菜单按钮的布局位置信息 |
| []()                                                                                                                   |                                      |
| []()                                                                                                                   |                                      |
| []()                                                                                                                   |                                      |
| []()                                                                                                                   |                                      |

#### 路由

| API                                                                      | 说明                                                                         |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| [uni.navigateTo](https://uniapp.dcloud.net.cn/api/router#navigateto)     | 保留当前页面，跳转到应用内的某个页面，使用 uni.navigateBack 可以返回到原页面 |
| [uni.redirectTo](https://uniapp.dcloud.net.cn/api/router#redirectto)     | 关闭当前页面，跳转到应用内的某个页面                                         |
| [uni.reLaunch](https://uniapp.dcloud.net.cn/api/router#relaunch)         | 关闭所有页面，打开到应用内的某个页面                                         |
| [uni.switchTab](https://uniapp.dcloud.net.cn/api/router#switchtab)       | 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面                             |
| [uni.navigateBack](https://uniapp.dcloud.net.cn/api/router#navigateback) | 关闭当前页面，返回上一页面或多级页面                                         |

### 文件

| API                                                                                                              | 说明                     |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------ |
| [uni.saveFile](https://uniapp.dcloud.net.cn/api/file/file#savefile)                                              | 保存文件                 |
| [uni.getSavedFileList](https://uniapp.dcloud.net.cn/api/file/file#getsavedfilelist)                              | 获取已保存的文件列表     |
| [uni.getSavedFileInfo](https://uniapp.dcloud.net.cn/api/file/file#getsavedfileinfo)                              | 获取已保存的文件信息     |
| [uni.removeSavedFile](https://uniapp.dcloud.net.cn/api/file/file#removesavedfile)                                | 删除已保存的文件信息     |
| [uni.getFileInfo](https://uniapp.dcloud.net.cn/api/file/file#getfileinfo)                                        | 获取文件信息             |
| [uni.openDocument](https://uniapp.dcloud.net.cn/api/file/file#opendocument)                                      | 打开文件                 |
| [uni.getFileSystemManager](https://uniapp.dcloud.net.cn/api/file/getFileSystemManager.html#getfilesystemmanager) | 获取全局唯一的文件管理器 |

### 绘画

| API                                                                                             | 说明                                 |
| ----------------------------------------------------------------------------------------------- | ------------------------------------ |
| [uni.createCanvasContext](https://uniapp.dcloud.net.cn/api/canvas/createCanvasContext)          | 创建绘图上下文                       |
| [uni.createOffscreenCanvas](https://uniapp.dcloud.net.cn/api/canvas/createOffscreenCanvas.html) | 创建离屏 canvas 实例（仅微信小程序） |
| [uni.canvasToTempFilePath](https://uniapp.dcloud.net.cn/api/canvas/canvasToTempFilePath)        | 将画布内容保存成文件                 |
| [uni.canvasGetImageData](https://uniapp.dcloud.net.cn/api/canvas/canvasGetImageData)            | 获取画布图像数据                     |
| [uni.canvasPutImageData](https://uniapp.dcloud.net.cn/api/canvas/canvasPutImageData)            | 设置画布图像数据                     |
| [CanvasContext](https://uniapp.dcloud.net.cn/api/canvas/CanvasContext.html)                     | canvas 内容                          |
| [CanvasGradient.addColorStop](https://uniapp.dcloud.net.cn/api/canvas/CanvasGradient.html)      | 创建一个颜色的渐变点                 |

### 第三方服务

#### 基础部分

| API                                                                              | 说明           |
| -------------------------------------------------------------------------------- | -------------- |
| [uni.getProvider](https://uniapp.dcloud.net.cn/api/plugins/provider#getprovider) | 获取服务供应商 |

#### 用户登录

| API                                                                                           | 说明                                                            |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| [uni.login](https://uniapp.dcloud.net.cn/api/plugins/login#login)                             | 登录                                                            |
| [uni.getLoginCode](https://uniapp.dcloud.net.cn/api/plugins/login.html#getlogincode)          | 获取宿主 App 登录凭证                                           |
| [uni.checkSession](https://uniapp.dcloud.net.cn/api/plugins/login#checkSession)               | 检查登录状态是否过期                                            |
| [uni.getUserInfo](https://uniapp.dcloud.net.cn/api/plugins/login#getuserinfo)                 | 获取用户信息                                                    |
| [uni.getuserprofile](https://uniapp.dcloud.net.cn/api/plugins/login#getuserprofile)           | 获取用户信息。每次请求都会弹出授权窗口，用户同意后返回 userInfo |
| [uni.preLogin](https://uniapp.dcloud.net.cn/api/plugins/login#prelogin)                       | 预登录                                                          |
| [uni.closeAuthView](https://uniapp.dcloud.net.cn/api/plugins/login#closeauthview)             | 关闭一键登录页面                                                |
| [uni.getCheckBoxState](https://uniapp.dcloud.net.cn/api/plugins/login#getcheckboxstate)       | 获取一键登录条款勾选框状态                                      |
| [uni.getUniverifyManager](https://uniapp.dcloud.net.cn/api/plugins/login#getUniverifyManager) | 获取全局唯一的一键登录管理器 univerifyManager                   |

#### 分享

| API                                                                                                        | 说明                           |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------ |
| [uni.share](https://uniapp.dcloud.net.cn/api/plugins/share#share)                                          | 分享                           |
| [uni.shareWithSystem](https://uniapp.dcloud.net.cn/api/plugins/share#sharewithsystem)                      | 使用系统分享                   |
| [plus.share.sendWithSystem](https://uniapp.dcloud.net.cn/api/plugins/share.html#plus-share-sendwithsystem) | app 分享                       |
| [onShareAppMessage](https://uniapp.dcloud.net.cn/api/plugins/share.html#onshareappmessage)                 | 分享事件                       |
| [uni.showShareMenu](https://uniapp.dcloud.net.cn/api/plugins/share.html#showsharemenu)                     | 小程序的原生菜单中显示分享按钮 |
| [uni.hideShareMenu](https://uniapp.dcloud.net.cn/api/plugins/share.html#hidesharemenu)                     | 小程序的原生菜单中隐藏分享按钮 |

#### 支付

> 注意后台服务器要配置好，可参考： https://uniapp.dcloud.net.cn/uniCloud/uni-pay.html

| API                                                                                   | 说明 |
| ------------------------------------------------------------------------------------- | ---- |
| [uni.requestPayment](https://uniapp.dcloud.net.cn/api/plugins/payment#requestpayment) | 支付 |

#### 推送

> 注意 API 经过改版
> 注意后台服务器要配置好，可参考： https://uniapp.dcloud.net.cn/unipush-v2.html

| API                                                                                           | 说明                     |
| --------------------------------------------------------------------------------------------- | ------------------------ |
| [uni.getPushClientId](https://uniapp.dcloud.net.cn/api/plugins/push.html#getpushclientid)     | 获取客户端唯一的推送标识 |
| [uni.onPushMessage](https://uniapp.dcloud.net.cn/api/plugins/push.html#onpushmessage)         | 启动监听推送消息事件     |
| [uni.offPushMessage](https://uniapp.dcloud.net.cn/api/plugins/push.html#offpushmessage)       | 关闭推送消息监听事件     |
| [uni.createPushMessage](https://uniapp.dcloud.net.cn/api/plugins/push.html#createpushmessage) | 创建本地通知栏消息       |

#### 平台扩展

| API                                                                                                   | 说明              |
| ----------------------------------------------------------------------------------------------------- | ----------------- |
| [uni.requireNativePlugin](https://uniapp.dcloud.net.cn/plugin/native-plugin.html#requirenativeplugin) | 引入 App 原生插件 |

#### 其他

| API                                                                                    | 说明                  |
| -------------------------------------------------------------------------------------- | --------------------- |
| [语言](https://uniapp.dcloud.net.cn/api/plugins/voice.html)                            | 语言                  |
| [一键生成 iOS 通用链接](https://uniapp.dcloud.net.cn/api/plugins/universal-links.html) | 一键生成 iOS 通用链接 |
| [统计](https://uniapp.dcloud.io/uni-stat-v2.html)                                      | 统计                  |

### 广告

> 注意同时参考组件介绍中的文档

| API                                                                         | 说明                                                             |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [激励视频广告](https://uniapp.dcloud.net.cn/api/a-d/rewarded-video.html)    | 激励视频广告，是 cpm 收益最高的广告形式                          |
| [全屏视频广告](https://uniapp.dcloud.net.cn/api/a-d/full-screen-video.html) | 全屏视频广告                                                     |
| [内容联盟广告](https://uniapp.dcloud.net.cn/api/a-d/content-page.html)      | 内容联盟广告                                                     |
| [插屏广告](https://uniapp.dcloud.net.cn/api/a-d/interstitial.html)          | 插屏广告                                                         |
| [互动游戏](https://uniapp.dcloud.net.cn/api/a-d/interactive.html)           | 互动游戏是 DCloud 联合三方服务商为开发者提供新的广告场景增值服务 |

### 其他

#### 授权

| API                                                                         | 说明                   |
| --------------------------------------------------------------------------- | ---------------------- |
| [uni.authorize](https://uniapp.dcloud.net.cn/api/other/authorize#authorize) | 提前向用户发起授权请求 |

#### 设置

| API                                                                           | 说明                                             |
| ----------------------------------------------------------------------------- | ------------------------------------------------ |
| [uni.openSetting](https://uniapp.dcloud.net.cn/api/other/setting#opensetting) | 调起客户端小程序设置界面，返回用户设置的操作结果 |
| [uni.getSetting](https://uniapp.dcloud.net.cn/api/other/setting#getsetting)   | 获取用户的当前设置                               |

#### 收货地址

| API                                                                                      | 说明             |
| ---------------------------------------------------------------------------------------- | ---------------- |
| [uni.chooseAddress](https://uniapp.dcloud.net.cn/api/other/choose-address#chooseaddress) | 获取用户收货地址 |

#### 获取发票抬头

| API                                                                                               | 说明                                                |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| [uni.chooseInvoiceTitle](https://uniapp.dcloud.net.cn/api/other/invoice-title#chooseinvoicetitle) | 选择用户的发票抬头，需要用户授权 scope.invoiceTitle |

#### 小程序跳转

| API                                                                                                                 | 说明                             |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| [uni.navigateToMiniProgram](https://uniapp.dcloud.net.cn/api/other/open-miniprogram#navigatetominiprogram)          | 打开另一个小程序                 |
| [uni.navigateBackMiniProgram](https://uniapp.dcloud.net.cn/api/other/open-miniprogram#navigatebackminiprogram)      | 跳转回上一个小程序（有明确顺序） |
| [uni.openEmbeddedMiniProgram](https://uniapp.dcloud.net.cn/api/other/open-miniprogram.html#openembeddedminiprogram) | 微信小程序跳转小程序（半屏模式） |

#### 帐号信息

| API                                                                                      | 说明             |
| ---------------------------------------------------------------------------------------- | ---------------- |
| [uni.getAccountInfoSync](https://uniapp.dcloud.net.cn/api/other/getAccountInfoSync.html) | 获取当前帐号信息 |

#### 运动

| API                                                       | 说明 |
| --------------------------------------------------------- | ---- |
| [运动](https://uniapp.dcloud.net.cn/api/other/sport.html) | 运动 |

#### 卡券

| API                                                      | 说明 |
| -------------------------------------------------------- | ---- |
| [卡券](https://uniapp.dcloud.net.cn/api/other/card.html) | 卡券 |

#### 模板消息

| API                                                                                                                               | 说明                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [addTemplate](https://uniapp.dcloud.net.cn/api/other/template#addtemplate)                                                        | 组合模板并添加至帐号下的个人模板库                                                                              |
| [deleteTemplate](https://uniapp.dcloud.net.cn/api/other/template#deletetemplate)                                                  | 删除帐号下的某个模板                                                                                            |
| [getTemplateLibraryById](https://uniapp.dcloud.net.cn/api/other/template#gettemplatelibrarybyid)                                  | 获取模板库某个模板标题下关键词库                                                                                |
| [getTemplateLibraryList](https://uniapp.dcloud.net.cn/api/other/template#gettemplatelibrarylist)                                  | 获取 APP 模板库标题列表                                                                                         |
| [getTemplateList](https://uniapp.dcloud.net.cn/api/other/template#gettemplatelist)                                                | 获取帐号下已存在的模板列表                                                                                      |
| [sendTemplateMessage](https://uniapp.dcloud.net.cn/api/other/template#sendtemplatemessage)                                        | 发送模板消息                                                                                                    |
| [alipay.open.app.mini.templatemessage.send](https://uniapp.dcloud.net.cn/api/other/template#alipayopenappminitemplatemessagesend) | 支付宝小程序通过 openapi 给用户触达消息，主要为支付后的触达（通过消费 id）和用户提交表单后的触达（通过 formId） |

#### 订阅消息

| API                                                                                                | 说明     |
| -------------------------------------------------------------------------------------------------- | -------- |
| [uni.requestSubscribeMessage](https://uniapp.dcloud.net.cn/api/other/requestSubscribeMessage.html) | 订阅消息 |

#### 小程序更新

| API                                                                                    | 说明                                                                 |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [uni.getUpdateManager](https://uniapp.dcloud.net.cn/api/other/update#getupdatemanager) | 返回全局唯一的版本更新管理器对象： updateManager，用于管理小程序更新 |

#### 调试

| API                                                                                          | 说明                                         |
| -------------------------------------------------------------------------------------------- | -------------------------------------------- |
| [uni.setEnableDebug](https://uniapp.dcloud.net.cn/api/other/set-enable-debug#setenabledebug) | 设置是否打开调试开关。此开关对正式版也能生效 |

#### 获取第三方平台数据

| API                                                                                           | 说明                           |
| --------------------------------------------------------------------------------------------- | ------------------------------ |
| [uni.getExtConfig](https://uniapp.dcloud.net.cn/api/other/get-extconfig#getextconfig)         | 获取第三方平台自定义的数据字段 |
| [uni.getExtConfigSync](https://uniapp.dcloud.net.cn/api/other/get-extconfig#getextconfigsync) | uni.getExtConfig 的同步版本    |

#### Worker

| API                                                    | 说明   |
| ------------------------------------------------------ | ------ |
| [Worker](https://uniapp.dcloud.net.cn/api/worker.html) | Worker |

#### uni ext api

| API                                                         | 说明        |
| ----------------------------------------------------------- | ----------- |
| [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html) | uni ext api |
