/** @format */
interface Payload {
  method: string;
  data: Record<string, any>;
}

export const fetchClien = async (
  url: string,
  payload: Payload
): Promise<any> => {
  const { method, data } = payload;
  try {
    const res: any = await fetch(url, {
      method,
      body: data ? JSON.stringify(data) : "{}",
    });
    if (res.code !== 200) {
      console.error(`${event} err`, res.code);
    }
  } catch (err) {
    console.error(`error`, err);
  }
};
