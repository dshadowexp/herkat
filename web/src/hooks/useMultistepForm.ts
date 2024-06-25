import { ReactElement, useState } from "react";

export default function useMultistepForm(steps: ReactElement[]) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const next = () => {
        setCurrentStepIndex(i => {
            return i >= steps.length - 1 ? i : i + 1;
        })
    }

    const back = () => {
        setCurrentStepIndex(i => {
            return i <= 0 ? i : i - 1;
        })
    }

    const goTo = (index: number) => {
        setCurrentStepIndex(index);
    }

    return {
        currentStepIndex,
        currentStep: steps[currentStepIndex],
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        goTo, next, back, steps
    }
}