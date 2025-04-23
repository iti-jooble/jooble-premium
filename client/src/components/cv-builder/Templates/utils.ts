import { IEducationPlace, IWorkPlace } from '@fugu/store/cvBuilder/types';

export const atLeastOneFieldExists = (data: (IWorkPlace | IEducationPlace)[] | string[]): boolean =>
	!!data &&
	data.length > 0 &&
	(typeof data[0] === 'string'
		? data.some((item) => !!item)
		: !!data.some((item) =>
				Object.values(item).some(
					(value) => !!value && typeof value === 'string' && value !== '0' && value !== '-1'
				)
		  ));

export const sortExperiences = (experiences: IWorkPlace[]): IWorkPlace[] =>
	[...experiences].sort((a, b) =>
		a.isStillWorking && !b.isStillWorking ? -1 : parseInt(b.startYear) - parseInt(a.startYear)
	);
