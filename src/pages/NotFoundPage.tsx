import React from 'react';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-28 pb-20 bg-white text-center px-4">
      <div className="max-w-md space-y-6">
        <p className="font-mono text-5xl font-extrabold text-[#a67c42]">404</p>
        <h1 className="text-3xl font-bold text-[#0f172a] font-display">Page Not Found</h1>
        <p className="text-sm text-[#475569]">
          The financial advisory document or gold service you requested does not exist or has been relocated.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <Button href="/" variant="primary" size="md">
            Return to Home
          </Button>
          <Button href="/solutions" variant="outline" size="md">
            View Solutions
          </Button>
        </div>
      </div>
    </div>
  );
};
