import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

export interface Option {
  value: string;
  label: string;
}

interface AutoCompleteInputProps {
  id: number; 
  onChange: (option: Option, id: number) => void; 
}

const AutoCompleteInput = ({ id, onChange }: AutoCompleteInputProps) => {
  const [inputValue, setInputValue] = useState<string>(''); 
  const [options, setOptions] = useState<Option[]>([]); 

  const fetchTags = async (query: string) => {
    try {
      const response = await axios.get(`https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&inname=${query.toLowerCase()}&site=stackoverflow`);
      const data = response.data;
      const tags = data.items.map((item: any) => ({
        value: item.name,
        label: item.name,
      }));
      return tags;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    let isMounted = true; 
    const timeoutId = setTimeout(() => {
      if (inputValue) {
        fetchTags(inputValue).then((tags: Option[]) => {
          if (isMounted) {
            setOptions(tags);
          }
        });
      }
    }, 500); 
    return () => {
      isMounted = false; 
      clearTimeout(timeoutId); 
    };
  }, [inputValue]);

  return (
        <div className="autoCompleteInputContainer">
          <Select
            id={`autoCompleteInput-${id}`} 
            value={null} 
            options={options} 
            onInputChange={handleInputChange} 
            onChange={(option: Option | null) => option && onChange(option, id)} 
            placeholder="Type to search"
            noOptionsMessage={() => 'No tags found'} 
            isLoading={inputValue ? !options.length : undefined} 
          />
        </div>
      );
    };

    export default AutoCompleteInput;

