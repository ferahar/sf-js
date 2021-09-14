export function createMessage(author,text,style) {
    let tmpl = `
        <div class="card-content white-text">
            <h6>${author}</h6>
            <p>${text}</p>
        </div>
    `;
    let div = document.createElement("div");
    div.className = `card ${style}`;
    div.innerHTML = tmpl;
    
    let log = document.querySelector(".sf-log");
    
    log.appendChild(div);
    return true;
}
