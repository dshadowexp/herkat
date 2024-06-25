import { ReactNode } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Google } from 'react-bootstrap-icons'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleAuthProvider } from '../config/firebase'

type AuthWrapperProps = {
    title: string,
    description?: string
    isButtons: boolean
    children: ReactNode
}

export default function AuthWrapper({ title, description, isButtons, children}: AuthWrapperProps) {
    const navigate = useNavigate();

    const handleGoogleAuth = async () => {
        try {
            await signInWithPopup(auth, googleAuthProvider);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='w-100 d-flex justify-content-center align-items-center'>
            <div className='w-100'  style={{ maxWidth: "400px"  }}>  
                <div className="w-100 d-flex justify-content-center">
                    <img
                        alt=""
                        src="/logo.png"
                        width="35"
                        height="35"
                        className="d-inline-block align-top"
                    />
                </div>
                <h5 className="text-center mb-2 mt-4" style={{ fontWeight: "bold" }}>
                    { title }
                </h5>
                { 
                    description && 
                    <p className="text-center mt-2 mb-4" style={{ fontSize: "14px" }}>
                        { description }
                    </p>
                }
                {
                    isButtons &&
                    <>
                        <Button type="button" variant="outline-primary" className="w-100 mt-2" onClick={handleGoogleAuth}>
                            <div className="d-flex align-items-center justify-content-center gap-2">
                                <Google />
                                <div >Continue with Google</div>
                            </div>
                        </Button>
                        <div className="d-flex align-items-center mt-2 mb-2 gap-2">
                            <div 
                                className="w-100"
                                style={{ 
                                    height: '3px',
                                    borderRadius: '2px',
                                    backgroundColor:'#f2f2f2'
                                }} 
                            ></div>
                            <span style={{ color: '#808080' }}>or</span>
                            <div   
                                className="w-100"
                                style={{ 
                                    height: '3px',
                                    borderRadius: '1px',
                                    backgroundColor:'#f2f2f2'
                                }} 
                            ></div>
                        </div>
                    </>
                }
                { children }
            </div>
        </div>
    )
}
