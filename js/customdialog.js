
export function clickAlert() {
    // alert("Alert Pressed!");
    let temp = document.getElementsByTagName("template")[0];
    const cloneTemp = temp.content.cloneNode(true);
    // dialog
    let cloneDialog = cloneTemp.getElementById("myDialog");
    cloneDialog.innerHTML = "Alert pressed";
    // new line
    cloneDialog.appendChild(document.createElement("br"));
    // button
    let okBtn = document.createElement('button');
    okBtn.innerHTML = "OK";
    cloneDialog.appendChild(okBtn);
    okBtn.addEventListener("click", () => {
        cloneDialog.close();
    });
    // add to body
    document.body.appendChild(cloneTemp);
}

// export var userFeedback = "-1";
export function clickConfirm() {
    // clone temp tag
    let temp = document.getElementsByTagName("template")[0];
    const cloneTemp = temp.content.cloneNode(true);
    // dialog
    let cloneDialog = cloneTemp.getElementById("myDialog");
    cloneDialog.innerHTML = "Do you confirm?";
    // create new line
    cloneDialog.appendChild(document.createElement("br"));
    // output
    let cloneOutput = cloneTemp.getElementById("outputTag");
    // let userFeedback = "-1";
    // cancel button
    let cancelBtn = document.createElement('button');
    cancelBtn.innerHTML = "Cancel";
    cloneDialog.appendChild(cancelBtn);
    cancelBtn.addEventListener("click", () => {
        cloneDialog.remove();
        // userFeedback = "false";
        cloneOutput.innerHTML = "Confirm result: false";
    });
    // ok button
    let okBtn = document.createElement('button');
    okBtn.innerHTML = "OK";
    cloneDialog.appendChild(okBtn);
    okBtn.addEventListener("click", () => {
        cloneDialog.remove();
        // userFeedback = "true";
        cloneOutput.innerHTML = "Confirm result: true";
    });
    
    // add to body
    document.body.appendChild(cloneTemp);
    
}

// user enter: <b onmouseover="alert('pwned')">Roll me</b>
export function clickSaferPrompt() {
    // clone temp tag
    let temp = document.getElementsByTagName("template")[0];
    const cloneTemp = temp.content.cloneNode(true);
    // dialog
    let cloneDialog = cloneTemp.getElementById("myDialog");
    cloneDialog.innerHTML = "Do you confirm?";
    // create new line
    cloneDialog.appendChild(document.createElement("br"));
    // user input
    let cloneInput = document.createElement("input");
    cloneInput.name = "userInput";
    cloneInput.type = "text";
    cloneDialog.appendChild(cloneInput);
    // create new line
    cloneDialog.appendChild(document.createElement("br"));
    // output
    let cloneOutput = cloneTemp.getElementById("outputTag");
    // let userFeedback = "-1";
    // cancel button
    let cancelBtn = document.createElement('button');
    cancelBtn.innerHTML = "Cancel";
    cloneDialog.appendChild(cancelBtn);
    cancelBtn.addEventListener("click", () => {
        cloneDialog.remove();
        cloneOutput.innerHTML = "User didn't put anything!";
    });
    // ok button
    let okBtn = document.createElement('button');
    okBtn.innerHTML = "OK";
    cloneDialog.appendChild(okBtn);
    okBtn.addEventListener("click", () => {
        cloneDialog.remove();
        let cleanValue = DOMPurify.sanitize(cloneInput.value);
        if (cleanValue == "" || cleanValue == null) {
            cloneOutput.innerHTML = "User didn't put anything!";    
        } else {
            cloneOutput.innerHTML = cleanValue;
        }
    });
    
    // add to body
    document.body.appendChild(cloneTemp);
}