const quizzes = require("../controllers/quizzes");
const users = require("../controllers/users");
const session = require("../controllers/session");
const jwt = require('jsonwebtoken');
const RSA_SECRET_KEY = `
MIIEowIBAAKCAQEAs/sYIrulv0/ZqdTkh3eKV32Ad3e7cW6OJXgsmRCbXNbbCWnW
+KxwGapr8N4wy6fCyA+nWZUzxnYKPMUgIHTODdhY6h2a0F5uMztNRQMOo2YZrhEO
efBTLv0x5Jj3Ga2NGjBu9oelmwUDCfqkEXR+Q7mhL/LT4ASNQaYpw/A2trLIyF9L
bSzSWVFUMPlElKjglD6s6qV3zs5NVGHFllVKHbB7tTo/VRpISNEgx+jMQMX8q9Zo
xGHoH9OIWeGFgO1AcRi6ePPf84YFrv6HrDqB9nMIjFYw9vnbGOI/OxN5u6DYmGpx
CWCOftjxS2fGTsl9Rb28DsUuq2hZXZkf0lPE+wIDAQABAoIBAB9uST+/j2mCk1uC
T0qNCL7Qrv+uDDD6Ap7uhrNQYCFtcCELt7wDuSvyRBlzZAgcyvpPKYWOddVBxfXo
4vxoCZgHYTe5ZdDfvNT7lTnpF8RXT0LDvchzvMMm+nCWegik81BQhwBMnhIdZPN4
LvDRbD99inWqLXAgu15smzyZlaR/9v4ffpWXhUgUgb+s7f4S88uFqDiTz0oldRiG
FTYN1of00i1EHFUv/NvgqGGvNl2cZw0UvTeafZU7wvK0Pj0qrpjmZX5c5U11D807
MXaWKJ5hfG+KHuODnImGHXHRSuS3No/u73YhDAOiS+0/p58C3vBdCNPX5cD9sHqR
rPYxeLkCgYEA74Z4VpBQ5QjsE/tUSEDze+Fp7TZ/3/DWT+r/cgkfF/Xpn5aXq1si
0JS4QXiAkMlPb2xeyNKhs+ENzxLfxSEQufGVmmx2vxzNUbmgq9y0xdXcbRboXKMH
EOLIVvndWwuEB9uyBQ9l5d7yd5sjUX7qSUaJbZ2Zw3LVw/qsJ7ZbvK8CgYEAwFws
akq//g3bHF9HOiEXY8sRU6Ou9Qe2eBPM+3EMqwkrcfADmKrBRO53Ns44NRiESwz3
Ix/EmzuiFnOPL0Pb0Jyzz6oETf3Vr5cWFkj8/uIc0YVulJC7pulul7WqDxMzIdyx
/k40f60c3IUVnvXi31/EVCYKywweJf0gSqCOR3UCgYEA7bdVIwQjZMuQENy0bukX
PPEgAa6/Bm+tIq+lSXXICC2k6R+58vSF/uA6Za/EWO2SCpFRGJoCpdVLsSGYN7pz
MTeUNChFSbK6Csvhq+9k8ZsoIpRDk/ywfI+2KKvehgdNx8bATMlVZef4V7/+M1l0
B7kbl1B8VD9Z7CCSTu9q6D0CgYAXYl0n4sRqPwb28QI4p9MvF32YvFpFgVWGTWnq
2zheBnRYmoPlaESse4zUhcdBdSSH9yCIDZGaCWrP7eZnKYmsV5BoW1PAo235tZVC
ykavOY+lTOI/f0TAqrn+CWCOCph5slmU/67UIphSmn8hXuTgoMS+Mg2311ZG6fml
+NSzDQKBgBeKm+J6iaD5t7ysbG+REFPcNiOi5vxgqYQFE9b6DHEIsYuyij7lwitZ
lkrKoTEe/413eqU5x2jDPnl8P/lvdYVQ8LOc7lEQ4OtUhgh7JlnuB3eWQqUyz3se
53UFCioUCtSzAhhHSxA9WRuYfr5cZtyF27r/IGa9LW17Ih5XmV0E
`

verifyToken = (req, res, next) => {
    // In authorization key is missing
    if (!req.headers.authorization) {
        res.status(401).json({message: 'error', error: 'Unauthorized Request'});
    }
    let token = req.headers.authorization.split(' ')[1];
    // if token value in null
    if (token === 'null') {
        res.status(401).json({message: 'error', error: 'Unauthorized Request'});
    }
    let payload = jwt.verify(token, RSA_SECRET_KEY);
    // if token is not valid
    if (!payload) {
        res.status(401).json({message: 'error', error: 'Unauthorized Request'});
    }
    // if Token is valid
    req.userId = payload.subject;
    next()
}
module.exports = app => {
    app.get("/api/users", users.index);
    app.get("/api/users/:userId", verifyToken, users.show);
    app.post("/api/users", users.create);
    app.put("/api/users/:userId", verifyToken, users.update);
    app.delete("/api/users/:userId", verifyToken, users.destroy);
    
    app.get("/api/users/:userId/quizzes", verifyToken, users.quizzes);
    app.get("/api/users/:userId/quiz/:quizId", verifyToken, users.showQuiz);
    app.put("/api/users/:userId/quiz/:quizId", verifyToken, users.editQuiz);
    app.delete("/api/users/:userId/quiz/:quizId", verifyToken, users.deleteQuiz);
    
    app.get("/api/quizzes", quizzes.index);
    app.get("/api/quizzes/:quizId", quizzes.show);
    app.post("/api/quizzes", verifyToken, quizzes.create);

    app.post("/api/login", session.create);
}