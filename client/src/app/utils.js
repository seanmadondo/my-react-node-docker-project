export const processDateString = (date) => {
    const newDate = new Date(date);
    return newDate.toDateString();
}