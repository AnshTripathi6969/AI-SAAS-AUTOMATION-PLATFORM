import { LoginForm } from "@/features/auth/components/login_form";
import { requireUnauth } from "@/lib/auth-utils";
import Image from "next/image";

export default async function Page() {
  await requireUnauth();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* LOGO — ALIGNED TO FORM */}
      <div className="pointer-events-none absolute top-22 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
        <div className="flex items-center justify-center gap-2 text-white">
          <Image
            src="/logos/logo2.svg"
            alt="Nodebase logo"
            width={36}
            height={36}
            priority
          />
          <span className="text-lg font-semibold tracking-wide">
            Fluxion AI Automation Core
          </span>
        </div>
      </div>

      {/* FULLSCREEN LOGIN */}
      <LoginForm />
    </div>
  );
}
