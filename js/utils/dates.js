import moment from "moment";
export const firstDay = moment()
  .startOf("month")
  .format("YYYY-MM-DD hh:mm");
export const lastDay = moment()
  .endOf("month")
  .format("YYYY-MM-DD hh:mm");
