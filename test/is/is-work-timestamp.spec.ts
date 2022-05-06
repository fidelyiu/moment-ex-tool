import toMoment from "../../src/to/to-moment";
import { getTime, isWorkTimestamp } from "../../src";

const getTimeStamp = (str: string) => getTime(toMoment(str));

const specialDates = {
    // 2022年
    // 元旦
    "2022-1-1": false,
    "2022-1-2": false,
    "2022-1-3": false,
    // 春节
    "2022-1-29": true,
    "2022-1-30": true,
    "2022-1-31": false,
    "2022-2-1": false,
    "2022-2-2": false,
    "2022-2-3": false,
    "2022-2-4": false,
    "2022-2-5": false,
    "2022-2-6": false,
    // 清明
    "2022-4-2": true,
    "2022-4-3": false,
    "2022-4-4": false,
    "2022-4-5": false,
    // 劳动节
    "2022-4-24": true,
    "2022-4-30": false,
    "2022-5-1": false,
    "2022-5-2": false,
    "2022-5-3": false,
    "2022-5-4": false,
    "2022-5-7": true,
    // 端午节
    "2022-6-3": false,
    "2022-6-4": false,
    "2022-6-5": false,
    // 中秋节
    "2022-9-10": false,
    "2022-9-11": false,
    "2022-9-12": false,
    // 国庆节
    "2022-10-1": false,
    "2022-10-2": false,
    "2022-10-3": false,
    "2022-10-4": false,
    "2022-10-5": false,
    "2022-10-6": false,
    "2022-10-7": false,
    "2022-10-8": true,
    "2022-10-9": true,
};

describe.each([
    // 一天的开始
    { t: "2022-05-01 00:00:00:000", result: false },
    { t: "2022-05-02 00:00:00:000", result: false },
    { t: "2022-05-03 00:00:00:000", result: false },
    { t: "2022-05-04 00:00:00:000", result: false },
    { t: "2022-05-05 00:00:00:000", result: true },
    { t: "2022-05-06 00:00:00:000", result: true },
    { t: "2022-05-07 00:00:00:000", result: true },
    { t: "2022-05-08 00:00:00:000", result: false },
    { t: "2022-05-09 00:00:00:000", result: true },
    { t: "2022-05-10 00:00:00:000", result: true },
    // 一天中的其他时间
    { t: "2022-05-01 12:00:00:000", result: false },
    { t: "2022-05-02 12:00:00:000", result: false },
    { t: "2022-05-03 00:12:00:000", result: false },
    { t: "2022-05-04 12:00:00:000", result: false },
    { t: "2022-05-05 00:12:00:000", result: true },
    { t: "2022-05-06 12:00:00:000", result: true },
    { t: "2022-05-07 00:12:00:000", result: true },
    { t: "2022-05-08 12:00:00:000", result: false },
    { t: "2022-05-09 00:12:00:000", result: true },
    { t: "2022-05-10 12:00:00:000", result: true },
])("isWorkTimestamp: 时间戳是否是工作日测试，带特殊日期", ({ t, result }) => {
    it(`[${t}]: 时间戳是否是工作日测试，带特殊日期`, () => {
        const w = isWorkTimestamp(getTimeStamp(t), specialDates);
        expect(w).toBe(result);
    });
});

describe.each([
    // 一天的开始
    { t: "2022-05-02 00:00:00:000", result: true },
    { t: "2022-05-03 00:00:00:000", result: true },
    { t: "2022-05-04 00:00:00:000", result: true },
    { t: "2022-05-05 00:00:00:000", result: true },
    { t: "2022-05-06 00:00:00:000", result: true },
    { t: "2022-05-07 00:00:00:000", result: false },
    { t: "2022-05-08 00:00:00:000", result: false },
    { t: "2022-05-09 00:00:00:000", result: true },
    { t: "2022-05-10 00:00:00:000", result: true },
    // 一天中的其他时间
    { t: "2022-05-02 12:00:00:000", result: true },
    { t: "2022-05-03 00:12:00:000", result: true },
    { t: "2022-05-04 12:00:00:000", result: true },
    { t: "2022-05-05 00:12:00:000", result: true },
    { t: "2022-05-06 12:00:00:000", result: true },
    { t: "2022-05-07 00:12:00:000", result: false },
    { t: "2022-05-08 12:00:00:000", result: false },
    { t: "2022-05-09 00:12:00:000", result: true },
    { t: "2022-05-10 12:00:00:000", result: true },
])("isWorkTimestamp: 时间戳是否是工作日测试", ({ t, result }) => {
    it(`[${t}]: 时间戳是否是工作日测试`, () => {
        const w = isWorkTimestamp(getTimeStamp(t));
        expect(w).toBe(result);
    });
});

describe.each([
    { t: "2022-05-07 00:12:00:000", result: false },
    { t: "2022-05-08 12:00:00:000", result: false },
    { t: NaN, result: false },
    { t: false, result: false },
    { t: true, result: false },
])("isWorkTimestamp: 时间戳是否是工作日无效值测试", ({ t, result }) => {
    it(`[${t}]: 时间戳是否是工作日无效值测试`, () => {
        const w = isWorkTimestamp(t as unknown as number);
        expect(w).toBe(result);
    });
});
