import create from 'zustand';
import { EDITOR_DEFAULT_VALUE } from './TextEditor.constants';

interface EditorStore {
  contentHtml: string;
  setContentHtml: (content: string) => void;
}

export const useEditorStore = create<EditorStore>()((set) => ({
  contentHtml: EDITOR_DEFAULT_VALUE,
  setContentHtml: (contentHtml) => set({ contentHtml }),
}));
