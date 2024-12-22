
export const chunk = <T>(array: T[], size: number, defaultFill?: T |undefined): T[][] => {
  const chunked = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    chunked.push([
      ...chunk,
      ...(typeof defaultFill !== 'undefined' && chunk.length < size ? Array(size - chunk.length).fill(defaultFill) : []),
    ]);
  }
  return chunked;
};
