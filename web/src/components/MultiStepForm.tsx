import { ReactElement } from "react";
import useMultistepForm from "../hooks/useMultistepForm";
import { Button, Form } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";

type MultiStepProgressProps = {
    currentStep: number,
    totalSteps: number
}

function MultiStepProgress({ currentStep, totalSteps }: MultiStepProgressProps) {
    const steps = Array.from({ length: totalSteps }, (_, index) => index);

    return (
        <div className="mt-3 mb-3 d-flex gap-2">
            {steps.map(step => (
                <div
                    key={step}
                    className="w-100"
                    style={{ 
                        height: '5px',
                        borderRadius: '1px',
                        backgroundColor: `${currentStep >= step ? '#1570ef' : '#f2f2f2'}`
                    }}
                >
                </div>
            ))}
        </div>
    );
}

type MultiStepFormProps = {
    active: boolean,
    stepElements: ReactElement[],
    handlerOnSubmit: (currStep: number, moveNext: () => void) => void
}

export default function MultiStepForm({ active, stepElements, handlerOnSubmit }: MultiStepFormProps) {
    const { currentStepIndex, currentStep, steps, isFirstStep, isLastStep, back, next } = useMultistepForm(stepElements);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handlerOnSubmit(currentStepIndex, next);
    }

    return (
        <>  
            <Form onSubmit={onSubmit}>
                <MultiStepProgress currentStep={currentStepIndex} totalSteps={steps.length} />
                <div className="d-flex justify-content-between">
                    <Button disabled={isFirstStep || !active} variant="outline-secondary" type="button" onClick={back}  >
                        <ArrowLeft color={isFirstStep ? "grey": "black"} />
                    </Button>
                    <Button type="submit" variant="primary" disabled={!active}>
                        { isLastStep ? "Finish" : "Continue" }
                    </Button>
                </div>
                <div className="mt-5">
                    { currentStep }
                </div>
            </Form>
        </>
    )
}
