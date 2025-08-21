export default function WhyCarvista() {
  const features = [
    {
      title: "Save time and energy",
      text: "Get the best prices without hassle. Supported by experts, the negotiation and offer-finding process becomes more efficient and faster.",
      icon: "/images/why carvista/timer.png", // replace later
    },
    {
      title: "Data privacy",
      text: "We carefully maintain data confidentiality, providing protection against unscrupulous automotive dealers or salespeople.",
      icon: "/images/why carvista/cyber.png", // replace later
    },
    {
      title: "Comprehensive car research",
      text: "Find your dream car easily. Our car sales website offers the most extensive database and user-friendly interface.",
      icon: "/images/why carvista/taxi.png", // replace later
    },
  ];

  const partners = [
    { name: "e-finance", logo: "/images/why carvista/e-finance.png" },
    { name: "Bline Finance", logo: "/images/why carvista/bline.png" },
    { name: "NB Finance", logo: "/images/why carvista/nbo.png" },
  ];

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <h2 className="text-center font-sans  lg:text-[40px] tracking-[1.2%] font-bold text-[#1F2937] mb-12">
          Why Carvista?
        </h2>

        {/* Features Row */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-4">
              <img
                src={f.icon}
                alt={f.title}
                className="w-10 h-10 flex-shrink-0"
              />
              <div>
                <h3 className="text-base font-sans font-semibold lg:text-[20px] tracking-[1.5%] text-[#1F2937] ">
                  {f.title}
                </h3>
                <p className="text-sm  lg:text-[16px] text-[#8F949B] font-sans font-normal tracing-[1.5%] mt-1">{f.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="border-gray-300 mb-8" />

        {/* Partners Section - Text Left, Logos Right */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left Text */}
          <h3 className="text-2xl lg:text-[32px] leading-[120%] tracking-[1.2%] font-bold text-[#1F2937] md:w-1/3">
            We collaborate with various trusted financing partners.
          </h3>

          {/* Partner Logos */}
          <div className="grid grid-cols-3 gap-4 md:w-2/3">
            {partners.map((p, i) => (
              <div
                key={i}
                className="border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="w-16 h-16 mb-2"
                />
                <span className="text-sm 
                lg:text-[16px] font-sans 
                font-semibold tracking-[1.5%] text-[#1F2937]">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
