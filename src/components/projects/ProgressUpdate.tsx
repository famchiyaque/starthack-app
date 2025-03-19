
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import AnimatedTransition from '@/components/common/AnimatedTransition';

const formSchema = z.object({
  content: z.string().min(1, {
    message: 'Update content is required.',
  }),
  progressValue: z.number().min(0).max(100),
});

type FormValues = z.infer<typeof formSchema>;

interface ProgressUpdateProps {
  projectId: string;
  currentProgress: number;
  onSuccess?: () => void;
}

const ProgressUpdate: React.FC<ProgressUpdateProps> = ({
  projectId,
  currentProgress,
  onSuccess,
}) => {
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      progressValue: currentProgress,
    },
  });

  const { isSubmitting } = form.formState;
  const progressValue = form.watch('progressValue');

  const onSubmit = async (data: FormValues) => {
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Progress updated',
        description: 'Your project progress has been updated successfully.',
      });
      
      form.reset({
        content: '',
        progressValue: data.progressValue,
      });
      setImages([]);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error updating your project progress. Please try again.',
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
      setImages(prev => [...prev, reader.result as string]);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <AnimatedTransition type="fade" className="border rounded-lg p-4 bg-card">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Share your progress update..."
                    className="min-h-20 resize-none border-none focus:ring-0 p-0 text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Image previews */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative h-20 w-20 overflow-hidden rounded-md">
                  <img src={image} alt="Upload" className="h-full w-full object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-1 top-1 h-5 w-5"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          <div className="border-t pt-4">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="progressValue"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Project Progress</span>
                      <span className="text-sm font-medium">{progressValue}%</span>
                    </div>
                    <FormControl>
                      <div className="space-y-2">
                        <Progress value={progressValue} className="h-2" />
                        <Slider
                          defaultValue={[field.value]}
                          max={100}
                          step={1}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="py-1"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="flex flex-wrap items-center gap-2 justify-between">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('update-image-upload')?.click()}
                    disabled={isUploading}
                    className="h-9"
                  >
                    <ImagePlus className="mr-2 h-4 w-4" />
                    Add Image
                  </Button>
                  <input
                    id="update-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting || isUploading}
                  size="sm"
                  className="h-9"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    'Post Update'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </AnimatedTransition>
  );
};

export default ProgressUpdate;
