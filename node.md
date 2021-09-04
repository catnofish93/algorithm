####nodejs
优点
- 处理高并发场景性能更佳
- 适合处理IO密集型应用

缺点
- 不适合CPU密集型应用
- 只支持单核CPU，不能充分利用CPU
- 可靠性低，一旦代码的某个环节崩溃，整个代码都会崩溃

应用场景
- 用户表单收集系统、后台管理系统、实时交互系统、考试系统、联网软件、高并发的Web应用程序
- 基于web,canvas的多人联网游戏
- 基于web的多人聊天客户端，聊天室、直播间
- 单页面浏览器应用程序
- 操作数据库，为前端、移动端提供基于json的api

####nodejs中的全局变量
真正的全局变量
- Class:Buffer
- process
- console
- setInterval clearInterval
- setTimeout clearTimeout
- global

模块级别的全局变量
- _dirname
- _filename
- exports
- module
- require

####node中的process变量
process是node的全局变量，提供node的进程信息并对其进行控制<br>
process.nextTick会定义一个动作，这个动作会在下一个事件轮询的结点执行

####fs模块常用的方法
- fs.readFileSync
- fs.readFile
- fs.writeFileSync
- fs.writeFile
- fs.appendFileSync
- fs.appendFile
- fs.copyFileSync
- fs.copyFile
- fs.mkdirSync
- fs.mkdir

####Buffer
定义： 在处理二进制数据的过程中，在内存中开辟一个区域（8KB），用于存放二进制数据<br>
使用方法<br>
Buffer.from: 将数据对象转化为二进制数据
Buffer.alloc: 创建一个指定大小的缓冲区
Buffer.toString: 将二进制数据转化为字符串，前后的编码方式需保持一致<br>
应用场景
- I/O操作
- 加解密
- zlib.js,利用缓冲区的功能操作二进制数据流，提供压缩和解压的功能

####stream
定义：是一种数据传输手段，是端到端的信息交换的一种方式，是有顺序的，逐块读取，处理内容<br>
种类
- 可写流
- 可读流
- 双工流
- 转换流

应用场景
- get操作返回文件给客户端
- 文件操作
- 一些打包文件的底层操作

        const fs = require('fs')
        const path = require('path')
        const fileName1 = path.resolve(__dirname, 'data.txt')
        const fileName2 = path.resolve(__dirname, 'data-bak.txt')
        // 读取文件的stream对象
        const readStream = fs.createReadStream(fileName1)
        // 写入文件的stream对象
        const writeStream = fs.createWriteStream(fileName2)
        // 通过pipd实现数据拷贝
        readStream.pipe(writeStream)
        readStream.on('end', function() {
            console.log('拷贝完成')
        })

####node.js中的事件循环机制
浏览器端的事件循环，是通过HTML5定义的规范实现的， node.js的事件循环是通过libuv实现的

####node中间件
中间件是介于应用系统和系统软件之间的一类软件，它使用系统软件所提供的基础服务，衔接应用系统上的各个部分；
在node中中间件主要指封装http请求细节处理的方法

####Node性能如何进行监控和优化
Node作为一门服务端语言，性能方面尤为重要，几个标准是
- CPU
- 内存
- I/O
- 网络

内存指标

        const os = require('os')
        const { rss, heapUsed, heapTotal } = process.memoryUsage()
        const sysFree = os.freemem()
        const sysTotal = os.totalmem()

        module.exports = {
            memory: () => {
                return {
                    sys: 1 - sysFree/sysTotal,
                    heap: heapUsed/heapTotal,
                    node: rss/sysTotal
                }
            }
        }

性能优化

- 使用最新版的node.js
- 正确使用流stream
- 代码层面优化
- 内存管理优化

####CDN
CDN，即内容分发网络，让用户就近获得所需的内容，降低网络拥堵，提高用户访问响应数独和命中率<br>
原理<br>
应用CDN后，DNS返回的不再是一个IP地址，而是一个CNAME别名记录，指向CDN的全局负载均衡

