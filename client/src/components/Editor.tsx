import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import {
	Bold as BoldIcon,
	Italic,
	Underline as UnderlineIcon,
	AlignCenter,
	Highlighter,
	AlignLeft,
} from "lucide-react";
import { Blog } from "@/pages/Home";

export default function Editor({
	description,
	onChange,
}: {
	description: string;
	onChange: (text: string) => void;
}) {
	const editor = useEditor({
		extensions: [
			StarterKit.configure(),
			Bold,
			Underline,
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			Heading.configure({
				levels: [1, 2, 3],
			}),
			Highlight,
		],
		content: description,
		editorProps: {
			attributes: {
				class:
					"h-[500px] w-full sm:w-[900px] sm:h-[350px] border p-2 rounded-md overflow-auto text-md light:bg-white outline-none border-white prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc",
			},
		},
		onUpdate({ editor }) {
			onChange(editor.getHTML());
		},
	});
	if (!editor) return null;
	// editor.commands.setContent(blog?.content!);
	return (
		<div className="flex flex-col gap-2">
			<div className="flex gap-3 border rounded-sm p-2 border-white w-[900px]">
				<BoldIcon
					className={`hover:cursor-pointer ${
						editor.isActive("bold") ? "is-active" : ""
					}`}
					onClick={() => editor.chain().focus().toggleBold().run()}
				/>
				<Italic
					className={`hover:cursor-pointer ${
						editor.isActive("italic") ? "is-active" : ""
					}`}
					onClick={() => editor.chain().focus().toggleItalic().run()}
				/>
				<UnderlineIcon
					className={`hover:cursor-pointer ${
						editor.isActive("underline") ? "is-active" : ""
					}`}
					onClick={() => editor.chain().focus().toggleUnderline().run()}
				/>
				<AlignCenter
					className={`hover:cursor-pointer ${
						editor.isActive({ textAlign: "center" }) ? "is-active" : ""
					}`}
					onClick={() => editor.chain().focus().setTextAlign("center").run()}
				/>
				<AlignLeft
					className={`hover:cursor-pointer ${
						editor.isActive({ textAlign: "left" }) ? "is-active" : ""
					}`}
					onClick={() => editor.chain().focus().setTextAlign("left").run()}
				/>
				<Highlighter
					className={`hover:cursor-pointer ${
						editor.isActive("highlight") ? "is-active" : ""
					}`}
					onClick={() => editor.chain().focus().toggleHighlight().run()}
				/>
			</div>
			<EditorContent className="w-full sm:w-[700px]" editor={editor} />
		</div>
	);
}
