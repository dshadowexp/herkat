/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useState } from "react";
import { Availability } from "../core/domains";
import { useAuth } from "../contexts/auth";
import { useNavigate } from "react-router-dom";
import { useStylist } from "../contexts/stylist";
import { updateProfile } from "firebase/auth";
import { addCurrentAddress } from "../apis/geo";
import { storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Col, Image, FloatingLabel, Form, Button, Spinner } from "react-bootstrap";
import { StepWrapper } from "../wrappers/StepWrapper";
import SelectLocation from "../features/location/SelectLocation";
import SetAvailability from "../features/availability/SetAvailability";
import Loading from "../components/Loading";
import MultiStepForm from "../components/MultiStepForm";
import useToggle from "../hooks/useToggle";

const countries = [
    { name: 'Canada', code: 'ca' },
    { name: 'USA', code: 'us' }
]

type FormData = {
    name: string,
    email: string,
    phone: string,
    photoUrl: string,
    country: string,
    address: string,
    availabilities: Availability[], 
}

type PersonalDetailsData = {
    name: string,
    email: string,
    country: string,
}

type PersonalDetailsProps = PersonalDetailsData & {
    updateField: (field: Partial<FormData>) => void
}

export  function PersonalDetails({ name, email, country, updateField }: PersonalDetailsProps) {
    return (
        <StepWrapper title="Tell us about you" description="Use your personal name and details to let your customers know who they're booking with">
            <FloatingLabel
                controlId="floatingInput"
                label="Full name"
                className="mb-3"
            >
                <Form.Control 
                    type="text" 
                    name="fullname"
                    value={name}
                    onChange={(e) => { updateField({ name: e.target.value }) }}
                    required
                />
            </FloatingLabel>
            <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
            >
                <Form.Control 
                    type="email" 
                    value={email}
                    onChange={(e) => { updateField({ email: e.target.value }) }}
                    disabled={true}
                    required
                />
            </FloatingLabel>
            <FloatingLabel label="Country" className="mb-3">
                <Form.Select value={country} onChange={e => updateField({ country: e.target.value })} required>
                    <option value="">Select country</option>
                    {countries.map((currCountry) => (
                        <option key={currCountry.code} value={currCountry.code}>{ currCountry.name }</option>
                    ))}
                </Form.Select>
            </FloatingLabel>
        </StepWrapper>
    )
}

type LocationInfoData = {
    country: string
    address: string,
}

type LocationInfoProps = LocationInfoData & {
    updateField: (field: Partial<FormData>) => void
}

function LocationInfo({ country, address, updateField }: LocationInfoProps) {
    return (
        <>
            <StepWrapper title="Where are you located?" description="Enter your home or office address where you can deliver services.">
                <div className="mb-3 w-100 d-flex gap-2">
                    <Form.Control 
                        type="text" 
                        name="address"
                        value={address}
                        disabled={true}
                        required
                    />
                </div>
                <SelectLocation 
                    country={country} 
                    updateLocation={(loc) => { updateField({ address: loc }) }} 
                />
            </StepWrapper>
        </>
    )
}

type AvailabilitiesData = {
    availabilities: Availability[]
}

type AvailabilityCalendarProps = AvailabilitiesData & {
    updateField: (field: Partial<FormData>) => void
}

export  function AvailabilityCalendar({ availabilities, updateField }: AvailabilityCalendarProps) {
    return (
        <StepWrapper title="What are your working hours?" description="Define the times you want to receive bookings">
            <SetAvailability 
                availabilities={availabilities}
                addAvailability={(day) => { updateField({ availabilities: [...availabilities, {day, startTime: '7:00', endTime: '22:00'}] })}} 
                removeAvailability={(day) => { updateField({ availabilities: availabilities.filter(av => av.day !== day) }) }} 
                editAvailability={(avail) => { updateField({ availabilities: availabilities.map(av => av.day === avail.day ? avail : av ) })}} 
            />
        </StepWrapper>
    )
}

