import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import crypto from "crypto";
import request from "request";
import dotenv from "dotenv";
dotenv.config();

let bodydata;
let changellyerror;
let exolixerror;


const PORT = process.env.PORT || 3000;
// const host = "127.0.0.1";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/multiplefetch", async (req, res) => {
const {sell,get,amount}=req.body
console.log(req.body)
      console.log(sell,get,amount)
      if(amount=="0" || amount=="0." || amount=="")
      {
        res.json({hightprice:"0"})
      }else{
    // setload(true);
    try {

      const privateKeyString =
      "308204be020100300d06092a864886f70d0101010500048204a8308204a40201000282010100b6f7638ac5b811561dc071820c7c764da95ddfb63dafb1f9b96f4d1577ae63f6c7010dd041b5bc314002f0a8536ea29c619de7487b3a98944607674b3905274c40f1f36cb58e9925c2c90846f40cf3f7d10983e01ab0354ded5de57bcac6dc31b47b0bac5f79c7e7947db9bc4a7e18e46a94f291c8055576e00825510731d5b89c5936c8d48106ff837fca0881b721f7c09a272bc316c74c8e56e0dfa69b0cdf3153b671a732506b043363443ff0677f615be06f4519ee07a130d5936e71c87761838296e667122ead027d72431ba8e0b75afe6249c5e4cf1152309e9eb392a8d4d02a6b84443801745731db6b548b7a392d4783c4e168a3a9f0235c84ebf7b902030100010282010029ecabf17b76befa359d08255d89136e9e35757283d603790e65938b2cbe58078ef80ddb3f834e1916ead58c2c79f866cef368b0b213ee2c639384b6b6dd18711f9c9143c2a2673340dbe1baa867636bd089569f7e5e0c08cc302cca5ddf8d4b1268f376cef5cfb99fcbe34862e55bfcd2f34855e1385fa9fa91c3433adbcf75b7821d6299f198edc7472da9fd401ab3f29887ca8e1105389351691ef2925a14b7a960c85d887f233feac28c5248cf8c20360bdcf86423fd0f18a9c7678ff3fac8b155f1a4d4e356260f336a8a94449a8a7fad36314f8005c23fd196a8f9d2aa57bf0bed3ae93ac4b095a2abc311eee8e6f44fefb6def929ca7e371af2685b1502818100e45e992dab2a73ca02855ee71ab2c8b6cbe5c356892ca2f6fba6e642fb7e75221b8f48574ea7419e33850e1938d6fbd16306a4e32d75b4f7d109523751694cd620214a0073a682c1ce9ed005c4d4fef212ac8f7b351c4772b32461e9555b22f7e1e67398d6666b7c34dff08426c8d144470ae60509cae038d558ce8a5236be9702818100cd1a7efa1353a0c5b42c0fb3e4477fba8cac7076aac21c1fd4a07558c629253f592304ab611a72daf24c562c27dcaf0d46751366840274438886b0ca3309008d73b4953d887a7e27dab38086864eff3071bd7daf5812b058de591c484f6c51d249561b5453b6529dc5e54a9ffaa6982726abaa3c51508701a31a43055932162f02818100b521e72316e9440fcd3215d4fe13222a02cd89c300685c15c4025c0e72c59988650d9f964837574f7093af5c07fe549b7e8ccd89b70bee6ec4e93cc1cd9bd4aaddaf29aff40af5195d960f6f13f0d10a160fb27a49e4d532bfae32ceccb9cda18916ad47637eb6f03c4c06cbfaab3b788954b69ef66668b40b5c35edf6499f9f02818100a82ca69b14c7c896f372017a269efdbb8fe740dbfc8de713ae7bd75c703782a41bc99be58e5c6a7ade9bfb387f82f34236587f0cdb074c1fa7cd911e6a9462109a24230eee5e4a1d11b58798467e75be5a34dedeac9fbe5b500dcf23f783c0df6564a64a11cdf8960793480a3f32e4a58d8ecaaa649e5be4dac108dd54d2bddf02818069e9b896d061a7449202370c9fe028c5a4a83890510861184c7d712e4749ff8d8185d0702d7894d2609b50cfd7d3fab44f84be6d2935904f136018123979e6cca03648d855cf53b658aead3144bd4debc48fb395fae656743851da0bd25c1a016284a0343149529f6aa5deeee5ea57f923064ecba9dfa093aaded8803070f32d";
  
    const privateKey = crypto.createPrivateKey({
      key: privateKeyString,
      format: "der",
      type: "pkcs8",
      encoding: "hex",
    });
  
    const publicKey = crypto.createPublicKey(privateKey).export({
      type: "pkcs1",
      format: "der",
    });
  
    const message = {
      jsonrpc: "2.0",
      id: "test",
      method: "getExchangeAmount",
      params: {
        from: sell,
        to: get,
        amountFrom: amount,
      },
    };
  
    const signature = crypto.sign(
      "sha256",
      Buffer.from(JSON.stringify(message)),
      {
        key: privateKey,
        type: "pkcs8",
        format: "der",
      }
    );
  
    const param1 = {
      method: "POST",
      url: "https://api.changelly.com/v2",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": crypto
          .createHash("sha256")
          .update(publicKey)
          .digest("base64"),
        "X-Api-Signature": signature.toString("base64"),
      },
      body: JSON.stringify(message),
    };

      const param3 = {
        jsonrpc: "2.0",
        method: "getExchangeAmount",
        params: {
          from: sell,
          to: get,
          amount: amount,
        },
      };

      const param4 = {
        from: sell.toUpperCase(),
        to: get.toUpperCase(),
        amount: amount,
      };


      const param8 = {
        from: sell,
        to: get,
        amount: amount,
      };


      const [
        response1,
        response2,
        response3,
        response4,
        response5,
        response6,
        response7,
        response8,
      ] = await Promise.all([
        //.......................................................Api 1 Call (Changelly)
        
          request(param1, async function (error, response) {
            const data = await JSON.parse(response.body);
              if (data.result && data.result.length > 0) {
                bodydata=data.result[0].amountTo;
                // res.send(bodydata)
              } else if(data.error > 0) {
                // Handle the case when data.result is undefined, empty, or does not contain the expected data
                // For example, you can send a default value or an error response
                changellyerror=data.error.message;
                // res.send(data)
                bodydata=0;
              }else{
                bodydata=0;
                // res.send(data)
          }

          }),

        //.......................................................Api 2 Call (Exolix)

        fetch(
          `https://exolix.com/api/v2/rate?coinFrom=${sell}&coinTo=${get}&amount=${amount}&rateType=fixed`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ),

        //.......................................................Api 3 Call (Change Hero)

        fetch(`https://api.changehero.io/v2/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": "46799cd819854116907d2a6f54926157",
          },
          body: JSON.stringify(param3),
        }),

        //.......................................................Api 4 Call (Godex)

        fetch(`https://api.godex.io/api/v1/info`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(param4),
        }),

        //.......................................................Api 5 Call (Simpleswap)

        fetch(`http://api.simpleswap.io/get_estimated?api_key=ae57f22d-7a23-4dbe-9881-624b2e147759&fixed=true&currency_from=${sell}&currency_to=${get}&amount=${amount}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }),

        //...................................................... Api 6 Call (Changenow)

        fetch(
          `https://api.changenow.io/v1/exchange-amount/${amount}/${sell}_${get}/?api_key=3016eb278f481714c943980dec2bfc595f8a2160e8eabd0228dc02cc627a184c`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ),

        //.......................................................Api 7 Call (StealthEX)

        fetch(`https://api.stealthex.io/api/v2/estimate/${sell}/${get}?amount=${amount}&api_key=6cbd846e-a085-4505-afeb-8fca0d650c58`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }, 
       }),

        //.......................................................Api 8 Call (Letsexchange)

        fetch(`https://api.letsexchange.io/api/v1/info`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b2tlbiIsImRhdGEiOnsiaWQiOjkwLCJoYXNoIjoiZXlKcGRpSTZJa2wzYmxFNE1VeHVOMU5DU25aamFEbExWVE5rYW1jOVBTSXNJblpoYkhWbElqb2lUV1ZhWWs5dGNXY3dWSEZMYm1wWGRuVjJjMXBzV0RaU1ZpdFphamxJYWtrM1EzQkhTRlpsVFdGS1JXZHVXV1pxUTJRNU9WUXlaSHBEVDJWd2NVeEdRVTFOYjBVelJIaEdSRzlwWjBsaEt6UjJWR0UxVjI1TmQweEROamRCUmxCWFdISTJRMGRpUm1Kb1ltTTlJaXdpYldGaklqb2labU0xTnpNMU0yRXlaRFJqWmpSalpXWTFZV1ZqWVRkalptSTBZall4WmpVNFpqZGtNak0wTXpVNU1XRmtaRGRrWm1Sak5HWXhaamt6TldFM01tVXlOaUo5In0sImlzcyI6Imh0dHBzOlwvXC9sZXRzLW5naW54LXN2Y1wvYXBpXC92MVwvYXBpLWtleSIsImlhdCI6MTY2ODUxNjUzNywiZXhwIjoxOTg5OTI0NTM3LCJuYmYiOjE2Njg1MTY1MzcsImp0aSI6IkRCelpBVjdBRDhMMzZTZ1IifQ.tP5L6xDINQSmWVJsmin2vrjrYFopk-cDNWGkBOlKARg"
          },
          body: JSON.stringify(param8),
        }),
      ]);

      let result1 =bodydata
      // set_changelly_EEA(parseFloat(result1.amountTo).toFixed(5));

      let result2 = await response2.json();
      console.log("exolix",result2)
      // set_xolix_EEA(parseFloat(result2.toAmount).toFixed(5));

      let result3 = await response3.json();
      // set_changehero_EEA(parseFloat(result3.result).toFixed(5));

      let result4 = await response4.json();
      // set_godex_EEA(parseFloat(result4.amount).toFixed(5));

      const result5 = await response5.json();

      let result6 = await response6.json();
      // set_changenow_EEA(parseFloat(result6.estimatedAmount).toFixed(5));

      try {
        var result7 = await response7.json();
      } catch (error) {
        var result7={estimated_amount:"0"}
      }
      // set_stealthio_EEA(parseFloat(result7.estimated_amount).toFixed(5));

      try {
        var result8 = await response8.json();
      } catch (error) {
        var result8 = {amount:0} 
      }

      //.........Creating arry of objects and finding heighest value...........//

      let changelly = parseFloat(result1).toFixed(5)
      let exolix = result2.error=="Such exchange pair is not available"?0:parseFloat(result2.toAmount).toFixed(5);
      let changehero = parseFloat(result3.result).toFixed(5);
      let godex = parseFloat(result4.amount?result4.amount:0).toFixed(5); 
      let simpleswap = parseFloat(result5.error?0:result5).toFixed(5);
      let changenow = parseFloat(result6.estimatedAmount).toFixed(5);
      let stealthio = parseFloat(result7.estimated_amount).toFixed(5);
      let letsexchange = parseFloat(result8.amount).toFixed(5);

      // let changehero = parseFloat(0).toFixed(5);
      // let godex = parseFloat(0).toFixed(5);
      // let simpleswap = parseFloat(0).toFixed(5);
      // let changenow = parseFloat(0).toFixed(5);
      // let stealthio = parseFloat(0).toFixed(5);
      // let letsexchange = parseFloat(0).toFixed(5);

 
      let arr = [
        { name: "changenow", value: parseFloat(changenow) },
        { name: "exolix", value: parseFloat(exolix) },
        { name: "godex", value: parseFloat(godex) },
        { name: "changehero", value: parseFloat(changehero) },
        { name: "changelly", value: parseFloat(changelly) },
        { name: "simpleswap", value: parseFloat(simpleswap) },
        { name: "stealthio", value: parseFloat(stealthio) },
        { name: "letsexchange", value: parseFloat(letsexchange) },
      ];

      function sortArrayDescending(arr, key) {
        arr.sort(function (a, b) {
          return b[key] - a[key];
        });
        return arr;
      }

      const sortedArr = sortArrayDescending(arr, "value");

      // setArray(sortedArr);

      console.log("Highest value " + sortedArr[0].value + sortedArr[0].name);

      res.json({hightprice:sortedArr[0].value, pricearray:sortedArr,changelly:changelly,exolix:exolix,changehero:changehero,godex:godex,simpleswap:simpleswap,changenow:changenow,stealthio:stealthio,letsexchange:letsexchange})

      
    } catch (error) {
      // setmsg(error.response6.message);
      res.send({hightprice:"server error"})
      console.log(error)
    }
  }
});

