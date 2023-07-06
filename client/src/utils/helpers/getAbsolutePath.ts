export const getAbsolutePath = (path: string) => {
  const absolutePath = `${window.location.origin}/`;

  return absolutePath + path;
};
