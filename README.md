# Task Documentation

![Fold_Money](https://github.com/Nishu0/FoldTask/assets/89217455/980015db-ea43-4211-ae9c-df1d14eaf7fa)


# Summary

- [About](#about-task)
- [Flow of Task](#flow-of-task)
- [Features](#features)
- [Built with](#built-with)
- [Development Challenges](#development-challenges)
- [Local Depolyment](#how-to-run)
- [Reference](#reference)


<a id='about'/>

## About Task

- [x] Build a multi-column sortable list of tags using React, it is inspired. The implementation should be without the use of any prebuilt component, such as React Beautiful DND / React Sortable HOC. Refer to the GIF below.

- [x] Create an autocomplete input that displays suggestions via the Stack Exchange Tags API. You may use a prebuilt React component for this (for e.g., react-select).

- [x] Save user-selected tags with respective priorities to persistence storage. If page is reloaded already added tags should not be lost. Use Next.js API routes to create api to read and write data to a file. User authentication is not required. 

- [x] Host a demo on [Vercel](https://vercel.com) platform.


## Flow of Task

![Fold_Task](https://github.com/Nishu0/FoldTask/assets/89217455/53c24ae4-dfe0-4679-bb0b-bf366a41e426)

## Features


1. Multi-Column Sortable Tag List: A multi-column sortable list of tags has been built using React, without reliance on prebuilt components like React Beautiful DND or React Sortable HOC.

2. Autocomplete Input for Tag Suggestions: An autocomplete input has been implemented to display tag suggestions fetched from the Stack Exchange Tags API. A prebuilt React component, such as react-select, has been used for this purpose.

3. Persistence of User-Selected Tags: User-selected tags and their respective priorities have been saved to persistence storage. Even after a page reload, the previously added tags are not lost, thanks to the use of Next.js API routes for reading and writing data to a file. Note that user authentication is not required for this functionality.

4. Demo Hosting: The project has been hosted as a demo on Vercel or another platform of choice, like Netlify. This allows easy access and interaction with the project for others.


## Built With

This project was developed with the following technologies:

#### **Frontend** <sub><sup>React + TypeScript + Next.js</sup></sub>
  - [React](https://pt-br.reactjs.org/)
  - [Axios](https://github.com/axios/axios)
  - [React Select](https://react-select.com/home)
  - [Next.js](https://nextjs.org/)

## Development Challenges

- TypeScript State Type Issues
- Writing Inbuilt Drag and Drop Function

_\* I get learn about so many things while completing the task._

## How to run

- Git Clone or Download Zip
- Run `npm run dev` to start a local development it will be on Port:3000

## Reference

### Stack Exchange Tags API

Docs Link:
https://api.stackexchange.com/docs/tags
 
I'm using this one to pass the query for searching Tags:  
https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&inname=${query.toLowerCase()}&site=stackoverflow

### HTMLLIElement
 
Find out more on:  
https://developer.mozilla.org/en-US/docs/Web/API/HTMLLIElement

## :mailbox_with_mail: Get in touch!

<p align="center">
<a href="https://www.linkedin.com/in/nisarg-thakkar-08811a21a" target="_blank" >
  <img alt="Linkedin - Nisarg Thakkar" src="https://img.shields.io/badge/Linkedin--%23F8952D?style=social&logo=linkedin">
</a>
<a href="mailto:itsnisargthakkar@gmail.com" target="_blank" >
  <img alt="Email - Nisarg Thakkar" src="https://img.shields.io/badge/Email--%23F8952D?style=social&logo=gmail">
</a> 
<br/>
  Made with :coffee: and ❤️ by <b>Nisarg Thakkar</b>.
<p/>
