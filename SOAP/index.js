const axios = require("axios");
const xml2js = require("xml2js");

const soapBody = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://tempuri.org/">
    <soapenv:Header/>

    <soapenv:Body>

        <web:Add>
            <web:intA>5</web:intA>
            <web:intB>10</web:intB>
        </web:Add>

    </soapenv:Body> 
</soapenv:Envelope>
`;

axios
  .post("http://www.dneonline.com/calculator.asmx", soapBody, {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/Add",
    },
  })
  .then((response) => {
    xml2js.parseString(response.data, (err, result) => {
      if (err) {
        console.log("Error al parsear el XML: ", err);
        return;
      }
      try {
        const addResult =
          result["soap:Envelope"]["soap:Body"][0]["AddResponse"][0][
            "AddResult"
          ][0];
        console.log("Resultado de la suma: ", addResult);
      } catch (error) {
        console.log("Error al obtener el resultado de la suma: ", error);
      }
    });
  });
