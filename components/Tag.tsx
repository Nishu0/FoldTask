"use client";
import React, { useState } from "react";

interface TagProps {
  sortedNo: number; 
  onChange: (sortedNo: number, tagName: string) => void; 
}

interface TagState {
  inputValue: string; 
  showInput: boolean; 
}

//Handle Events

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
};
const handleInputFocus = () => {
    console.log("handleInputFocus");
};

const handleInputBlur = () => {
    console.log("handleInputBlur");
};

const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    
};
const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    
};
