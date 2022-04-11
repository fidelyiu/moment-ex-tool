/**
 * 是否为周末
 */
export default function isWeekend(data: moment.Moment): boolean {
    return [0, 6].includes(data.day());
}
