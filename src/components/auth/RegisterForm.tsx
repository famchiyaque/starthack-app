
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { useAuth, UserType } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface RegisterFormProps {
  userType: UserType;
  onBack: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ userType, onBack }) => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      terms: false,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: FormValues) => {
    try {
      if (!userType) {
        toast({
          title: 'Registration failed',
          description: 'Please select a user type',
          variant: 'destructive',
        });
        return;
      }
      
      await register({
        name: data.name,
        email: data.email,
        password: data.password,
        type: userType,
      });
      
      toast({
        title: 'Account created!',
        description: 'You have successfully registered.',
      });
      
      navigate('/feed');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: 'Please check your information and try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-medium">
          Create your {userType === 'company' ? 'company' : 'individual'} account
        </h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {userType === 'company' ? 'Company name' : 'Full name'}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={userType === 'company' ? 'Acme Inc.' : 'John Doe'} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Create a strong password" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="h-4 w-4 rounded border-input"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">
                    I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
