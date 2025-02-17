export async function fetchStates(countryCode: string) {
    try {
      const response = await fetch(
        `https://api.fr.stg.shipglobal.in/api/v1/location/states`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            state_country_code: countryCode,
          }),
        }
      );
      const result = await response.json();
      if (result.data && result.data.states) {
        return result.data.states.map((state: any) => ({
          value: state.state_name,
          label: state.state_name,
        }));
      }
    } catch (error) {
      console.error("Error fetching states:", error);
      return [];
    }
  }

   const orderToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnRpdHlJZCI6MzAwNjcsImNyZWF0ZWRfYXQiOnsiZGF0ZSI6IjIwMjUtMDItMTEgMTc6MTY6MTAuNTk0ODQ3IiwidGltZXpvbmVfdHlwZSI6MywidGltZXpvbmUiOiJBc2lhL0tvbGthdGEifSwiZXhwaXJlc19hdCI6eyJkYXRlIjoiMjAyNS0wMy0xMyAxNzoxNjoxMC41OTQ4NDkiLCJ0aW1lem9uZV90eXBlIjozLCJ0aW1lem9uZSI6IkFzaWEvS29sa2F0YSJ9LCJpZCI6IjU0YTVhMDZmLTlmMTItNDNkMS05NjRmLWY0NmU0NDAzZmJlYiIsInJlbW90ZV9lbnRpdHlfaWQiOjB9.Mgqd-wgxjBYG2o9rztEvgrEzuEXxUYjoKXcmmDCg1jw";

  export const validateOrderInvoice = async (payload: any) => {
    const url = "https://api.fr.stg.shipglobal.in/api/v1/orders/validate-order-invoice";
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${orderToken}`,
        },
        body: JSON.stringify(payload),
      });
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching rates:", error);
      throw error;
    }
  };
  
  const API_URL =
    "https://api.fr.stg.shipglobal.in/api/v1/orders/get-shipper-rates";

  export const shipperToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnRpdHlJZCI6MzAwNjcsImNyZWF0ZWRfYXQiOnsiZGF0ZSI6IjIwMjUtMDItMTAgMTY6NTg6NDguNTc2NzgyIiwidGltZXpvbmVfdHlwZSI6MywidGltZXpvbmUiOiJBc2lhL0tvbGthdGEifSwiZXhwaXJlc19hdCI6eyJkYXRlIjoiMjAyNS0wMy0xMiAxNjo1ODo0OC41NzY3ODMiLCJ0aW1lem9uZV90eXBlIjozLCJ0aW1lem9uZSI6IkFzaWEvS29sa2F0YSJ9LCJpZCI6IjViYjM5M2ZmLWY3ZWUtNDE4My04YmE3LTg0MTFjZGJmMmVmOSIsInJlbW90ZV9lbnRpdHlfaWQiOjB9.e374_FSMTBZt98yC6fx3Hqq1mvrKfHrytRQx_hRStsw";

  export const fetchShipperRates = async (payload:any) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${shipperToken}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return data?.data?.rate || [];
    } catch (error) {
      console.error("Error fetching shipper rates:", error);
      return [];
    }
}