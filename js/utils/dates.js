import moment from "moment";
export const firstDay = date =>
  moment(date)
    .startOf("month")
    .format("MM-DD-YYYY");
export const lastDay = date =>
  moment(date)
    .endOf("month")
    .format("MM-DD-YYYY");
