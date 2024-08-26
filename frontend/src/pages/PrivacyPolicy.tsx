import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="p-6 font-sans text-gray-700  max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-orange-600 mb-6">Privacy Policy</h1>
      <p className="mb-4">
        Welcome to <strong>Update Fashion</strong>. We respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website or make a purchase.
      </p>

      <h2 className="text-2xl font-semibold text-orange-500 mb-4">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-6">
        <li className="mb-2"><strong>Personal Information:</strong> When you make a purchase or sign up for our newsletter, we may collect your name, email address, phone number, and shipping address.</li>
        <li className="mb-2"><strong>Payment Information:</strong> We collect payment information, including credit/debit card details, when you make a purchase. This information is processed securely by our payment processors and is not stored on our servers.</li>
        <li className="mb-2"><strong>Browsing Information:</strong> We may collect information about your device, browser, IP address, and browsing activity on our website.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-orange-500 mb-4">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-6">
        <li className="mb-2"><strong>Order Processing:</strong> We use your personal and payment information to process and fulfill your orders.</li>
        <li className="mb-2"><strong>Communication:</strong> We may use your contact information to send you order updates, promotional offers, and newsletters. You can opt out of promotional communications at any time.</li>
        <li className="mb-2"><strong>Improving Our Services:</strong> We analyze browsing data to improve our website's functionality and customer experience.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-orange-500 mb-4">3. How We Share Your Information</h2>
      <ul className="list-disc list-inside mb-6">
        <li className="mb-2"><strong>Third-Party Service Providers:</strong> We may share your information with third-party service providers who assist us in processing payments, shipping orders, and providing customer support.</li>
        <li className="mb-2"><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to legal processes.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-orange-500 mb-4">4. Data Security</h2>
      <p className="mb-6">We take reasonable precautions to protect your information. We use secure servers and encryption to safeguard your personal and payment data.</p>

      <h2 className="text-2xl font-semibold text-orange-500 mb-4">5. Your Rights</h2>
      <ul className="list-disc list-inside mb-6">
        <li className="mb-2"><strong>Access and Correction:</strong> You have the right to access and correct your personal information. You can update your account details by logging into your account or contacting us.</li>
        <li className="mb-2"><strong>Data Deletion:</strong> You can request the deletion of your personal data by contacting us at <a href="mailto:mdmidan7@gmail.com" className="text-orange-600 hover:underline">mdmidan7@gmail.com</a>.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-orange-500 mb-4">6. Cookies</h2>
      <p className="mb-6">
        Our website uses cookies to enhance your browsing experience. Cookies are small files stored on your device that help us remember your preferences and track your activity on our site.
      </p>

      <h2 className="text-2xl font-semibold text-orange-500 mb-4">7. Third-Party Links</h2>
      <p className="mb-6">
        Our website may contain links to third-party websites. We are not responsible for the privacy practices of these sites, so we encourage you to review their privacy policies.
      </p>

      <h2 className="text-2xl font-semibold text-orange-500 mb-4">8. Changes to This Privacy Policy</h2>
      <p className="mb-6">
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with the effective date.
      </p>

      <h2 className="text-2xl font-semibold text-orange-500 mb-4">9. Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about this Privacy Policy, please contact us at:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li className="mb-2"><strong>Address:</strong> Barrackpore, Kolkata, India, 700120</li>
        <li className="mb-2"><strong>Mobile:</strong> +1 704-449-2333</li>
        <li className="mb-2"><strong>Email:</strong> <a href="mailto:mdmidan7@gmail.com" className="text-orange-600 hover:underline">mdmidan7@gmail.com</a></li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
