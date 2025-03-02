import { CreateTenantData, CreateUserData, Credentials } from "../types";
import { api } from "./client";

// Auth service
export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);
export const self = () => api.get("/auth/self");
export const logout = () => api.post("/auth/logout");

// User service
export const getUsers = (queryString: string) =>
  api.get(`/users?${queryString}`);
export const createUser = (user: CreateUserData) => api.post("/users", user);
export const updateUser = (user: CreateUserData, id: string) =>
  api.patch(`/users/${id}`, user);

// Tenant service
export const getTenants = (queryString: string) =>
  api.get(`/tenants?${queryString}`);
export const createTenant = (tenant: CreateTenantData) =>
  api.post("/tenants", tenant);
export const updateTenant = (tenant: CreateTenantData, id: string) =>
  api.patch(`/tenants/${id}`, tenant);
