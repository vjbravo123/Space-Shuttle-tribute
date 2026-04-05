"use client"
import React, { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { StoryPageHeader } from '@/components/forms/StoryPageHeader'
import { StoryForm } from '@/components/forms/StoryForm'
import { StoryPageBackground } from '@/components/stories/StoryPageBackground'
import { Footer } from '@/components/home/Footer'

const ShareStoryPage = () => {
    const [selectedMission, setSelectedMission] = useState<'challenger' | 'columbia'>('challenger');

    return (
        <>
            <Navbar />
            <StoryPageBackground activeMission={selectedMission} />
            
            <main className="relative z-10">
                <StoryPageHeader 
                    activeMission={selectedMission} 
                    onMissionChange={(m) => setSelectedMission(m)} 
                />
                <StoryForm activeMission={selectedMission} />
            </main>

            <Footer />
        </>
    )
}

export default ShareStoryPage