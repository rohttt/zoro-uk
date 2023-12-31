import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERRORS } from "../constants/userContants";
import axios from "axios"

// Login
export const login = (email, password) => async (dispatch) => {

    try {

        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(
            `http://localhost:4000/api/v1/user/login`,
            { email, password },
            config
        );

        dispatch({ type: LOGIN_SUCCESS, payload: data.user });

    } catch (error) {

        if (error.response) {
            dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
        } else {
            dispatch({ type: LOGIN_FAIL, payload: "Something went wrong. Please try again after sometime" });
        }

    }

}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};