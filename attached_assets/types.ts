import { IRequestData } from '@request-factory/requestFactory/type';
import { CvSource } from '@fugu/constants/statistics/cvSource';

export type TCVBuilderInitGet = Omit<IRequestData, 'url' | 'method' | 'data'>;

export interface IExperienceApi {
	workPlaces: IWorkPlaceApi[];
	hasExperience: boolean;
	professionalSkills: string;
	careerObjective: ICareerObjectiveApi;
}

export interface IPersonalInfoApi {
	fullName?: string;
	yearOfBirth?: string | null;
	firstName?: string;
	lastName?: string;
	phone?: string;
	email?: string;
	city?: string;
	country?: string;
	countryIso?: string;
}

export interface ICareerObjectiveApi {
	position: string | null;
	skills: string | null;
	skillSet: string[];
}

export interface IWorkPlaceApi {
	id?: string;
	position: string;
	company: string;
	period: string;
	startYear: string;
	endYear: string;
	responsibilities: string;
	isStillWorking: boolean;
}

export interface IEducationPlaceApi {
	id?: string;
	educationLevel?: string;
	admissionYear?: string;
	nameOfInstitution?: string;
	specialty?: string;
	graduationYear?: string;
}

export interface IEducationApi {
	educationPlaces: IEducationPlaceApi[];
	hasEducation: boolean;
}

export interface ILanguageApi {
	name: string;
	level: string;
}

export interface ISummaryApi {
	summary: string | null;
	recommendJobsByCVConsent: boolean;
	sendCVImprovementTipsConsent: boolean;
}

export interface ICvJsonModelApi extends ISummaryApi {
	jdpId: number | null;
	buildCvId: string;
	step: number;
	source: CvSource;
	referrer: string;

	personalInfo: IPersonalInfoApi;
	careerObjective: ICareerObjectiveApi;
	experience: IExperienceApi;
	education: IEducationApi;
	languages?: ILanguageApi[];
	templateId: number;
}

export interface ICvBuilderConfigModelApi {
	experienceDurationOptions: string[];
	educationLevelOptions: never[];
	isLoaded: boolean;
}

export interface ICvBuilderPreCreateDataApi {
	fullName: string;
	city: string;
	firstName: string;
	lastName: string;
}

export interface ICVBuilderInitResponse {
	config: ICvBuilderConfigModelApi;
	initial: ICvJsonModelApi;
	buildCvId: string;
	preCreateData: ICvBuilderPreCreateDataApi;
	locales: LocalesDictionary;
}

export interface LocalesDictionary extends Record<string, Record<string, string>> {}

export interface ICreateCvRequest {
	buildCvId: string;
	source: CvSource;
	json: ICvJsonModelApi;
	jdpId: number | null;
	step: number;
	html: string;
	css: string;
}

export interface SuggestAIRequest {
	temperature: number;
	systemContent: string;
	userContent: string;
}

export interface IPromptConfigApi {
	type: string;
	userReplacements: Record<string, string>;
	systemReplacements: Record<string, string>;
}

export interface ICreateCvResponse {
	cvId: number;
}

export interface IAISuggestResponse {
	content: string;
}

export interface ICVBuilderStatisticsData {
	type: number;
	flags: number;
	buildCvId?: string;
	jdpId: number | null;
	step: number;
	json?: object;
	additionalData?: object | string | null;
}
