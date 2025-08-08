# **App Name**: Mkopo Leo

## Core Features:

- Landing Page: Display a landing page with loan eligibility form, trust elements, and legal disclaimers.
- User Authentication: Implement login and signup flows, allowing users to create accounts or log in.
- Authorization Simulation: Show authorization sequence with loading animations and messages to simulate eligibility check.
- Loan Qualification: Provide options for selecting a savings plan to influence the loan limit and enable dynamic loan limit calculation. Note which savings plans can only be applied if a user has pre-existing loan history. A LLM will be used as a tool to decide if a particular savings plan option is avaiable to the user based on the amount of positive re-payment history recorded in the app. If the re-payment history recorded by the app indicates negative behaviour, it should not show these options.
- Loan Details Display: Generate the financial calculations (including service fee calculation, which is not included in the given instructions, but necessary for a workable proposal).
- Data Persistence: Store user data and loan application details (in local storage, since no database has been requested).
- PWA enhancements: Prompt the user to save to home screen as PWA. Verify responsive across different viewport sizes

## Style Guidelines:

- Primary color: Deep blue (#2962FF) to convey trust and professionalism.
- Background color: Light blue (#E0F7FA) for a clean and airy feel.
- Accent color: Bright green (#64DD17) for primary CTAs, providing clear visual calls to action.
- Body and headline font: 'Inter', sans-serif, provides a clean and modern aesthetic.
- Use minimalist, professional icons throughout the app.
- Use a consistent card-based layout to present information in a clear and structured manner.