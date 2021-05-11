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
const resSpanOneStepLp = document.querySelector('#lp1');
const resSpanOneStepRp = document.querySelector('#rp1');

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
const resSpanTwoStepLp2 = document.querySelector('#lp2');
const resSpanTwoStepRp2 = document.querySelector('#rp2');

// Оцінювання лівої і правої частини рівнянь
const leftAndRightPartsEvaluation = document.querySelectorAll('.evaluation');
const firstEvaluation = leftAndRightPartsEvaluation[0];
const secondEvaluation = leftAndRightPartsEvaluation[1];

// 7) Створити функції для розрахунку мембрани, розділювача і змішувачів
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

  // 8) Оформити секції розрахунків і присвоєння значень відповідним змінним
  // 1 ступінь
function onCalcBtnOneStepClick() {
    const ci = Number(inputCi.value); // 1500
    const gv = Number(inputGv.value); // 1
    const xz = Number(inputXz.value); // 0.99
    const xp = Number(inputXp.value); // 0.2
    let xr = Number(inputXr.value); // 0.2

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

    // 9) Заміна текстового контенту на пораховані значення змінних і приведення до необхідного формату
    resSpanOneStepGi.textContent = gi.toFixed(2);
    resSpanOneStepCv.textContent = cv.toFixed(2);
    resSpanOneStepGp.textContent = gp.toFixed(2);
    resSpanOneStepCp.textContent = cp.toFixed(2);
    resSpanOneStepGk.textContent = gk.toFixed(2);
    resSpanOneStepCk.textContent = ck.toFixed(2);
    resSpanOneStepGr.textContent = gr.toFixed(2);
    resSpanOneStepGs.textContent = gs.toFixed(2);
    resSpanOneStepLp.textContent = lp.toFixed(3);
    resSpanOneStepRp.textContent = rp.toFixed(3);

    if ((lp - rp) === 0) {
      firstEvaluation.textContent = '=';
    } else if((lp-rp) > 0) {
      firstEvaluation.textContent = '>';
    } else {
      firstEvaluation.textContent = '<'; }
  }

// 2 ступінь
function onCalcBtnTwoStepClick() {
    const ci = Number(inputCi.value); // 1500
    const gv = Number(inputGv.value); // 1
    const xz = Number(inputXz.value); // 0.99
    const xp = Number(inputXp.value); // 0.2
    let xr = Number(inputXr.value); // 0.2
    let xr2 = Number(inputXr2.value); // 0.25

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
    let rp = gs1 * ck1 + gs2 * ck2 + gp2 * cp2
    let message1 = Math.round(lp - rp) === 0 ? "LP = RP" : "Something is wrong"
    
    if ((lp - rp) === 0) {
      secondEvaluation.textContent = "=";
    } else if((lp-rp) > 0) {
      secondEvaluation.textContent = ">";
    } else {
      secondEvaluation.textContent = "<"; }


    console.log("Cv1 =", cv1, "\nCp1 =", cp1, "\nCk1 =", ck1)
    console.log("Gi1 =", gi1, "Gk1 =", gk1, "Gp1 =", gp1, "Gs1 =", gs1)
    console.log("Cv2 =", cv2, "\nCp2 =", cp2, "\nCk2 =", ck2)
    console.log("Gi2 =", gi2, "Gk2 =", gk2, "Gp2 =", gp2, "Gs2 =", gs2)
    console.log(message1)

    // 9) Заміна текстового контенту на пораховані значення змінних і приведення до необхідного формату
    resSpanTwoStepGi.textContent = gi1.toFixed(2);
    resSpanTwoStepCv.textContent = cv1.toFixed(2);
    resSpanTwoStepGp.textContent = gp1.toFixed(2);
    resSpanTwoStepCp.textContent = cp1.toFixed(2);
    resSpanTwoStepGk.textContent = gk1.toFixed(2);
    resSpanTwoStepCk.textContent = ck1.toFixed(2);
    resSpanTwoStepGp2.textContent = gp2.toFixed(2);
    resSpanTwoStepCp2.textContent = cp2.toFixed(2);
    resSpanTwoStepGk2.textContent = gk2.toFixed(2);
    resSpanTwoStepCk2.textContent = ck2.toFixed(2);
    resSpanTwoStepGr.textContent = gr1.toFixed(2);
    resSpanTwoStepGs.textContent = gs1.toFixed(2);
    resSpanTwoStepGr2.textContent = gr2.toFixed(2);
    resSpanTwoStepGs2.textContent = gs2.toFixed(2);
    resSpanTwoStepGi2.textContent = gi2.toFixed(2);
    resSpanTwoStepCv2.textContent = cv2.toFixed(2);
    resSpanTwoStepLp2.textContent = lp.toFixed(3);
    resSpanTwoStepRp2.textContent = rp.toFixed(3);
}

// 10) Створити можливість очищення введених даних
function onRemoveInputsDataClick() {
  inputCi.value = ''; // 1500
  inputGv.value = ''; // 1
  inputXz.value = ''; // 0.99
  inputXp.value = ''; // 0.2
  inputXr.value = ''; // 0.2
  inputXr2.value = ''; // 0.25
}