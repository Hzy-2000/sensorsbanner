const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/proxy", async (req, res) => {
    try {
        const response = await axios.post(
            "https://sensorsdatasingapore.sensorsdatasingapore.sfn-aws-singapore-01.saas.sensorsdata.cn/api/v2/sfo/section/recommend?org_id=sensorsdatasingapore&access_token=b4a07cc4-213c-4733-a688-047f27c9eb95",
            req.body,
            {
                headers: {
                    "Content-Type": "application/json",
                    "project-name": "Simulator"
                },
                httpsAgent: new (require("https").Agent)({
                    rejectUnauthorized: false, // 忽略证书错误
                }),
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error("代理服务器错误：", error.message);
        res.status(error.response?.status || 500).send(error.message);
    }
});

app.listen(3000, () => {
    console.log("代理服务器已启动，访问地址：http://localhost:3000");
});
