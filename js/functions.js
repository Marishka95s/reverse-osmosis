const membr = (gv, cv, xz, xp) => {
    let gp = xp * gv
    let gk = gv - gp
    let cp = cv * (1 - xz)
    let ck = (gv * cv - gp * cp) / gk
    return [gp, cp, gk, ck]
  }
  
  const rozd = (gk, xr) => {
    let gr = xr * gk
    let gs = gk - gr
    return [gr, gs]
  }
  
  const zmish = (gr, ck, ci, gv) => {
    let gi = gv - gr
    let cv = (gi * ci + gr * ck) / gv
    return [gi, cv]
  }
  
  const zmish2 = (gr1, ck1, gr2, ck2) => {
    let gr = gr1 + gr2
    let ck = (gr1 * ck1 + gr2 * ck2) / gr
    return [gr, ck]
  }
  
  module.exports = {
    membr,
    rozd,
    zmish,
    zmish2
  }