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
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-12">
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
                <h3 className="text-base font-semibold text-gray-900">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{f.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="border-gray-300 mb-8" />

        {/* Partners Section - Text Left, Logos Right */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left Text */}
          <h3 className="text-2xl font-bold text-gray-900 md:w-1/3">
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
                <span className="text-sm font-medium text-gray-800">
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
