import React, { useRef } from "react"
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import AuthWrapper from "../../wrappers/AuthWrapper";
import { Button, FloatingLabel, Form } from "react-bootstrap"

export default function ForgotPassword() {
    const emailRef = useRef<HTMLInputElement>();

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!emailRef.current?.value) {
            return;
        }

        try {
            await sendPasswordResetEmail(auth, emailRef.current?.value);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <AuthWrapper 
                title='Reset your password'  
                description="Enter your email address and we will send you instructions to return your password"
                isButtons={false}
            >
                <Form onSubmit={handleForgotPassword}>
                    <FloatingLabel
                        label="Email"
                        className="w-100 mb-2"
                    >
                        <Form.Control 
                            type="email" 
                            placeholder="Email address" 
                            ref={emailRef as React.RefObject<HTMLInputElement>} 
                            required
                        />
                    </FloatingLabel>
                    <Button className="w-100" type="submit">
                        Continue 
                    </Button>
                </Form>
                <div className="w-100 text-center mt-2">
                    Return to <Link to="/login">Login</Link>
                </div>
            </AuthWrapper>
        </>
    )
}
