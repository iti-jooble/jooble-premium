import { Experience, Education, Skill } from "@shared/schema";
import { TFunction } from "i18next";

export interface ISkillsProps {
	t: TFunction;
	data: Skill[];
}

export interface IExperienceProps {
	t: TFunction;
	data: Experience[];
}

export interface IEducationProps {
	t: TFunction;
	data: Education[];
}
