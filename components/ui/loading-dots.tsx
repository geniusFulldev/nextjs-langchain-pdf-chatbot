'use client'

import styles from '@/styles/dots.module.css';

export default function LoadingDots() {
    return (
        <div className="relative flex justify-center items-center h-6">
            <div className={styles.dotpulse} />
        </div>
    )
}