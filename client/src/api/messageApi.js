const url = "http://localhost:3500/api/messages"

const sendMessage = async (payload) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });

    if (response) {
      return response.json();
    }
  }
  catch (err) {
    console.error("Error al mandar mensajes", err);
    return null;
  }
}

const messageAPI = { sendMessage };

export default messageAPI;