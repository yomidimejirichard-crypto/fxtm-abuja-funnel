// Mirror of COPY.md. Every user facing word lives here. Change both files together.

export const EXPERIENCE_OPTIONS = [
  'Beginner (0 to 3 years)',
  'Experienced (3 to 5 years)',
  'Expert (5+ years)',
] as const

export const content = {
  meta: {
    title: 'Traders Hangout with FXTM | Abuja, 28 November 2026',
    registeredTitle: 'You are registered | Traders Hangout with FXTM',
  },

  hero: {
    eyebrow: 'FXTM TRADERS HANGOUT | ABUJA',
    h1: 'Traders Hangout with FXTM',
    subheadline:
      'A full day of live trading, practical market education and real networking with traders across Abuja. Whether you are just starting or you trade every day, there is a seat for you.',
    chips: ['Saturday, 28 November 2026', '10:00 AM', 'NAF Conference Centre, Abuja'],
  },

  form: {
    heading: 'Reserve your seat',
    subtext: 'It takes less than a minute.',
    fullName: { label: 'Full name', placeholder: 'e.g. Chinedu Okafor' },
    email: { label: 'Email address', placeholder: 'you@example.com' },
    phone: { label: 'Phone number', placeholder: '0803 000 0000' },
    experience: { label: 'Trading experience', placeholder: 'Select your level' },
    terms:
      'I agree that my details will only be used to contact me and send me information about this event. They will not be used for any other purpose.',
    privacyLink: 'Read our privacy policy',
    button: 'Register Now',
    buttonBusy: 'Submitting...',
    belowButton: 'Your event details will be sent to the email and phone number you provide.',
    errors: {
      fullName: 'Please enter your full name.',
      email: 'Please enter a valid email address.',
      phone: 'Please enter a valid Nigerian phone number.',
      experience: 'Please select your trading experience.',
      terms: 'Please accept the terms to continue.',
    },
  },

  details: [
    { label: 'Date', value: 'Saturday, 28 November 2026' },
    { label: 'Time', value: '10:00 AM' },
    { label: 'Venue', value: 'NAF Conference Centre, Ahmadu Bello Way, Abuja' },
    { label: "Who it's for", value: 'Beginners and professionals' },
  ],

  expect: {
    eyebrow: 'WHAT TO EXPECT',
    heading: 'What you will get on the day',
    cards: [
      {
        title: 'Community and networking',
        text: 'Meet traders across Abuja, compare notes and build connections that last beyond the event.',
      },
      {
        title: 'Live trading and exposition',
        text: 'Watch the market traded in real time and see how each decision is made, step by step.',
      },
      {
        title: 'Global stocks at your fingertips',
        text: 'Learn how to access leading global stocks and indices directly from your phone or desktop.',
      },
      {
        title: 'Advanced charting and fast execution',
        text: 'See the charting tools and execution speed that help you act on opportunities without delay.',
      },
      {
        title: 'More ways to engage the global market',
        text: 'Discover practical ways to take part in the global market that many traders never get shown.',
      },
    ],
  },

  beyond: {
    eyebrow: 'TO CAP IT UP',
    heading: 'Beyond the charts',
    intro: 'We close the day with the fundamentals that separate consistent traders from everyone else.',
    items: [
      { title: 'Understanding the market', text: 'Read what is really driving price, not just what the chart shows.' },
      { title: 'Risk management', text: 'Protect your capital first, so you stay in the game long enough to grow.' },
      { title: 'Discipline', text: 'Build the habits that keep you following your plan when emotions run high.' },
      { title: 'Adaptation', text: 'Adjust your approach as market conditions change, instead of forcing old setups.' },
    ],
  },

  audience: {
    eyebrow: 'WHO SHOULD ATTEND',
    heading: 'Built for every level',
    cards: [
      {
        title: 'New to trading',
        text: 'Get a clear foundation, ask your questions in person and learn from traders who have been where you are now.',
      },
      {
        title: 'Experienced traders',
        text: 'Sharpen your edge, test your thinking against other professionals and see tools that can improve your execution.',
      },
    ],
  },

  prizes: {
    heading: 'Prizes and giveaways',
    text: 'There are exciting prizes and giveaways to be won on the day. You have to be in the room to win.',
  },

  finalPush: {
    heading: 'Saturday, 28 November. Abuja. 10:00 AM.',
    text: 'Register now and your event details will be sent straight to you.',
    button: 'Reserve My Seat',
  },

  footer: {
    line1: 'Traders Hangout with FXTM, Abuja',
    line2:
      'Risk warning: Trading leveraged products carries a high level of risk and may not be suitable for all investors. You can lose some or all of your invested capital.',
    privacyLink: 'Privacy Policy',
  },

  confirmation: {
    eyebrow: 'REGISTRATION CONFIRMED',
    heading: (firstName: string) => `You are registered, ${firstName}.`,
    text: 'Your seat for the Traders Hangout with FXTM on Saturday, 28 November 2026 is reserved. One last step: open our Telegram support handle to receive your event details, venue directions and reminders.',
    button: 'Open Telegram',
    countdown: (n: number) => `Taking you to Telegram in ${n}...`,
    fallback: 'If nothing happens, tap the button above.',
  },
} as const

// Summary card on the confirmation view reuses the detail strip values.
export const summaryDetails = content.details.slice(0, 3)