type ProfilePictureData = {
    photoUrl: string
}

type ProfilePictureProps = ProfilePictureData & {
    updateField: (field: Partial<FormData>) => void
}

export  function ProfilePicture({ photoUrl, updateField }: ProfilePictureProps) {
    const { authUser } = useAuth();
    const { value, on, off } = useToggle(false);
    const [loading, setLoading] = useState(false);

    const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement> ) => {
        const file = e.target.files![0];
        await handleUploadPhoto(file);
    };
    
    const handleUploadPhoto = async (photo: File | null) => {
        if (!photo) return;
        
        try {
            setLoading(true);
            const storageRef = ref(storage, `profile/${authUser?.uid}`)
            const snapshot = await uploadBytes(storageRef, photo);
            const downloadUrl = await getDownloadURL(snapshot.ref);
            updateField({ photoUrl: downloadUrl });
            setLoading(false);
            off();
        } catch (error) {
            alert('Failed to upload profile photo. Please try again.');
        }
    };

    return (
        <StepWrapper title="Upload a photo" description="Help your customers to easily identify during sessions">
            { loading && <Spinner /> }
            {
                value && !loading &&
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="file" 
                        accept="image/*"
                        onChange={handlePhotoChange} 
                    />
                </Form.Group>
            }
            {
                photoUrl && !value &&
                <Col xs={6} md={4}>
                    <Image 
                        width={122} 
                        height={125} 
                        src={photoUrl} 
                        loading='lazy' 
                        rounded
                    />
                    <Button 
                        className="mt-2" 
                        onClick={() => { on() }}
                    >
                        Update photo
                    </Button>
                </Col>
            }
        </StepWrapper>
    )
}

const INITIAL_DATA: FormData = {
    name: '',
    email: '',
    phone: '',
    photoUrl: '',
    country: '',
    address: '',
    availabilities: [],
}

export default function SetupStylist() {
    const navigate = useNavigate();
    const { authUser, authToken } = useAuth();
    const { stylist, setupStylist } = useStylist();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(INITIAL_DATA);

    useEffect(() => {
        if (stylist) {
            navigate('/stylist');
            return;
        }

        setData(prev => ({
            ...prev,
            name: authUser!.displayName || '',
            email: authUser!.email || '', 
            phone:  authUser!.phoneNumber || '',
            photoUrl: authUser!.photoURL || ''
        }));
    }, []);

    const updateFields = (fields: Partial<FormData>) => {
        setData(prevData => {
            return { ...prevData, ...fields };
        })
    }

    const handleSubmitProcess = async (currStepIndex: number, next: () => void) => {
        if (currStepIndex === 0 && !data.name && !data.email && !data.country) {
            return;
        } else if (currStepIndex === 1 && !data.address) {
            return;
        } else if (currStepIndex === 2 && !data.photoUrl) {
            return;
        } else if (currStepIndex === 3 && data.availabilities.length === 0) {
            return;
        } else if (currStepIndex === 3) {
            setLoading(true);
            await updateProfile(authUser!, {
                displayName: data.name,
                photoURL: data.photoUrl
            });
            await setupStylist!('');
            await addCurrentAddress(authToken, { 
                address: data.address, 
                country: data.country 
            });
            navigate('/stylist');
            setLoading(false);
            return;
        }
        
        next();
    }

    return (
        <div className="mt-3">  
            <div className="w-100 d-flex justify-content-center">
                <img
                    alt=""
                    src="/logo.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
            </div>
            {
                loading ?
                <Loading /> :
                <MultiStepForm 
                    active={!loading}
                    handlerOnSubmit={handleSubmitProcess} 
                    stepElements={[
                        <PersonalDetails {...data} updateField={updateFields} />,
                        <LocationInfo {...data} updateField={updateFields} />,
                        <ProfilePicture {...data} updateField={updateFields} />,
                        <AvailabilityCalendar {...data} updateField={updateFields} />
                    ]}
                />
            }
        </div>
    )
}
