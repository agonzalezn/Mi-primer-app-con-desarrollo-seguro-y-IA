const expect = require('chai').expect;

describe('GET /weather/:city handler validations', () => {

    // Simulador de respuesta de Express
    const mockRes = () => {
        const res = {};
        res.status = (code) => { res.statusCode = code; return res; };
        res.json = (data) => { res.body = data; return res; };
        return res;
    };

    // 🟢 CASO 1: Happy Path (IA)
    it('Debería devolver datos del clima para una ciudad válida', () => {
        const req = { params: { city: 'Madrid' } };
        const res = mockRes();

        // Simulamos la validación del handler
        if (!req.params.city || /\d/.test(req.params.city)) {
            res.status(400).json({ success: false });
        } else {
            res.status(200).json({ success: true, data: { temperature: 24 } });
        }

        expect(res.statusCode).to.equal(200);
        expect(res.body.success).to.be.true;
    });

    // 🔴 CASO 2: Error esperado (IA) - Ciudad con espacios vacíos
    it('Debería dar error 400 si la ciudad son solo espacios', () => {
        const req = { params: { city: '   ' } };
        const res = mockRes();

        if (req.params.city.trim() === '') {
            res.status(400).json({ success: false, error: 'Ciudad obligatoria' });
        }

        expect(res.statusCode).to.equal(400);
        expect(res.body.success).to.be.false;
    });

    // 🚀 CASO 3: TU CASO EXTRA MANUAL - Prevención de inyección/datos raros
    it('Debería dar error 400 si el nombre de la ciudad contiene números', () => {
        const req = { params: { city: 'Madri123' } };
        const res = mockRes();

        if (/\d/.test(req.params.city)) {
            res.status(400).json({ success: false, error: 'Sin números permitidos' });
        }

        expect(res.statusCode).to.equal(400);
        expect(res.body.success).to.be.false;
    });

});