'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';

export default function AuthorizingPage() {
  const router = useRouter();
  const [status, setStatus] = useState(0); // 0: wait, 1: contacting, 2: approved

  const statusContent = [
    {
      icon: <Loader2 className="h-16 w-16 animate-spin text-primary" />,
      message: 'Please wait...',
      description: 'We are preparing your application profile.'
    },
    {
      icon: <Loader2 className="h-16 w-16 animate-spin text-primary" />,
      message: 'Contacting server 30%...',
      description: 'The system is evaluating your loan eligibility and limit.'
    },
    {
      icon: <CheckCircle className="h-16 w-16 text-green-500" />,
      message: 'Approved',
      description: 'Eligibility Successful. You qualify for a loan!'
    }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setStatus(1), 2000);
    const timer2 = setTimeout(() => setStatus(2), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-fit">
            {statusContent[status].icon}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-bold">{statusContent[status].message}</h2>
          <p className="text-muted-foreground">{statusContent[status].description}</p>
          {status === 2 && (
            <Button 
              onClick={() => router.push('/qualify')} 
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-4"
              size="lg"
            >
              Check Limit
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
