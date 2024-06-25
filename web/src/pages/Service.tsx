import { Button, Card, Form } from "react-bootstrap";
import { StepWrapper } from "../wrappers/StepWrapper";
import { useState } from "react";
import useMultistepForm from "../hooks/useMultistepForm";

type HairTypesData = {
    hairTypes: string[]
}

type HairTypesStepProps = HairTypesData & {
    updateField: (field: Partial<HairTypesData>) => void
}

const predefinedHairTypes = ['straight', 'wavy', 'curly', 'coily'];

function HairTypesStep({ hairTypes, updateField }: HairTypesStepProps) {
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            updateField({ hairTypes: [...hairTypes, value] })
        } else {
            updateField({ hairTypes: hairTypes.filter((type) => type !== value) });
        }
    }

    return (
        <StepWrapper title="Hair Types" description="Select your hair types">
            <p>Hair types & Textures: { hairTypes.join(',') }</p>
            {predefinedHairTypes.map((hairType) => (
                <Form.Check 
                    name="hairTypes"
                    key={hairType}
                    id={hairType}
                    label={hairType}
                    value={hairType}
                    checked={hairTypes.includes(hairType)}
                    onChange={handleCheckboxChange}
                />
            ))}
        </StepWrapper>
    )
}

type AgePrefStepData = {
    agePrefs: string[]
}

type AgePrefStepProps = AgePrefStepData & {
    updateField: (field: Partial<AgePrefStepData>) => void
}

const predefinedAges = ['elderly', 'adult', 'child'];

function AgePrefStep({ agePrefs, updateField }: AgePrefStepProps) {
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            updateField({ agePrefs: [...agePrefs, value] })
        } else {
            updateField({ agePrefs: agePrefs.filter((age) => age !== value) });
        }
    }

    return (
        <StepWrapper title="Age Preferences" description="Which age group are you more comfortable with">
            <p>Comfortable Ages: { agePrefs.join('/')  }</p>
            {predefinedAges.map((age) => (
                <Form.Check 
                    name="agePrefs"
                    key={age}
                    label={age}
                    id={age}
                    value={age}
                    checked={agePrefs.includes(age)}
                    onChange={handleCheckboxChange}
                />
            ))}
        </StepWrapper>
    )
}

type SessionPrefStepData = {
    sessionPrefs: string[]
}

type SessionPrefStepProps = SessionPrefStepData & {
    updateField: (field: Partial<SessionPrefStepData>) => void
}

const predefinedSessions = ['in-office', 'in-person'];

function SessionPrefStep({ sessionPrefs, updateField }: SessionPrefStepProps) {
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            updateField({ sessionPrefs: [...sessionPrefs, value] })
        } else {
            updateField({ sessionPrefs: sessionPrefs.filter((session) => session !== value) });
        }
    }

    return (
        <StepWrapper title="Sessions Preferences" description="Where do you like to deliver your services">
            <p>Do you offer: { sessionPrefs.join('/')  }</p>
            {predefinedSessions.map((session) => (
                <Form.Check  
                    name="sessionPrefs"
                    key={session}
                    id={session}
                    label={session}
                    value={session}
                    checked={sessionPrefs.includes(session)}
                    onChange={handleCheckboxChange}
                />
            ))}
        </StepWrapper>
    )
}

type GenderPrefStepData = {
    genderPrefs: string[]
}

type GenderPrefStepProps = GenderPrefStepData & {
    updateField: (field: Partial<GenderPrefStepData>) => void
}

const predefinedGenders = ['male', 'female'];

function GenderPrefStep({ genderPrefs, updateField }: GenderPrefStepProps) {
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            updateField({ genderPrefs: [...genderPrefs, value] })
        } else {
            updateField({ genderPrefs: genderPrefs.filter((gender) => gender !== value) });
        }
    }

    return (
        <StepWrapper title="Gender Preferences" description="Which gender are you more comfortable with">
            <p>Comfortable Genders: { genderPrefs.join('|')  }</p>
            {predefinedGenders.map((gender) => (
                <Form.Check 
                    name="genderPrefs"
                    key={gender}
                    id={gender}
                    label={gender}
                    value={gender}
                    checked={genderPrefs.includes(gender)}
                    onChange={handleCheckboxChange}
                />
            ))}
        </StepWrapper>
    )
}

type FormData = {
    hairTypes: string[],
    genderPrefs: string[],
    agePrefs: string[],
    sessionPrefs: string[],
}

const INITIAL_DATA: FormData = {
    hairTypes: [],
    genderPrefs: [],
    agePrefs: [],
    sessionPrefs: []
}

export default function AddService() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(INITIAL_DATA);

    const updateFields = (fields: Partial<FormData>) => {
        setData(prevData => {
            return { ...prevData, ...fields };
        })
    }

    const { currentStepIndex, currentStep, steps, isFirstStep, isLastStep, next, back } = useMultistepForm([
        <HairTypesStep {...data } updateField={updateFields} />,
        <GenderPrefStep {...data} updateField={updateFields}  />,
        <AgePrefStep {...data} updateField={updateFields} />,
        <SessionPrefStep {...data} updateField={updateFields}/>,
    ]);

    const handlerOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStepIndex === 0 && data.hairTypes.length < 1) {
            console.log('Select at least one');
            return;
        } else if (currentStepIndex === 1 && data.genderPrefs.length < 1) {
            console.log('Select at least one');
            return;
        } else if (currentStepIndex === 2 && data.agePrefs.length < 1) {
            console.log('Select at least one');
            return;
        } else if (currentStepIndex === 3 && data.sessionPrefs.length < 1) {
            console.log('Select at least one');
            return;
        }  else if (isLastStep) {
            try {
                setLoading(true);
                console.log(data);
            
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
            return;
        }
        next();
    }

    return (
        <>
            <Card>
                <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
                    { currentStepIndex + 1} / {steps.length}
                </div>
                <Card.Body>
                    <Form onSubmit={handlerOnSubmit}>
                        { loading ? <>Lodin...</> : currentStep }
                        <div className="mt-4">
                            { !isFirstStep && <Button variant="outline-secondary" type="button" onClick={back} disabled={loading}>Back</Button> }
                            <Button type="submit" variant={isLastStep ? "primary" : "outline-primary"} disabled={loading}>
                                { isLastStep ? "Finish" : "Next" }
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
