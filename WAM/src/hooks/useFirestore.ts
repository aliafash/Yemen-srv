import { useState } from "react";

export const useFirestore = () => {
  const [loading, setLoading] = useState(false);
  return { loading, setLoading };
};
