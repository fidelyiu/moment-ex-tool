import { getMinMax, toStr } from "../../src";

type GetMinMaxTestItem = {
    dateList: Array<any>;
    result: Array<any>;
    index: any;
};
type GetMinMaxTestList = Array<GetMinMaxTestItem>;
const testList = <GetMinMaxTestList>(
    [
        // 测试项
        { dateList: [1647878400000, 1658505600000, null, null], result: ["2022-03-22 00:00:00:000", "2022-07-23 00:00:00:000"] },
    ] as unknown as any
).map((item: GetMinMaxTestItem, index: number) => {
    item.index = index;
    return item;
});

describe.each(testList)("isIntersect: 最大最小值测试", ({ dateList, result, index }) => {
    it(`[${index}. 最大最小值测试`, () => {
        const data = getMinMax(dateList);
        expect(data.map((item) => (item ? toStr(item) : undefined))).toEqual(result);
    });
});
