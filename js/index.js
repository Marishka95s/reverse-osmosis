// 1) Отримати доступ до інпутів
const inputCi = document.querySelector('#ci');
const inputGv = document.querySelector('#gv');
const inputXz = document.querySelector('#xz');
const inputXp = document.querySelector('#xp');
const inputXr = document.querySelector('#xr');
const inputXr2 = document.querySelector('#xr2');

// 2) Отримати доступ до кнопок запуску розрахунків 
const calcBtnOneStep = document.querySelector('.calculate-one-step');
const calcBtnTwoStep = document.querySelector('.calculate-two-step');

// 3) Повісити слухачів на кнопки розрахунку і при кліку на них виконувати той чи інший розрахунок при запуску відповідної функції для розрахунку
calcBtnOneStep.addEventListener('click', onCalcBtnOneStepClick);
calcBtnTwoStep.addEventListener('click', onCalcBtnTwoStepClick);

// 4) Отримати доступ до кнопки очищення полів 
const removeInputsData = document.querySelector('.remove-data');

// 5) Повісити слухача кліку на кнопку очищення полів і очищати дані імпутів і розраховані дані
removeInputsData.addEventListener('click', onRemoveInputsDataClick);

// 6) Отримати доступ до спанів з текстовим контентом
// --Одноступінчата ЗОУ--
const resSpanOneStepGi = document.querySelector('#gi-1');
const resSpanOneStepCv = document.querySelector('#cv-1');
const resSpanOneStepGp = document.querySelector('#gp-1');
const resSpanOneStepCp = document.querySelector('#cp-1');
const resSpanOneStepGk = document.querySelector('#gk-1');
const resSpanOneStepCk = document.querySelector('#ck-1');
const resSpanOneStepGr = document.querySelector('#gr-1');
const resSpanOneStepGs = document.querySelector('#gs-1');

// --Двоступінчата ЗОУ--
const resSpanTwoStepGi = document.querySelector('#gi-2');
const resSpanTwoStepCv = document.querySelector('#cv-2');
const resSpanTwoStepGp = document.querySelector('#gp-2');
const resSpanTwoStepCp = document.querySelector('#cp-2');
const resSpanTwoStepGk = document.querySelector('#gk-2');
const resSpanTwoStepCk = document.querySelector('#ck-2');
const resSpanTwoStepGp2 = document.querySelector('#gp2-2');
const resSpanTwoStepCp2 = document.querySelector('#cp2-2');
const resSpanTwoStepGk2 = document.querySelector('#gk2-2');
const resSpanTwoStepCk2 = document.querySelector('#ck2-2');
const resSpanTwoStepGr = document.querySelector('#gr-2');
const resSpanTwoStepGs = document.querySelector('#gs-2');
const resSpanTwoStepGr2 = document.querySelector('#gr2-2');
const resSpanTwoStepGs2 = document.querySelector('#gs2-2');
const resSpanTwoStepGi2 = document.querySelector('#gi2-2');
const resSpanTwoStepCv2 = document.querySelector('#cv2-2');


// 7) Оформити секції розрахунків і присвоєння значень відповідним змінним
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


function onCalcBtnOneStepClick() {
    const ci = inputCi.value; // 1500
    const gv = inputGv.value; // 1
    const xz = inputXz.value; // 0.99
    const xp = inputXp.value; // 0.2
    let xr = inputXr.value; // 0.2

    var cv = 1.2 * ci

    for (let i = 0; i < 100; i++) {
    var [gp, cp, gk, ck] = membr(gv, cv, xz, xp)
    var [gr, gs] = rozd(gk, xr)
    var [gi, cv] = zmish(gr, ck, ci, gv)
    }

    let lp = gi * ci
    let rp = gp * cp + gs * ck
    let message = Math.round(lp - rp) === 0 ? "LP = RP" : "Something is wrong"

    console.log("Cv =", cv, "\nCp =", cp, "\nCk =", ck)
    console.log("Gi =", gi, "Gk =", gk, "Gp =", gp, "Gs =", gs) 
    console.log(message)

    resSpanOneStepGi.textContent = gi;
    resSpanOneStepCv.textContent = cv;
    resSpanOneStepGp.textContent = gp;
    resSpanOneStepCp.textContent = cp;
    resSpanOneStepGk.textContent = gk;
    resSpanOneStepCk.textContent = ck;
    resSpanOneStepGr.textContent = gr;
    resSpanOneStepGs.textContent = gs;

    // const result = () => {
    // console.log("\x1b[3;32m" + "Зворотний осмос 1:" + "\x1b[0m")
    // console.log("Cv =", cv, "\nCp =", cp, "\nCk =", ck)
    // console.log("Gi =", gi, "Gk =", gk, "Gp =", gp, "Gs =", gs) 
    // console.log(message)
    // }
    
    return ci, gv, xz, xp, xr, xr2;

}
function onCalcBtnTwoStepClick() {
    
// 2 ступінь
    const ci = inputCi.value; // 1500
    const gv = inputGv.value; // 1
    const xz = inputXz.value; // 0.99
    const xp = inputXp.value; // 0.2
    let xr = inputXr.value; // 0.2
    let xr2 = inputXr2.value; // 0.25

var cv1 = 1.2 * ci

// for (let i = 0; i < 100; i++) {
//   var [gp1, cp1, gk1, ck1] = membr(gv, cv1, xz, xp)
//   var [gr1, gs1] = rozd(gk1, xr)
//   var [gp2, cp2, gk2, ck2] = membr(gp1, cp1, xz, xp)
//   var [gr2, gs2] = rozd(gk2, xr2)
//   var [gi2, cv2] = zmish2(gr1, ck1, gr2, ck2)
//   var [gi1, cv1] = zmish(gi2, cv2, ci, gv)
// }

// let lp = gi1 * ci
// let rp = gs1 * ck1 + gs2 * ck2
// let message = Math.round(lp - rp) === 0 ? "LP = RP" : "Something is wrong"

// const result = () => {
//   console.log("\x1b[3;32m" + "Зворотний осмос 2:" + "\x1b[0m")
//   console.log("Cv1 =", cv1, "\nCp1 =", cp1, "\nCk1 =", ck1)
//   console.log("Gi1 =", gi1, "Gk1 =", gk1, "Gp1 =", gp1, "Gs1 =", gs1)
//   console.log("Cv2 =", cv2, "\nCp2 =", cp2, "\nCk2 =", ck2)
//   console.log("Gi2 =", gi2, "Gk2 =", gk2, "Gp2 =", gp2, "Gs2 =", gs2)
//   console.log(message)
// }
}

// 8) Створити можливість очищення введених даних
function onRemoveInputsDataClick() {
    
}

// 9) Отримати доступ до значень спанів для заміни текстового контенту на пораховані значення змінних



