import moment from "moment";

export default function getDesc(list: Array<moment.Moment>) {
    return list
        .map((item) => moment(item))
        .filter((item) => item.isValid())
        .sort((a, b) => (a.isBefore(b) ? 1 : -1));
}
