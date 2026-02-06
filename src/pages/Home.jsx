import React from 'react';
import { Hero } from '../components/sections/Hero';
import { ValueProp } from '../components/sections/ValueProp';
import { Gallery } from '../components/sections/Gallery';
import { NewsSection } from '../components/sections/NewsSection';
import { Career } from '../components/sections/Career';

export function Home() {
    return (
        <>
            <Hero />
            <ValueProp />
            <Gallery limit={3} />
            <NewsSection />
            <Career />
        </>
    );
}
