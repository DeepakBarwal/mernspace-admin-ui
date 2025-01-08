import { Credentials } from "../types";
import { api } from "./client";

// Auth service
export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);
export const self = () => api.get("/auth/self");
export const logout = () => api.post("/auth/logout");

// User service
export const getUsers = () => api.get("/users");

// Tenant service
export const getTenants = () => api.get("/tenants");
