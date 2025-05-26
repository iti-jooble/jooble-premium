import { useState, useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { initAiAssistant } from "@/redux/thunks";
import { IPromptConfig } from "@/types/state/cvBuilder.types";
import { IUseAIAssistanceProps } from "../types";
import { States, Prompts } from "../enums";

const useAIAssistance = ({
  insertResponse,
  config,
  onGenerate,
  onRephrase,
  onFixSpelling,
  onRetry,
  onClearResponse,
}: IUseAIAssistanceProps) => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<States>(States.Initial);
  const [response, setResponse] = useState<string | string[]>("");
  const [lastPrompt, setLastPrompt] = useState<Prompts | null>(null);

  const sendRequest = async (prompt: IPromptConfig): Promise<void> => {
    setState(States.Loading);

    const response = await dispatch(initAiAssistant(prompt)).unwrap();

    if (!response) {
      setState(States.Initial);

      return;
    }

    if (config.responseType === "array") {
      setResponse(Array.from(JSON.parse(response)));
    } else {
      setResponse(response);
    }

    setState(States.Response);
  };

  const handleGenerate = async (): Promise<void> => {
    if (config.prompts.generate) {
      setLastPrompt(Prompts.generate);
      await sendRequest(config.prompts.generate);
    }
  };

  const handleRephrase = async (): Promise<void> => {
    if (config.prompts.rephrase) {
      setLastPrompt(Prompts.rephrase);
      await sendRequest(config.prompts.rephrase);
    }
  };

  const handleFixSpelling = async (): Promise<void> => {
    if (config.prompts.fixSpelling) {
      setLastPrompt(Prompts.fixSpelling);
      await sendRequest(config.prompts.fixSpelling);
    }
  };

  const handleClearResponse = (text?: string): void => {
    if (config.responseType === "array" && response.length > 1) {
      setResponse(
        (response as string[]).filter((item: string) => item !== text),
      );

      return;
    }

    setResponse("");
    setState(States.Initial);
  };

  const handleRetryClick = (): void => {
    if (!lastPrompt) {
      return;
    }

    onRetry?.();

    switch (lastPrompt) {
      case Prompts.generate:
        handleGenerate();

        break;
      case Prompts.rephrase:
        handleRephrase();

        break;
      case Prompts.fixSpelling:
        handleFixSpelling();

        break;
      default:
    }
  };

  const handleGenerateClick = async (): Promise<void> => {
    onGenerate?.();
    handleGenerate();
  };

  const handleRephraseClick = async (): Promise<void> => {
    onRephrase?.();
    handleRephrase();
  };

  const handleFixSpellingClick = async (): Promise<void> => {
    onFixSpelling?.();
    handleFixSpelling();
  };

  const handleClearResponseClick = (text?: string): void => {
    onClearResponse?.();
    handleClearResponse(text);
  };

  const handleInsertResponseClick = (text: string): void => {
    insertResponse(text);
    handleClearResponse(text);
  };

  useEffect(() => {
    if (config.requestOnMount) {
      handleGenerate();
    }
  }, []);

  return {
    state,
    response,
    handleGenerateClick,
    handleRephraseClick,
    handleFixSpellingClick,
    handleClearResponseClick,
    handleInsertResponseClick,
    handleRetryClick,
  };
};

export default useAIAssistance;
