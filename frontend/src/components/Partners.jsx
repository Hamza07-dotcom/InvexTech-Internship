// src/components/home/Partners.jsx
import Image from "next/image";

export default function Partners() {
  const partners = ["/images/partners/efinance.png","/images/partners/blife.png","/images/partners/nb.png"];

  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">We collaborate with various trusted financing partners.</h3>
          <div className="flex items-center gap-6">
            {partners.map((p, i) => (
              <div key={i} className="h-12 w-24">
                <Image src={p} alt={`partner-${i}`} width={96} height={48} className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
