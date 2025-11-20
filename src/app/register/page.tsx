"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RegisterUser } from "@/services/users.service";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

type AuthUser = {
  name: string;
  email: string;
  password: string;
};

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormData,
  ) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setSubmitError(null);

    // Validate with Zod
    const validationResult = registerSchema.safeParse(form);
    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      setFormErrors(
        Object.fromEntries(
          Object.entries(errors).map(([key, value]) => [key, value?.[0]]),
        ),
      );
      return;
    }

    try {
      const { name, email, password } = validationResult.data;

      const registerData: AuthUser = {
        name,
        email,
        password,
      };
      const result = await RegisterUser(registerData);
      console.log("Registration successful:", result);
      if (result) {
        router.push("/login");
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      setSubmitError(err.message || "Registration failed");
    }
  };
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[324px] md:w-[400px] ">
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          {/* LOGO */}
          <div className="flex gap-[11.79px]">
            <Image
              src="/images/logo.svg"
              width={33}
              height={33}
              alt="logo"
              className="w-[33px] h-[33px]"
            />
            <h3 className="font-bold text-[25.14px] leading-[33px]">Booky</h3>
          </div>
          <FieldSet>
            <FieldLegend className="text-neutral-950 md:text-display-sm! font-bold text-display-xs! leading-9 md:leading-[38px] tracking-tight">
              Register
            </FieldLegend>
            <FieldDescription className="text-sm md:text-md font-semibold tracking-tight leading-7 md:leading-[30px] text-neutral-700">
              Create your account to start borrowing books.
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => handleInputChange(e, "name")}
                />
                {formErrors.name && (
                  <FieldDescription className="text-[#EE1D52]">
                    {formErrors.name}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => handleInputChange(e, "email")}
                />
                {formErrors.email && (
                  <FieldDescription className="text-[#EE1D52]">
                    {formErrors.email}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel>Nomor Telepon</FieldLabel>
                <Input type="number" required />
              </Field>
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => handleInputChange(e, "password")}
                />
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="fixed right-0 top-113 w-fit!"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                </Button>

                {formErrors.password && (
                  <FieldDescription className="text-[#EE1D52]">
                    {formErrors.password}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel>Confirm Password</FieldLabel>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={form.confirmPassword}
                  onChange={(e) => handleInputChange(e, "confirmPassword")}
                />
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="fixed right-0 top-136 w-fit!"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                </Button>

                {formErrors.confirmPassword && (
                  <FieldDescription className="text-[#EE1D52]">
                    {formErrors.confirmPassword}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button type="submit">Register</Button>
              </Field>
              <Field className="w-full flex item-center justify-center text-center ">
                <span className="text-sm md:text-md font-semibold tracking-tight leading-7 md:leading-[30px] flex gap-1 justify-center ">
                  Already have an account?
                  <Link href="/login" className="font-bold text-[#1C65DA]">
                    Login
                  </Link>
                </span>
              </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
};

export default RegisterPage;
