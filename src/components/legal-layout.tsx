import { Navigation } from "./navigation";
import { Footer } from "./footer";

export function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="pt-28 pb-20 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0a0a0a] mb-8">{title}</h1>
          <div className="prose prose-neutral prose-sm max-w-none text-[#404040] leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[#0a0a0a] [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[#0a0a0a] [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:pl-5 [&_li]:mb-1">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
