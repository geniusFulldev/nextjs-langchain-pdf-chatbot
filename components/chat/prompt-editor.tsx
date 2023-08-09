'use client'

import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'; 
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface PromptEditorProps {
    handleSubmit: (value: string) => void;
    loading: boolean;
}
const PromptEditor: React.FC<PromptEditorProps> = ({ 
    handleSubmit,
    loading=false
}) => {
    const [textInput, setTextInput] = useState<string>("");
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextInput(e.target.value);
    }
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        textAreaRef.current?.focus();
      }, []);
    

    const onTextSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const strInput = textInput.trim();
        if(strInput === "") {
            return;
        }

        handleSubmit(strInput);
        setTextInput("");
    }

    return (
        <div className="relative my-3">
            <textarea
                disabled={loading}
                onKeyDown={(e) => {
                    e.code === "Enter" && onTextSubmit(e);
                  }}
                ref={textAreaRef}
                autoFocus={false}
                rows={1}
                maxLength={512}
                id="userInput"
                name="userInput"
                placeholder={
                    loading
                    ? 'Waiting for response...'
                    : 'Type your question'
                }
                value={textInput}
                onChange={handleChange}
                className="w-full rounded-lg py-4 px-8 border-slate-500 border-2 focus:ring-pink-50 flex items-center text-[16px] resize-none"
            />
            <button 
                className="absolute right-3 top-4 w-7 h-7 rounded-full text-pink-400 hover:text-pink-600"
                disabled={loading}
            >
                <FontAwesomeIcon icon={faPaperPlane} className="w-full h-full"/>
            </button>
        </div>
    );
}

export default PromptEditor;
