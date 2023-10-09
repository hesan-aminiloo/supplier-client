import { useCallback } from 'react';
import { Editor } from '@tiptap/react';
import clsx from 'clsx';
import styles from './TextEditor.module.scss';
import { Icon } from '../icon';
import { IMenuItemProps } from './TextEditor.types';

const MenuItemButton = ({ onClick, children, isActive, disabled }: IMenuItemProps) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      disabled={disabled}
      className={clsx('p-2 flex justify-center items-center rounded-md', styles['editor-menu-bar__menu-item'], {
        'bg-gray-200': isActive,
      })}
    >
      {children}
    </button>
  );
};

export const MenuBar = ({ editor }: { editor: Editor }) => {
  const setLink = useCallback(() => {
    if (editor) {
      const previousUrl = editor.getAttributes('link').href;
      const url = window.prompt('URL', previousUrl);

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();

        return;
      }

      // update link
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div
      className={clsx('flex bg-white border-b border-neutral-200 py-1 px-2 rounded-t-md', styles['editor-menu-bar'])}
    >
      <div className="flex pr-2 mr-2 border-r border-neutral-200">
        <MenuItemButton
          disabled={!editor.can().chain().focus().toggleBold().run()}
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
        >
          <Icon
            name="bold"
            size="sm"
          />
        </MenuItemButton>

        <MenuItemButton
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
        >
          <Icon
            name="italic"
            size="sm"
          />
        </MenuItemButton>

        <MenuItemButton
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
        >
          <Icon
            name="underline"
            size="sm"
          />
        </MenuItemButton>
      </div>

      <div className="flex pr-2 mr-2 border-r border-neutral-200">
        <MenuItemButton
          disabled={!editor.can().chain().focus().toggleBulletList().run()}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
        >
          <Icon
            name="ul"
            size="sm"
          />
        </MenuItemButton>
        <MenuItemButton
          disabled={!editor.can().chain().focus().toggleOrderedList().run()}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
        >
          <Icon
            name="ol"
            size="sm"
          />
        </MenuItemButton>
      </div>

      <MenuItemButton
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        onClick={setLink}
        isActive={editor.isActive('link')}
      >
        <Icon
          name="link"
          size="sm"
        />
      </MenuItemButton>
    </div>
  );
};
