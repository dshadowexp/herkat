/* eslint-disable react-hooks/exhaustive-deps */
// import PayoutCard from "../components/PayoutCard";
// import PaymentCard from "../components/PaymentCard";
import DayCard from "../components/cards/DayCard";
import { useStylist } from "../contexts/stylist";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Services from "../components/Services";
import NavBar from "../components/Navbar";

export default function StylistBoard() {
    const navigate = useNavigate();
    const { stylist } = useStylist();

    useEffect(() => {
        if (!stylist) {
            navigate('/stylist/setup');
            return;
        }
    }, [])
    
    return (
        <>
            <NavBar />
            {
                stylist &&
                <div className="mt-5 pt-3 flex sgap-3" style={{ width: "100%" }}>  
                    {/* <h6>BUSINESS</h6>
                    <PaymentCard />
                    <PayoutCard /> */}
                    <DayCard />
                    <Services />
                </div>
            }
        </>
    )
}
