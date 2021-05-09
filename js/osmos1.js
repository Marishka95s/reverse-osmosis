const {membr, rozd, zmish} = require("./functions")

const ci = 1500
const gv = 1
const xz = 0.99
const xp = 0.2
let xr = 0.2

var cv = 1.2 * ci

for (let i = 0; i < 100; i++) {
  var [gp, cp, gk, ck] = membr(gv, cv, xz, xp)
  var [gr, gs] = rozd(gk, xr)
  var [gi, cv] = zmish(gr, ck, ci, gv)
}

let lp = gi * ci
let rp = gp * cp + gs * ck
let message = Math.round(lp - rp) === 0 ? "LP = RP" : "Something is wrong"

const result = () => {
  console.log("\x1b[3;32m" + "Зворотний осмос 1:" + "\x1b[0m")
  console.log("Cv =", cv, "\nCp =", cp, "\nCk =", ck)
  console.log("Gi =", gi, "Gk =", gk, "Gp =", gp, "Gs =", gs) 
  console.log(message)
}

module.exports = result
