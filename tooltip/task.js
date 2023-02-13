const hasToolTip = document.querySelectorAll('.has-tooltip');

let activeTip = null;
let closeDelay;

function addNewTip (element) {

    if ((element.nextElementSibling === null) || (element.nextElementSibling.classList.
        contains('tooltip') === false)) {

        let tip = element.getAttribute('title');
        element.insertAdjacentHTML('afterEnd', `
        <div class="tooltip" style="left: 0; top: 0">${tip}
        </div>`);
    };
};

function setTipCoord (element) {

    let coords = element.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;
    let yDrift = 0;
    console.log('Y= ' + coords.top);
    console.log('WinHeght= ' + windowHeight);
   if (coords.top < (windowHeight / 2)) yDrift = 20;
   if (coords.top >= (windowHeight / 2)) yDrift = -30;
   console.log('yDrift= ' + yDrift);
    element.nextElementSibling.style.left = `${coords.left}px`;
    element.nextElementSibling.style.top = `${coords.top + yDrift}px`;
    return {
        winHeight: windowHeight,
        x: coords.left,
        y: coords.top
    };
};

function showToolTip() {
    
    let element = this;
    let tempValue;
       
    if (element.nextElementSibling === null) {
        tempValue = element; 
    }else {
        tempValue = element.nextElementSibling;
    };

    if ((tempValue.classList.contains('tooltip_active') === false) && (activeTip !== null)) { 
        
        activeTip.classList.remove('tooltip_active');
        addNewTip (element);
        closeDelay = false;
        element.nextElementSibling.classList.add('tooltip_active');
        setTipCoord(element);
        activeTip = element.nextElementSibling;
        setTimeout(() => closeDelay = true, 50);

    } else {    
                
                addNewTip (element);
        
                if (activeTip !== element.nextElementSibling) {

                    element.nextElementSibling.classList.add('tooltip_active');
                    setTipCoord(element);
                    activeTip = element.nextElementSibling;
                    setTimeout(() => closeDelay = true, 50);

                };
        
            };

    console.log('activeTip: ' + activeTip.textContent);
    console.log('=====================================')  

    return false
};

for (let i = 0; i < hasToolTip.length; i++) {

    hasToolTip[i].onclick = showToolTip;
}    

document.onclick = () => {
    
    if ((closeDelay) && (activeTip !== null)) { 
            activeTip.classList.remove('tooltip_active');
            closeDelay = true;
    };
}