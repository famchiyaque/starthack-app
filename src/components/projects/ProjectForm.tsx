
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Image, Loader2, UploadCloud } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(3, {
    message: 'Project title must be at least 3 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  category: z.string().min(1, {
    message: 'Please select a category.',
  }),
  status: z.enum(['planning', 'in_progress', 'completed', 'on_hold']),
  progress: z.number().min(0).max(100),
});

type FormValues = z.infer<typeof formSchema>;

const categories = [
  'Technology',
  'Design',
  'Marketing',
  'Construction',
  'Finance',
  'Education',
  'Healthcare',
  'Manufacturing',
  'Other',
];

interface ProjectFormProps {
  onSuccess?: () => void;
  initialData?: Partial<FormValues>;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  onSuccess,
  initialData,
}) => {
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      category: initialData?.category || '',
      status: initialData?.status || 'planning',
      progress: initialData?.progress || 0,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: FormValues) => {
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: initialData ? 'Project updated' : 'Project created',
        description: initialData
          ? 'Your project has been updated successfully.'
          : 'Your project has been created successfully.',
      });
      
      if (onSuccess) {
        onSuccess();
      }
      
      // Reset form if creating new project
      if (!initialData) {
        form.reset();
        setImageUrl(null);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error saving your project. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Simulate upload
    setIsUploading(true);
    
    // Create a preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Image Upload */}
        <div className="space-y-2">
          <FormLabel>Project Image</FormLabel>
          <div className="flex items-center gap-4">
            <div className="relative h-32 w-32 overflow-hidden rounded-md border bg-secondary flex items-center justify-center">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Project preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image className="h-8 w-8 text-muted-foreground" />
              )}
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}
            </div>
            <div>
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image-upload')?.click()}
                disabled={isUploading}
                className="mb-2"
              >
                <UploadCloud className="mr-2 h-4 w-4" />
                {imageUrl ? 'Change image' : 'Upload image'}
              </Button>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
              <FormDescription>
                Recommended size: 1200x800px (3:2 ratio)
              </FormDescription>
            </div>
          </div>
        </div>

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter project title" {...field} />
              </FormControl>
              <FormDescription>
                Choose a descriptive name for your project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your project"
                  className="min-h-32 resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide details about your project's goals and scope.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on_hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Progress */}
        <FormField
          control={form.control}
          name="progress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Progress: {field.value}%</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[field.value]}
                  max={100}
                  step={1}
                  onValueChange={(vals) => field.onChange(vals[0])}
                  className="py-4"
                />
              </FormControl>
              <FormDescription>
                Drag the slider to update project progress.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {initialData ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            initialData ? 'Update Project' : 'Create Project'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ProjectForm;
