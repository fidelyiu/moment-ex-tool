import moment from "moment";

export default function getAsc(list: Array<moment.Moment>) {
    return list.map((item) => moment(item)).sort((a, b) => (a.isBefore(b) ? -1 : 1));
}
