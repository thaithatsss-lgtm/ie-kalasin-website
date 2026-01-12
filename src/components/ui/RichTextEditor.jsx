import React, { useRef, useEffect } from 'react';
import { Bold, Italic, List, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

export const RichTextEditor = ({ value, onChange }) => {
    const editorRef = useRef(null);
    const isTyping = useRef(false);

    useEffect(() => {
        // Sync external changes to the editor content, but not while typing
        if (editorRef.current && value !== editorRef.current.innerHTML && !isTyping.current) {
            editorRef.current.innerHTML = value || '';
        }
    }, [value]);

    const setCaretToEnd = (element) => {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(element);
        range.collapse(false); // false means collapse to end
        selection.removeAllRanges();
        selection.addRange(range);
        element.focus();
    };

    const handleCommand = (command, value = null) => {
        const editor = editorRef.current;
        if (editor) {
            if (document.activeElement !== editor) {
                setCaretToEnd(editor);
            }
        }
        document.execCommand(command, false, value);
        if (editor) onChange(editor.innerHTML);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = `<img src="${reader.result}" class="rounded-lg my-4 max-w-full" />`;
                const editor = editorRef.current;

                if (editor) {
                    setCaretToEnd(editor);
                }

                const success = document.execCommand('insertHTML', false, img);

                if (!success && editor) {
                    editor.innerHTML += img;
                }

                if (editor) onChange(editor.innerHTML);
            };
            reader.readAsDataURL(file);
        }
        e.target.value = '';
    };

    const handleLink = () => {
        const url = prompt('Enter URL:');
        if (url) handleCommand('createLink', url);
    };

    const handleInput = (e) => {
        isTyping.current = true;
        onChange(e.currentTarget.innerHTML);
        // Reset typing flag after a short delay
        setTimeout(() => { isTyping.current = false; }, 0);
    };

    return (
        <div className="border border-slate-700 rounded-lg overflow-hidden bg-slate-800">
            <div className="flex gap-1 p-2 bg-slate-700/50 border-b border-slate-700">
                <button type="button" onMouseDown={(e) => { e.preventDefault(); handleCommand('bold'); }} className="p-1.5 hover:bg-slate-600 rounded text-slate-300 hover:text-white" title="Bold">
                    <Bold className="w-4 h-4" />
                </button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); handleCommand('italic'); }} className="p-1.5 hover:bg-slate-600 rounded text-slate-300 hover:text-white" title="Italic">
                    <Italic className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-slate-600 mx-1" />
                <button type="button" onMouseDown={(e) => { e.preventDefault(); handleCommand('insertUnorderedList'); }} className="p-1.5 hover:bg-slate-600 rounded text-slate-300 hover:text-white" title="List">
                    <List className="w-4 h-4" />
                </button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); handleLink(); }} className="p-1.5 hover:bg-slate-600 rounded text-slate-300 hover:text-white" title="Link">
                    <LinkIcon className="w-4 h-4" />
                </button>
                <label className="p-1.5 hover:bg-slate-600 rounded text-slate-300 hover:text-white cursor-pointer" title="Insert Image">
                    <ImageIcon className="w-4 h-4" />
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
            </div>
            <div
                ref={editorRef}
                className="p-4 min-h-[200px] text-slate-300 focus:outline-none prose prose-invert max-w-none [&_img]:max-w-full [&_img]:rounded-lg [&_img]:my-4"
                contentEditable
                onInput={handleInput}
                suppressContentEditableWarning={true}
            />
        </div>
    );
};