app.post("/stealthEX/Dave", async (req, res) => {
  const { url } = req.body;
  let response = await fetch(`${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  res.json(await response.json());
});

app.post("/changehero/Dave", async (req, res) => {
  console.log(req.body);
  // const {from,to,amount}=req.body

  let response = await fetch(`https://api.changehero.io/v2/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": "46799cd819854116907d2a6f54926157",
    },
    body: JSON.stringify(req.body),
  });

  res.json(await response.json());
});

app.post("/simpleswap/Dave", async (req, res) => {
  console.log(req.body);
  const { from, to, amount } = req.body;

  let response = await fetch(
    `http://api.simpleswap.io/get_estimated?api_key=ae57f22d-7a23-4dbe-9881-624b2e147759&fixed=true&currency_from=${from}&currency_to=${to}&amount=${amount}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  res.json(await response.json());
});

app.post("/letsexchange/Dave", async (req, res) => {
  console.log(req.body);
  const { from, to, amount } = req.body;

  const param8 = {
    from: from,
    to: to,
    amount: amount,
  };

  let response = await fetch(`https://api.letsexchange.io/api/v1/info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param8),
  });

  console.log(response);
  res.json(await response.json());
  // res.send(response)
});

app.post("/changelly/Dave", async (req, res) => {
  const { from, to, amount } = req.body;
  console.log(req.body);

  const privateKeyString =
    "308204be020100300d06092a864886f70d0101010500048204a8308204a40201000282010100b6f7638ac5b811561dc071820c7c764da95ddfb63dafb1f9b96f4d1577ae63f6c7010dd041b5bc314002f0a8536ea29c619de7487b3a98944607674b3905274c40f1f36cb58e9925c2c90846f40cf3f7d10983e01ab0354ded5de57bcac6dc31b47b0bac5f79c7e7947db9bc4a7e18e46a94f291c8055576e00825510731d5b89c5936c8d48106ff837fca0881b721f7c09a272bc316c74c8e56e0dfa69b0cdf3153b671a732506b043363443ff0677f615be06f4519ee07a130d5936e71c87761838296e667122ead027d72431ba8e0b75afe6249c5e4cf1152309e9eb392a8d4d02a6b84443801745731db6b548b7a392d4783c4e168a3a9f0235c84ebf7b902030100010282010029ecabf17b76befa359d08255d89136e9e35757283d603790e65938b2cbe58078ef80ddb3f834e1916ead58c2c79f866cef368b0b213ee2c639384b6b6dd18711f9c9143c2a2673340dbe1baa867636bd089569f7e5e0c08cc302cca5ddf8d4b1268f376cef5cfb99fcbe34862e55bfcd2f34855e1385fa9fa91c3433adbcf75b7821d6299f198edc7472da9fd401ab3f29887ca8e1105389351691ef2925a14b7a960c85d887f233feac28c5248cf8c20360bdcf86423fd0f18a9c7678ff3fac8b155f1a4d4e356260f336a8a94449a8a7fad36314f8005c23fd196a8f9d2aa57bf0bed3ae93ac4b095a2abc311eee8e6f44fefb6def929ca7e371af2685b1502818100e45e992dab2a73ca02855ee71ab2c8b6cbe5c356892ca2f6fba6e642fb7e75221b8f48574ea7419e33850e1938d6fbd16306a4e32d75b4f7d109523751694cd620214a0073a682c1ce9ed005c4d4fef212ac8f7b351c4772b32461e9555b22f7e1e67398d6666b7c34dff08426c8d144470ae60509cae038d558ce8a5236be9702818100cd1a7efa1353a0c5b42c0fb3e4477fba8cac7076aac21c1fd4a07558c629253f592304ab611a72daf24c562c27dcaf0d46751366840274438886b0ca3309008d73b4953d887a7e27dab38086864eff3071bd7daf5812b058de591c484f6c51d249561b5453b6529dc5e54a9ffaa6982726abaa3c51508701a31a43055932162f02818100b521e72316e9440fcd3215d4fe13222a02cd89c300685c15c4025c0e72c59988650d9f964837574f7093af5c07fe549b7e8ccd89b70bee6ec4e93cc1cd9bd4aaddaf29aff40af5195d960f6f13f0d10a160fb27a49e4d532bfae32ceccb9cda18916ad47637eb6f03c4c06cbfaab3b788954b69ef66668b40b5c35edf6499f9f02818100a82ca69b14c7c896f372017a269efdbb8fe740dbfc8de713ae7bd75c703782a41bc99be58e5c6a7ade9bfb387f82f34236587f0cdb074c1fa7cd911e6a9462109a24230eee5e4a1d11b58798467e75be5a34dedeac9fbe5b500dcf23f783c0df6564a64a11cdf8960793480a3f32e4a58d8ecaaa649e5be4dac108dd54d2bddf02818069e9b896d061a7449202370c9fe028c5a4a83890510861184c7d712e4749ff8d8185d0702d7894d2609b50cfd7d3fab44f84be6d2935904f136018123979e6cca03648d855cf53b658aead3144bd4debc48fb395fae656743851da0bd25c1a016284a0343149529f6aa5deeee5ea57f923064ecba9dfa093aaded8803070f32d";

  const privateKey = crypto.createPrivateKey({
    key: privateKeyString,
    format: "der",
    type: "pkcs8",
    encoding: "hex",
  });

  const publicKey = crypto.createPublicKey(privateKey).export({
    type: "pkcs1",
    format: "der",
  });

  const message = {
    jsonrpc: "2.0",
    id: "test",
    method: "getExchangeAmount",
    params: {
      from: from,
      to: to,
      amountFrom: amount,
    },
  };

  const signature = crypto.sign(
    "sha256",
    Buffer.from(JSON.stringify(message)),
    {
      key: privateKey,
      type: "pkcs8",
      format: "der",
    }
  );

  const options = {
    method: "POST",
    url: "https://api.changelly.com/v2",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": crypto
        .createHash("sha256")
        .update(publicKey)
        .digest("base64"),
      "X-Api-Signature": signature.toString("base64"),
    },
    body: JSON.stringify(message),
  };

  request(options, async function (error, response) {
    //   console.log(response.body);
    const data = await JSON.parse(response.body);
    // res.send(data.result[0]);
    console.log("here",data)
    if (data.result && data.result.length > 0) {
      res.send(data.result[0].amountTo);
    } else if(data.error > 0) {
      // Handle the case when data.result is undefined, empty, or does not contain the expected data
      // For example, you can send a default value or an error response
      res.send(data.error.message);
    }else{
      res.send(data);
    }
    
  });
});

