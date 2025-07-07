import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-gradient-to-br from-primary to-accent p-10 text-white lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center mr-3">
              <span className="text-sm font-bold">G</span>
            </div>
            GPAS
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                "Transform your project management with AI-powered agile
                workflows. Streamline sprints, track progress, and boost team
                productivity."
              </p>
              <footer className="text-sm opacity-80">GPAS Team</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
