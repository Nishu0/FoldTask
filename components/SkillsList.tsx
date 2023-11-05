"use client";
import React, { useState, useEffect, useRef } from 'react';
import AutoCompleteInput, {Option} from './AutoCompleteInput';
import axios from 'axios';


interface Skill {
  id: number;
  name: string;
}


const SkillsList = () => {

  const [showButtons, setShowButtons] = useState<Record<number, boolean>>({}); 

  const [skills, setSkills] = useState<Skill[]>(Array.from({length: 10}, (_, i) => ({id: i + 1, name: ''})));

  const [editing, setEditing] = useState<Record<number, boolean>>({});
  const [firstEmptySlot, setFirstEmptySlot] = useState<number>(1);
  const addSkillInputRef = useRef<HTMLInputElement>(null);

  const saveSkillsToApi = (updatedSkills: Skill[]) => {
    axios.post('/api/skills', { skills: updatedSkills }) // Call the API route
      .then((response) => {
        console.log('Skills saved successfully.');
      })
      .catch((error) => {
        console.error('Failed to save skills:', error);
      });
  };

  const handleClick = (id: number) => {
    if (id === firstEmptySlot) {
      setEditing({...editing, [id]: true});
      if (addSkillInputRef.current) {
        addSkillInputRef.current.focus();
      }
    }
  };

  const handleChange = (option: Option, id: number) => {
    if (id === firstEmptySlot) {
      const updatedSkills= skills.map((skill) =>
      skill.id === id ? { ...skill, name: option.value } : skill
      )
      setSkills(updatedSkills);
      saveSkillsToApi(updatedSkills);
      setEditing({...editing, [id]: false});
      setShowButtons({...showButtons, [id]: option.value !== ''});
      if (option.value !== '') {
        //Finding next empty slot for highlighting and editing :))) 
        const nextEmptySlot = skills.find((skill) => skill.id > id && skill.name === '');
        if (nextEmptySlot) {
          setFirstEmptySlot(nextEmptySlot.id);
        }
      }
      localStorage.setItem('skills', JSON.stringify(updatedSkills));
    }
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
    newSkills.forEach((s, idx) => (s.id = idx + 1));
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
  const savedSkills: Skill[] = JSON.parse(localStorage.getItem('skills') || '[]');
  setSkills(savedSkills);
  const emptySkill = savedSkills.find((skill) => skill.name === '');
  if (emptySkill) {
    setFirstEmptySlot(emptySkill.id);
  }
}, []);


return (
  <form>
  <section className='skillsListContainer'>
    <div className='skillsListColumn'>
      <ul className="skillsList">
        {skills.slice(0, 5).map((skill, index) => (
            <li
                key={skill.id}
                className={`skillsListItem ${skill.id === firstEmptySlot ? 'highlight' : ''}`}
                tabIndex={0} 
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
                <span className='span' onClick={() => handleClick(skill.id)} tabIndex={skill.name ? -1 : 0}>
                  {skill.id}. {skill.name  || 'Add Skill'}
                </span>
              )}
              {showButtons[skill.id] &&  (
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
                  className={`skillsListItem ${skill.id === firstEmptySlot ? 'highlight' : ''}`}
                  tabIndex={0}
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
                  <span className='span' onClick={() => handleClick(skill.id)} tabIndex={skill.name ? -1 : 0}>
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