"use client";
import {Button} from "antd";
import {useAtom} from "jotai";
import {todoListAtom} from "@Component/store/todoListAtom";
import {useCallback, useState} from "react";
import {inputAtom} from "@Component/store/inputAtom";
import {motion} from "framer-motion";


export const TodoInputAddButton = ({isTodoAllDone}: { isTodoAllDone: boolean }) => {
    const [_, setTodoList] = useAtom(todoListAtom)
    const [inputValue, setInputValue] = useAtom(inputAtom)
    const [isMouseEnter, setIsMouseEnter] = useState(false)

    const addTodo = useCallback(() => {
        if (!isTodoAllDone || !inputValue) {
            return
        }
        setTodoList(prev => {
            return prev.concat([{content: inputValue, isDone: false}])
        })
        setInputValue("")
    }, [inputValue, isTodoAllDone, setInputValue, setTodoList])

    const handleMouseEnter = useCallback(() => {
        setIsMouseEnter(true)
    }, [])

    const handleMouseLeaver = useCallback(() => {
        setIsMouseEnter(false)
    }, [])

    return (
        <Button danger={!inputValue && isMouseEnter} onClick={addTodo} onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeaver}>
            <motion.div
                whileHover={{scale: [null, 1.1, 1.2]}}
                transition={{duration: 0.2}}
            >
                追加
            </motion.div>
        </Button>
    );
};
