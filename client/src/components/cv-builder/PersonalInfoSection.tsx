import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PersonalInfo, personalInfoSchema } from "@shared/schema";

const enhancedSchema = personalInfoSchema.extend({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string(),
  city: z.string(),
  country: z.string(),
});

interface PersonalInfoSectionProps {
  defaultValues?: Partial<PersonalInfo>;
  onSave: (values: PersonalInfo) => void;
}

export function PersonalInfoSection({
  defaultValues,
  onSave,
}: PersonalInfoSectionProps) {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<PersonalInfo>({
    resolver: zodResolver(enhancedSchema),
    defaultValues: {
      firstName: defaultValues?.firstName || "",
      lastName: defaultValues?.lastName || "",
      email: defaultValues?.email || "",
      phone: defaultValues?.phone || "",
      city: defaultValues?.city || "",
      country: defaultValues?.country || "France",
    },
  });

  const handleSave = async (values: PersonalInfo) => {
    setIsSaving(true);

    await onSave(values);

    setIsSaving(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} className="h-9" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} className="h-9" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  {...field}
                  className="h-9"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Phone Number</FormLabel>
              <FormControl>
                <div className="flex">
                  <div className="flex items-center justify-center bg-gray-100 border border-gray-300 rounded-l-md px-3">
                    <span className="text-gray-500 text-sm">+33</span>
                  </div>
                  <Input
                    className="rounded-l-none h-9"
                    placeholder="612345678"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">City</FormLabel>
                <FormControl>
                  <Input placeholder="Paris" {...field} className="h-9" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Belgium">Belgium</SelectItem>
                    <SelectItem value="Switzerland">Switzerland</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button type="submit" size="sm" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
