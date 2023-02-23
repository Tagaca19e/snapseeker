
import NodeRSA from "node-rsa";

const keyData = {
    consumerId: "1868a99f-ff67-4181-ad39-a92a773d586e",
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAxlsoj5Fg1oy1SDv+KdOIznXKj3QT+5+KzhgmksMQdZ/E1kJG
vodo+cO+7chyDmo9apZX3YeI39oCavyNClnS+wymHtrCJUAQF6lTbCkKN53CmRdp
4aOx9300n6uLLP7x/uBtsvmWJMMdUKgsS1ObGKKrt0KijaFACoTsllT/3V2Z91zV
aZC50TKGAunYEOVuy/ahkGT4jWuqhXh9mK9RKmMeSxmBRpsmniviHQSD7KvFg7NS
swljURcocmDBcHTcL+xMJQvJX/HPEBt8ALZLv5+jcXcyOzUiCfBLirE6BasDKF76
WfykWGYVvrQtYv8bfkzgso2LUWEXAMl/S1wKSwIDAQABAoIBACHghc/nW2upQnjg
zirklvP0CDFx+Mu71uAWHdho+lGshNi3HxABXntx5BUGa/xsRqsCnGUYddcNi+Yr
1gbTioYYBfM1F313MIhqAfZyF+2hww+UgR/pbka/mpI+oRmBPWFzgSjVGcCTllkl
L9N5pv6RIdS9y7d2t9JUG3gdckmjGuPpfZQ0qqwESCc1lnqh3UpUwLfkieJgH5Xj
5+pVwgaJo2XJP5touGPXdxQL1MHOZ1xYrjSzeE47R6DXYJ2T1TD0Oh2OmJ7ufD7Q
dJmLPgK8uVeqsO3JYIhssk52/QXN+obx0WMmt027TcKwWmniF4uz82Q3aLmqgjg5
0z1oAZkCgYEA4zR8wiMI0Qd1NGlQxivP0sPBNm68OhkO7gItnpSYCG1Z8r7tkufS
VrwQXTvH/t9dqfZppuWGgD2ZxxMkqXkKsXjg+EU/+buHj/TGo/4FKuyCRTY19qR1
AIHaWfZuFvCzpQmW+O173ChMZxX8hDjzk+LGxnHQv15NF5xgJcxPu18CgYEA336v
1AUixk4e1rNVj3/wZkHAkTKZ3BkPLiNKMIBb4+Q4537MxuboYRTFYxZG/9WKdibB
EfvPe7oYRNk7GYXTLMdAIt2baTwYkY0rXk/FsygWks3QcKmcyYy5Luqp7tkoThD1
gxsIWnx6Hq77Sg80jR/NBlP6F+09lJyPVBIJhJUCgYA+q3KiJgG/jnwQud/y2ZDY
hPBdcEvxBopssiMdM8V/xZHi+DEVrWYCUJt+7AdtUPVH9VUNGRBxfQxWsfwR1vZR
H5OGR6uu2cA5v/2urFmGjngcWSinYJN5UVgGKogRQdF7e1quTOs2PdNdN95QJllh
eFL1190JfBxtn8+RfXqcpwKBgFwRnnFjZD35NK8R1a917xzQ/XlTNRr8n8pL82Yj
mrc471A+ZjGSMiy8F8yIAtulppKhyGuWJpU7xn+mVbhf7uzFcGBslnc1sJFVbIY/
qpvxacs0Sif/V32YITl4pmSkxPvT9K/71Och3FUDlLWfqfBxJ07yDVcJ/pJYJJtn
itA5AoGAXeUvnRBm4SEh0QDirKxVCMyWTPj37Vgt8N412PNGRQoWdzGmrDKeOsP3
qGFiZ8YUyNS02SKtcN/jT8EKVSWS53ZQN8iXeB0tou760nEb2VPyndESOA2kVnn6
XOgqBItbVISS5B7W9kFBzVKR3avCDeYj9MoVzX85zpvd6JAMaOs=
-----END RSA PRIVATE KEY-----`,
  keyVer: 5
};
    
    
const generateWalmartHeaders = () => {
  const { privateKey, consumerId, keyVer } = keyData;
  const hashList = {
    "WM_CONSUMER.ID": consumerId,
    "WM_CONSUMER.INTIMESTAMP": Date.now().toString(),
    "WM_SEC.KEY_VERSION": keyVer,
  };

  const sortedHashString = `${hashList["WM_CONSUMER.ID"]}\n${hashList["WM_CONSUMER.INTIMESTAMP"]}\n${hashList["WM_SEC.KEY_VERSION"]}\n`;
  const signer = new NodeRSA(privateKey, "pkcs1");
  const signature = signer.sign(sortedHashString);
  const signature_enc = signature.toString("base64");

  return {
    "WM_SEC.AUTH_SIGNATURE": signature_enc,
    "WM_CONSUMER.INTIMESTAMP": hashList["WM_CONSUMER.INTIMESTAMP"],
    "WM_CONSUMER.ID": hashList["WM_CONSUMER.ID"],
    "WM_SEC.KEY_VERSION": hashList["WM_SEC.KEY_VERSION"],
  };
};


 export default async function getProductById(req,res) {
  const options = {
    method: "GET",
    headers: generateWalmartHeaders(),
  };

  const data = await fetch(
    `https://developer.api.walmart.com/api-proxy/service/affil/product/v2/items?upc=${req.query.term}`,
    options
  )

  res.json(data);
};




