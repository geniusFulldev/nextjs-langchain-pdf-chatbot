'use client'

import React, {ButtonHTMLAttributes} from 'react'
import classnames from 'classnames';
import LoadingDots from './loading-dots';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({
    loading = false,
    disabled = false,
    className,
    size='medium',
    children,
    ...rest
}) => {

    const rootClassName = classnames(
        "flex items-center justify-center rounded-md bg-primary text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp", 
        className, 
        {
            "py-2 px-3": size === 'small',
            "py-3 px-5": size === 'medium',
            "py-4 px-9": size === 'large'
        }
    );

    return (
        <button 
            className={rootClassName} 
            disabled={disabled || loading}
            {...rest}
        >
        { loading? (
            <LoadingDots />
        ):(
            <>{children}</>
        )}
        </button>

    )
}

export default Button;
