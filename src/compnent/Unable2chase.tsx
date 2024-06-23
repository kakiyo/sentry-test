"use client";
import {motion} from "framer-motion"
import {ReactNode, useCallback, useEffect, useRef, useState} from "react";
import {Col, Row} from "antd";

export default function Unable2chase({chasable, target, children}: {
    chasable?: boolean,
    target: ReactNode,
    children: ReactNode
}) {
    const squareWidth = 100;
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [rotate, setRotate] = useState(0);
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

    //移動可能距離
    const maxDistanceX = windowSize[0] / 2 - Math.sqrt(2) * squareWidth
    const maxDistanceY = windowSize[1] / 2 - Math.sqrt(2) * squareWidth

    //指定した最大値内で乱数生成
    const getRandomNumIn = useCallback((max: number) => {
        return Math.floor(Math.random() * max);
    }, [])
    const isPlusMinus = getRandomNumIn(2) === 1

    //逃げ関数
    const buttonEscaping = useCallback(() => {
        if (chasable) {
            return
        }
        setX(getRandomNumIn(isPlusMinus ? maxDistanceX : -maxDistanceX))
        setY(getRandomNumIn(isPlusMinus ? maxDistanceY : -maxDistanceY))
        setRotate(getRandomNumIn(isPlusMinus ? 360 : -360))
    }, [chasable, getRandomNumIn, isPlusMinus, maxDistanceX, maxDistanceY])

    //リサイズ度にサイズ更新
    const handleResize = useCallback(() => {
        setWindowSize([window.innerWidth, window.innerHeight])
        buttonEscaping()
    }, [buttonEscaping])

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [handleResize])

    return (
        <div style={{
            width: '100vw',
            top: 0,
            left: 0,
            display: 'flex',
            height: '100vh',
            justifyContent: "center",
            position: "fixed",
        }}>
            <Row gutter={[2, 2]} style={{paddingTop: "35%"}}>
                <Col>
                    {children}
                </Col>
                <Col>
                    <motion.div
                        onMouseEnter={buttonEscaping}
                        animate={{x, y, rotate}}
                        transition={{type: "spring"}}
                        style={{
                            height: squareWidth,
                            width: squareWidth,
                            justifyContent: "center",
                            display: "flex"
                        }}>
                        {target}
                    </motion.div>
                </Col>
            </Row>
        </div>
    )
}
