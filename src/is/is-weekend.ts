import toMoment from "../to/to-moment";

/**
 * 是否为周末
 */
export default function isWeekend(inp?: moment.MomentInput, strict?: boolean | undefined): boolean {
    const data = toMoment(inp, strict);
    return [0, 6].includes(data.day());
}
