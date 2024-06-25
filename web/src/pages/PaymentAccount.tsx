/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/auth";
import { Button, Form, Spinner, Table } from "react-bootstrap";
import Loading from "../components/Loading";
import {StripeConnectInstance, loadConnectAndInitialize} from '@stripe/connect-js';
import { ConnectComponentsProvider, ConnectPayouts } from "@stripe/react-connect-js";
import { getAccountSessionSecret, getPaymentAccount, getPaymentAccountLogin, getPublishableKey, setupPaymentAccount } from "../apis/payment";

interface PaymentAccount {
    chargesEnabled: boolean
    payoutsEnabled: boolean
    detailsSubmitted: boolean
}  

const paymentCountries = [
  { code: 'US', name: 'USA'}, 
  { code: 'CA', name: 'Canada'}
]

function PaymentConnectAccount() {
  const [pK, setPK] = useState('');
  const { authToken, authUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [stripeConnectInstance, setstripeConnectInstance] = useState<StripeConnectInstance | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    setLoading(true);
    getPublishableKey(authToken, signal)
      .then((publishableKey) => {
        setPK(publishableKey);
      })
      .catch((error) => {
        console.log(error);''
      })
      .finally(() => {
        setLoading(false);
      })

    return () => {
        abortControllerRef.current?.abort();
    }
  }, [])

  useEffect(() => {
    async function getClientSecret() {
      return await getAccountSessionSecret(authToken);
    }

    if (pK) {
      setstripeConnectInstance(
        loadConnectAndInitialize({
          publishableKey: pK,
          fetchClientSecret: getClientSecret,
          appearance: {
            overlays: "dialog",
            variables: {
              fontFamily: 'Inter',
              colorPrimary: "#1570ef",
            },
          },
        })
      );
    }
  }, [pK])

  useEffect(() => {
    if (!authUser) {
      stripeConnectInstance?.logout();
    }
  }, [authUser])

  return (
    <>
      {
        loading ?
        <Loading /> :
        pK && stripeConnectInstance ?
        (
          <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
            <div>
              <h4>Your Payment Account</h4>
              <ConnectPayouts />
            </div>
          </ConnectComponentsProvider>
        ) :
        <Loading />
      }
    </>
  )
}

type PaymentAccountSetupTableProps = {
  paymentAccount: PaymentAccount
}

function PaymentAccountSetupTable({ paymentAccount }: PaymentAccountSetupTableProps) {
  const { authToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const requestAccountLogin = async () => {
    setLoading(true);
    getPaymentAccountLogin(authToken)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      }).then(() => {
        setLoading(false)
      });
  }

  return (
    <>
      <h4>Complete <span style={{ color: "#1861b8", fontStyle:"italic" }}>stripe</span> account setup</h4>
      <p>This enables us to collect payments from your clients and send payouts to you at ease</p>
      <Table bordered size="sm">
        <thead>
          <tr>
            <th>Charges</th>
            <th>Payouts</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ paymentAccount?.chargesEnabled ? "Enabled" : "Pending"  }</td>
            <td>{ paymentAccount?.payoutsEnabled ? "Enabled" : "Pending" }</td>
            <td>{ paymentAccount?.detailsSubmitted ? "Submitted" : <Button disabled={loading} variant="warning" size="sm" onClick={requestAccountLogin}>Complete</Button>  }</td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

function CreatePaymentAccount() {
  const { authToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setupPaymentAccount(authToken, country).then((url) => {
      window.location.href = url;
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <div>
      <h4>Connect your <span style={{ color: "#1861b8", fontStyle:"italic" }}>stripe</span> account</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Select disabled={loading} value={country} onChange={e => setCountry(e.target.value)} required>
          <option value="">Select Country</option>
          {paymentCountries.map((country) => (
              <option key={country.code} value={country.code}>{ country.name }</option>
          ))}
        </Form.Select>
        <div className="mt-2 d-flex align-items-start justify-content-start">
          <Button disabled={loading} className="mr-2" type="submit">Create a Stripe account</Button>
          {loading && <Spinner animation="border" variant="primary" />}
        </div>
      </Form>
    </div>
  )
}

export default function PaymentAccount() {
  const { authToken } = useAuth();
  const [paymentAccount, setPaymentAccount] = useState<PaymentAccount | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPaymentAccount(authToken)
      .then((account) => {
        console.log(account);
        setPaymentAccount(account);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  return (
    loading ?
    <Loading /> :
    <>
      <div className="mt-2" style={{ width: "100%" }} >
        { !paymentAccount && <CreatePaymentAccount /> }
        { paymentAccount && !paymentAccount.detailsSubmitted && <PaymentAccountSetupTable paymentAccount={paymentAccount} /> }
        { paymentAccount && <PaymentConnectAccount />}
      </div>
    </>
  )
}
