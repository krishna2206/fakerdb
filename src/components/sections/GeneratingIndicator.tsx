import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface GeneratingIndicatorProps {
  message?: string;
}

export default function GeneratingIndicator({ message = "Generating SQL" }: GeneratingIndicatorProps) {
  return (
    <div className="py-12 flex flex-col items-center justify-center gap-4 w-full">
      <div className="flex items-center justify-center w-full">
        <DotLottieReact
          src="/animations/sparkles.lottie"
          loop
          autoplay
          className="h-34 w-34 mx-auto"
        />
      </div>
      <p className="text-lg font-medium text-muted-foreground">{message}</p>
      <p className="text-sm text-muted-foreground">This may take a moment.</p>
    </div>
  );
}