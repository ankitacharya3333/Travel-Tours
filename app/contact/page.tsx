"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Primitives";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    travelMonth: "October-November 2026",
    interestedRegion: "Everest & Khumbu",
    groupSize: "2",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission for Milestone 1 (API and persistent database hook in Milestone 2)
    setSubmitted(true);
  };

  return (
    <div className="py-12 lg:py-20">
      <Container>
        {/* Page Heading */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#b85a3a] font-semibold">
            Inquiry & Consultation
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1e3328] tracking-tight">
            Connect with our Kathmandu Team
          </h1>
          <p className="mt-4 text-base text-[#5a6b61] leading-relaxed">
            Every great Himalayan journey begins with an honest conversation. Share your preferred travel dates, fitness background, and dream trails. We respond with realistic routing and clear permit details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Information & Office Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 bg-[#f5f2ea] border border-[#e4dfd5] rounded-sm space-y-6">
              <h2 className="text-xl font-serif text-[#1e3328]">Kathmandu Operations Office</h2>

              <div className="space-y-4 text-xs text-[#4d5c53]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#b85a3a] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1e3328] font-medium">Physical Address</strong>
                    <span>Thamel Marg, Ward 26, Kathmandu 44600, Nepal</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#b85a3a] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1e3328] font-medium">Telephone & WhatsApp</strong>
                    <span>+977 (1) 470-0000 / +977 98510-00000</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#b85a3a] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1e3328] font-medium">Direct Inquiries</strong>
                    <span>adventures@himalayantrails.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#b85a3a] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1e3328] font-medium">Office Hours</strong>
                    <span>Sunday – Friday: 9:00 AM – 6:00 PM (Nepal Time, UTC +5:45)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white border border-[#e4dfd5] rounded-sm text-xs text-[#5a6b61] space-y-2">
              <h3 className="font-serif font-semibold text-sm text-[#1e3328]">24/7 Field Support</h3>
              <p className="leading-relaxed">
                Active trekking groups on the trail are monitored 24 hours a day with direct helicopter rescue coordination channels in Lukla, Pokhara, and Kathmandu.
              </p>
            </div>
          </div>

          {/* Interactive Trip Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 border border-[#e4dfd5] rounded-sm shadow-xs">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="inline-flex p-4 rounded-full bg-emerald-50 text-emerald-700">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-serif text-[#1e3328]">Inquiry Received</h3>
                  <p className="text-sm text-[#5a6b61] max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.fullName || "traveler"}. Your preliminary inquiry has been registered. A member of our Kathmandu expedition desk will review your details and send a personalized itinerary proposal within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex px-4 py-2 mt-4 text-xs font-semibold rounded-sm bg-[#1e3328] text-white hover:bg-[#15241c] transition-colors cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-xl font-serif text-[#1e3328] mb-4">Start Your Trip Inquiry</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-mono uppercase text-[#4d5c53] mb-1">
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Maya Lin"
                        className="w-full px-3 py-2 text-sm bg-[#fbf9f5] border border-[#d1cbc2] rounded-sm focus:border-[#1e3328] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-mono uppercase text-[#4d5c53] mb-1">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-3 py-2 text-sm bg-[#fbf9f5] border border-[#d1cbc2] rounded-sm focus:border-[#1e3328] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="country" className="block text-xs font-mono uppercase text-[#4d5c53] mb-1">
                        Country of Residence *
                      </label>
                      <input
                        id="country"
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g. Germany, USA, Australia"
                        className="w-full px-3 py-2 text-sm bg-[#fbf9f5] border border-[#d1cbc2] rounded-sm focus:border-[#1e3328] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="region" className="block text-xs font-mono uppercase text-[#4d5c53] mb-1">
                        Destination or Trek of Interest
                      </label>
                      <select
                        id="region"
                        value={formData.interestedRegion}
                        onChange={(e) => setFormData({ ...formData, interestedRegion: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-[#fbf9f5] border border-[#d1cbc2] rounded-sm focus:border-[#1e3328] focus:outline-none"
                      >
                        <option value="Everest & Khumbu">Everest & Khumbu</option>
                        <option value="Annapurna Massif">Annapurna Massif</option>
                        <option value="Langtang Valley">Langtang Valley</option>
                        <option value="Manaslu Circuit">Manaslu Circuit</option>
                        <option value="Upper Mustang">Upper Mustang</option>
                        <option value="Kathmandu Cultural">Kathmandu Cultural Journey</option>
                        <option value="Custom Itinerary">Custom / Undecided</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="groupSize" className="block text-xs font-mono uppercase text-[#4d5c53] mb-1">
                        Estimated Group Size
                      </label>
                      <select
                        id="groupSize"
                        value={formData.groupSize}
                        onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-[#fbf9f5] border border-[#d1cbc2] rounded-sm focus:border-[#1e3328] focus:outline-none"
                      >
                        <option value="1">Solo Traveler</option>
                        <option value="2">2 Persons (Couple / Friends)</option>
                        <option value="3-5">3 to 5 Persons (Small Private)</option>
                        <option value="6-10">6 to 10 Persons (Group)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="travelMonth" className="block text-xs font-mono uppercase text-[#4d5c53] mb-1">
                        Intended Travel Window
                      </label>
                      <input
                        id="travelMonth"
                        type="text"
                        value={formData.travelMonth}
                        onChange={(e) => setFormData({ ...formData, travelMonth: e.target.value })}
                        placeholder="e.g. October 2026"
                        className="w-full px-3 py-2 text-sm bg-[#fbf9f5] border border-[#d1cbc2] rounded-sm focus:border-[#1e3328] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono uppercase text-[#4d5c53] mb-1">
                      Tell us about your fitness, past hikes, or questions
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g., We have moderate hiking experience up to 3,000m. Wondering about tea house conditions and acclimatization pace on the Everest trail..."
                      className="w-full px-3 py-2 text-sm bg-[#fbf9f5] border border-[#d1cbc2] rounded-sm focus:border-[#1e3328] focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#b85a3a] text-white text-sm font-semibold rounded-sm hover:bg-[#9e4a2d] transition-colors cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </button>
                    <p className="mt-2 text-[11px] text-[#82998c]">
                      No automated billing or commitments. Milestone 1 demonstration shell. Full database-backed booking flows launch in Milestone 2.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
