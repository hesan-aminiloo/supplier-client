/* eslint-disable react/self-closing-comp */
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';
import Underline from '@tiptap/extension-underline';
import clsx from 'clsx';
import { ITextEditorProps } from './TextEditor.types';
import { MenuBar } from './MenuBar';

import styles from './TextEditor.module.scss';
import { useEditorStore } from './TextEditor.store';

export const TextEditor = ({ label, className, helperText = '', status = 'none', error = '' }: ITextEditorProps) => {
  const setEditorContent = useEditorStore((s) => s.setContentHtml);
  const contentHtml = useEditorStore((s) => s.contentHtml);

  const editor = useEditor({
    content: contentHtml,
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        blockquote: false,
      }),
      Underline,
      BulletList,
      OrderedList,
      ListItem,
      Link.extend({
        inclusive: false,
      }).configure({ openOnClick: false }),
    ],
    onUpdate({ editor: ed }) {
      const html = ed.getHTML();
      setEditorContent(html);
    },
  });

  return editor ? (
    <div className={clsx(className)}>
      <span className="text-neutral-900 font-medium block mb-1 text-sm">{label}</span>
      <div
        className={clsx(
          'relative h-full rounded-lg bg-gray-50 flex items-center border border-neutral-200 shadow-xs p-3',
          styles.editor,
          {
            'border !border-destructive-400': error && !contentHtml,
          }
        )}
      >
        <MenuBar editor={editor} />
        <div className={clsx('w-full pt-12 top-8 overflow-auto', styles.editor__content)}>
          <EditorContent editor={editor} />
        </div>
      </div>
      {!!helperText && status !== 'error' && (
        <span className="inline-block pt-2 text-neutral-500 font-normal text-xs">{helperText}</span>
      )}
      {status === 'error' && !contentHtml && (
        <span className="text-destructive-500 inline-block pt-2 text-xs">{error as string}</span>
      )}
    </div>
  ) : null;
};
