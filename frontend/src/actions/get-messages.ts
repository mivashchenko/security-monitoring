'use server'

import {Message} from "@/stores/messages-store";

export const getMessages = async (): Promise<{ error: Error | null; data: Message[]; }> => {
  try {
    // const response = await fetch(
    //   `https://vast-retreat-05206-d317ca74ea03.herokuapp.com/api/json/messages?_sort=timestamp&_order=desc&_limit=100`
    // );
    const response = await fetch(
      `http://localhost:4000/api/json/messages?_sort=timestamp&_order=desc&_limit=100`
    );


    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return {
      error: null,
      data: await response.json(),
    };

  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return {
      error: error instanceof Error ? error : new Error("Unknown error"),
      data: [],
    }
  }
};