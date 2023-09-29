import type { ReactNode } from "react";
import React, { useState } from "react";

type AccordionProps = {
    title: string;
    children?: ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ margin: "30px" }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "16px",
                    textAlign: "left",
                    cursor: "pointer",
                    border: isOpen ? "2px solid #007bff" : "2px solid #ccc",
                    backgroundColor: isOpen ? "#007bff" : "#f9f9f9",
                    color: isOpen ? "white" : "black",
                }}
            >
                {title}
            </button>
            {isOpen && (
                <div
                    style={{
                        padding: "10px",
                        border: "2px solid #007bff",
                        borderTop: "none",
                        backgroundColor: "#f0f0f0",
                    }}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default Accordion;
