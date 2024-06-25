import { ReactNode } from "react";

type StepWrapperProps = {
    title: string,
    description: string,
    children: ReactNode
}

export function StepWrapper({ title, description, children}: StepWrapperProps) {
    return (
        <>
            <h5 className="mb-3">{ title }</h5>
            <p style={{ fontSize: "15px" }}>{ description }</p>
            <div className="w-100" style={{ }}>{ children }</div>
        </>
    );
}