//...................................Changelly........................................//
// Error For now I am using Changehero
app.post("/Changelly/transaction", async (req, res) => {
  let result2 = await fetch(`https://api.changehero.io/v2/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": "46799cd819854116907d2a6f54926157",
    },
    body: JSON.stringify(req.body),
  });
  const t = await result2.json();
  console.log(t);
  res.json(t);
  //   res.send(result2)
});

//.....................................Stealth EX......................................//

app.post("/Stealthex/transaction", async (req, res) => {
  // let result7 = await fetch(`https://api.stealthex.io/api/v2/fee/exchange?api_key=6cbd846e-a085-4505-afeb-8fca0d650c58`, {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //     body:JSON.stringify(req.body)
  //   });
  // res.json(await result7.json())
  // // res.send(req.body)

  let result2 = await fetch(`https://api.changehero.io/v2/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": "46799cd819854116907d2a6f54926157",
    },
    body: JSON.stringify(req.body),
  });
  const t = await result2.json();
  console.log(t);
  res.json(t);
  //   res.send(result2)
});

//.............................Change Hero...............................//

app.post("/Changehero/transaction", async (req, res) => {
  console.log(req.body + "ChangeHero");

  let result2 = await fetch(`https://api.changehero.io/v2/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": "46799cd819854116907d2a6f54926157",
    },
    body: JSON.stringify(req.body),
  });
  const t = await result2.json();
  console.log(t);
  //   res.json(t)
  res.send(t);
});

