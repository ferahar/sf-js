import * as params from './name';

export function showFrags(result) {
    let target = `.${params.toolsName} h5`;
    const score = document.querySelector(target);
    score.className = "show";
    score.textContent = result;
}