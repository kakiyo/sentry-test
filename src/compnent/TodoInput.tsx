"use client";
import {Row, Input, Col, List, Checkbox, Card} from "antd";
import {motion} from "framer-motion"
import {TodoInputAddButton} from "@Component/compnent/TodoInputAddButton";
import {useAtom, useSetAtom} from "jotai";
import {inputAtom} from "@Component/store/inputAtom";
import {ChangeEventHandler, useCallback, useEffect} from "react";
import {TodoItem, todoListAtom} from "@Component/store/todoListAtom";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {TodoListTitle} from "@Component/compnent/TodoListTitle";
import dynamic from "next/dynamic";

const Unable2chase = dynamic(() => import("./Unable2chase"), {
    ssr: false,
});

export function TodoInput() {
    const [todoList] = useAtom(todoListAtom)
    const [inputValue, setInputValue] = useAtom(inputAtom)
    const isTodoAllDone = todoList.filter(todoItem => !todoItem.isDone).length === 0

    const handleOnChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setInputValue(e.target.value)
    }, [setInputValue])

    return (
        <>
            <TodoListTitle style={{marginTop: '33%', paddingRight: 423}}/>
            <Unable2chase chasable={isTodoAllDone} target={<TodoInputAddButton isTodoAllDone={isTodoAllDone}/>}>

                <Row gutter={[4, 4]} style={{width: 400}}>
                    <Col span={24}>
                        <Input style={{width: 400}} value={inputValue} onChange={handleOnChange}
                               placeholder="やり遂げたい事"/>
                    </Col>
                    <Col span={24}>
                        {todoList.length > 0 && <motion.div
                            style={{width: 400}}
                            initial={{opacity: 0, scale: 0.5}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{
                                duration: 0.8,
                                delay: 0.5,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                        >
                            <Card style={{background: 'white', width: '100%'}}>
                                <List>
                                    {todoList.map((todoItem, index) => {
                                        return <TodoListItem todoItem={todoItem} index={index}
                                                             key={'todolist_item_' + index}/>
                                    })}
                                </List>
                            </Card>
                        </motion.div>}
                    </Col>
                </Row>
            </Unable2chase>
        </>
    );
}

const TodoListItem = ({todoItem, index}: { todoItem: TodoItem, index: number }) => {
    const setTodoList = useSetAtom(todoListAtom)
    const handleOnCheck = useCallback((e: CheckboxChangeEvent) => {
        setTodoList(prev => {
            const newTodolist: TodoItem[] = [...prev]
            newTodolist[index]["isDone"] = e.target.checked
            return newTodolist
        })
    }, [index, setTodoList])

    return (
        <List.Item>
            <Checkbox style={{wordWrap: "break-word"}} checked={todoItem.isDone} onChange={handleOnCheck}>
                {todoItem.content}
            </Checkbox>
        </List.Item>
    )
}