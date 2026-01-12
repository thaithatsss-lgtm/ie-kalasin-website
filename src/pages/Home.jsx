import React from 'react';
import { Hero } from '../components/sections/Hero';
import { ValueProp } from '../components/sections/ValueProp';
import { Gallery } from '../components/sections/Gallery';
import { Career } from '../components/sections/Career';

export function Home() {
    return (
        <>
            <Hero />
            <ValueProp />
            <Gallery />
            <Career />
        </>
    );
}
