import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircleIcon, SearchIcon, MessageCircleIcon, BookOpenIcon, FileTextIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Help = () => {
  return (
    <div className="p-8 animate-in fade-in duration-300">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Help Center</h1>
        <p className="text-neutral-600 mt-1">Find answers to common questions and learn how to use JobCompass</p>
      </div>

      <Card className="shadow-sm mb-8">
        <CardContent className="p-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <HelpCircleIcon className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-center mb-2">How can we help you today?</h2>
            <p className="text-neutral-600 text-center mb-6">
              Search our help center for quick answers to common questions
            </p>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              <Input placeholder="Search for help..." className="pl-10" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                <MessageCircleIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Contact Support</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Need personalized help? Our support team is ready to assist you.
              </p>
              <Button variant="outline">Contact Us</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                <BookOpenIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">User Guides</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Detailed guides to help you get the most out of JobCompass.
              </p>
              <Button variant="outline">View Guides</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                <FileTextIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Tutorials</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Step-by-step tutorials for creating standout job applications.
              </p>
              <Button variant="outline">View Tutorials</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
      
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                question: "How do I create a CV using the CV Builder?",
                answer: "To create a CV using our CV Builder, navigate to the CV Builder page from the side menu, click on 'Create New CV', select a template, and follow the step-by-step process to add your information. You can save your progress at any time and come back to it later."
              },
              {
                question: "Can I download my CV in different formats?",
                answer: "Yes, you can download your CV in multiple formats including PDF, DOCX, and TXT. After creating or editing your CV, click on the 'Download' button and select your preferred format from the dropdown menu."
              },
              {
                question: "How does the CV Review tool work?",
                answer: "Our CV Review tool uses AI to analyze your CV and provide feedback on content, formatting, and ATS compatibility. Simply upload your CV on the CV Review page, and you'll receive a detailed report with suggestions for improvement within minutes."
              },
              {
                question: "How can I optimize my CV for a specific job?",
                answer: "Use our CV Matching tool to optimize your CV for specific jobs. Upload your CV and paste the job description, and our system will analyze the match and suggest tailored improvements to increase your chances of getting an interview."
              },
              {
                question: "Is my data secure?",
                answer: "Yes, we take data security very seriously. All your personal information and documents are encrypted and stored securely. We never share your information with third parties without your explicit consent."
              }
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
