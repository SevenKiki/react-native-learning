# 页面模板

## 完善配置项

### 1. App配置

1. 检查 './src/init.ts' 文件中的初始化参数是否符合要求，重点关注
    ```typescript
   LocalLifeInitLogger.setBizInfo({xxx});// 是否满足pv公参要求，不满足则继续添加
   bizRequest.bizInit({xxx});// 请求库初始化，其中需要特别注意responseBaseVerifyFunc的配置，和服务端约定好接口错误定义的字段后填写
   ```
    [请求库的配置参考](https://kdev.corp.kuaishou.com/git/localkrn/locallife/biz-request/-/file-detail?branchName=master&filePath=README.md&repoId=106277&repoName=biz-request)

2. appModel类型转化，首先把业务参数定义到IAppProps中，然后在appModel.init方法中将入参string类型转换为对应类型
    ```typescript
   if (!this._appModel) {
            this._appModel = {
                ...appProps,
                BundleVersionCode: +appProps.BundleVersionCode,
            };
        }
   ```
    需要使用appModel的地方，直接引入即可

   
3. weblogger的初始化参数（非必须）
    代码位置 './src/utils/logger.ts'

### 2. 页面配置

代码位置 './src/page/demo/index.ts'
参考
```typescript
class DemoConfig implements IPageConfig {
    onRequest(): Promise<any> {
        // 页面首个请求，该请求完成后会上报pv、分阶段耗时
        return bizRequest.get({
            url: '/rest/op/vc/poi/detail/app/detail/v3/head',
            params: {
                // @ts-ignore
                poiId: appModel.instance.poiId,
                fromExternalJump: true,
            },
        });
    }

    page: React.ComponentType<any> = Demo; // 页面对应的组件

    // todo 多种容器的，需要按照实际情况传递
    get isHalfScreen() {
        // 是否是半屏
        return false;
    }

    pageName: string = 'Demo'; // 页面名称，填写pv上报的名称

    queryKey = 'demo'; // 页面对应的queryKey

    requireRouteParams = ['poiId']; // 快链中必须的参数
}
```

## 常用能力介绍

### 1. 夜间模式

利用EStyleUtil和getColorFunc实现，参考

```typescript
export const styles = EStyleUtil.create({
    container: {
        backgroundColor: getColorFunc('cs_common_background_secondary'),
    },
});
```

### 2. 屏幕适配，原理参考EStyleWrapper.create方法，凡是使用EStyleUtil创建的style都默认适配了

### 3. ab和Kswitch

#### 添加配置

参考 './src/constants/abConfig.ts' 和 './src/constants/switchConfig.ts'

```typescript
export const abConfigs = defineConfigs([
    {
        name: 'goods_page_purchase_entrance_writing', // 实验参数
        type: 'bool', // 实验参数类型
        stateKey: 'goodAb', // 该实验对应的状态key，使用方式： const { ab } = useContext(AbKswitchContext); ab.goodAb;
        defaultValue: false, // 实验默认值
    }, // 追加其他实验
]);

export const switchConfigs = defineConfigs([
    {
    name: 'yoda_web_enable_wk_checkBlank', // 开关名称
    stateKey: 'checkBlankSwitch', // 开关对应的状态key，使用方式： const { kSwitch } = useContext(AbKswitchContext); kSwitch.checkBlankSwitch;
    defaultValue: false, // 开关默认值
    }, // 追加其他开关
]);
```

#### 使用

```typescript
const { ab, kSwitch } = useContext(AbKswitchContext);
const { goodAb } = ab;
const { checkBlankSwitch } = kSwitch;
```

### 4. 业务埋点上报

#### pv上报

```typescript
    const { reportPV } = useShowReport();// reportPV的首个参数为全局唯一标识，防止重复上报

    reportPV(demoConfig.pageName, () => {
        localLifeBizLogger.pageShow();
    });
```

#### show埋点上报

```typescript
const { reportShow } = useShowReport(); // reportShow的首个参数为全局唯一标识，防止重复上报
useMount(() => {
    reportShow('DEMO_ELEMENT_TEXT', () => {
        localLifeBizLogger.show('ELEMENT_TEXT');
    });
    reportShow('DEMO_ELEMENT_TEXT1', () => {
        localLifeBizLogger.show('ELEMENT_TEXT');
    });
});
```

#### click埋点上报

```typescript
 localLifeBizLogger.click('xxxxx');
```

### 5. App状态

```typescript
interface IAppState {
    /**
     * 是否低内存. 建议的操作：1. 停止动画动图 2. 给用户提醒 3. 清除不用各种缓存 4. 结合业务，做一些有利于释放内存的动作
     */
    isLowMemory: boolean;
    /**
     * 页面显示状态
     */
    appShowState: TAppShowState;
    /**
     * 页面是否隐藏，对appShowState的封装
     */
    isAppHidden: boolean;
}

const { isLowMemory, appShowState, isAppHidden } = useContext(AppStateContext);
```

### 6. 网络请求

#### 基础用法
```typescript
const data = await bizRequest.get({
    url: '/rest/op/vc/poi/detail/app/detail/v3/head',
    params: {
        // @ts-ignore
        poiId: appModel.instance.poiId,
        fromExternalJump: true,
    },
})
```
更多的使用方式见 [请求库](https://kdev.corp.kuaishou.com/git/localkrn/locallife/biz-request/-/file-detail?branchName=master&filePath=README.md&repoId=106277&repoName=biz-request)

#### 进阶用法
如果需要请求的很多状态，如loading,isError,refetching,refetch等等，请使用react-query, **[文档地址](https://tanstack.com/query/v3/docs/react/overview)**

```typescript
export function useQueryDemo() {
    return useQuery<IBaseResponse<IDemoDataModel>>(
        'demoKey',
        () => bizRequest.get({
            url: '/rest/op/vc/poi/detail/app/detail/v3/head',
            params: {
                // @ts-ignore
                poiId: appModel.instance.poiId,
                fromExternalJump: true,
            },
        }),
        {
            onSettled: (data, error) => {
                
            },
        },
    );
}
```

### 7. 状态管理
使用redux-toolkit,参考 [redux-toolkit](https://redux-toolkit.js.org/introduction/getting-started)


### 8. 桥的使用
使用invoke函数,参考 [bridge使用说明](https://docs.corp.kuaishou.com/d/home/fcAAO_-BGGnJopYjijHguggQ5#section=h.z6vns2d0bzp3)

### 9. 本地生活lib库集合

[lib库集合](https://kdev.corp.kuaishou.com/git/groups/localkrn/locallife/-/overview?groupId=47012)


## 代码规范

### 文件（夹）命名

均小驼峰命名，如：hooks/useAppState/index.ts，除非特殊的工具类等

### 组件文件夹组织方式

如goodsCard组件

````
goodsCard
    index.tsx // 组件,组件名称大驼峰如GoodsCard
    styles.ts // 组件样式，当styles较多时，可以新建styles文件夹
    hooks.ts // 组件hooks 如useGoodsCard,当hooks较多时，可以新建hooks文件夹
    config.ts // 组件配置
    types.ts // 组件类型定义
````
### redux的组织方式
1. 一个接口对应的一个dataSlice,如poiHeaderDataSlice,poiInfoDataSlice;
2. 一个页面可以拆分出一个交互的slice，存放纯交互状态，dataSlice如果依赖交互状态可以使用[extraReducers api](https://redux-toolkit.js.org/api/createSlice#extrareducers)，例如poiInteractionSlice;
