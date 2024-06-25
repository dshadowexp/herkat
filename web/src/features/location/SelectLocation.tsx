/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { useAuth } from "../../contexts/auth";
import useDebounce from "../../hooks/useDebounce";
import { getAddressSuggestions } from "../../apis/geo";
import { Alert, Button, FloatingLabel, Form, ListGroup, Spinner } from "react-bootstrap";
import { GeoAltFill } from "react-bootstrap-icons";
import useTimeout from "../../hooks/useTimeout";


type LocationInfoProps = {
    country: string,
    updateLocation: (loc: string) => void
}

export default function SelectLocation({ country, updateLocation }: LocationInfoProps) {
    const { authToken } = useAuth();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState('');
    const [geoCord, setGeoCord] = useState<{ lat: number, lng: number } | null>(null);

    const { reset } = useTimeout(() => { setError('') }, 1500);

    const getGeoCord = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              setGeoCord({ 
                  lat: position.coords.latitude, 
                  lng: position.coords.longitude
              });
            }, (error: GeolocationPositionError) => {
                setError(error.message);
                reset();
            });
        }
    }, [])

    useDebounce(() => {
        if (query) {
            setLoading(true);
            getAddressSuggestions(authToken, query, country)
                .then((suggs) => {
                    setSuggestions(suggs);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }, 500, [query])

    const onSelectLocation = (suggestion: string) => {
        setSuggestions([]);
        setQuery('')
        updateLocation(suggestion);
    }

    const getLatLngAddress = () => {
        if (geoCord) {
            console.log(geoCord);
        } else{
            getGeoCord();
        }
    }

    return (
        <>
            <div className="mb-3 w-100 d-flex gap-2">
                <FloatingLabel
                    label="Search your location"
                    className="w-100"
                >
                    <Form.Control 
                        type="text" 
                        name="location"
                        value={query}
                        onChange={(e) => { setQuery(e.target.value) }}
                    />
                </FloatingLabel>
                <Button 
                    type="button"
                    variant="primary"
                    disabled={loading} 
                    onClick={getLatLngAddress} 
                >
                    { loading ? <Spinner size="sm" /> : <GeoAltFill /> }
                </Button> 
            </div>
            {
                error &&
                <Alert variant="warning">
                    { error }
                </Alert>
            }
            <div>
                {
                    suggestions && 
                    <ListGroup>
                    {
                        suggestions.map((suggest) => (
                            <ListGroup.Item 
                                key={suggest} 
                                onClick={() => { onSelectLocation(suggest) }}
                                style={{ fontSize: "14px" }}
                            >
                                { suggest }
                            </ListGroup.Item>
                        ))
                    }
                    </ListGroup>
                }
            </div>
        </>
    )
}