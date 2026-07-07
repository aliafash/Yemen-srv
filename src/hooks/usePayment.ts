import { useState } from "react";

export const usePayment = () => {
  const [processing, setProcessing] = useState(false);
  return { processing, setProcessing };
};
