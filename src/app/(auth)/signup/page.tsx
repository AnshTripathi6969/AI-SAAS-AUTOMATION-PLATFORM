import { AIBackground } from "@/app/design/ai-background";
import { GsapTitleHover } from "@/app/gsap-hover";
import { RegisterForm } from "@/features/auth/components/register_form";
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

      {/* LOGO + ANIMATED TITLE */}
      <div className="pointer-events-none absolute top-13 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4">
        <div className="flex items-center justify-center gap-2 text-white">
          <Image
            src="/logos/logo2.svg"
            alt="Fluxion AI logo"
            width={36}
            height={36}
            priority
          />

          {/* 🌈 Idle breathing + gradient glow title */}
          <GsapTitleHover text="Fluxion AI Automation Core" />
        </div>
      </div>

      {/* REGISTER FORM (UNCHANGED, FLOATING ABOVE BG) */}
      <div className="relative z-30">
        <RegisterForm />
      </div>
    </div>
  );
}
