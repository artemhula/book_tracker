import React from 'react';

type ButtonProps = {
  text: string;
  disabled?: boolean;
};

export default function Button({ text, disabled }: ButtonProps) {
  return (
    <button
      type="submit"
      className="px-4 py-2 w-25 bg-gray-800 font-geist text-white rounded-lg"
      disabled={disabled ?? false}
    >
      {text}
    </button>
  );
}
