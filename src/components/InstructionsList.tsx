import React from 'react';

interface InstructionsListProps {
  instructions: string[];
}

const InstructionsList: React.FC<InstructionsListProps> = ({ instructions }) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-gray-900 mb-3">Instructions</h3>
      <ol className="space-y-4">
        {instructions.map((instruction, index) => (
          <li key={index} className="flex">
            <span className="h-6 w-6 rounded-full bg-amber-600 flex items-center justify-center text-white font-medium text-sm mr-3">
              {index + 1}
            </span>
            <span className="text-gray-700 flex-1 pt-0.5">{instruction}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default InstructionsList;