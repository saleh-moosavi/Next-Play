import z from "zod";

export const registerSchema = z
  .object({
    email: z.string().min(1, "ایمیل الزامی است").email("ایمیل نامعتبر است"),
    password: z
      .string()
      .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
      .regex(/[A-Z]/, "رمز عبور باید حداقل یک حرف بزرگ داشته باشد")
      .regex(/[a-z]/, "رمز عبور باید حداقل یک حرف کوچک داشته باشد")
      .regex(/[0-9]/, "رمز عبور باید حداقل یک عدد داشته باشد"),
    rePassword: z.string().min(1, "تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "رمز عبور و تکرار آن مطابقت ندارند",
    path: ["rePassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
