#### 小程序运行环境
运行于多个环境上
- IOS/IPADOS客户端
- android客户端
- window 微信客户端
- mac 微信客户端
- 微信开发这工具

各平台脚本执行环境及渲染非原生组件的环境各不相同
- ios,ipados,mac,javascript逻辑层运行于javascriptCore,视图层由WKwebview渲染
- androoid,javascript运行于v8上，视图层运行于自研的XWeb
- 在window上，逻辑层和视图层均运行于Chrome内核
- 在开发者工具上，逻辑层运行于NW.js,视图由Chromium Webview渲染
