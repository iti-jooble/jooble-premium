import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useInitCvBuilderQuery, useCreateCvMutation, useGetAiSuggestionMutation } from '../redux/api/cvBuilderApiSlice';
import { 
  initializeBuilder, 
  updatePersonalInfo, 
  updateSummary, 
  addWorkPlace, 
  updateWorkPlace, 
  removeWorkPlace,
  addEducationPlace,
  updateEducationPlace,
  removeEducationPlace,
  updateLanguages,
  setTemplateId
} from '../redux/slices/cvBuilderSlice';
import { convertToCvJsonModel, convertFromCvJsonModel } from '../adapters/cvBuilderAdapter';
import { ICvJsonModelApi, IPromptConfigApi } from '../types/api/cvBuilder.types';
import { PersonalInfo, WorkExperience, Education, Skill } from '../types/state/cvBuilder.types';

// UI components
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { PersonalInfoSection } from '../components/cv-builder/PersonalInfoSection';
import { WorkExperienceSection } from '../components/cv-builder/WorkExperienceSection';
import { EducationSection } from '../components/cv-builder/EducationSection';
import { SkillsSection } from '../components/cv-builder/SkillsSection';
import { SummarySection } from '../components/cv-builder/SummarySection';
import { CvPreview } from '../components/cv-builder/CvPreview';

