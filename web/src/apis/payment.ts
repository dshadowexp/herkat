const PAYMENTS_URL = 'http://localhost:3002/api/v0/payments';

export async function getAccountBalance(token: string) {
    const response = await fetch(`${PAYMENTS_URL}/accounts/balance`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('invalid request');
    } 
    
    const data = (await response.json()).data;
    const { balance } = data;
    return balance;
}

export async function getPaymentAccount(token: string) {
    const res = await fetch(`${PAYMENTS_URL}/accounts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error('')
    }

    const jsonData = (await res.json()).data;
    const { account } = jsonData;
    return account;
}

export async function getPaymentAccountLogin(token: string) {
    const response = await fetch(`${PAYMENTS_URL}/accounts/link`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Error setting payment');
    }

    const jsonData = (await response.json()).data;
    const { url } = jsonData;
    return url;
}

export async function getPublishableKey(token: string, signal?: AbortSignal) {
    const response = await fetch(`${PAYMENTS_URL}/config/stripe`, {
        signal,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('invalid request');
    } 
    
    const { publishableKey } = (await response.json()).data;
    return publishableKey;
}

export async function getAccountSessionSecret(token: string) {
    const response = await fetch(`${PAYMENTS_URL}/accounts/session`, { 
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      console.error('An error occurred: ');
      return undefined;
    }

    const { clientSecret } = (await response.json()).data;
    return clientSecret;
  }

export async function setupPaymentAccount(token: string, country: string) {
    const response = await fetch(`${PAYMENTS_URL}/accounts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ country })
    });

    if (!response.ok) {
        throw new Error('Error setting payment');
    }

    const jsonData = (await response.json()).data;
    const { url } = jsonData;
    return url;
}