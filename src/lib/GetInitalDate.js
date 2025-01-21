export const getInitailDate = (initialDate) => {
  // If no initial date is provided, return default
  if (!initialDate) {
    return "Today";
  }

  const today = new Date();
  const from = new Date(initialDate.from);
  const to = new Date(initialDate.to);

  // Helper function to compare dates without time
  const isSameDate = (date1, date2) => {
    return (
      date1.toISOString().split("T")[0] === date2.toISOString().split("T")[0]
    );
  };

  // Check Today
  if (isSameDate(from, to) && isSameDate(from, today)) {
    return "Today";
  }

  // Check Yesterday
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (isSameDate(from, to) && isSameDate(from, yesterday)) {
    return "Yesterday";
  }

  // Check This Week
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  if (isSameDate(from, startOfWeek) && isSameDate(to, today)) {
    return "This Week";
  }

  // Check Previous Week
  const startOfPrevWeek = new Date(today);
  startOfPrevWeek.setDate(today.getDate() - today.getDay() - 7);
  const endOfPrevWeek = new Date(today);
  endOfPrevWeek.setDate(today.getDate() - today.getDay() - 1);
  if (isSameDate(from, startOfPrevWeek) && isSameDate(to, endOfPrevWeek)) {
    return "Previous Week";
  }

  // Check This Month
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  if (isSameDate(from, startOfMonth) && isSameDate(to, today)) {
    return "This Month";
  }

  // Check Previous Month
  const startOfPrevMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  );
  const endOfPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  if (isSameDate(from, startOfPrevMonth) && isSameDate(to, endOfPrevMonth)) {
    return "Previous Month";
  }

  // Check This Quarter
  const currentQuarter = Math.floor(today.getMonth() / 3);
  const startOfQuarter = new Date(today.getFullYear(), currentQuarter * 3, 1);
  if (isSameDate(from, startOfQuarter) && isSameDate(to, today)) {
    return "This Quarter";
  }

  // Check Previous Quarter
  const startOfPrevQuarter = new Date(
    today.getFullYear(),
    (currentQuarter - 1) * 3,
    1
  );
  const endOfPrevQuarter = new Date(today.getFullYear(), currentQuarter * 3, 0);
  if (
    isSameDate(from, startOfPrevQuarter) &&
    isSameDate(to, endOfPrevQuarter)
  ) {
    return "Previous Quarter";
  }

  // Check This Year
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  if (isSameDate(from, startOfYear) && isSameDate(to, today)) {
    return "This Year";
  }

  // Check Previous Year
  const startOfPrevYear = new Date(today.getFullYear() - 1, 0, 1);
  const endOfPrevYear = new Date(today.getFullYear() - 1, 11, 31);
  if (isSameDate(from, startOfPrevYear) && isSameDate(to, endOfPrevYear)) {
    return "Previous Year";
  }

  return "Custom";
};
