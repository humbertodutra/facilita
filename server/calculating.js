function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

function calcularRotaMaisRapida(pontos) {
    const rota = [pontos.shift()]; // Start from the origin and remove it from the list of points
    while (pontos.length > 0) {
        let proximoIndice = -1;
        let proximaDistancia = Infinity;
        for (let i = 0; i < pontos.length; i++) {
            const distancia = calcularDistancia(rota[rota.length - 1].location.x, rota[rota.length - 1].location.y, pontos[i].location.x, pontos[i].location.y);
            if (distancia < proximaDistancia) {
                proximaDistancia = distancia;
                proximoIndice = i;
            }
        }
        rota.push(pontos.splice(proximoIndice, 1)[0]); // Add the nearest point to the route and remove it from the list of points
    }
    // Return to the starting point
    rota.push(rota[0]);
    return rota;
}

const pontos = [
    {
        "id": 1,
        "nome": "Paris, França",
        "email": "contact@paris.com",
        "telefone": "0102030405",
        "location": {
            "id": 1,
            "customer_id": 1,
            "x": 48.8566,
            "y": 2.3522
        }
    },
    {
        "id": 2,
        "nome": "Londres, Inglaterra",
        "email": "info@london.com",
        "telefone": "0203040506",
        "location": {
            "id": 2,
            "customer_id": 2,
            "x": 51.5074,
            "y": -0.1278
        }
    },
    {
        "id": 3,
        "nome": "Berlim, Alemanha",
        "email": "kontakt@berlin.de",
        "telefone": "0304050607",
        "location": {
            "id": 3,
            "customer_id": 3,
            "x": 52.5200,
            "y": 13.4050
        }
    },
    {
        "id": 4,
        "nome": "Roma, Itália",
        "email": "contatto@roma.it",
        "telefone": "0405060708",
        "location": {
            "id": 4,
            "customer_id": 4,
            "x": 41.9028,
            "y": 12.4964
        }
    },




]






module.exports = calcularRotaMaisRapida;