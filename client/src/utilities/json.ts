export const cleanJsonString = (str: string) => {
  return str.replace(`"\\"`, '').replace(`\\""`, '').replace(`"`, '').replace(`"`, '');
};
