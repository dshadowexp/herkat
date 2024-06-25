/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { auth } from "../../config/firebase";
import { useAuth } from "../../contexts/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthWrapper from "../../wrappers/AuthWrapper";

const typesList = ['Client', 'Stylist'];

export default function Signup() {
    const navigate = useNavigate();
    const { defineUserType } = useAuth();
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const [searchParams, setSearchParams] = useSearchParams({ type: '/stylist' });
    const type = searchParams.get('type');

    useEffect(() => {
        if (!type || !typesList.map((tl) => tl.toLowerCase()).includes(type as string)) {
            setSearchParams({ type: 'stylist' });
        } else {
            defineUserType('stylist');
        }
    }, [type])
    
    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!emailRef.current?.value || !passwordRef.current?.value) {
            return;
        }

        if (!type || type.length == 0 || !typesList.map((tl) => tl.toLowerCase()).includes(type)) {
            console.error('caugth')
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, emailRef.current?.value, passwordRef.current?.value);
            navigate("/stylist");
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    return (
        <>
            <AuthWrapper 
                title='Create an account'
                description="Join as a hair stylist"  
                isButtons={true}
            >
                <Form onSubmit={handleEmailAuth}>
                    <FloatingLabel
                        label="Email"
                        className="w-100 mb-2"
                    >
                        <Form.Control 
                            type="email" 
                            ref={emailRef as React.RefObject<HTMLInputElement>} 
                            required
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        label="Password"
                        className="w-100"
                    >
                        <Form.Control 
                            type="password" 
                            ref={passwordRef as React.RefObject<HTMLInputElement>} 
                            required
                        />
                    </FloatingLabel>
                    <Button className="w-100 mt-2" type="submit">
                        Continue
                    </Button>
                </Form>
                <div className="w-100 text-center mt-2">
                    <>Already joined? <Link to="/login">Login</Link></>
                </div>
            </AuthWrapper>
        </>
    )
}
