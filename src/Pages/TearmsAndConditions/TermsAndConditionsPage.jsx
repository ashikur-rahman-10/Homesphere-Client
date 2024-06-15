import React from "react";

const TermsAndConditionsPage = () => {
  // Scroll to top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  return (
    <div className="container max-w-6xl mx-auto px-4 py-16">
      <div className="bg-white  px-0 py-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-600">
          Terms and Conditions
        </h1>

        <div className="prose max-w-none text-gray-700">
          <p>
            Welcome to{" "}
            <span className="text-accent font-semibold">Homesphare</span>! These
            terms and conditions outline the rules and regulations for the use
            of Homesphare's Website, located at{" "}
            <a
              href="https://homesphere-0.web.app/"
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://homesphere-0.web.app/
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold mt-8">1. Introduction</h2>
          <p>
            By accessing this website, we assume you accept these terms and
            conditions. Do not continue to use Homesphare if you do not agree to
            take all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-xl font-semibold mt-8">
            2. Intellectual Property Rights
          </h2>
          <p>
            Other than the content you own, under these Terms, Homesphare and/or
            its licensors own all the intellectual property rights and materials
            contained in this Website.
          </p>

          <h2 className="text-xl font-semibold mt-8">3. Restrictions</h2>
          <ul className="list-disc pl-6 mt-2">
            <li>Publishing any Website material in any other media;</li>
            <li>
              Selling, sublicensing and/or otherwise commercializing any Website
              material;
            </li>
            <li>
              Using this Website in any way that is or may be damaging to this
              Website;
            </li>
            <li>
              Using this Website contrary to applicable laws and regulations, or
              in any way that may cause harm to the Website, or to any person or
              business entity;
            </li>
            <li>
              Engaging in any data mining, data harvesting, data extracting, or
              any other similar activity in relation to this Website;
            </li>
            <li>
              Using this Website to engage in any advertising or marketing.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8">4. Your Content</h2>
          <p>
            In these Website Standard Terms and Conditions, "Your Content" shall
            mean any audio, video text, images or other material you choose to
            display on this Website. By displaying Your Content, you grant
            Homesphare a non-exclusive, worldwide irrevocable, sub-licensable
            license to use, reproduce, adapt, publish, translate and distribute
            it in any and all media.
          </p>

          <h2 className="text-xl font-semibold mt-8">
            5. Limitation of Liability
          </h2>
          <p>
            In no event shall Homesphare, nor any of its officers, directors and
            employees, be held liable for anything arising out of or in any way
            connected with your use of this Website whether such liability is
            under contract. Homesphare, including its officers, directors and
            employees shall not be held liable for any indirect, consequential
            or special liability arising out of or in any way related to your
            use of this Website.
          </p>

          <h2 className="text-xl font-semibold mt-8">6. Indemnification</h2>
          <p>
            You hereby indemnify to the fullest extent Homesphare from and
            against any and/or all liabilities, costs, demands, causes of
            action, damages and expenses arising in any way related to your
            breach of any of the provisions of these Terms.
          </p>

          <h2 className="text-xl font-semibold mt-8">7. Severability</h2>
          <p>
            If any provision of these Terms is found to be invalid under any
            applicable law, such provisions shall be deleted without affecting
            the remaining provisions herein.
          </p>

          <h2 className="text-xl font-semibold mt-8">8. Variation of Terms</h2>
          <p>
            Homesphare is permitted to revise these Terms at any time as it sees
            fit, and by using this Website you are expected to review these
            Terms on a regular basis.
          </p>

          <h2 className="text-xl font-semibold mt-8">
            9. Governing Law & Jurisdiction
          </h2>
          <p>
            These Terms will be governed by and interpreted in accordance with
            the laws of [Your State/Country], and you submit to the
            non-exclusive jurisdiction of the state and federal courts located
            in [Your City, State] for the resolution of any disputes.
          </p>

          <h2 className="text-xl font-semibold mt-8">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us via
            email at{" "}
            <a
              href="mailto:info@homesphare.com"
              className="text-accent hover:underline"
            >
              info@homesphare.com
            </a>
            , or by using the contact information provided on our website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
