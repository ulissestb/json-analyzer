const express = require('express')
const jsonData = require('./calls.json')
const app = express()

var exp = []

const results = JSON.parse(jsonData.calls[0].trace)
app.listen(3333)

app.get('/', (req, res) => {
  jsonData.calls.forEach(call => {
    let obj = {}
    obj.resultStatus = call.resultStatus
    obj.receivedOn = call.receivedOn
    const results = JSON.parse(call.trace)
    results.filter(result => result.message === "Request log").forEach(result => {
      let body = JSON.parse(result.data.log.body)
      obj.holder = body.payment.creditCard.holder
      if (body.personalData) {
        obj.name = body.personalData.name
      }
    })
    results.filter(result => result.message === "Response log").forEach(result => {
      const body = JSON.parse(result.data.log.body)
      obj.body = body
    })
    exp.push(obj)
  })
    res.send(exp)
  }
)
