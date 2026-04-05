import { AboutTribute } from '@/components/home/AboutTribute'
import { FeaturedStories } from '@/components/home/FeaturedStories'
import { HeroSection } from '@/components/home/HeroSection'
import { MissionSelector } from '@/components/home/MissionSelector'
import { Navbar } from '@/components/layout/Navbar'
import React from 'react'

const page = () => {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <MissionSelector/>
    <AboutTribute/>
    <FeaturedStories/>
    </>
  )
}

export default page