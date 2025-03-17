import React from 'react';

interface prop {
    text: string;
}

const LineText: React.FC<prop> = ({ text }) => {
    return (
      <div className="flex items-center w-[85%] mx-auto my-[-15px]">
        <span className="flex-1 border-t"></span>
        <span className="px-2 text-center flex items-center font-light">{text}</span>
        <span className="flex-1 border-t"></span>
      </div>
    );
};

export default LineText;