export const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString()} ر.ي`;
};

export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString("ar-YE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
