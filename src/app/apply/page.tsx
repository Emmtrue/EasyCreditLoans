'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Info } from 'lucide-react';

type User = {
  name: string;
  phone: string;
};

type LoanApplication = {
  savings: number;
  loanLimit: number;
  qualifiedLoanAmount: number;
};

export default function ApplyPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loanDetails, setLoanDetails] = useState<LoanApplication | null>(null);
  const [calculated, setCalculated] = useState({
    interest: 0,
    serviceFee: 0,
    disbursable: 0
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('mwananchi_user');
    const storedLoanApp = localStorage.getItem('loanApplication');

    if (storedUser) setUser(JSON.parse(storedUser));
    else router.push('/login');

    if (storedLoanApp) {
        const appData = JSON.parse(storedLoanApp);
        setLoanDetails(appData);

        const awardedLoan = appData.loanLimit;
        const interestRate = 0.08; // 8%
        const serviceFeeRate = 0.05; // 5% defined by developer

        const interest = awardedLoan * interestRate;
        const serviceFee = awardedLoan * serviceFeeRate;
        const disbursable = awardedLoan - interest - serviceFee;

        setCalculated({ interest, serviceFee, disbursable });
    } else {
      router.push('/qualify');
    }
  }, [router]);
  
  const handleApplyNow = () => {
    const loanHistory = JSON.parse(localStorage.getItem('loanHistory') || '[]');
    const newLoan = {
      id: new Date().getTime(),
      amount: loanDetails?.loanLimit,
      date: new Date().toISOString(),
      status: 'disbursed'
    };
    loanHistory.push(newLoan);
    localStorage.setItem('loanHistory', JSON.stringify(loanHistory));
    router.push('/success');
  }

  if (!user || !loanDetails) {
    return null; // Or a loading spinner
  }

  const termDays = loanDetails.loanLimit < 10000 ? 14 : (loanDetails.loanLimit < 20000 ? 21 : 30);
  const receiveAmount = calculated.disbursable;

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold">Loan Application</CardTitle>
          <CardDescription>Review your loan details before applying.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="bg-primary/10 border-primary/20">
            <Info className="h-4 w-4" />
            <AlertTitle className="font-semibold">Heads up!</AlertTitle>
            <AlertDescription>
              Early settlement may result in reduction of interest.
            </AlertDescription>
          </Alert>

          <div>
            <h3 className="text-lg font-semibold mb-2">Loan Summary</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Loan Amount</p>
                <p className="font-bold text-lg">Ksh {loanDetails.loanLimit.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Term</p>
                <p className="font-bold text-lg">{termDays} days</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Receive Amount</p>
                <p className="font-bold text-lg text-primary">Ksh {receiveAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              </div>
            </div>
          </div>
          
          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">Detailed Breakdown</h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Awarded Loan Amount:</span> <span className="font-medium">Ksh {loanDetails.loanLimit.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Service Fee:</span> <span className="font-medium">- Ksh {calculated.serviceFee.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></div>
                <div className="flex justify-between"><span>Interest (8%):</span> <span className="font-medium">- Ksh {calculated.interest.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></div>
                <Separator className="my-2"/>
                <div className="flex justify-between text-base"><strong>Disburseable Amount to Mpesa:</strong> <strong className="text-primary">Ksh {calculated.disbursable.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong></div>
            </div>
          </div>

          <Separator />
          
          <div>
            <h3 className="text-lg font-semibold mb-2">M-Pesa Account</h3>
            <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between"><span>M-pesa Number:</span> <span className="font-medium">{user.phone}</span></div>
                <div className="flex justify-between"><span>Account Name:</span> <span className="font-medium">{user.name}</span></div>
            </div>
          </div>

        </CardContent>
        <CardFooter>
          <Button onClick={handleApplyNow} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">Apply Now</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
