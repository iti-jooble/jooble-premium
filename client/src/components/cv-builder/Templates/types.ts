import { TFunction } from "i18next";
import { CvUserInfo } from "@shared/schema";

export interface ITemplateComponentProps {
  t: TFunction;
  cvData: CvUserInfo;
}
