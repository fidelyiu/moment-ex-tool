import isPeriodIn from "../../src/is/is-period-in";
import toMoment from "../../src/to/to-moment";
import { MetType } from "../../src";

describe.each([
    { x1: "2022-03-12 00:00:00:000", x2: "2022-05-13 00:00:00:000", x3: "2022-04-15 08:00:00:000", x4: "2022-04-18 08:00:00:000", inType: undefined, result: false },
    { x1: "2022-04-15 08:00:00:000", x2: "2022-04-18 08:00:00:000", x3: "2022-03-12 00:00:00:000", x4: "2022-05-13 00:00:00:000", inType: undefined, result: true },
    { x1: "2022-04-15 08:00:00:000", x2: "2022-04-18 08:00:00:000", x3: "2022-04-15 08:00:00:000", x4: "2022-04-18 08:00:00:000", inType: undefined, result: true },
    { x1: "2022-04-15 08:00:00:000", x2: "2022-04-18 08:00:00:000", x3: "2022-03-12 00:00:00:000", x4: "2022-05-13 00:00:00:000", inType: "", result: false },
    { x1: "2022-04-15 08:00:00:000", x2: "2022-04-18 08:00:00:000", x3: "2022-04-15 08:00:00:000", x4: "2022-04-18 08:00:00:000", inType: "", result: false },
    { x1: "2022-04-15 08:00:00:000", x2: "2022-04-18 08:00:00:000", x3: "2022-04-15 08:00:00:000", x4: "2022-04-18 08:00:00:000", inType: "()", result: false },
    { x1: "2022-04-15 08:00:00:000", x2: "2022-04-18 08:00:00:000", x3: "2022-04-15 08:00:00:000", x4: "2022-04-18 08:00:00:000", inType: "(]", result: false },
    { x1: "2022-04-15 08:00:00:000", x2: "2022-04-18 08:00:00:000", x3: "2022-04-15 08:00:00:000", x4: "2022-04-18 08:00:00:000", inType: "[)", result: false },
    { x1: "2022-04-12 00:00:00:000", x2: "2022-04-13 00:00:00:000", x3: "2022-04-15 08:00:00:000", x4: "Invalid date", inType: undefined, result: false },
    { x1: "2022-04-12 00:00:00:000", x2: "2022-04-13 00:00:00:000", x3: "Invalid date", x4: "2022-04-12 00:00:00:000", inType: undefined, result: false },
    { x1: "2022-04-12 00:00:00:000", x2: "Invalid date", x3: "2022-04-12 00:00:00:000", x4: "2022-04-12 00:00:00:000", inType: undefined, result: false },
    { x1: "Invalid date", x2: "2022-04-13 00:00:00:000", x3: "2022-04-12 00:00:00:000", x4: "2022-04-12 00:00:00:000", inType: undefined, result: false },
    { x1: "2022-04-13 00:00:00:000", x2: "2022-04-14 00:00:00:000", x3: "2022-04-13 00:00:00:000", x4: "2022-04-15 00:00:00:000", inType: undefined, result: true },
    { x1: "2022-04-13 00:00:00:000", x2: "2022-04-14 00:00:00:000", x3: "2022-04-13 00:00:00:000", x4: "2022-04-15 00:00:00:000", inType: "(]", result: false },
    { x1: "2022-04-13 00:00:00:000", x2: "2022-04-14 00:00:00:000", x3: "2022-04-13 00:00:00:000", x4: "2022-04-15 00:00:00:000", inType: "[)", result: true },
    { x1: "2022-04-13 00:00:00:000", x2: "2022-04-14 00:00:00:000", x3: "2022-04-13 00:00:00:000", x4: "2022-04-15 00:00:00:000", inType: "()", result: false },
])("isPeriodIn: 时间段包含测试", ({ x1, x2, x3, x4, inType, result }) => {
    it(`[${x1}, ${x2}, ${x3}, ${x4}, ${inType}]: 时间段包含测试`, () => {
        const data = isPeriodIn(toMoment(x1), toMoment(x2), toMoment(x3), toMoment(x4), inType as unknown as MetType.InType);
        expect(data).toBe(result);
    });
});