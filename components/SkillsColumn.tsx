"use client";
import React from 'react';

interface Skill {
  id: number;
  name: string;
}

interface SkillsColumnProps {
  skills: Skill[];
  handleDragStart: (e: React.DragEvent<HTMLLIElement>, id: number) => void;
  handleDrop: (e: React.DragEvent<HTMLLIElement>, index: number) => void;
  handleDragOver: (e: React.DragEvent<HTMLLIElement>) => void;
}

const SkillsColumn: React.FC<SkillsColumnProps> = ({
  skills,
  handleDragStart,
  handleDrop,
  handleDragOver,
}) => {
  return (
    <ul className="skillsList">
      {skills.map((skill, index) => (
        <li
          key={skill.id}
          className="skillsListItem"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          draggable={true}
          onDragStart={(e) => handleDragStart(e, skill.id)}
        >
          <div>
            <span className="span">
              {skill.id}. {skill.name}
            </span>
            <button type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#000"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SkillsColumn;
