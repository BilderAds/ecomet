"use client";

import { Star } from "lucide-react";
import { Reveal } from "./reveal";

const testimonials = [
  {
    name: "Keanu Fuchs",
    role: "E-Commerce Gründer",
    text: "Ehrlich gesagt dachte ich zuerst: Wo ist der Haken? Aber es gibt keinen. Die Qualität ist top, die Preise unschlagbar und das Ganze kostenlos. Absolut verrückt!",
  },
  {
    name: "Lisa Janzen",
    role: "Dropshipping Expertin",
    text: "Wer einmal direkt vom Hersteller kauft, geht nie wieder zurück zu Zwischenhändlern. Beste Qualität, beste Preise. So macht Business Spaß!",
  },
  {
    name: "Daniel Bergmann",
    role: "Amazon FBA Seller",
    text: "Ich dachte immer, gute Qualität hat ihren Preis. Stimmt. Aber nur, wenn man den falschen Leuten zahlt. Hier bekommt man Premium Produkte direkt von der Quelle!",
  },
  {
    name: "Daniel Waimer",
    role: "Online Shop Besitzer",
    text: "Klang zu gut, um wahr zu sein. Ein kostenloser Service für Produkte in bester Qualität? Aber es ist echt. Habe bestellt und war mega überrascht, wie smooth alles lief!",
  },
  {
    name: "Franzi Schneider",
    role: "Start-up Gründerin",
    text: "Ich dachte immer, günstige Preise bedeuten schlechte Qualität. Nope! Die Sachen hier kommen direkt vom Hersteller und sind besser als vieles, was ich vorher hatte.",
  },
  {
    name: "Tobias Beyer",
    role: "Brand Owner",
    text: "Warum sollte ich überteuerte Zwischenhändler bezahlen, wenn ich hier direkt an die Quelle komme? Das ist einfach smarteres Business für jeden der ein Startup hat!",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="fill-ecomet text-ecomet" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="bewertungen"
      className="py-24 bg-[#0a0a0a] relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-ecomet/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-ecomet/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Was unsere Kunden sagen:
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Reveal key={testimonial.name}>
              <div className="group h-full p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-ecomet/20 hover:bg-white/[0.05] transition-all duration-500">
                <StarRating />
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ecomet to-ecomet-dark flex items-center justify-center text-white text-sm font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-white/40">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex justify-center mt-12">
          <a
            href="https://gtapp.unifydropshipping.com/auth/register?share=B031.2034151326159671297.false&sign=0f3479af09515ce68412ef3ae4d28b8b" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            Jetzt starten
          </a>
        </Reveal>
      </div>
    </section>
  );
}
