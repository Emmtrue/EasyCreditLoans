'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const router = useRouter();
  const [loanDetails, setLoanDetails] = useState({ amount: 0, term: 14 });

  useEffect(() => {
    const loanApp = JSON.parse(localStorage.getItem('loanApplication') || '{}');
    if (loanApp.loanLimit) {
      setLoanDetails({
        amount: loanApp.loanLimit,
        term: loanApp.loanLimit < 10000 ? 14 : (loanApp.loanLimit < 20000 ? 21 : 30),
      });
    }
  }, []);
  
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + loanDetails.term);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto bg-green-100 rounded-full p-4 w-fit">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold mt-4">Loan Disbursed!</CardTitle>
          <CardDescription className="text-base">
            Your loan has been successfully sent to your M-Pesa account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-left bg-muted p-4 rounded-lg space-y-2">
            <p className="flex justify-between"><span>Loan Amount:</span> <strong className="text-primary">Ksh {loanDetails.amount.toLocaleString()}</strong></p>
            <p className="flex justify-between"><span>Repayment Date:</span> <strong>{dueDate.toLocaleDateString('en-GB')}</strong></p>
          </div>
          <div className="text-left">
            <h3 className="font-semibold">How to Repay:</h3>
            <ol className="list-decimal list-inside text-muted-foreground text-sm space-y-1 mt-1">
              <li>Go to your M-Pesa Menu</li>
              <li>Select Lipa na M-Pesa</li>
              <li>Select Pay Bill</li>
              <li>Enter Business No. <strong className="text-foreground">9876543</strong></li>
              <li>Enter your phone number as Account No.</li>
              <li>Enter the amount to repay</li>
              <li>Enter your M-Pesa PIN and send</li>
            </ol>
          </div>
          <Button onClick={() => router.push('/')} className="w-full" size="lg">Back to Home</Button>
        </CardContent>
      </Card>
    </div>
  );
}
