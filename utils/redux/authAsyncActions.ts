import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { IAuth, ILogin, IRegister } from "../../types/authType";
import { tokenConfig } from "../tokenConfig";

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (token: IAuth["token"], { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/auth/user/`, tokenConfig(token));
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: ILogin, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/auth/login`,
        { email, password },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }: IRegister, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/auth/register`,
        { username, email, password },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
