'use client';

import Motion from "./Animation";

export default function SequentialAnimate({children, stagger}: {children: React.ReactNode, stagger?: number}) {
    const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
        
        when: "beforeChildren", 
        staggerChildren: stagger
        }
    }
    }
    return (
        <Motion variants={containerVariants} initial="hidden" animate="visible">
            {children}
        </Motion>
    )    

}