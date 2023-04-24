export const makeTextShorter = (data, length) => {
  const editedData = data.map((obj) => {
    const message = obj.message.split("").slice(0, length).join("") + ".....";
    return { ...obj, message };
  });

  return editedData;
};
