
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Calendar, 
  X, 
  Upload, 
  Plus,
  MessageSquare,
  QrCode,
  FileImage,
  Award
} from "lucide-react";

const taskOptions = [
  { value: "joinCommunity", label: "Join the community", caption: "Admitted by admin", icon: <MessageSquare className="mr-2 h-4 w-4" /> },
  { value: "uploadImage", label: "Upload an image", caption: "AI validation", icon: <FileImage className="mr-2 h-4 w-4" /> },
  { value: "attendEvent", label: "Attend live event", caption: "QR code", icon: <QrCode className="mr-2 h-4 w-4" /> },
];

const categoryOptions = [
  { value: "environment", label: "Environment" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health" },
  { value: "community", label: "Community" },
  { value: "technology", label: "Technology" },
];

const formSchema = z.object({
  initiative: z.string().min(3, { message: "Initiative name must be at least 3 characters" }),
  callToAction: z.string().min(10, { message: "Call to action must be at least 10 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  endDate: z.date({ required_error: "Please select an end date" }),
  benefits: z.array(z.string()).min(1, { message: "At least one benefit is required" }),
  tasks: z.array(z.string()).min(1, { message: "At least one task is required" }),
});

type FormValues = z.infer<typeof formSchema>;

const NewProjectForm: React.FC = () => {
  const [benefits, setBenefits] = useState<string[]>(['']);
  const [tasks, setTasks] = useState<string[]>(['joinCommunity']);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initiative: "",
      callToAction: "",
      category: "",
      endDate: new Date(),
      benefits: [''],
      tasks: ['joinCommunity'],
    },
  });

  const handleImageChange = (files: FileList | null) => {
    if (files && files[0]) {
      setImageFile(files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleImageChange(e.dataTransfer.files);
  };

  const addBenefit = () => {
    const newBenefits = [...benefits, ''];
    setBenefits(newBenefits);
    form.setValue('benefits', newBenefits);
  };

  const removeBenefit = (index: number) => {
    if (benefits.length > 1) {
      const newBenefits = benefits.filter((_, i) => i !== index);
      setBenefits(newBenefits);
      form.setValue('benefits', newBenefits);
    }
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setBenefits(newBenefits);
    form.setValue('benefits', newBenefits);
  };

  const addTask = () => {
    const newTasks = [...tasks, 'joinCommunity'];
    setTasks(newTasks);
    form.setValue('tasks', newTasks);
  };

  const removeTask = (index: number) => {
    if (tasks.length > 1) {
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
      form.setValue('tasks', newTasks);
    }
  };

  const updateTask = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
    form.setValue('tasks', newTasks);
  };

  const getTaskCaption = (taskType: string) => {
    const task = taskOptions.find(option => option.value === taskType);
    return task ? task.caption : "";
  };

  const onSubmit = (data: FormValues) => {
    const formData = {
      ...data,
      image: imageFile ? imageFile.name : null
    };
    console.log("Submitted:", formData);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm border">
      <h2 className="text-2xl font-bold mb-6">Create New Project</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Initiative Name */}
          <FormField
            control={form.control}
            name="initiative"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initiative Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter initiative name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Call to Action */}
          <FormField
            control={form.control}
            name="callToAction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Call to Action</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter your call to action" 
                    className="min-h-[120px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload */}
          <div className="space-y-2">
            <FormLabel>Project Image</FormLabel>
            <div 
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                dragActive ? "border-primary bg-primary/5" : "border-muted"
              } transition-colors`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file" 
                id="image-upload"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e.target.files)}
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                {imageFile ? (
                  <div className="flex items-center justify-center flex-col">
                    <img 
                      src={URL.createObjectURL(imageFile)} 
                      alt="Project preview" 
                      className="max-h-40 mb-4 rounded"
                    />
                    <p className="text-sm text-muted-foreground">{imageFile.name}</p>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setImageFile(null);
                      }}
                    >
                      Change image
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <p className="font-medium">Upload an image</p>
                    <p className="text-sm text-muted-foreground">
                      Drop a file here or click to browse
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* End Date */}
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <div className="relative">
                  <input
                    type="date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      field.onChange(date);
                    }}
                    defaultValue={field.value.toISOString().slice(0, 10)}
                  />
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Benefits */}
          <div className="space-y-2">
            <FormLabel>Benefits</FormLabel>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1">
                    <Input
                      value={benefit}
                      onChange={(e) => updateBenefit(index, e.target.value)}
                      placeholder="Enter a benefit"
                    />
                  </div>
                  {benefits.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeBenefit(index)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={addBenefit}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Another Benefit
              </Button>
            </div>
          </div>

          {/* Tasks */}
          <div className="space-y-2">
            <FormLabel>Tasks</FormLabel>
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="flex-1">
                    <Select
                      defaultValue={task}
                      onValueChange={(value) => updateTask(index, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {taskOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center">
                              {option.icon}
                              {option.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-32 text-sm text-muted-foreground pt-3">
                    {getTaskCaption(task)}
                  </div>
                  
                  {tasks.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTask(index)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={addTask}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Another Task
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full">Create Project</Button>
        </form>
      </Form>
    </div>
  );
};

export default NewProjectForm;
