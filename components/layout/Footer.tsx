export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Footer Main */}
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              NexusAI
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-600">
              AI-powered tools to help you create, automate,
              and grow your business.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Product
            </h3>

            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <a
                href="#features"
                className="block transition hover:text-black"
              >
                Features
              </a>

              <a
                href="#pricing"
                className="block transition hover:text-black"
              >
                Pricing
              </a>

              <a
                href="#faq"
                className="block transition hover:text-black"
              >
                FAQ
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Company
            </h3>

            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <a
                href="#"
                className="block transition hover:text-black"
              >
                About
              </a>

              <a
                href="#"
                className="block transition hover:text-black"
              >
                Contact
              </a>

              <a
                href="#"
                className="block transition hover:text-black"
              >
                Blog
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Legal
            </h3>

            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <a
                href="#"
                className="block transition hover:text-black"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="block transition hover:text-black"
              >
                Terms & Conditions
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-12 flex flex-col gap-3 border-t border-gray-200 pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">

          <p>
            © 2026 NexusAI. All rights reserved.
          </p>

          <p>
            Built with AI
          </p>

        </div>

      </div>
    </footer>
  );
}