//...............................Changenow..................................//

app.post("/Changenow/transaction", async (req, res) => {
  console.log(req.body + "Changenow");

  let result1 = await fetch(
    `https://api.changenow.io/v1/transactions/3016eb278f481714c943980dec2bfc595f8a2160e8eabd0228dc02cc627a184c`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    }
  );
  const t = await result1.json();
  console.log(t);
  res.json(t);
  // res.send(response)
});

//................................Exolix.....................................//

app.post("/Exolix/transaction", async (req, res) => {
  console.log(req.body + "Exolix");

  let result5 = await fetch(`https://exolix.com/api/v2/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRyYXp0aWs5OUBnbWFpbC5jb20iLCJzdWIiOjI1NzE2LCJpYXQiOjE2Njg1MTUxNTQsImV4cCI6MTgyNjMwMzE1NH0.X42sQ6iHsGiP0nXA9o_ln89CiuOYnLx5vLqF4M-hf54",
      Accept: "application/json",
    },
    body: JSON.stringify(req.body),
  });
  const t = await result5.json();
  console.log(t);
  res.json(t);
  // res.send(response)
});

//.....................................Godex.........................................//

app.post("/Godex/transaction", async (req, res) => {
  console.log(req.body + "Godex");

  let result6 = await fetch(`https://api.godex.io/api/v1/transaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "public-key":
        "lPM1O83kxGXJn9C0IgtKb8E/3EN1kWX3PnLF3EGl6NaFN8cvxi+kj9j+18kum12pdDWIbpTqy6/kVRMxGsE=a7f7a513cbc3ecbeb81eda9cff3182f3",
    },
    body: JSON.stringify(req.body),
  });
  const t = await result6.json();
  console.log(t);
  res.json(t);
  // res.send(response)
});

//.......................Simpleswap..........................//

app.post("/Simpleswap/transaction", async (req, res) => {
  console.log(req.body + "Simpleswap");

  let result3 = await fetch(
    `https://api.simpleswap.io/create_exchange?api_key=ae57f22d-7a23-4dbe-9881-624b2e147759`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        api_key: "ae57f22d-7a23-4dbe-9881-624b2e147759",
      },
      body: req.body,
    }
  );
  const t = await result3.json();
  console.log(t);
  res.json(t);
  // res.send(response)
}); 

app.listen(PORT,() => {
  console.log("Server listening at " + PORT);
});

// "start": "node index.js",
// "dev": "nodemon index.js",
