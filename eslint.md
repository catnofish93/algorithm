#### Eslint的使用
1、安装

    npm install eslint -g
2、在项目中新建.eslintrc

    {
      "rules":{
        “indent": 2,
        "no-unused-vars":2
      },
      "env":{
        "brower": true
      }
    }
基本属性配置
    globals: 全局变量
    rules: 配置规则
    extend: 从已有的规则中继承
    plugin: 定义插件，用于extend中
#### prettier
1、安装
    
    npm install -D prettier

2、安装插件
    
    // 会使用prettier对代码进行检查，如果不规范会被标记
    npm install -D eslint-plugin-prettier
3、在eslint中添加规则

    {
      "plugins": ['prettier'],
      'rules': {
        'prettier/prettier': 'error'
      }
    }
4、如果和已有的规则冲突了怎么办

    // 关闭一些不必要的或者与prettier冲突的配置，不会看到一些同样的error出现两次
    // 将这个配置放到extend的最后一项
    npm install -D eslint-config-prettier
    {
      extends: {
        'stardard',
        'prettier'
      }
    }

