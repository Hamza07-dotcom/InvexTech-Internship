// src/components/home/Footer.jsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#F4F8FD] py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-4 items-start">
          
          {/* Logo Section */}
          <div>
            <img src="/images/logo.png" alt="Carvista" className="h-10" />
            <p className="mt-3 text-sm text-gray-600">
              Copyright © {new Date().getFullYear()} Carvista all rights reserved.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold">Services</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><Link href="/products">Buy car</Link></li>
              <li><Link href="/trade-in">Trade-in cars</Link></li>
              <li><Link href="/promo">Promo vouchers</Link></li>
              <li><Link href="/compare">Compare cars</Link></li>
            </ul>
          </div>

          {/* Others */}
          <div>
            <h4 className="font-semibold">Others</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><Link href="/contact">Contact us</Link></li>
              <li><Link href="/privacy">Privacy policy</Link></li>
              <li><Link href="/terms">Terms & condition</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold">Follow us</h4>
            <div className="mt-3 flex gap-3">
              <a 
                href="https://twitter.com/yourprofile" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img 
                  src="/images/footer/twitter.png" 
                  alt="Twitter" 
                  className="h-8 w-8 rounded-full border-white border-[0.5px]" 
                />
              </a>
              <a 
                href="https://facebook.com/yourprofile" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img 
                  src="/images/footer/facebook.png" 
                  alt="Facebook" 
                  className="h-8 w-8 rounded-full border-white border-[0.5px]" 
                />
              </a>
              <a 
                href="https://instagram.com/yourprofile" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img 
                  src="/images/footer/instagram.png" 
                  alt="Instagram" 
                  className="h-8 w-8 rounded-full border-white border-[0.5px]" 
                />
              </a>
              <a 
                href="https://youtube.com/yourchannel" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img 
                  src="/images/footer/youtube.png" 
                  alt="YouTube" 
                  className="h-8 w-8 rounded-full border-white border-[0.5px]" 
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
