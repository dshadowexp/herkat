import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { auth } from "../../config/firebase"
import AuthWrapper from '../../wrappers/AuthWrapper';

export default function Login() {
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    
    const handleEmailSignin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!emailRef.current?.value || !passwordRef.current?.value) {
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, emailRef.current?.value, passwordRef.current?.value);
            navigate("/stylist");
        } catch (error) {
            console.error(`error`);
        }
    }

    return (
        <>
            <AuthWrapper title='Welcome' isButtons={true}>
                <Form onSubmit={handleEmailSignin}>
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
                        className="w-100 mb-2"
                    >
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            ref={passwordRef as React.RefObject<HTMLInputElement>} 
                            required
                        />
                    </FloatingLabel>
                    <Button variant='primary' className="w-100 mt-2" type="submit">
                        Continue
                    </Button>
                </Form>
                <div className="w-100 text-center mt-2">
                    <><Link to="/signup">Sign up</Link> | <Link to="/forgot-password">Forgot password</Link></>
                </div>
            </AuthWrapper>
        </>
    )
}
