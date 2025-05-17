import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface GeneratingIndicatorProps {
  message?: string;
}

export default function GeneratingIndicator({ message = "Generating SQL" }: GeneratingIndicatorProps) {
  return (
    <div className="py-8 flex flex-col items-center justify-center gap-4 w-full">
      <div className="flex items-center justify-center w-full">
        <DotLottieReact
          src="/animations/sparkles.lottie"
          loop
          autoplay
          className="h-34 w-34 mx-auto"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{message}</h3>
      <p className="text-sm text-muted-foreground">This may take a moment.</p>
    </div>
  );
}