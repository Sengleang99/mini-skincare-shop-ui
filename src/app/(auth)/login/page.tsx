// src/app/(auth)/login/page.tsx
import AuthForm from "@/app/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12">
      <AuthForm type="login" />
    </div>
  );
}