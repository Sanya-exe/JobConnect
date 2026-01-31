import React from 'react';
import { Briefcase } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 auth-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold text-foreground">JobConnect</span>
          </div>
          
          <h1 className="text-4xl xl:text-5xl font-bold text-foreground leading-tight mb-6">
            Find your next
            <br />
            <span className="text-primary">career opportunity</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Connect with top employers and discover roles that match your skills. 
            Your next career move starts here.
          </p>

          <div className="mt-12 flex items-center gap-8">
            <div>
              <div className="text-3xl font-bold text-foreground">10K+</div>
              <div className="text-sm text-muted-foreground">Active Jobs</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <div className="text-3xl font-bold text-foreground">5K+</div>
              <div className="text-sm text-muted-foreground">Companies</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <div className="text-3xl font-bold text-foreground">50K+</div>
              <div className="text-sm text-muted-foreground">Job Seekers</div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full" />
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">JobConnect</span>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
