import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AuthLayout from '@/components/auth/AuthLayout';
import SkillsetInput from '@/components/auth/SkillsetInput';
import { useAuth, UserRole } from '@/contexts/AuthContext';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address').max(255),
  phone: z.string().min(10, 'Please enter a valid phone number').max(15),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['jobseeker', 'employer'], {
    required_error: 'Please select a role',
  }),
  skillset: z.array(z.string()).optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: undefined,
      skillset: [],
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role as UserRole,
        skillset: data.role === 'jobseeker' ? skills : undefined,
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Create an account
          </h2>
          <p className="text-muted-foreground">
            Join JobConnect and start your journey
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              {...register('name')}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register('email')}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              {...register('phone')}
              className={errors.phone ? 'border-destructive' : ''}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a strong password"
                {...register('password')}
                className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label>I am a</Label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex gap-4"
                >
                  <div className="flex-1">
                    <RadioGroupItem
                      value="jobseeker"
                      id="jobseeker"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="jobseeker"
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-input bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-accent cursor-pointer transition-all"
                    >
                      <span className="text-sm font-medium">Job Seeker</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        Looking for jobs
                      </span>
                    </Label>
                  </div>
                  <div className="flex-1">
                    <RadioGroupItem
                      value="employer"
                      id="employer"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="employer"
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-input bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-accent cursor-pointer transition-all"
                    >
                      <span className="text-sm font-medium">Employer</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        Hiring talent
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role.message}</p>
            )}
          </div>

          {selectedRole === 'jobseeker' && (
            <div className="space-y-2">
              <Label>
                Skills <span className="text-muted-foreground">(Optional)</span>
              </Label>
              <SkillsetInput
                skills={skills}
                onChange={setSkills}
                placeholder="e.g., JavaScript, React, Node.js"
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-11 text-base font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create account'
            )}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
