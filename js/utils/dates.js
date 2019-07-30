import moment from "moment";
export const firstDay = date =>
  moment(date)
    .startOf("month")
    .format("YYYY-MM-DD");
export const lastDay = date =>
  moment(date)
    .endOf("month")
    .format("YYYY-MM-DD");
