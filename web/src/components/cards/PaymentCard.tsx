import { useEffect, useRef, useState } from "react";
import { Button, Card, Form, Modal, Stack } from "react-bootstrap"
import { QrCodeScan } from "react-bootstrap-icons"
import { getServicesSummary } from "../../apis/services";
import { Service } from "../../core/domains";
import { useStylist } from "../../contexts/stylist";
import { useAuth } from "../../contexts/auth";
import QRCode from "react-qr-code";

function CollectPaymentButton() {
    const { stylist } = useStylist();
    const { authToken } = useAuth();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState<Service[]>([]);
    const [selectedServices, setSelectedService] = useState('');
    const [collectionLink, setCollectionLink] = useState('');
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;
        setLoading(true);
        if (stylist) {
            getServicesSummary(stylist?.id, authToken, signal)
                .then((servs) => {
                    setServices(servs);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
        
        return () => {
            abortControllerRef.current?.abort();
        }
    }, [])

    const handleGenerate = async () => {
        setTimeout(() => {
            setCollectionLink('https://herkat-site.webflow.io');
        }, 2000)
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className="w-100" onClick={handleShow}>Collect Payment</Button>

            <Modal 
                show={show} 
                onHide={handleClose}
                centered
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Collect Payment</Modal.Title>
                </Modal.Header>
                {   
                    collectionLink ?
                    <>
                        <Modal.Body>
                            <QRCode
                                size={256}
                                style={{ height: "auto", maxWidth: "50%", width: "50%" }}
                                value={collectionLink}
                                viewBox={`0 0 256 256`}
                            /> 
                        </Modal.Body>
                    </> :
                    <>
                        <Modal.Body>
                            <Form>
                                <Form.Select disabled={loading} value={selectedServices} onChange={e => setSelectedService(e.target.value)} required>
                                    <option value="">Select Service</option>
                                    {services.map((serv) => (
                                        <option key={serv.type} value={serv.id}>{ serv.type }</option>
                                    ))}
                                </Form.Select>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleGenerate}>
                                Collect link
                            </Button>
                        </Modal.Footer>
                    </>
                }
            </Modal>
        </>
    )
}

export default function PaymentCard() {

    return (
        <> 
            <div className="mb-2">
                <Card>
                    <Card.Body className="d-flex w-100 align-items-center">
                        <Stack direction="horizontal" className="w-100" gap={3}>
                            <div><QrCodeScan color="#1570ef" /></div>
                            <div className="vr" />
                            <div className="d-flex w-100 align-items-center justify-content-center mx-auto">
                                <CollectPaymentButton />
                            </div>
                        </Stack>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}
