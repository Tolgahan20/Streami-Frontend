import { messagesEn } from "./messages.en";
import { messagesTr } from "./messages.tr";

export type SupportedLocale = "en" | "tr";

const dictionaries = {
  en: messagesEn,
  tr: messagesTr,
};

export const getMessages = (locale: SupportedLocale) => dictionaries[locale];

export type Messages = ReturnType<typeof getMessages>;

