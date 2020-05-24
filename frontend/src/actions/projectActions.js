import axios from "axios";
import { GET_ERRORS } from "./types";

// Create Project
export const createProject = (createProjectDTO, history) => (dispatch) => {
  axios.post("/api/projects/create", createProjectDTO).catch((err) =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  );
};