export interface IGetAutocompleteArgs<ITEM> {
  mode: AUTOCOMPLETE_MODE;
  initial?: ITEM[];
}

export type TUseAutocomplete<DATA, ITEM> = [
  ITEM[],
  (data: DATA) => Promise<boolean>,
  () => void,
];

export enum AUTOCOMPLETE_MODE {
  KEYWORD = "kwd",
  REGION = "rgn",
  EMAIL = "email",
}

export interface IAutocompleteArgs {
  query: string;
}

export interface IAutocompleteResponseItem {
  data: string | null;
  label: string;
  value: string;
}

export interface IAutocompleteResponse {
  suggestions: IAutocompleteResponseItem[];
}
