"use client";
import React, { useState, useEffect } from 'react';
import AutoCompleteInput, {Option} from './AutoCompleteInput';

interface Skill {
  id: number;
  name: string;
}


const SkillsList = () => {

  const [showButtons, setShowButtons] = useState<Record<number, boolean>>({}); 

  const [skills, setSkills] = useState<Skill[]>(Array.from({length: 10}, (_, i) => ({id: i + 1, name: ''})));

  const [editing, setEditing] = useState<Record<number, boolean>>({});

  const handleClick = (id: number) => {
    setEditing({...editing, [id]: true});
  };

  const handleChange = (option: Option, id: number) => {
    setSkills(skills.map(skill => skill.id === id ? {...skill, name: option.value} : skill));
    setEditing({...editing, [id]: false});
    setShowButtons({...showButtons, [id]: option.value !== ''});
  };

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

const handleDragOver = (e: React.DragEvent<HTMLLIElement>, id:number) => {
    e.preventDefault();
    const draggedSkill = skills.find((s) => s.id === id);
    if (draggedSkill && draggedSkill.name !== '') {
      e.dataTransfer.dropEffect = 'move';
    } else {
      e.dataTransfer.dropEffect = 'none';
    }
};

useEffect(() => {
  setSkills(
    skills.map((skill, index) => ({
      ...skill,
      id: index + 1,
    }))
  );
}, [skills]);

return (
  <form>
  <section className='skillsListContainer'>
    <div className='skillsListColumn'>
      <ul className="skillsList">
        {skills.slice(0, 5).map((skill, index) => (
            <li
                key={skill.id}
                className="skillsListItem"
                onDragOver={(e)=>handleDragOver(e,skill.id)}
                onDrop={(e) => handleDrop(e, index)}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, skill.id)}
            >
              <div>
              {editing[skill.id] ? (
                <AutoCompleteInput
                  id={skill.id} 
                  onChange={(option) => handleChange(option, skill.id)} 
                />
              ) : (
                <span className='span' onClick={() => handleClick(skill.id)}>
                  {skill.id}. {skill.name  || 'Add Skill'}
                </span>
              )}
              {showButtons[skill.id] && (
                <button type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#000" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button> 
              )}
              </div>
            </li>
        ))}
      </ul>
    </div>
    <div className="skillsListColumn">
        <ul className="skillsList">
          {skills.slice(5).map((skill, index) => (
              <li
                  key={skill.id}
                  className="skillsListItem"
                  onDragOver={(e)=>handleDragOver(e,skill.id)}
                  onDrop={(e) => handleDrop(e, index + 5)}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, skill.id)}
              >
                <div>
                {editing[skill.id] ? (
                <AutoCompleteInput
                  id={skill.id} 
                  onChange={(option) => handleChange(option, skill.id)} 
                />
              ) : (
                  <span className='span' onClick={() => handleClick(skill.id)}>
                    {skill.id}. {skill.name || 'Add Skill'}
                  </span>
              )}
                {showButtons[skill.id] && (
                  <button type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#000" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button> 
                )}
                </div>
              </li>
          ))}
        </ul>
    </div>
  </section>
  </form>
);};

export default SkillsList;