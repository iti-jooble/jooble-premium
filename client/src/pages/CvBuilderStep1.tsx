import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPinIcon, PhoneIcon, MailIcon, CheckIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(6, { message: "Phone number is required" }),
  city: z.string().min(2, { message: "City is required" }),
  country: z.string().min(2, { message: "Country is required" }),
});

type FormValues = z.infer<typeof formSchema>;

const CvBuilderStep1 = () => {
  const [, navigate] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      country: "France", // Default value
    },
  });

  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form values:", values);
      // In a real application, we would save the data and navigate to the next step
      navigate("/cv-builder/step-2");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="p-6 animate-in fade-in duration-300">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Create New CV</h1>
        <p className="text-neutral-600 mt-1">Build your professional CV</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side with stepper and form */}
        <div className="flex-1">
          {/* Stepper */}
          <div className="flex mb-5 overflow-x-auto py-1 text-sm">
            <div className="flex items-center flex-shrink-0">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold">
                <CheckIcon className="h-4 w-4" />
              </div>
              <div className="mx-1 text-green-700 font-medium">À Propos</div>
            </div>
            <div className="w-10 h-1 bg-gray-200 mx-1 mt-3"></div>
            <div className="flex items-center flex-shrink-0">
              <div className="w-6 h-6 bg-gray-200 text-gray-500 border-2 border-white rounded-full flex items-center justify-center font-semibold text-xs">2</div>
              <div className="mx-1 text-gray-500">Expérience</div>
            </div>
            <div className="w-10 h-1 bg-gray-200 mx-1 mt-3"></div>
            <div className="flex items-center flex-shrink-0">
              <div className="w-6 h-6 bg-gray-200 text-gray-500 border-2 border-white rounded-full flex items-center justify-center font-semibold text-xs">3</div>
              <div className="mx-1 text-gray-500">Éducation</div>
            </div>
            <div className="w-10 h-1 bg-gray-200 mx-1 mt-3"></div>
            <div className="flex items-center flex-shrink-0">
              <div className="w-6 h-6 bg-gray-200 text-gray-500 border-2 border-white rounded-full flex items-center justify-center font-semibold text-xs">4</div>
              <div className="mx-1 text-gray-500">Compétences</div>
            </div>
            <div className="w-10 h-1 bg-gray-200 mx-1 mt-3"></div>
            <div className="flex items-center flex-shrink-0">
              <div className="w-6 h-6 bg-gray-200 text-gray-500 border-2 border-white rounded-full flex items-center justify-center font-semibold text-xs">5</div>
              <div className="mx-1 text-gray-500">Résumé</div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-md p-6 shadow-sm border">
            <h2 className="text-xl font-medium mb-4">Informations personnelles</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Assurez-vous que votre employeur potentiel puisse vous contacter
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="after:content-['*'] after:text-red-500 after:ml-0.5">Prénom</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
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
                      <FormLabel className="after:content-['*'] after:text-red-500 after:ml-0.5">Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="after:content-['*'] after:text-red-500 after:ml-0.5">Numéro de téléphone</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <div className="flex items-center justify-center bg-gray-100 border border-gray-300 rounded-l-md px-3">
                              <span className="text-gray-500 text-sm">+33</span>
                            </div>
                            <Input 
                              className="rounded-l-none" 
                              placeholder="612345678" 
                              {...field} 
                            />
                          </div>
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
                        <FormLabel className="after:content-['*'] after:text-red-500 after:ml-0.5">Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="john.doe@example.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="after:content-['*'] after:text-red-500 after:ml-0.5">Ville de résidence</FormLabel>
                        <FormControl>
                          <Input placeholder="Paris" {...field} />
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
                        <FormLabel className="after:content-['*'] after:text-red-500 after:ml-0.5">Pays</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
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

                <div className="flex justify-between mt-8 space-x-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate("/cv-builder")}
                  >
                    Retour
                  </Button>
                  <Button 
                    type="submit" 
                    className="px-8"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Continuez"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        {/* Right side - Preview */}
        <div className="flex-1 bg-gray-100 rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Aperçu</h2>
            <Button variant="outline" size="sm">
              Changer de modèle
            </Button>
          </div>
          
          <div className="bg-white rounded-md shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left sidebar in preview */}
              <div className="w-full md:w-1/3 bg-blue-50 p-4">
                <div className="mb-6">
                  <h3 className="text-blue-800 font-medium mb-2">Contacts</h3>
                  <div className="text-sm space-y-1.5">
                    <div className="flex items-center text-gray-600">
                      <MailIcon className="h-3.5 w-3.5 mr-2" />
                      <span>{form.watch("email") || "john.doe@example.com"}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <PhoneIcon className="h-3.5 w-3.5 mr-2" />
                      <span>+33 {form.watch("phone") || "612345678"}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPinIcon className="h-3.5 w-3.5 mr-2" />
                      <span>{form.watch("city") || "Paris"}, {form.watch("country") || "France"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-blue-800 font-medium mb-2">À propos</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Experienced driver with excellent navigation skills. Committed to providing safe and efficient transportation services. Strong attention to detail and ability to handle various driving conditions.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-blue-800 font-medium mb-2">Compétences</h3>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>Navigation</li>
                    <li>Time Management</li>
                    <li>Customer Service</li>
                  </ul>
                </div>
              </div>
              
              {/* Right content in preview */}
              <div className="w-full md:w-2/3 p-6">
                <div className="mb-4">
                  <h1 className="text-lg font-semibold text-gray-800">
                    {form.watch("firstName") || "Alyson"} {form.watch("lastName") || "Lawrence"}
                  </h1>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-blue-700 font-medium mb-2">Expérience</h2>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">ABC Company</h3>
                        <h4 className="text-xs">Driver</h4>
                      </div>
                      <div className="text-xs text-gray-500">2018 - Actuellement</div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Driving vehicles and managing safe transportation. Following traffic laws and ensuring on-time deliveries. Maintaining client communication and vehicle maintenance.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">XYZ Corporation</h3>
                        <h4 className="text-xs">Driver</h4>
                      </div>
                      <div className="text-xs text-gray-500">2016 - 2017</div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Driving vehicles and delivering goods.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-blue-700 font-medium mb-2">Education</h2>
                  
                  <div className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">Driving</h3>
                        <h4 className="text-xs">Driver's License</h4>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">Department of Motor Vehicles</h3>
                      </div>
                      <div className="text-xs text-gray-500">2009 - 2009</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">General Education</h3>
                        <h4 className="text-xs">High School Diploma</h4>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">ABC High School</h3>
                      </div>
                      <div className="text-xs text-gray-500">2005 - 2009</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CvBuilderStep1;