'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

type User = {
  name: string;
  phone: string;
};

type SavingsPlan = {
  savings: number;
  loanLimit: number;
  existingOnly?: boolean;
};

export default function QualifyPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isExistingMember, setIsExistingMember] = useState(false);
  const [qualifiedLoanAmount, setQualifiedLoanAmount] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<SavingsPlan | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('mwananchi_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/login');
    }

    const loanHistory = JSON.parse(localStorage.getItem('loanHistory') || '[]');
    setIsExistingMember(loanHistory.length > 0);
    
    // Generate random amount only once on mount
    const randomAmount = Math.floor(Math.random() * (48000) + 2000);
    setQualifiedLoanAmount(randomAmount);
  }, [router]);

  const savingsPlans: SavingsPlan[] = [
    { savings: 120, loanLimit: Math.min(5000, qualifiedLoanAmount) },
    { savings: 170, loanLimit: Math.min(8500, qualifiedLoanAmount) },
    { savings: 350, loanLimit: Math.min(12500, qualifiedLoanAmount) },
    { savings: 650, loanLimit: Math.min(18000, qualifiedLoanAmount) },
    { savings: 1550, loanLimit: Math.min(23485, qualifiedLoanAmount), existingOnly: true },
  ];

  const handleSelectPlan = (plan: SavingsPlan) => {
    if (plan.existingOnly && !isExistingMember) {
      toast({
        variant: 'destructive',
        title: 'Option Restricted',
        description: 'This savings plan is available for existing members only.',
      });
      return;
    }
    setSelectedPlan(plan);
  };
  
  const handleProceed = () => {
    if (!selectedPlan) {
      toast({ variant: 'destructive', title: 'Selection Required', description: 'Please choose a savings plan to continue.' });
      return;
    }
    localStorage.setItem('loanApplication', JSON.stringify({ qualifiedLoanAmount, ...selectedPlan }));
  };

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold">Loan Qualification</CardTitle>
          <CardDescription className="text-base">
            Dear {user.name}, you qualify for a loan of up to <span className="font-bold text-primary">Ksh {qualifiedLoanAmount.toLocaleString()}</span>.
            Choose your savings plan to continue to loan application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup onValueChange={(value) => handleSelectPlan(savingsPlans[parseInt(value)])} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savingsPlans.map((plan, index) => {
              const isDisabled = plan.existingOnly && !isExistingMember;
              return (
                <Label key={index} htmlFor={`plan-${index}`} className={cn(
                  "border-2 rounded-lg p-4 transition-all hover:border-primary cursor-pointer",
                  selectedPlan?.savings === plan.savings && "border-primary bg-primary/5",
                  isDisabled && "cursor-not-allowed bg-muted/50 opacity-60 hover:border-border"
                )}>
                  <div className="flex items-start space-x-4">
                    <RadioGroupItem value={index.toString()} id={`plan-${index}`} disabled={isDisabled} />
                    <div className="flex-1">
                      <p className="font-bold">Savings Plan: Ksh {plan.savings}</p>
                      <p className="text-muted-foreground">Loan Limit: Ksh {plan.loanLimit.toLocaleString()}</p>
                      {isDisabled && <p className="text-xs text-destructive font-semibold mt-1">Only existing members allowed</p>}
                    </div>
                  </div>
                </Label>
              );
            })}
          </RadioGroup>
          {selectedPlan && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-lg font-semibold">Your selected loan limit: <span className="text-primary">Ksh {selectedPlan.loanLimit.toLocaleString()}</span></p>
            </div>
          )}
          <div className="mt-8 flex justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  onClick={handleProceed} 
                  disabled={!selectedPlan} 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  size="lg"
                >
                  Proceed
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Savings Plan</AlertDialogTitle>
                  <AlertDialogDescription>
                    To unlock your loan limit of Ksh {selectedPlan?.loanLimit.toLocaleString()}, please pay the savings plan amount of <span className="font-bold">Ksh {selectedPlan?.savings}</span> to:
                    <br/><br/>
                    <span className="font-bold text-lg">Paybill Number: 9876543</span>
                    <br/>
                    <span className="font-bold text-lg">Account Number: {user.phone}</span>
                    <br/><br/>
                    Click 'Paid, Continue' after making the payment.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => router.push('/apply')}>Paid, Continue</AlertDialogAction>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
