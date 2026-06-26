import API from "./api";

// Toggle Task Status
export const toggleTaskStatus = async (id) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const res = await API.patch(
    `/tasks/${id}/status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};