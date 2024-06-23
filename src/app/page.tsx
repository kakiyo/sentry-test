"use client"
import {Inter} from 'next/font/google'
import styles from './page.module.css'
import {TodoInput} from "@Component/compnent/TodoInput";
import {ConfigProvider} from "antd";

export default function Home() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#000000',
                },
            }}
        >
        <main className={styles.main}>
           <TodoInput/>
        </main>
        </ConfigProvider>
    )
}
