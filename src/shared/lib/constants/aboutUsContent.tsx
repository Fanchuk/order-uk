import Link from 'next/link'

export const FAQ_DATA = [
    {
        question: 'What payment methods are accepted?',
        answer: `Order.UK accepts a wide range of payment methods:
 
💳 **Cards:** Visa, Mastercard, American Express
📱 **Digital wallets:** Apple Pay, Google Pay, PayPal
🎁 **Vouchers:** Order.UK gift cards and promo codes
 
All transactions are encrypted with 256-bit SSL. We never store full card details — payments are processed securely through Stripe.
 
You can save multiple payment methods in your account for faster checkout.`,
    },
    {
        question: 'Can I track my order in real-time?',
        answer: `Yes! Order.UK offers full real-time order tracking.
 
🗺️ **How it works:**
1. Once your order is confirmed, go to "Track Order" in the header
2. Enter your order ID (found in your confirmation email)
3. See live status updates:
   • ✅ Confirmed → 🍳 Preparing → 📦 Ready → 🛵 On the Way → 🎉 Delivered
 
**Notifications:** Enable browser notifications or the app to get push alerts at each stage.
 
**Average delivery times:**
• McDonald's London: 20-30 min
• KFC West London: 25-35 min
• Papa Johns: 30-40 min`,
    },
    {
        question: 'Are there any special discounts or promotions available?',
        answer: `Order.UK always has great deals running!
 
🎊 **Current offers:**
• **ORDER5** — 5% off your first order (minimum £15)
• **MINUS20** — £2.00 off orders over £20
• **FREEDEL** — Free delivery on orders over £15
 
🔔 **How to find deals:**
• Check the "Special Offers" page
• Subscribe to our newsletter for exclusive codes
• Follow us on Instagram @order.uk for flash deals
• Enable notifications for time-limited offers
 
💡 **Tip:** New deals are added every Monday and Thursday!`,
    },
    {
        question: 'Is Order.UK available in my area?',
        answer: `Order.UK currently operates across London with plans to expand!
 
📍 **Current coverage:**
• Central London (all zones)
• East London — Canary Wharf, Stratford, Hackney
• West London — Hammersmith, Shepherd's Bush, Ealing
• South London — Brixton, Clapham, Greenwich
• North London — Camden, Islington, Finsbury Park
 
🚀 **Coming soon:**
• Manchester (Q2 2024)
• Birmingham (Q3 2024)
• Leeds (Q4 2024)
 
Enter your postcode on the homepage to check exact availability. If we're not in your area yet, sign up to be notified when we launch near you!`,
    },
]

export const TAB_CONTENT: Record<string, React.ReactNode> = {
    'Frequent Questions': null, // Рендериться окремо через FAQ_DATA
    'Who we are?': (
        <div className="flex flex-col gap-5">
            <div className="rounded-2xl bg-gradient-to-br from-[#03081f] to-[#1a2040] p-6 text-white">
                <h3 className="font-bold text-[20px] mb-2">🚀 Our Mission</h3>
                <p className="text-gray-300 text-[14px] leading-relaxed">
                    Order.UK was founded in 2020 to connect food lovers with the best local restaurants across the UK. We believe great food should be accessible to everyone — fast, fresh, and fairly
                    priced.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {[
                    { title: '🌍 Our Reach', text: 'Operating in 6 London areas with expansion across UK cities planned for 2024.' },
                    { title: '🤝 Partners', text: '690+ restaurant partners ranging from local independents to national chains.' },
                    { title: '🛵 Delivery', text: '546+ dedicated couriers ensuring food arrives hot and on time.' },
                    { title: '⭐ Reviews', text: 'Rated 4.8/5 by over 17,000 verified customers across our platform.' },
                ].map((item) => (
                    <div key={item.title} className="bg-[#f8f9fa] rounded-xl p-4 border border-gray-100">
                        <h4 className="font-bold text-[14px] text-[#03081f] mb-1">{item.title}</h4>
                        <p className="text-[13px] text-gray-500 leading-relaxed">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    ),
    'Partner Program': (
        <div className="flex flex-col gap-5">
            <div className="bg-[#fc8a06]/10 rounded-2xl p-6 border border-[#fc8a06]/20">
                <h3 className="font-bold text-[20px] text-[#03081f] mb-1">🍽️ Restaurant Partners</h3>
                <p className="text-[14px] text-gray-600 mb-4">Join 690+ restaurants already growing with Order.UK</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {['Low 10% commission', '100K+ customer reach', 'Real-time dashboard', 'Marketing support', 'Weekly payouts', 'Dedicated account manager'].map((benefit) => (
                        <div key={benefit} className="flex items-center gap-2 text-[13px] text-[#03081f] font-medium">
                            <span className="text-[#028643]">✅</span> {benefit}
                        </div>
                    ))}
                </div>
                <Link href="/partner" className="inline-flex items-center gap-2 h-[44px] px-6 bg-[#fc8a06] text-white rounded-full font-bold text-[14px] hover:bg-orange-600 transition-colors">
                    Apply Now →
                </Link>
            </div>
            <div className="bg-[#028643]/10 rounded-2xl p-6 border border-[#028643]/20">
                <h3 className="font-bold text-[16px] text-[#03081f] mb-1">🛵 Courier Partners</h3>
                <p className="text-[14px] text-gray-600 mb-3">Earn £12+/hour on your own schedule</p>
                <Link
                    href="#"
                    onClick={() => (toast ? null : null)}
                    className="inline-flex items-center gap-2 h-[44px] px-6 bg-[#028643] text-white rounded-full font-bold text-[14px] hover:bg-green-700 transition-colors">
                    Sign Up to Deliver →
                </Link>
            </div>
        </div>
    ),
    'Help & Support': (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-3">
                {[
                    { icon: '📧', title: 'Email Support', desc: 'support@order.uk', detail: 'Response within 2 hours' },
                    { icon: '📞', title: 'Phone Support', desc: '0800 ORDER UK', detail: 'Mon-Sun, 8am–11pm' },
                    { icon: '💬', title: 'Live Chat', desc: 'Chat with us now', detail: 'Average wait: < 5 min' },
                    { icon: '🐦', title: 'Twitter/X', desc: '@OrderUKSupport', detail: 'Quick responses on DMs' },
                ].map((channel) => (
                    <div key={channel.title} className="flex items-center gap-4 p-4 bg-[#f8f9fa] rounded-xl border border-gray-100 hover:border-[#fc8a06]/30 transition-colors cursor-pointer group">
                        <span className="text-2xl">{channel.icon}</span>
                        <div className="flex-1">
                            <div className="font-bold text-[14px] text-[#03081f]">{channel.title}</div>
                            <div className="text-[13px] text-[#fc8a06] font-medium">{channel.desc}</div>
                        </div>
                        <span className="text-[12px] text-gray-400 text-right">{channel.detail}</span>
                    </div>
                ))}
            </div>
        </div>
    ),
}
