export const toShowTime = (date: number) => {
  const differenceInSeconds = date / 1000;
  const differenceInMinutes = differenceInSeconds / 60;
  const differenceInHours = differenceInMinutes / 60;
  const differenceInDays = differenceInHours / 24;
  let time;
  differenceInSeconds <= 60
    ? (time = `منذ ${Math.floor(differenceInSeconds)} لحظات`)
    : differenceInMinutes <= 60
    ? (time = `منذ ${Math.floor(differenceInMinutes)} دقيقة`)
    : differenceInHours <= 24
    ? (time = `منذ ${Math.floor(differenceInHours)} ساعة`)
    : (time = `منذ ${Math.floor(differenceInDays)} يوم`);

  return time;
};
