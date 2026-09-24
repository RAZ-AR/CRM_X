import type { AppState } from "./types";

/** Пустое состояние для браузера: реальные данные приходят только с сервера. */
export const EMPTY_STATE: AppState = {
  users: [],
  zones: [],
  tasks: [],
  comments: [],
  subtasks: [],
  wiki: [],
  contacts: [],
  notices: [],
  broadcast: null,
  activity: [],
};
