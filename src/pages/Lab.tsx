import Navbar from '@/components/layout/Navbar';
import AuthModal from '@/components/modals/AuthModal';
import SettingsModal from '@/components/modals/SettingsModal';
import { Container } from '@/components/ui/container';
import { FadeIn } from '@/components/ui/fade-in';
import { useState } from 'react';

const Lab = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const handleSignIn = () => {
    setAuthMode('signin');
    setIsAuthOpen(true);
  };

  const handleSignUp = () => {
    setAuthMode('signup');
    setIsAuthOpen(true);
  };

  return (
    <>
      <Navbar
        onSignInClick={handleSignIn}
        onSignUpClick={handleSignUp}
        onSettingsClick={() => setIsSettingsOpen(true)}
      />

      <FadeIn delay={100} duration={400} direction="up">
        <Container className="py-8">
          <div className="flex flex-col gap-8 max-w-3xl mx-auto">
            <div>
              <h1 className="text-3xl font-bold mb-2">Lab</h1>
              <p className="text-muted-foreground mb-6">A page for quick feature experiments.</p>
            </div>

          </div>
        </Container>
      </FadeIn>

      <AuthModal open={isAuthOpen} onOpenChange={setIsAuthOpen} initialMode={authMode} />
      <SettingsModal open={isSettingsOpen} onOpenChange={setIsSettingsOpen} onSettingsSaved={() => {}} />
    </>
  );
};

export default Lab;