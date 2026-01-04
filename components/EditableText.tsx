
import React, { useState } from 'react';

interface EditableTextProps {
  text: string;
  isEditMode: boolean;
  onSave: (newText: string) => void;
  className?: string;
  multiline?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({ text, isEditMode, onSave, className = "", multiline = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [val, setVal] = useState(text);

  if (!isEditMode) {
    return <span className={className}>{text}</span>;
  }

  if (isEditing) {
    return (
      <div className="relative group inline-block w-full">
        {multiline ? (
          <textarea
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className={`w-full bg-black/50 border border-yellow-500 text-white p-2 rounded focus:outline-none ${className}`}
            rows={4}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className={`w-full bg-black/50 border border-yellow-500 text-white px-2 py-1 rounded focus:outline-none ${className}`}
            autoFocus
          />
        )}
        <div className="absolute right-0 top-full mt-1 flex space-x-1 z-10">
          <button 
            onClick={() => { onSave(val); setIsEditing(false); }}
            className="bg-green-600 text-white p-1 rounded hover:bg-green-500 text-xs"
          >
            ✓
          </button>
          <button 
            onClick={() => { setVal(text); setIsEditing(false); }}
            className="bg-red-600 text-white p-1 rounded hover:bg-red-500 text-xs"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }

  return (
    <span 
      className={`${className} cursor-pointer border-b border-dashed border-yellow-500/50 hover:bg-yellow-500/10 transition-colors`}
      onClick={() => setIsEditing(true)}
    >
      {text}
    </span>
  );
};

export default EditableText;
