"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", form);
    alert("Your message has been sent! We’ll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Contact Us</h1>
        <p className="mb-8 text-gray-600">
          Have questions or need assistance? Fill out the form below and our team will respond shortly.
        </p>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg bg-white p-6 shadow-md space-y-5"
        >
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 p-3"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-semibold text-gray-900">Address</h3>
            <p className="text-gray-600">123 Carvista Street, South Tangerang</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Phone</h3>
            <p className="text-gray-600">+62 123 456 789</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Email</h3>
            <p className="text-gray-600">support@carvista.com</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
