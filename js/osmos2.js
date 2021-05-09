const {membr, rozd, zmish, zmish2} = require("./functions")

const ci = 1500
const gv = 1
const xz = 0.99
const xp = 0.2
let xr = 0.2
let xr2 = 0.25

var cv1 = 1.2 * ci

for (let i = 0; i < 100; i++) {
  var [gp1, cp1, gk1, ck1] = membr(gv, cv1, xz, xp)
  var [gr1, gs1] = rozd(gk1, xr)
  var [gp2, cp2, gk2, ck2] = membr(gp1, cp1, xz, xp)
  var [gr2, gs2] = rozd(gk2, xr2)
  var [gi2, cv2] = zmish2(gr1, ck1, gr2, ck2)
  var [gi1, cv1] = zmish(gi2, cv2, ci, gv)
}

let lp = gi1 * ci
let rp = gs1 * ck1 + gs2 * ck2
let message = Math.round(lp - rp) === 0 ? "LP = RP" : "Something is wrong"

const result = () => {
  console.log("\x1b[3;32m" + "Зворотний осмос 2:" + "\x1b[0m")
  console.log("Cv1 =", cv1, "\nCp1 =", cp1, "\nCk1 =", ck1)
  console.log("Gi1 =", gi1, "Gk1 =", gk1, "Gp1 =", gp1, "Gs1 =", gs1)
  console.log("Cv2 =", cv2, "\nCp2 =", cp2, "\nCk2 =", ck2)
  console.log("Gi2 =", gi2, "Gk2 =", gk2, "Gp2 =", gp2, "Gs2 =", gs2)
  console.log(message)
}

module.exports = result