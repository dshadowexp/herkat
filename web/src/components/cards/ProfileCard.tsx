import { useAuth } from '../../contexts/auth'
import {  Card, Image, Stack } from 'react-bootstrap';
import { useStylist } from '../../contexts/stylist';
import { CalendarCheckFill, ChatDotsFill, ShieldFillCheck, StarFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

export default function ProfileCard() {
    const navigate = useNavigate();
    const { authUser } = useAuth();
    const { stylist } = useStylist();

    return (
        <div className="mb-2">
            <h5>{ authUser && `Welcome, ${authUser.displayName}`}</h5>
            <Card>
                <Card.Body>
                    <Stack direction="horizontal" className="w-100 align-items-start" gap={3}>
                        <div 
                            onClick={() => { navigate('/stylist/profile') }}
                            style={{ borderRadius: "50%", padding: "5px", boxShadow: "0 0 2px 1px rgba(21, 112, 239, 0.5)" }} 
                        >
                            <Image 
                                width={50} 
                                height={50} 
                                src={authUser?.photoURL || ''} 
                                loading='lazy' 
                                roundedCircle
                            />
                        </div>
                        <div className="vr" />
                        <div className='w-100 flex justify-content-center align-items-center mx-auto' style={{ flexWrap: "wrap" }}>
                            <div className='d-flex justify-content-around align-items-center mb-2'>
                                <div className='d-flex align-items-center gap-2'>
                                    <StarFill color="#ffbf00" />
                                    <div className="vr" />
                                    <span>{stylist && stylist.rating.toFixed(1)}</span>
                                </div>
                                <div className='d-flex align-items-center gap-2'>
                                    <CalendarCheckFill color="#1570ef" />
                                    <div className="vr" />
                                    <span>{stylist && stylist.bookings}</span>
                                </div>
                            </div>
                            <div className='d-flex justify-content-around align-items-center  mb-2'>
                                <div className='d-flex align-items-center gap-2'>
                                    <ChatDotsFill color="green" />
                                    <div className="vr" />
                                    <span>{stylist && stylist.reviews}</span>
                                </div>
                                <div className='d-flex align-items-center gap-2'>
                                    <ShieldFillCheck color="#1570ef" />
                                    <div className="vr" />
                                    <span>{stylist && (stylist.verified ? 'Yes' : 'No' ) }</span>
                                </div>
                            </div>
                        </div>
                    </Stack>
                </Card.Body>
            </Card>          
        </div>
    )
}