export default function CvBuilderNew() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const cvBuilderState = useAppSelector(state => state.cvBuilder);
  
  // Local state
  const [activeTab, setActiveTab] = useState('edit');
  const [activeSection, setActiveSection] = useState<string>('personal-info');
  const [personalInfo, setPersonalInfo] = useState<Partial<PersonalInfo>>({});
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [summary, setSummary] = useState<string>('');
  const [cvHtml, setCvHtml] = useState<string>(''); 
  const [cvCss, setCvCss] = useState<string>('');
  const [templateId, setTemplate] = useState<number>(1);
  
  // API hooks
  const { data: initData, isLoading: isInitLoading, error: initError } = useInitCvBuilderQuery();
  const [createCv, { isLoading: isCreating, error: createError }] = useCreateCvMutation();
  const [getAiSuggestion, { isLoading: isSuggesting, error: suggestError }] = useGetAiSuggestionMutation();
  
  // Initialize CV builder with data from API
  useEffect(() => {
    if (initData) {
      dispatch(initializeBuilder(initData));
      
      // Convert API model to our app model
      const convertedData = convertFromCvJsonModel(initData.initial);
      
      setPersonalInfo(convertedData.personalInfo);
      setWorkExperience(convertedData.workExperience || []);
      setEducation(convertedData.education || []);
      setSkills(convertedData.skills || []);
      setSummary(convertedData.summary || '');
      setTemplate(convertedData.templateId);
    }
  }, [initData, dispatch]);

  // Update Redux state when form data changes
  useEffect(() => {
    if (cvBuilderState.buildCvId) {
      dispatch(updatePersonalInfo(personalInfo));
      
      // Update summary
      if (summary) {
        dispatch(updateSummary({ summary }));
      }
      
      // Set template ID
      if (templateId) {
        dispatch(setTemplateId(templateId));
      }
    }
  }, [personalInfo, summary, templateId, cvBuilderState.buildCvId, dispatch]);
  
  // Handle form submissions
  const handlePersonalInfoSave = (values: PersonalInfo) => {
    setPersonalInfo(values);
  };
  
  const handleWorkExperienceSave = (experiences: WorkExperience[]) => {
    setWorkExperience(experiences);
    
    // Update Redux state
    if (cvBuilderState.buildCvId && cvBuilderState.cvData) {
      // First remove all existing work places
      cvBuilderState.cvData.experience.workPlaces.forEach(wp => {
        if (wp.id) {
          dispatch(removeWorkPlace(wp.id));
        }
      });
      
      // Then add the new ones
      experiences.forEach(exp => {
        dispatch(addWorkPlace({
          id: exp.id,
          position: exp.position,
          company: exp.company,
          period: `${exp.startYear} - ${exp.endYear || 'Present'}`,
          startYear: exp.startYear,
          endYear: exp.endYear || 'Present',
          responsibilities: exp.description,
          isStillWorking: exp.isCurrent
        }));
      });
    }
  };
  
  const handleEducationSave = (educations: Education[]) => {
    setEducation(educations);
    
    // Update Redux state
    if (cvBuilderState.buildCvId && cvBuilderState.cvData) {
      // First remove all existing education places
      cvBuilderState.cvData.education.educationPlaces.forEach(ed => {
        if (ed.id) {
          dispatch(removeEducationPlace(ed.id));
        }
      });
      
      // Then add the new ones
      educations.forEach(edu => {
        dispatch(addEducationPlace({
          id: edu.id,
          educationLevel: edu.degree,
          admissionYear: edu.startYear,
          nameOfInstitution: edu.school,
          specialty: edu.field,
          graduationYear: edu.endYear || 'Present'
        }));
      });
    }
  };
  
  const handleSkillsSave = (updatedSkills: Skill[]) => {
    setSkills(updatedSkills);
  };
  
  const handleSummarySave = (values: { summary: string }) => {
    setSummary(values.summary);
  };
  
  const handleSaveCV = async () => {
    if (!cvBuilderState.buildCvId || !cvBuilderState.cvData) return;
    
    try {
      // Convert our app model to API model
      const jsonModel: ICvJsonModelApi = convertToCvJsonModel({
        personalInfo,
        summary,
        skills,
        education,
        workExperience,
        buildCvId: cvBuilderState.buildCvId,
        templateId
      });
      
      // Create the CV
      const result = await createCv({
        buildCvId: cvBuilderState.buildCvId,
        source: jsonModel.source,
        json: jsonModel,
        jdpId: null,
        step: 4, // Complete step
        html: cvHtml,
        css: cvCss
      }).unwrap();
      
      console.log('CV created successfully:', result);
      
      // Redirect to CV list page or show success message
      // TODO: Add success toast and redirect
    } catch (error) {
      console.error('Failed to create CV:', error);
      // TODO: Add error toast
    }
  };
  
  const handleGetAISuggestion = async (type: string, content: string) => {
    try {
      const promptConfig: IPromptConfigApi = {
        type,
        userReplacements: {
          content
        },
        systemReplacements: {}
      };
      
      const result = await getAiSuggestion(promptConfig).unwrap();
      return result.content;
    } catch (error) {
      console.error('Failed to get AI suggestion:', error);
      return null;
    }
  };
  
  const handleGenerateSummary = async () => {
    if (workExperience.length === 0 || skills.length === 0) {
      // TODO: Add warning toast
      return;
    }
    
    const experienceContent = workExperience.map(exp => 
      `Position: ${exp.position} at ${exp.company} (${exp.startYear} - ${exp.endYear || 'Present'})
      Responsibilities: ${exp.description}`
    ).join('\n\n');
    
    const skillsContent = skills.map(s => s.name).join(', ');
    
    const content = `Generate a professional summary based on my experience and skills:
      
    Experience:
    ${experienceContent}
    
    Skills:
    ${skillsContent}
    
    Current job title: ${personalInfo.title || 'Not specified'}`;
    
    const suggestion = await handleGetAISuggestion('summary', content);
    if (suggestion) {
      setSummary(suggestion);
    }
  };
  
  // Loading state
  if (isInitLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <p>{t('cvBuilder.loading')}</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (initError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t('common.error')}</CardTitle>
            <CardDescription>{t('cvBuilder.initError')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{JSON.stringify(initError)}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => window.location.reload()}>{t('common.retry')}</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('cvBuilder.title')}</h1>
            <p className="text-muted-foreground">{t('cvBuilder.subtitle')}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setActiveTab(activeTab === 'edit' ? 'preview' : 'edit')}
            >
              {activeTab === 'edit' ? t('cvBuilder.preview') : t('cvBuilder.edit')}
            </Button>
            <Button onClick={handleSaveCV} disabled={isCreating}>
              {isCreating ? t('common.saving') : t('common.save')}
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-[200px]">
            <TabsTrigger value="edit">{t('cvBuilder.edit')}</TabsTrigger>
            <TabsTrigger value="preview">{t('cvBuilder.preview')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form section */}
              <div className="flex flex-col gap-6">
                <Accordion
                  type="single"
                  collapsible
                  defaultValue="personal-info"
                  value={activeSection}
                  onValueChange={setActiveSection}
                >
                  <AccordionItem value="personal-info">
                    <AccordionTrigger className="text-lg font-semibold">
                      {t('cvBuilder.sections.personalInfo')}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <PersonalInfoSection
                        defaultValues={personalInfo}
                        onSave={handlePersonalInfoSave}
                      />
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="work-experience">
                    <AccordionTrigger className="text-lg font-semibold">
                      {t('cvBuilder.sections.workExperience')}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <WorkExperienceSection
                        experiences={workExperience}
                        onSave={handleWorkExperienceSave}
                      />
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="education">
                    <AccordionTrigger className="text-lg font-semibold">
                      {t('cvBuilder.sections.education')}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <EducationSection
                        educations={education}
                        onSave={handleEducationSave}
                      />
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="skills">
                    <AccordionTrigger className="text-lg font-semibold">
                      {t('cvBuilder.sections.skills')}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <SkillsSection
                        skills={skills}
                        onSave={handleSkillsSave}
                      />
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="summary">
                    <AccordionTrigger className="text-lg font-semibold">
                      {t('cvBuilder.sections.summary')}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="flex flex-col gap-4">
                        <Button 
                          variant="outline" 
                          className="w-full md:w-auto"
                          onClick={handleGenerateSummary}
                          disabled={isSuggesting}
                        >
                          {isSuggesting ? t('common.generating') : t('cvBuilder.generateSummary')}
                        </Button>
                        <SummarySection
                          defaultValues={{ summary }}
                          onSave={handleSummarySave}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              {/* Preview section */}
              <div className="sticky top-6 self-start">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('cvBuilder.livePreview')}</CardTitle>
                    <CardDescription>{t('cvBuilder.previewDescription')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CvPreview
                      data={{
                        personalInfo,
                        summary,
                        skills,
                        education,
                        workExperience
                      }}
                      onChangeTemplate={() => setActiveTab('templates')}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('cvBuilder.fullPreview')}</CardTitle>
                <div className="flex justify-between items-center">
                  <CardDescription>{t('cvBuilder.previewDescription')}</CardDescription>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('edit')}
                  >
                    {t('cvBuilder.edit')}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="w-full max-w-4xl mx-auto">
                  <CvPreview
                    data={{
                      personalInfo,
                      summary,
                      skills,
                      education,
                      workExperience
                    }}
                    onChangeTemplate={() => setActiveTab('templates')}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveCV} disabled={isCreating}>
                  {isCreating ? t('common.saving') : t('common.save')}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}