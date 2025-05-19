import { useRef, useState } from "react";
import { asyncDebounce } from "@/utils/asyncDebounce";
import { asyncMemoize } from "@/utils/asyncMemoize";
import {
  TUseAutocomplete,
  IGetAutocompleteArgs,
  AUTOCOMPLETE_MODE,
  IAutocompleteResponseItem,
  IAutocompleteArgs,
} from "./types";
import { useQueryClient } from "@tanstack/react-query";

export const DEBOUNCE_TIME_FOR_AUTOCOMPLETE = 300;

export const getDebouncedAutocomplete = <Request, Response>(
  func: Function,
): ((data: Request) => Promise<Response>) =>
  asyncDebounce<Response, Request>(
    asyncMemoize(func),
    DEBOUNCE_TIME_FOR_AUTOCOMPLETE,
  );

export const useAutocomplete = ({
  mode = AUTOCOMPLETE_MODE.KEYWORD,
  initial = [],
}: IGetAutocompleteArgs<IAutocompleteResponseItem>): TUseAutocomplete<
  IAutocompleteArgs,
  IAutocompleteResponseItem
> => {
  const isLoading = useRef(false);
  const queryClient = useQueryClient();
  const [_autocomplete, _setAutocomplete] =
    useState<IAutocompleteResponseItem[]>(initial);

  const getData = async (
    data: IAutocompleteArgs,
  ): Promise<IAutocompleteResponseItem[]> => {
    const response = await queryClient.fetchQuery({
      queryKey: ["autocomplete", { mode, query: data.query }],
      queryFn: async () => {
        const res = await fetch(
          `/api/autocomplete?mode=${mode}&query=${data.query}`,
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      },
    });

    return response?.suggestions || [];
  };

  const getAutocomplete = async (data: IAutocompleteArgs): Promise<boolean> => {
    isLoading.current = true;
    let hasAutocomplete = false;

    try {
      const autocomplete = await getDebouncedAutocomplete<
        IAutocompleteArgs,
        IAutocompleteResponseItem[]
      >(getData)(data);

      setAutocomplete(autocomplete);

      if (autocomplete.length > 0) {
        hasAutocomplete = true;
      }
    } catch (error) {
      console.error(error);
    } finally {
      return hasAutocomplete;
    }
  };

  const setAutocomplete = (autocomplete: IAutocompleteResponseItem[]): void => {
    if (!isLoading.current) {
      return;
    }

    _setAutocomplete(autocomplete);
  };

  const clearAutocomplete = (): void => {
    _setAutocomplete([]);

    isLoading.current = false;
  };

  return [_autocomplete, getAutocomplete, clearAutocomplete];
};
