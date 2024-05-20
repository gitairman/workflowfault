export const getAndSet = async (id, dataType, cb) => {
  const response = await fetch(`/api/${dataType}/${id}`);
  const data = await response.json();
  cb(data);
};
