import { CursorChatProps, CursorMode } from "@/types/type";
import React from "react";
import CursorSVG from "../../../public/assets/CursorSVG";

const CursorChat = ({
    cursor,
    cursorState,
    updateMyPresence, setCursorState
}: CursorChatProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const message = event.target.value
        updateMyPresence({ message });
        setCursorState({ mode: CursorMode.Chat, previousMessage: null, message })
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter")
            setCursorState({ mode: CursorMode.Chat, previousMessage: cursorState.message, message: "" })
        else if (event.key === "Escape")
            setCursorState({ mode: CursorMode.Hidden })

    };
    return (
        <div
            className="absolute top-0 left-0"
            style={{
                transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`,
            }}>
            {cursorState.mode === CursorMode.Chat && (
                <>
                    <CursorSVG color={"#000"} />
                    <div onKeyUp={(e) => e.stopPropagation()} className="absolute left-2 top-5 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]">
                        {cursorState.previousMessage && (
                            <div>{cursorState.previousMessage}</div>
                        )}
                        <input
                            type="text"
                            className="z-10 w-60 border-none bg-transparent text-white placeholder-blue-300 outline-none"
                            autoFocus
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            placeholder={cursorState.previousMessage ? "" : "Type a message"}
                            value={cursorState.message}
                            maxLength={50}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default CursorChat;
