export const sleep = async (timeout: number): Promise<void> => {
  return new Promise((resolve: any) => setTimeout(resolve, timeout));
};
