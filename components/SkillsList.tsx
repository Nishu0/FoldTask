"use client";
import React, { useState, useEffect, useRef } from 'react';
import AutoCompleteInput, {Option} from './AutoCompleteInput';
import axios from 'axios';


interface Skill {
  id: number;
  name: string;
}

interface ShowButtons {
  [key: number]: boolean;
}


const SkillsList = () => {

  const [showButtons, setShowButtons] = useState<ShowButtons>({}); 

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

const handleRemoveSkill = (id: number) => {
  const updatedSkills = skills.map((skill) =>
    skill.id === id ? { ...skill, name: '' } : skill
  );
  const nonEmptySkills = updatedSkills.filter((skill) => skill.name);
  const emptySkills = updatedSkills.filter((skill) => !skill.name);
  const sortedSkills = nonEmptySkills.map((skill, index) => ({
    id: index + 1,
    name: skill.name,
  }));
  emptySkills.forEach((skill) => {
    sortedSkills.push({ id: sortedSkills.length + 1, name: skill.name });
  });
  setSkills(sortedSkills);
  localStorage.setItem('skills', JSON.stringify(sortedSkills));
  const updatedShowButtons: { [key: number]: boolean } = {};
    sortedSkills.forEach((skill) => {
      updatedShowButtons[skill.id] = skill.name !== '';
    });
    setShowButtons(updatedShowButtons);
  const firstEmpty = sortedSkills.find((skill) => !skill.name);
  if (firstEmpty) {
    setFirstEmptySlot(firstEmpty.id);
  }
};

useEffect(() => {
  let savedSkills: Skill[] = JSON.parse(localStorage.getItem('skills') || '[]');
  setSkills(savedSkills);
  if (savedSkills.length === 0) {
    savedSkills = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: '' }));
    localStorage.setItem('skills', JSON.stringify(savedSkills));
  }
  const updatedShowButtons: { [key: number]: boolean } = savedSkills.reduce((acc, skill) => {
    if (skill.name) {
      acc[skill.id] = true;
    }
    return acc;
  }, {} as { [key: number]: boolean });
  const emptySkill = savedSkills.find((skill) => skill.name === '');
  if (emptySkill) {
    setFirstEmptySlot(emptySkill.id);
  }
  setShowButtons(updatedShowButtons);
}, []);


return (
  <form>
  <section className='skillsListContainer'>
    <div className='skillsListColumn'>
      <ul className="skillsList">
        {skills.slice(0, 5).map((skill, index) => (
            <li
                key={skill.id}
                className={`skillsListItem ${skill.id === firstEmptySlot ? 'highlight' : ''} ${skill.name ? 'nonEmpty' : ''}`}
                tabIndex={0} 
                onDragOver={(e)=>handleDragOver(e,skill.id)}
                onDrop={(e) => handleDrop(e, index)}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, skill.id)}
            >
              <div className={`div ${skill.name ? 'selectedSkill' : ''}`}>
              {editing[skill.id] ? (
                <AutoCompleteInput
                  id={skill.id} 
                  onChange={(option) => handleChange(option, skill.id)} 
                />
              ) : (
                <div onClick={() => handleClick(skill.id)}> 
                <span className='span' tabIndex={skill.name ? -1 : 0}>
                  {skill.id}. {skill.name  || 'Add Skill'}
                </span>
                </div>
              )}
              {showButtons[skill.id] &&  (
                <button type="button" onClick={() => handleRemoveSkill(skill.id)}>
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
                  <button type="button" onClick={() => handleRemoveSkill(skill.id)}>
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