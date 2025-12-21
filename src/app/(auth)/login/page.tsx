import { AIBackground } from "@/app/design/ai-background";
import { GsapTitleHover } from "@/app/gsap-hover";
import { LoginForm } from "@/features/auth/components/login_form";
import { requireUnauth } from "@/lib/auth-utils";
import Image from "next/image";

export default async function Page() {
  await requireUnauth();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* 🌌 AI LIVE FEED BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <AIBackground />
      </div>

      {/* LOGO + INTERACTIVE TITLE */}
      <div className="pointer-events-none absolute top-22 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4">
        <div className="flex items-center justify-center gap-2 text-white">
          <Image
            src="/logos/logo2.svg"
            alt="Nodebase logo"
            width={36}
            height={36}
            priority
          />

          {/* 🧠 AI CORE TITLE */}
          <GsapTitleHover text="Fluxion AI Automation Core" />
        </div>
      </div>

      {/* LOGIN FORM */}
      <div className="relative z-30">
        <LoginForm />
      </div>
    </div>
  );
}
