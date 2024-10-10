const url = "http://localhost:3500/api/chats";

const createChat = async (payload) => {
  try {
    const respose = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })

    if (respose) {
      return respose.json();
    }
  }
  catch (err) {
    console.error("Error al crear chat", err);
    return null;
  }
}

const chatAPI = { createChat };

export default chatAPI;