import toMoment from "../to/to-moment";

/**
 * 时间段是否相交
 */
export default function isIntersect(t1: moment.Moment, t2: moment.Moment, t3: moment.Moment, t4: moment.Moment): boolean {
    const x1 = toMoment(t1);
    const x2 = toMoment(t2);
    const x3 = toMoment(t3);
    const x4 = toMoment(t4);
    if (x1.isValid() || x2.isValid() || x3.isValid() || x4.isValid()) return false;
    const l1 = x1.isBefore(x2) ? x1 : x2;
    const l2 = x1.isBefore(x2) ? x2 : x1;
    const l3 = x3.isBefore(x4) ? x3 : x4;
    const l4 = x3.isBefore(x4) ? x4 : x3;
    return (
        // l3是否在第一个线段中
        (l1.isBefore(l3) && l3.isBefore(l2)) ||
        // l4是否在第一个线段中
        (l1.isBefore(l4) && l4.isBefore(l2)) ||
        // l1是否在第二个线段中
        (l3.isBefore(l1) && l1.isBefore(l4)) ||
        // l2是否在第二个线段中
        (l3.isBefore(l2) && l2.isBefore(l4)) ||
        (l3.isSame(l1) && l2.isSame(l4))
    );
}
