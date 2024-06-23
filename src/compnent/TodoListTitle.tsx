"use client";
import {motion, MotionStyle} from "framer-motion";

export const TodoListTitle = ({style}:{style?:MotionStyle}) => {
    return (
        <motion.div
            style={style}
            animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"]
        }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1],
                        // repeat: Infinity,
                    }}>
            <p>
                TodoList
            </p>
        </motion.div>
    );
};
