import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff, Github, Loader2, LogIn, UserPlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMode?: 'signin' | 'signup';
}

// Define form types
type SignInFormValues = {
  email: string;
  password: string;
};

type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
};

interface AuthProviderButtonProps {
  provider: string;
  icon: React.ReactNode;
  isLoading: boolean;
  onClick: () => void;
  disabled: boolean;
}

const AuthProviderButton: React.FC<AuthProviderButtonProps> = ({
  provider,
  icon,
  isLoading,
  onClick,
  disabled,
}) => (
  <Button
    variant="outline"
    onClick={onClick}
    disabled={disabled}
    className="flex items-center justify-center gap-2"
  >
    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
    {isLoading ? 'Signing in...' : `Continue with ${provider}`}
  </Button>
);

const PasswordInput = ({ 
  register, 
  errors, 
  disabled, 
  showPassword, 
  setShowPassword 
}) => (
  <div className="grid gap-2">
    <Label htmlFor="password">Password</Label>
    <div className="relative">
      <Input 
        id="password" 
        type={showPassword ? "text" : "password"} 
        placeholder="••••••••" 
        {...register('password', { 
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters'
          }
        })}
        disabled={disabled}
        className="pr-10"
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword(!showPassword)}
        disabled={disabled}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Eye className="h-4 w-4 text-muted-foreground" />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>
    </div>
    {errors.password && (
      <p className="text-xs text-destructive">{errors.password.message}</p>
    )}
  </div>
);

const FormFields = ({ 
  mode, 
  register, 
  errors, 
  disabled, 
  showPassword, 
  setShowPassword 
}) => (
  <>
    {mode === 'signup' && (
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input 
          id="name" 
          type="text" 
          placeholder="Your Name"
          {...register('name', { 
            required: 'Name is required' 
          })}
          disabled={disabled}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>
    )}
    
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input 
        id="email" 
        type="email" 
        placeholder="your@email.com"
        {...register('email', { 
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Please enter a valid email address'
          }
        })}
        disabled={disabled}
      />
      {errors.email && (
        <p className="text-xs text-destructive">{errors.email.message}</p>
      )}
    </div>
    
    <PasswordInput 
      register={register} 
      errors={errors} 
      disabled={disabled} 
      showPassword={showPassword}
      setShowPassword={setShowPassword}
    />
  </>
);

const AuthForm = ({ 
  mode, 
  isLoading, 
  onSubmit, 
  form, 
  showPassword, 
  setShowPassword 
}) => {
  const { register, handleSubmit, formState: { errors } } = form;
  const isDisabled = isLoading !== null;
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-2">
      <FormFields 
        mode={mode} 
        register={register} 
        errors={errors} 
        disabled={isDisabled} 
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      
      <Button 
        type="submit" 
        disabled={isDisabled}
        className="mt-2"
      >
        {isLoading === 'Email' || isLoading === 'Signup' ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
          </>
        ) : (
          mode === 'signin' ? 'Sign in with Email' : 'Create Account'
        )}
      </Button>
    </form>
  );
};

export const AuthModal: React.FC<AuthModalProps> = ({
  open,
  onOpenChange,
  initialMode = 'signin',
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { user, isAuthenticated, isLoading: authLoading, login, loginWithEmail, register: registerUser } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  // Setup forms with React Hook Form
  const signInForm = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const signUpForm = useForm<SignUpFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const handleAuth = async (provider: string) => {
    setIsLoading(provider);
    
    try {
      await login(provider, () => {
        onOpenChange(false);
        
        toast({
          title: "Authentication successful",
          description: `You've successfully signed in with ${provider}`,
        });
        
        navigate('/projects');
      });
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        title: "Authentication failed",
        description: "There was an error during sign in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleEmailSignIn = async (data: SignInFormValues) => {
    setIsLoading('Email');
    
    try {
      await loginWithEmail(data.email, data.password, () => {
        onOpenChange(false);
        
        toast({
          title: "Sign in successful",
          description: "You've successfully signed in",
        });
        
        navigate('/projects');
      });
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleSignUp = async (data: SignUpFormValues) => {
    setIsLoading('Signup');
    
    try {
      await registerUser(data.email, data.password, data.name, () => {
        onOpenChange(false);
        
        toast({
          title: "Registration successful",
          description: "Your account has been created and you're now signed in",
        });
        
        navigate('/projects');
      });
    } catch (error) {
      let description = "There was an error during registration. Please try again.";
      if (error.response?.data?.email?.code === "validation_not_unique") {
        description = "This email is already registered. Try signing in instead.";
      }

      toast({
        title: "Registration failed",
        description,
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  // Toggle between sign in and sign up modes
  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    
    // Reset forms
    signInForm.reset();
    signUpForm.reset();
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && open && !authLoading) {
      onOpenChange(false);
      setTimeout(() => {
        navigate('/projects');
      }, 100);
    }
  }, [isAuthenticated, open, authLoading, navigate, onOpenChange]);

  // Reset form state when modal opens
  useEffect(() => {
    if (open) {
      setIsLoading(null);
      signInForm.reset();
      signUpForm.reset();
      setMode(initialMode);
    }
  }, [open, initialMode, signInForm, signUpForm]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{mode === 'signin' ? 'Sign in' : 'Sign up'}</DialogTitle>
          <DialogDescription>
            {mode === 'signin' 
              ? 'Choose how you want to sign in to FakerDB' 
              : 'Create a new account to use FakerDB'}
          </DialogDescription>
        </DialogHeader>
        
        {mode === 'signin' ? (
          <>
            <AuthForm 
              mode="signin" 
              isLoading={isLoading} 
              onSubmit={handleEmailSignIn} 
              form={signInForm} 
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <AuthProviderButton
              provider="GitHub"
              icon={<Github className="h-4 w-4" />}
              isLoading={isLoading === 'GitHub'}
              onClick={() => handleAuth('GitHub')}
              disabled={isLoading !== null}
            />
            
            <AuthProviderButton
              provider="Google"
              icon={<GoogleIcon className="h-4 w-4" />}
              isLoading={isLoading === 'Google'}
              onClick={() => handleAuth('Google')}
              disabled={isLoading !== null}
            />
          </>
        ) : (
          <AuthForm 
            mode="signup" 
            isLoading={isLoading} 
            onSubmit={handleSignUp} 
            form={signUpForm} 
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        )}
        
        <DialogFooter className="flex flex-col space-y-2">
          <Button 
            variant="ghost" 
            className="text-sm w-full" 
            onClick={toggleMode}
            disabled={isLoading !== null}
          >
            {mode === 'signin' ? (
              <>
                <UserPlus className="h-4 w-4 mr-2" />
                Don't have an account ? Sign up
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4 mr-2" />
                Already have an account ? Sign in
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
