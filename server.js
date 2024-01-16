const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/getWhatsAppPhoto', async (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  // Adicione a lógica para validar e formatar o número, se necessário
  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

  try {
    // Consulta a API do WhatsApp para obter a foto do perfil
    const response = await axios.get(`https://api.whatsapp.com/v1/users/${formattedPhoneNumber}`);
    const photoUrl = response.data.photo;

    res.json({ success: true, photoUrl });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

function formatPhoneNumber(phoneNumber) {
  // Adicione a lógica para formatar o número, se necessário
  // Por exemplo, remova caracteres não numéricos e adicione o código de país +55
  const formattedNumber = phoneNumber.replace(/\D/g, ''); // Remove caracteres não numéricos
  return `+55${formattedNumber}`;
}

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});