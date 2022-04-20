# 1.Moment Ex Tool

[`moment`](https://momentjs.com/)。

`Moment Ex Tool`封装了一些方便计算、调用`mement`的方法，并没有修改`moment`的逻辑。

# 2.安装

npm：

```bash
npm i moment-ex-tool
```

yarn：

```bash
yarn add moment-ex-tool
```

浏览器无其他依赖：

```html

<script src="https://unpkg.com/moment-ex-tool@latest/moment-ex-tool.iife.min.js"></script>
```

浏览器有其他依赖：

```html
<script src="https://cdn.jsdelivr.net/npm/moment@latest/moment.min.js"></script>
<script src="https://unpkg.com/moment-ex-tool@latest/moment-ex-tool.onlib.iife.min.js"></script>

<script>
    console.log(MET)
</script>
```

# 3.API
`MET`下导出了许多按命名分类的方法。
## 3.1`to`类
将某种类型数据转换为另一种类型数据

### 3.1.1.`toStr`
将时间适配为`'YYYY-MM-DD HH:mm:ss:SSS'`。

如果是无效参数，则会返回`'Invalid date'`。

该方法旨在于快速显示可读的时间格式，如果需要自定义还是请使用`moment().format()`

```js
toStr(moment());
// '2022-04-14 12:04:14:414'
```

### 3.1.2.`toMoment`
解析字符串`'YYYY-MM-DD HH:mm:ss:SSS'`为Moment对象

该方法旨在于快速解析`toStr()`生成的字符串

```js
toMoment('2022-04-14 12:04:14:414');
```


## 3.2.`is`类
判断指定参数是否符合预期

### 3.2.1.`isIn`

判断`t1`是否包含在`t2`、`t3`中。

```typescript
import type { MetType } from "moment-ex-tool";

const startTime = toMoment('2022-04-13 00:00:00:000');
const endTime = toMoment('2022-04-15 00:00:00:000');

const t1 = toMoment('2022-04-13 00:00:00:000');
isIn(t1, startTime, endTime) // 默认'[]', true
isIn(t1, startTime, endTime, '(]'); // 大于、小于等于, false
isIn(t1, startTime, endTime, '[)'); // 大于等于、小于, true

const t2 = toMoment('2022-04-12 00:00:00:000');
isIn(t2, startTime, endTime); // 不在范围内, false

const t3 = toMoment('2022-04-14 00:00:00:000');
const inType: MetType.InType = '()';
isIn(t3, startTime, endTime, inType); // 大于、小于, true
```


### 3.2.2.`isPeriodIn`

时间段版的`isIn`。
```js
const startTime = toMoment('2022-04-13 00:00:00:000');
const endTime = toMoment('2022-04-15 00:00:00:000');


const t1 = toMoment('2022-04-13 00:00:00:000');
const t2 = toMoment('2022-04-14 00:00:00:000');
isPeriodIn(t1, t2, startTime, endTime, '(]');
// false
isPeriodIn(t1, t2, startTime, endTime);
// true
```

### 3.2.3.`isIntersect`
判断时间段`[t1, t2]`和时间段`[t3, t4]`是否相交，不包含单个端点重合情况（如需要请使用`isIntersectSame`）。
```js
const t1 = toMoment('2022-04-13 00:00:00:000');
const t2 = toMoment('2022-04-15 00:00:00:000');

const t3 = toMoment('2022-04-14 00:00:00:000');
const t4 = toMoment('2022-04-16 00:00:00:000');
isIntersect(t1, t2, t3, t4); // true
isIntersect(t1, t2, t2, t4); // false
```

### 3.2.4.`isIntersectSame`
同`isIntersect`，但包含单个端点重合情况。
```js
const t1 = toMoment('2022-04-13 00:00:00:000');
const t2 = toMoment('2022-04-15 00:00:00:000');

const t3 = toMoment('2022-04-14 00:00:00:000');
const t4 = toMoment('2022-04-16 00:00:00:000');
isIntersect(t1, t2, t3, t4); // true
isIntersect(t1, t2, t2, t4); // true
```

### 3.2.5.`isWeekend`
是否为周末。
```js
const t1 = toMoment('2022-04-15 00:00:00:000'); // 星期五
isWeekend(t1); // false

const t2 = toMoment('2022-04-16 00:00:00:000'); // 星期六
isWeekend(t2); // true
```


## 3.3.`get`类
获取根据参数经过某些计算后的结果

### 3.3.1.`getAsc`/`getDesc`

获取一个新的排序过的数组(每一项都经过`clone`过的)。

```js
const t1 = toMoment('2022-04-13 00:00:00:000');
const t2 = toMoment('2022-04-15 00:00:00:000');
const t3 = toMoment('2022-04-14 00:00:00:000');
const t4 = toMoment('2022-04-16 00:00:00:000');

getAsc([t1, t2, t3, t4]); // [t1, t3, t2, t4]
getDesc([t1, t2, t3, t4]); // [t4, t2, t3, t1]
```

### 3.3.2.`getMin`/`getMax`/`getMinMax`

获取数组中最大值最小值。

```js
const t1 = toMoment('2022-04-13 00:00:00:000');
const t2 = toMoment('2022-04-15 00:00:00:000');
const t3 = toMoment('2022-04-14 00:00:00:000');
const t4 = toMoment('2022-04-16 00:00:00:000');

getMin([t1, t2, t3, t4]); // t1
getMax([t1, t2, t3, t4]); // t4
getMinMax([t1, t2, t3, t4]); // [t1, t4]
getMin([]); // undefined
getMax([]); // undefined
getMinMax([]); // [undefined, undefined]
```

### 3.3.3.`getSliceTime`/`getSliceNum`/`getSliceTimeWithFormat`/`getSliceNumWithFormat`

获取`t1`、`t2`之间的切片。如果计算切片通过`opt`来配置。

- `getSliceTime`: 获取所有切片结果。
- `getSliceNum`: `getSliceTime(...)length`。
- `getSliceTimeWithFormat`: 同`getSliceTime`, 但`opt.startUnit`为`'d'`。
- `getSliceNumWithFormat`: `getSliceTimeWithFormat(...)length`。

更多案例，参考项目的[测试用例](https://github.com/fidelyiu/moment-ex-tool/blob/master/test/get/get-slice-time-with-format.spec.ts)。

```typescript
import type { MetType } from "moment-ex-tool";
const opt: Partial<MetType.SliceNumOpt> = {
    /**
     * 是否包含结尾时间
     * 
     * 默认: true
     *
     * ex: 2022-10-10~2022-10-13
     * 一般不包含结尾，则只有3天，包含则有4天
     */
    includEnd: true,
    /**
     * 当包含结尾时，迭加等于结尾时，后续是否继续叠加。
     * 
     * 默认: false
     *
     * ex: 2022-10-10 00:00:000~2022-10-12 00:00:000
     * true:
     * [
     *  ['2022-10-10 00:00:000', '2022-10-11 00:00:000'],
     *  ['2022-10-11 00:00:000', '2022-10-12 00:00:000'],
     *  ['2022-10-12 00:00:000', '2022-10-13 00:00:000'],
     *  ['2022-10-13 00:00:000', '2022-10-14 00:00:000'],
     * ]
     *
     * false:
     * [
     *  ['2022-10-10 00:00:000', '2022-10-11 00:00:000'],
     *  ['2022-10-11 00:00:000', '2022-10-12 00:00:000'],
     *  ['2022-10-12 00:00:000', '2022-10-13 00:00:000'],
     * ]
     */
    isSameEnd: false,
    /**
     * 切片长度是多少
     * 
     * 默认: 1
     */
    silceNum: 1,
    /**
     * 以什么单位算添加时间
     * 
     * 默认: 'd'
     */
    addUnit: 'd',
    /**
     * 以什么单位算开始时间
     * 
     * 默认: undefined
     */
    startUnit: 'd',
    /**
     * 排除的时间段
     * 返回true，则不要指定时间段
     * 
     * 默认: () => false
     */
    exclude: (startTime, endTime) => false,
}
```

### 3.3.4.`getTime`
获取毫秒时间戳，如果你要获取秒数时间戳，请使用`moment().unix()`。

如果是非法参数，则会返回NaN


# 4.注意
如果需要Tree Shaking，只要不全部`import`即可。
```js
// 👍good
import { toStr } from "moment-ex-tool";

// 👎bad
import MET from "moment-ex-tool";
```
