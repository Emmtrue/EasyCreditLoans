import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { EligibilityForm } from '@/components/eligibility-form';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <EligibilityForm />
      </main>
      <Footer />
    </div>
  );
}
