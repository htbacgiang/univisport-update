import { FC, useEffect, useState, useRef } from "react";
import { useEditor, EditorContent, getMarkRange, Range } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import TipTapImage from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import ToolBar from "./ToolBar";
import EditLink from "./Link/EditLink";
import GalleryModal, { ImageSelectionResult } from "./GalleryModal";
import axios from "axios";

interface Props {
  content: string;
  onChange: (content: string) => void;
}

const SimpleEditor: FC<Props> = ({ content, onChange }): JSX.Element => {
  const [selectionRange, setSelectionRange] = useState<Range>();
  const [showGallery, setShowGallery] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<{ src: string; altText?: string; id?: string }[]>([]);
  const isInternalUpdateRef = useRef(false);
  const previousContentRef = useRef<string>("");

  const fetchImages = async () => {
    try {
      const { data } = await axios("/api/image");
      setImages(data.images || []);
    } catch (error) {
      setImages([]);
    }
  };

  const handleImageUpload = async (imageData: File | { file: File; altText: string }) => {
    setUploading(true);
    try {
      const formData = new FormData();
      if (imageData instanceof File) {
        formData.append("image", imageData);
      } else {
        formData.append("image", imageData.file);
        formData.append("altText", imageData.altText);
      }
      const { data } = await axios.post("/api/image", formData);
      setImages([data, ...images]);
      await fetchImages();
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: "",
        },
      }),
      Placeholder.configure({
        placeholder: "Nhập tổng quan bài viết...",
      }),
      Youtube.configure({
        HTMLAttributes: {
          class: "w-full aspect-video",
        },
      }),
      TipTapImage.configure({
        HTMLAttributes: {
          class: "mx-auto",
        },
      }),
    ],
    editorProps: {
      handleClick: (view: any, pos: number) => {
        const { state } = view;
        const selectionRange = getMarkRange(
          state.doc.resolve(pos),
          state.schema.marks.link
        );
        if (selectionRange) setSelectionRange(selectionRange);
      },
      attributes: {
        class:
          "blog prose prose-lg focus:outline-none max-w-full mx-auto h-full min-h-[300px] p-4",
      },
    },
    content: content,
    onUpdate: ({ editor }) => {
      isInternalUpdateRef.current = true;
      const newContent = editor.getHTML();
      previousContentRef.current = newContent;
      onChange(newContent);
      setTimeout(() => {
        isInternalUpdateRef.current = false;
      }, 0);
    },
  });

  const handleImageSelection = (result: ImageSelectionResult) => {
    editor?.chain().focus().setImage({ src: result.src, alt: result.altText }).run();
  };

  useEffect(() => {
    if (editor && selectionRange) {
      editor.commands.setTextSelection(selectionRange);
    }
  }, [editor, selectionRange]);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (editor) {
      const currentContent = editor.getHTML();
      if (isInternalUpdateRef.current) return;
      
      if (currentContent !== content && content !== previousContentRef.current) {
        if (editor.isFocused) return;
        editor.commands.setContent(content, false);
        previousContentRef.current = content;
      }
    }
  }, [content, editor]);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <div className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
        <ToolBar
          editor={editor}
          onOpenImageClick={() => setShowGallery(true)}
        />
      </div>
      <div className="relative">
        {editor && <EditLink editor={editor} />}
        <EditorContent editor={editor} />
      </div>
      <GalleryModal
        visible={showGallery}
        onClose={() => setShowGallery(false)}
        onSelect={handleImageSelection}
        onFileSelect={handleImageUpload}
        uploading={uploading}
        images={images}
      />
    </div>
  );
};

export default SimpleEditor;
