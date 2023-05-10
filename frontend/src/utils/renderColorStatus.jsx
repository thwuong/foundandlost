export const renderStatusRequest = (status) => {
  return status === "pending" ? "yellow" : status === "accepted" ? "green" : "red";
};
export const renderStatusPost = (status) => {
  return status === "pending" ? "yellow" : status === "confirmed" ? "green" : "red";
};
export const renderTypePost = (status) => {
  return status === "Found item" ? "messenger" : "purple";
};
