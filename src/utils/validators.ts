export const validatePhone = (phone: string): boolean => {
  const clean = phone.replace(/\s+/g, "");
  return /^7[0-9]{8}$/.test(clean); // Yemeni mobile standard (e.g. 777123456)
};

export const validateEmail = (email: string): boolean => {
  return /^[\s@]+@[\s@]+\.[\s@]+$/.test(email);
};
