// Components
import { AllCodes } from "@/components/all-codes";
import { Spinner } from "@/components/spinner";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="min-h-screen bg-background">
      <header>
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            HTTP Status Codes Hub
          </h1>
          <p className="text-base text-muted-foreground">
            Comprehensive reference guide for all HTTP status codes
          </p>
        </div>
      </header>

      <section className="py-16">
        <Suspense
          fallback={
            <div className="min-h-[50lvh] flex justify-center items-center">
              <Spinner />
            </div>
          }>
          <AllCodes />
        </Suspense>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 text-center text-sm text-muted-foreground">
          <p>Your quick reference for HTTP status codes</p>
        </div>
      </footer>
    </main>
  );
}
