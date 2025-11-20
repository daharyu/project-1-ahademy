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
import { LoginUser } from "@/services/users.service";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

type AuthUser = {
  email: string;
  password: string;
};

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type FormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [form, setForm] = useState<FormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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
    const validationResult = loginSchema.safeParse(form);
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
      const { email, password } = validationResult.data;

      const loginData: AuthUser = {
        email,
        password,
      };
      const result = await LoginUser(loginData);
      console.log("Login successful:", result);
      if (result) {
        localStorage.setItem("token", result.data?.token || "");
        localStorage.setItem("user", JSON.stringify(result.data?.user || ""));
        router.push("/");
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setFormErrors((prev) => ({
          ...prev,
          email: "Invalid email or password",
          password: "Invalid email or password",
        }));
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setSubmitError(err.message || "Login failed");
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
              Login
            </FieldLegend>
            <FieldDescription className="text-sm md:text-md font-semibold tracking-tight leading-7 md:leading-[30px] text-neutral-700">
              Sign in to manage your library account.
            </FieldDescription>
            <FieldGroup>
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
                  className="fixed right-0 top-67 w-fit!"
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
                <Button type="submit">Login</Button>
              </Field>
              <Field className="w-full flex item-center justify-center text-center ">
                <span className="text-sm md:text-md font-semibold tracking-tight leading-7 md:leading-[30px] flex gap-1 justify-center ">
                  Don't have an account?
                  <Link href="/register" className="font-bold text-[#1C65DA]">
                    Register
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

export default LoginPage;
