import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', children, ...props }, ref) => {
    const variants = {
        primary: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-orange-500/30',
        secondary: 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-blue-500/30',
        ghost: 'bg-transparent border border-white/20 text-white hover:bg-white/10',
        outline: 'bg-transparent border border-slate-700 text-slate-700 hover:bg-slate-50',
    };

    const sizes = {
        default: 'h-10 px-6 py-2',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-12 px-8 text-lg',
        icon: 'h-10 w-10 p-0 flex items-center justify-center',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            ref={ref}
            className={cn(
                'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:pointer-events-none disabled:opacity-50',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
});

Button.displayName = 'Button';

export { Button };
