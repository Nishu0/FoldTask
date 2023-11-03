import Image from 'next/image'
import SkillsList from '@/components/SkillsList'

export default function Home() {
  return (
    <>
    <ul className='p-5 mt-20 ml-14 text-black-600 list-disc marker:text-black-600'>
        <li>Things you're good at!</li>
    </ul>
    <div className='wrapper'>
      
      <p>The skills you mentioned here will help the hackathon organizers in assessing you as potential participant</p>
      <SkillsList />
      

    </div>
    
    </>
    
  )
}
