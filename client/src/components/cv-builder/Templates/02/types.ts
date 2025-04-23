import { ICvData, IEducationPlace, IWorkPlace } from '@fugu/store/cvBuilder/types';
import { IntlShape } from 'react-intl';

export interface ITemplateComponentProps {
	intl: IntlShape;
	cvData: ICvData;
}

export interface ISkillsProps {
	intl: IntlShape;
	data: string[];
}

export interface IExperienceProps {
	intl: IntlShape;
	data: IWorkPlace[];
}

export interface IEducationProps {
	intl: IntlShape;
	data: IEducationPlace[];
}
