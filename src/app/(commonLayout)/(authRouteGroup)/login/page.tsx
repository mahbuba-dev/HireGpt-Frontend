import AuthShell from "@/components/modules/auth/AuthShell";
import LoginForm from "@/components/modules/auth/loginForm";
import { ShieldCheck, Sparkles, Zap } from "lucide-react";

interface LoginParams {
  searchParams: Promise<{ redirect?: string; passwordReset?: string }>;
}


const highlights = [
  { icon: ShieldCheck, title: "Verified jobs & recruiters", desc: "Every job and recruiter is reviewed for authenticity." },
  { icon: Sparkles, title: "AI-powered matching", desc: "Get smart job and talent recommendations instantly." },
  { icon: Zap, title: "Fast, secure access", desc: "Your data is protected. Log in and get started in seconds." },
];

const LoginPage = async ({ searchParams }: LoginParams) => {
  const params = await searchParams;
  const redirectPath = params.redirect;
  const passwordReset = params.passwordReset === "true";

  return (
    <AuthShell
      eyebrow="Welcome back to HireGPT"
      titleLead="Sign in to your career"
      titleAccent="with AI-powered hiring."
      description="Access your dashboard, manage applications, and connect with top companies and talent—all in one place."
      highlights={highlights}
      colorMode="orange"
    >
      <LoginForm redirectPath={redirectPath} passwordReset={passwordReset} />
    </AuthShell>
  );
};

export default LoginPage;
