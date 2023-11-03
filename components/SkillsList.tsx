"use client";
import React, { useState } from 'react';


const SkillsList = () => {
  const [skills, setSkills] = useState([
    { id: 1, name: 'Node.js' },
    { id: 2, name: 'React' },
    { id: 3, name: 'JavaScript' },
    { id: 4, name: 'HTML' },
    { id: 5, name: 'CSS' },
  ]);

const handleDragStart = (e: React.DragEvent<HTMLLIElement>, id: number) => {
        e.dataTransfer.setData('text/plain', id.toString());
};

const handleDrop = (e: React.DragEvent<HTMLLIElement>, index: number) => {
                e.preventDefault();
                const id = e.dataTransfer.getData('text/plain');
                const newSkills = [...skills];
                const skill = newSkills.find((s) => s.id === parseInt(id, 10));
                if (skill) {
                        newSkills.splice(newSkills.indexOf(skill), 1);
                        newSkills.splice(index, 0, skill);
                        setSkills(newSkills);
                }
};

const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
};

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
            <span className='span'>
              {skill.id}. {skill.name}
            </span>
            <button type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#000" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button> 
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SkillsList;