import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Full Name is required"),
    phone: z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
    location: z.string().optional(),
    farmSize: z.string().optional(),
    experience: z.string().optional(),
    crops: z.string().optional(),
    businessType: z.string().optional(),
    role: z.enum(["BUYER", "FARMER"], {
      errorMap: () => ({
        message: "Please select if you are a Buyer or a Farmer",
      }),
    }),

    terms: z.literal(true, {
      errorMap: () => ({
        message: "You must accept the Terms and Privacy Policy",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    if (data.role === "FARMER") {
      if (!data.farmSize || data.farmSize.trim() === "") {
        ctx.addIssue({
          path: ["farmSize"],
          code: z.ZodIssueCode.custom,
          message: "Farm size is required",
        });
      }

      if (!data.experience || data.experience.trim() === "") {
        ctx.addIssue({
          path: ["experience"],
          code: z.ZodIssueCode.custom,
          message: "Farming experience is required",
        });
      }

      if (!data.crops || data.crops.trim() === "") {
        ctx.addIssue({
          path: ["crops"],
          code: z.ZodIssueCode.custom,
          message: "Please describe your crops or products",
        });
      }
    }
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.literal(true, {
    errorMap: () => ({
      message: "Remember me option is required",
    }),
  }),
});
