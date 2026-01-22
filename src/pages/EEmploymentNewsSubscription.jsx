
import RegisterPaySubscribeFlow from "../components/RegisterPaySubscribeFlow";

export default function EEmploymentNewsSubscription() {
  return (
    <section className="w-full min-h-[80vh] bg-primary-50 py-8 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-600 mb-4 text-center">How To Subscribe: e-Employment News</h1>
        <p className="text-base md:text-lg text-gray-600 mb-4 text-justify">
          Employment News is available in e-version as well as print version. You can subscribe to any of them or both.
        </p>
        <RegisterPaySubscribeFlow />
        <div className="overflow-x-auto mb-8">
          <table className="min-w-[280px] w-full border border-primary-200 rounded-lg shadow text-center bg-white">
            <caption className="sr-only">e-Employment News Subscription Plans and Prices</caption>
            <thead>
              <tr className="bg-primary-700 text-white">
                <th scope="col" className="py-2 px-2 sm:px-4 text-sm sm:text-base font-semibold">Subscription Plan</th>
                <th scope="col" className="py-2 px-2 sm:px-4 text-sm sm:text-base font-semibold">e-Version Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-primary-50">
                <th scope="row" className="py-2 px-2 sm:px-4 text-sm sm:text-base font-normal">6 Months</th>
                <td className="py-2 px-2 sm:px-4 text-sm sm:text-base">Rs 200/-</td>
              </tr>
              <tr className="odd:bg-primary-50">
                <th scope="row" className="py-2 px-2 sm:px-4 text-sm sm:text-base font-normal">1 Year</th>
                <td className="py-2 px-2 sm:px-4 text-sm sm:text-base">Rs 400/-</td>
              </tr>
              <tr className="odd:bg-primary-50">
                <th scope="row" className="py-2 px-2 sm:px-4 text-sm sm:text-base font-normal">2 Year</th>
                <td className="py-2 px-2 sm:px-4 text-sm sm:text-base">Rs 750/-</td>
              </tr>
              <tr className="odd:bg-primary-50">
                <th scope="row" className="py-2 px-2 sm:px-4 text-sm sm:text-base font-normal">3 Year</th>
                <td className="py-2 px-2 sm:px-4 text-sm sm:text-base">Rs 1050/-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-primary-700 mb-2 mt-6 text-left">e-Employment News</h2>
        <ol className="list-decimal list-inside text-gray-800 mb-4 ml-2 sm:ml-6 text-justify space-y-2 text-sm sm:text-base">
          <li>
            <span className="font-medium">How to register for subscribing to e- Employment News?</span>
            <ol className="list-[lower-alpha] list-inside ml-2 sm:ml-6 mt-1 space-y-1 text-sm sm:text-base">
              <li>Visit <a href="http://www.employmentnews.gov.in" className="text-primary-600 underline break-all" target="_blank" rel="noopener noreferrer">www.employmentnews.gov.in</a> and click on e-Subscription tab or <a href="http://www.eneversion.nic.in/membership/login" className="text-primary-600 underline break-all" target="_blank" rel="noopener noreferrer">this link</a>.</li>
              <li>If visiting this portal for the first time, create an account by signing up. If already registered, enter your details & submit.</li>
              <li>A dashboard will appear. Click on e-version tab (available in English & Hindi).</li>
              <li>Choose the desired subscription package: 6 Months, 1 year, 2 years, or 3 years.</li>
              <li>Choose your payment mode: online or offline.</li>
              <li>You will be directed to a secured e-payment gateway (Bharatkosh portal). Confirm your credentials.</li>
              <li>For online payment, net banking, credit card, and debit card options are available.</li>
              <li>Proceed for payment by providing the required information.</li>
              <li>Note or print the transaction details for future reference.</li>
              <li>You will receive an activation mail within 48 hrs. For issues, email <a href="mailto:engrievance@gmail.com" className="text-primary-600 underline break-all">engrievance@gmail.com</a>.</li>
            </ol>
          </li>
          <li>
            <span className="font-medium">What are the advantages/benefits of Employment News e-Paper?</span>
            <div className="ml-2 sm:ml-4 text-sm sm:text-base">It offers the exact print edition in digital format, access to all editions on a single site, and features like archives, read mode, and zooming.</div>
          </li>
          <li>
            <span className="font-medium">What special features does Employment News e-Paper provide?</span>
            <ul className="list-disc ml-2 sm:ml-6 mt-1 text-sm sm:text-base">
              <li>Zoom In/Out for convenience</li>
              <li>Keyword/article search by job type, nature, location, age-group, etc.</li>
            </ul>
          </li>
          <li>
            <span className="font-medium">How to search for articles on the portal?</span>
            <div className="ml-2 sm:ml-4 text-sm sm:text-base">Use the "Search" link in the navigation bar. Enter your keyword, select articles/ads, and click Search. Use tag search for previous issues.</div>
          </li>
          <li>
            <span className="font-medium">How to read if the article is too small or not visible?</span>
            <div className="ml-2 sm:ml-4 text-sm sm:text-base">Click the zoom in/out option or use Read View for a realistic newspaper layout.</div>
          </li>
          <li>
            <span className="font-medium">How are sections/content organized?</span>
            <div className="ml-2 sm:ml-4 text-sm sm:text-base">The Content Panel shows editions by year and date (top left).</div>
          </li>
          <li>
            <span className="font-medium">Can I access earlier issues?</span>
            <div className="ml-2 sm:ml-4 text-sm sm:text-base">Yes, from the date your subscription is activated.</div>
          </li>
          <li>
            <span className="font-medium">Is Employment News e-Paper paid?</span>
            <div className="ml-2 sm:ml-4 text-sm sm:text-base">Yes, it is available only on paid subscription.</div>
          </li>
          <li>
            <span className="font-medium">What is the subscription cost?</span>
            <ul className="list-disc ml-2 sm:ml-6 mt-1 text-sm sm:text-base">
              <li>Print: Rs. 265 (6 months), Rs. 530 (1 year), Rs. 1000 (2 years), Rs. 1400 (3 years)</li>
              <li>e-Version: Rs. 200 (6 months), Rs. 400 (1 year), Rs. 750 (2 years), Rs. 1050 (3 years)</li>
            </ul>
          </li>
          <li>
            <span className="font-medium">What are the accepted payment modes?</span>
            <div className="ml-2 sm:ml-4 text-sm sm:text-base">Online (net banking, credit/debit card, Bharatkosh gateway) and offline (Cheque, Demand Draft, IMO).</div>
          </li>
          <li>
            <span className="font-medium">How safe is the payment gateway?</span>
            <div className="ml-2 sm:ml-4 text-sm sm:text-base">Secured by Thawte SSL. Click the yellow lock in your browser to verify.</div>
          </li>
          <li>
            <span className="font-medium">What if my card is declined?</span>
            <div className="ml-2 sm:ml-4 text-sm sm:text-base">Try another card or contact your bank's support.</div>
          </li>
          <li>
            <span className="font-medium">What if I do not receive the activation email?</span>
            <div className="ml-2 sm:ml-4 text-sm sm:text-base">Wait 48 hours, then email <a href="mailto:engrievance@gmail.com" className="text-primary-600 underline break-all">engrievance@gmail.com</a> with your paper ID and transaction number.</div>
          </li>
          <li>
            <span className="font-medium">What if the activation link is not visible?</span>
            <div className="ml-2 sm:ml-4 text-sm sm:text-base">View the email in HTML mode.</div>
          </li>
          <li>
            <span className="font-medium">How to view the invoice for my subscription?</span>
            <div className="ml-2 sm:ml-4 text-sm sm:text-base">Login to <a href="https://en.eversion.in/" className="text-primary-600 underline break-all" target="_blank" rel="noopener noreferrer">en.eversion.in</a> and click 'My Account' to view your transaction history.</div>
          </li>
          <li>
            <span className="font-medium">Can I cancel my subscription and get a refund?</span>
            <div className="ml-2 sm:ml-4 text-sm sm:text-base">No, subscription cannot be cancelled mid-way. No refund.</div>
          </li>
          <li>
            <span className="font-medium">How to renew my subscription?</span>
            <div className="ml-2 sm:ml-4 text-sm sm:text-base">Click ‘Add Subscription’ and make payment again to renew.</div>
          </li>
          <li>
            <span className="font-medium">What if I forget my password or e-paper ID?</span>
            <div className="ml-2 sm:ml-4 text-sm sm:text-base">Passwords are case-sensitive. If needed, reset at <a href="http://www.eneversion.nic.in/membership/login" className="text-primary-600 underline break-all" target="_blank" rel="noopener noreferrer">this link</a>. Enter your e-paper ID or email, and follow the instructions in the email you receive.</div>
          </li>
        </ol>
      </div>
    </section>
  );
}
