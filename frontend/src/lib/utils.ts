import { type ClassValue, clsx } from "clsx";
import { Resolver } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type SignInForm = {
  email: string;
  password: string;
};

export const signInFormResolver: Resolver<SignInForm> = async (values) => {
  const errors: any = {};

  if (!values.email) errors.email = "Email is required";
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  )
    errors.email = "Invalid email address";
  if (!values.password) errors.password = "Password is required";
  if (values.password && values.password.length < 6)
    errors.password = "Password should be at least 6 characters long";

  return {
    values: values,
    errors,
  };
};

export type ClientForm = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  industryName: string;
  industryType: string;
  industrySize: string;
  site?: string;
  notes?: string;
};

export const employeeFormResolver: Resolver<ClientForm> = async (values) => {
  const errors: any = {};

  if (!values.name) errors.name = "Name is required";
  if (!values.email) errors.email = "Email is required";
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  )
    errors.email = "Invalid email address";
  if (!values.password) errors.password = "Password is required";
  if (values.password && values.password.length < 6)
    errors.password = "Password should be at least 6 characters long";
  if (!values.phone) errors.phone = "Phone is required";
  if (!values.industryName) errors.industryName = "Industry name is required";
  if (!values.industryType) errors.industryType = "Industry type is required";
  if (!values.industrySize) errors.industrySize = "Industry size is required";

  return {
    values: values,
    errors,
  };
};

export type UserForm = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  industryId: string;
  address?: string;
};

export const userFormResolver: Resolver<UserForm> = async (values) => {
  const errors: any = {};

  if (!values.name) errors.name = "Name is required";
  if (!values.email) errors.email = "Email is required";
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  )
    errors.email = "Invalid email address";
  if (!values.password) errors.password = "Password is required";
  if (values.password && values.password.length < 6)
    errors.password = "Password should be at least 6 characters long";
  if (!values.phone) errors.phone = "Phone is required";
  if (!values.role) errors.role = "Role is required";
  if (!values.industryId) errors.industryId = "Industry is required";

  return {
    values: values,
    errors,
  };
};
