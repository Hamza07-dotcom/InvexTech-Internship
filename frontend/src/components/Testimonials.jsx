export default function Testimonials() {
  const items = [
    {
      title: "Thank you, Carvista!",
      text: "I'm very impressed with Carvista. They kindly assisted me in the process of purchasing a new car and trade-in.",
      name: "Andi Sudirman, 32 years old",
      city: "Makassar",
    },
    {
      title: "Highly beneficial",
      text: "Carvista offered me highly beneficial deals when I wanted to exchange my old car for a new one.",
      name: "Eri Cahyono, 50 tahun",
      city: "Surabaya",
    },
    {
      title: "High quality",
      text: "I am satisfied with the high-quality new car I purchased from Carvista. The car looks new and of high quality.",
      name: "Sandiaga Dos, 29 tahun",
      city: "Jakarta",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section title */}
        <h3 className="mb-8 lg:text-[24px]  font-bold text-[#1F2937]
        lg:tracking-[1.5%]
        ">
          What they say about Carvista
        </h3>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              {/* Title */}
              <h4 className="font-bold font-sans  text-[20px] tracking-[1.5%] text-[#1F2937] mb-2">
                {t.title}
              </h4>

              {/* Testimonial text */}
              <p className=" font-sans lg:text-[16px] tracking-[1.5%] text-[#8F949B] b-4">{t.text}</p>

              {/* Name */}
              <div className="text-[#1F2937] font-sans font-regular lg:text-[16px] tracking-[1.5%]">{t.name}</div>

              {/* City with custom icon image */}
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <img
                  src="/images/Assets/testimonial.svg" // Replace with your actual icon path later
                  alt="Location"
                  className="w-4 h-4 mr-1"
                />
                {t.city}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
