#### webpack的构建流程
webpack的运行流程是一个串行过程，它的工作是将各个插件串联起来<br>
三大步骤<br>
- 初始化流程：从配置文件和shell脚本中读取和合并参数，并初始化需要使用的插件
- 编译构建：从entry出发，针对每一个module调用对应loader翻译文件内容，再找到该module依赖的module,
递归进行编译处理
- 输出流程：对编译后的module组合成chunk,把chunk转化成文件，输出到文件系统
#### webpack的plugin
plugin是一种计算机应用程序，它和主应用程序互相交互，提供特定的功能<br>
webpack中的plugin也是如此，赋予了各种灵活的功能，例如打包优化，资源管理，环境变量注入，会运行在webpack的不同阶段，贯穿
webpack的整个生命周期<br>
webpack的本质是一个拥有apply方法的对象

    const pluginName = 'ConsoleLogPlugin'
    class ConsoleLogPlugin {
        apply(compiler) {
            compiler.hooks.run.tap(pluginName, compilationo => {
                console.loog('webpack 构建开始')
            }
        }
    }
    module.exports = ConsoleLogPlugin

#### webpack的loader
loader的本质是一个函数，函数中的this会作为上下文被webpack填充，因此我们不能将loader设置为箭头函数

    module.exports = function(source) {
        const content = doSomething2Js(source)
        const options = this.query
        this.callback(null, content)
        return content
    }

#### 如何借助webpack优化前端性能
- js代码压缩
- css代码压缩
- html代码压缩
- 文件大小压缩
- 图片压缩
- Tree shaking
- 代码分离
- 内联chunk


    const TerserPlugin = require('terser-webpack-plugin')
    module.exports = {
        optimization: {
            minimize: true,
            minimizer: {
                new TerserPlugin({
                    parallel: true
                })
            }
        }
    }

TreeShaking有两种方案
- usedExports: 通过标记某些函数是否使用，之后通过Terser进行优化
- sideEffects: 跳过整个模块/文件，直接查看该文件是否有副作用


    'sideEffects': [
        './src/util/format.js',
        '*.css'
    ]

代码分离
    
    module.exports = {
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        }
    }

内联chunk
    
    const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    module.exports = {
        plugin: [
            new InlineChunkHtmlPlugin(HtmlWebpackPlugin,[/runtime.+\.js/])
        ]
    }

#### 如何提高webpack的构建速度
- 优化loader配置, 定义好匹配规则
- 合理使用resolve.extensions，设置好合理的文件后缀名
- 优化resolve.modules，配置模块目录
- 优化resolve.alias，设置别名，减少查找次数
- 使用DLLPlugin插件，dll动态连接库，window中实现共享函数库的一种方法，将共享、不经常改动的代码抽成一个共享库，
- 使用cache-loader， 性能开销较大的loader是哟个cache-loader，缓存到磁盘中
- terser启动多线程
- 合理使用sourceMap，打包信息越详细，打包速度越慢

#### webpack与gulp的区别
gulp
- 构建工具
- 提高效率用
- 自动化

webpack
- 打包工具
- 模块化
- 编译模块代码方案
        
    

