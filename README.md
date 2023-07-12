# DEMO： 商品购物车

- 本demo只能在特定环境运行
- 获取数据的url是在mocky平台自己mock的，除本机外无法使用

## **功能展示**

1. 查看商品列表

![image](https://github.com/SevenKiki/react-native-learning/blob/main/image/productsList.png)

2. 查看商品详情

![image](https://github.com/SevenKiki/react-native-learning/blob/main/image/productDetails.png)

3. 查看购物车

![image](https://github.com/SevenKiki/react-native-learning/blob/main/image/cart.png)


## **文件结构**

```
.
├── .eslintignore						// eslint忽略文件
├── .eslintrc								// eslint规则
├── .git
├── .gitignore							// git忽略文件
├── .idea
├── .prettierrc							// 代码格式配置
├── .yarnrc									// yarn源配置
├── CHANGELOG.md
├── README.md
├── babel-webpack.config.js
├── babel.config.js     		// babel配置，将JS转换为向后兼容的版本
├── krn.config.json					// krn配置
├── metro.config.js					// metro配置的RN打包工具
├── package.json
├── node_modules						// 安装包
├── src
│   ├── Cart.tsx
│   ├── CartIcon.tsx
│   ├── QueryProvider.tsx	//react query
│   ├── index.tsx
│   ├── productDetails.tsx
│   ├── productsList.tsx
│   ├── productsService.tsx
│   └── store							// redux store
│       ├── reducer
│       │   └── items.tsx
│       └── store.tsx
├── tsconfig.json					// ts配置
├── webpack.config.js
└── yarn.lock							// yarn 版本

```

## **优化步骤**

| demo1.0 | 新增功能 | 实现浏览商品列表、加入购物车、查看购物车详情等功能。使用useContext进行状态管理，使用request直接请求。 |
| --- | --- | --- |
|  | 待优化 | 1. 在productsList 、Cart、CartIcon等组件中需要获取所有商品的信息，每次都需要通过request查询，同样的数据进行多次查询会影响性能，因此使用React Query进行优化。
2. 使用useContext来记录全局的状态（购物车中的item），并在index.tsx中使用过contextProvider来管理状态，对于小项目，这样的状态管理方式足够用，然而有着复杂状态改变的项目，Redux时更好的状态管理选择。 |
| demo2.0 | 新增功能 | 使用React Query管理数据请求，相同Query Key的请求只需要执行一次request。 |
| demo3.0 | 新增功能 | 使用Redux 管理状态，需要管理的内容是请求返回的商品数据ProductData和购物车数据items。因此使用combineReducer连接两个reducer（记录购物车item状态的itemsReducer和记录请求全部商品数据的productsReducer） |

## **Demo小结**

文档学习的同时编写demo，理论实践结合，对各个知识点的理解更加深刻，demo中主要使用了：

- RN组件（Button, FlatList, ActivityIndicator，StyleSheet...）
- KDS组件（KidButton）
- flexBox布局
- useState & useEffect & useContext Hook
- 网络交互与请求管理（request、React Query）
- 导航器（Navigation）
- 状态管理(React Redux)

Demo缺点：

- 功能简单、逻辑简单，所以没有用到继承，组件封装层数很少。
- 只需要请求一种数据，且数据量不大，在数据请求模块缺少优化，进入商品列表后Loading页面持续时间长
