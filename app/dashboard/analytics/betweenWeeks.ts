export const betweenWeeks = (
  dateToCheck: Date,
  betweenDate1: number,
  betweenDate2: number
) => {
  const today = new Date();

  const betweenDate1Date = new Date(today);
  const betweenDate2Date = new Date(today);

  betweenDate1Date.setDate(betweenDate1Date.getDate() - betweenDate1);
  betweenDate2Date.setDate(betweenDate2Date.getDate() - betweenDate2);

  return dateToCheck >= betweenDate1Date && dateToCheck <= betweenDate2Date;
};
