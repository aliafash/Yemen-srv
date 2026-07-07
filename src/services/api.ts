export const apiRequest = async (endpoint: string, options?: any) => {
  const response = await fetch(`/api/${endpoint}`, options);
  return response.json();
};
