var possibleSubstats = ["ATK %", "ATK", "HP %", "HP", "DEF %", "DEF", "CRIT RATE %", "CRIT DAMAGE %", "ENERGY RECHARGE %", "ELEMENTAL MASTERY"];
var substatsAdded = ["null"];
var substatsDesired = ["ATK %", "CRIT RATE %", "CRIT DAMAGE %"];
var substatAverages = [5.0, 3.3, 6.6];
var selected_artifacts = [];
var artifactLines = [];
//form 1
var searchSet = document.getElementById("select-set");
var cards = document.getElementsByClassName("card-custom");
var checked = document.querySelectorAll('input[type=checkbox]:checked');
var checkboxes = document.querySelectorAll('input[type=checkbox]');
//form 2
var selectSet = document.getElementById("select-set-add");
var selectSetPiece = document.getElementById("select-piece-add");
var selectMainstat = document.getElementById("select-mainstat-add");
var selectSubstat = document.getElementsByClassName("select-substat-add");
var inputSubstat = document.getElementsByClassName("input-substat-add");

//Artifact Set Filter for Form 1
searchSet.onclick = function(){
    if (this.value != "SELECT"){
        for (card of cards){
            if (card.getElementsByClassName("set_value")[0].innerText == this.value){
                card.style.display = "inline-block";
            }
            else{
                card.style.display = "none";
            }
        }
    }
    else{
        for (card of cards){
            card.style.display = "inline-block";
        }
    }
};

//FUNCTION
//Output Logs:
// # of Artifacts Checked
// # of Desired Lines Per Artifact
function logLines(){
    var linesStats = "";
    var desiredSubstats = "Desired Substats: ";
    for (var desiredIndex = 0; desiredIndex < substatsDesired.length-1; desiredIndex++){
        desiredSubstats += substatsDesired[desiredIndex] + ', ';
    }
    desiredSubstats += substatsDesired[substatsDesired.length-1] 
    document.getElementById("desired-substats").innerText = desiredSubstats;
    artifactLines = [];
    selected_artifacts.forEach(item =>{
        var desiredRolls = 0;
        var substat_type = item.getElementsByClassName("substat_type");
        var substat_value = item.getElementsByClassName("substat_value");
        for (var i = 0; i < substatsDesired.length; i++){
            for (var substatIndex = 0; substatIndex < 4; substatIndex++){
                if (substat_type[substatIndex].innerText == substatsDesired[i]){
                    desiredRolls += parseFloat(substat_value[substatIndex].innerText)/substatAverages[i];
                }
            }
        }
        artifactLines.push(desiredRolls.toFixed(2));
    });
    linesStats += '<b>Total Number of Lines: </b>'
    + (artifactLines.reduce((x,y) => parseFloat(x) + parseFloat(y), 0)).toFixed(2)
    + '<br><b>Average Number of Lines: </b>'
    + (artifactLines.reduce((x,y) => parseFloat(x) + parseFloat(y), 0)/artifactLines.length).toFixed(2)
    + '<br>';
    for (var artiIndex = 0; artiIndex < artifactLines.length; artiIndex++){
        linesStats += '<u>'
        + checked[artiIndex].parentElement.getElementsByClassName("set_name")[0].innerText
        + ' '
        + checked[artiIndex].parentElement.getElementsByClassName("piece_name")[0].innerText
        + '</u><br> Lines: '
        + artifactLines[artiIndex]
        + '<br>';
    }
    document.getElementById("stats").innerHTML = linesStats;
}

function logValues(){
    checked = document.querySelectorAll('input[type=checkbox]:checked');
    selected_artifacts = [];
    for (var i = 0; i < checked.length; i++){
        selected_artifacts.push(cards[checked[i].value-1]);
    }
    document.getElementById("num-artis-selected").innerText = "Artifacts Added: " + selected_artifacts.length;
    logLines();
}

for (var i = 0; i < checkboxes.length; i++){
    checkboxes[i].onclick = logValues;
}

//Uncheck/Check Boxes
function uncheckAll(){
    for (var i = 0; i < checkboxes.length; i++){
        checkboxes[i].checked = false;
    }
    selected_artifacts = [];
    checked = document.querySelectorAll('input[type=checkbox]:checked');
    document.getElementById("num-artis-selected").innerText = "Artifacts Added: " + selected_artifacts.length;
    logLines();
}

function checkAll(){
    selected_artifacts = [];
    for (var i = 0; i < checkboxes.length; i++){
        checkboxes[i].checked = true;
        selected_artifacts.push(cards[checkboxes[i].value-1]);
    }
    checked = document.querySelectorAll('input[type=checkbox]:checked');
    document.getElementById("num-artis-selected").innerText = "Artifacts Added: " + selected_artifacts.length;
    logLines();
}

document.getElementById("uncheckAll").onclick = uncheckAll;
document.getElementById("checkAll").onclick = checkAll;

//Form 2
//disable button
document.getElementById("submit-button").disabled = true;
//mainstat
function showMainstat(){
    selectMainstat.style.display = "inherit";
}
function hideMainstat(){
    selectMainstat.style.display = "none";
}
//substat
function showSubstats(){
    for (var i = 0; i < selectSubstat.length; i++){
        selectSubstat[i].style.display = "inherit";
        inputSubstat[i].style.display = "inherit";
    }
}
function hideSubstats(){
    for (var i = 0; i < selectSubstat.length; i++){
        selectSubstat[i].style.display = "none";
        inputSubstat[i].style.display = "none";
    }
}
//clear
function clearMainstat(){
    selectMainstat.value = "null";
}
function clearSubstats(){
    for (var i = 0; i < selectSubstat.length; i++){
        selectSubstat[i].value = "null";
        inputSubstat[i].value = 0;
    }
    substatsAdded = ["null"];
}
//Try enable button
function tryButton(){
    if ((selectSet.value != "null") && (selectMainstat.value != "null") && (!substatsAdded.includes("null"))){
        document.getElementById("submit-button").disabled = false;
        for (var i = 0; i < inputSubstat.length; i++){
            if (inputSubstat[i].value == ""){
                document.getElementById("submit-button").disabled = true;
            }
        }
    }
    else{
        document.getElementById("submit-button").disabled = true;
    }
}

selectSet.onclick = tryButton;
for (var i = 0; i < inputSubstat.length; i++){
    inputSubstat[i].onclick = tryButton;
    inputSubstat[i].onchange = tryButton;
}

selectSetPiece.onclick = function(){
    clearMainstat();
    clearSubstats();
    hideSubstats();
    if (selectSetPiece.value != "null"){
        showMainstat();
    }
    else{
        hideMainstat();
        hideSubstats();
    }
    switch (selectSetPiece.value){
        case "Flower":
            for (var i = 1; i < selectMainstat.getElementsByTagName("option").length; i++){
                if (selectMainstat.getElementsByTagName("option")[i].value == "HP"){
                    selectMainstat.getElementsByTagName("option")[i].disabled = false;
                }
                else{
                    selectMainstat.getElementsByTagName("option")[i].disabled = true;
                }
            }
            break;
        case "Feather":
            for (var i = 1; i < selectMainstat.getElementsByTagName("option").length; i++){
                if (selectMainstat.getElementsByTagName("option")[i].value == "ATK"){
                    selectMainstat.getElementsByTagName("option")[i].disabled = false;
                }
                else{
                    selectMainstat.getElementsByTagName("option")[i].disabled = true;
                }
            }
            break;
        case "Sands":
            for (var i = 1; i < selectMainstat.getElementsByTagName("option").length; i++){
                if (["ATK %", "HP %", "DEF %", "ENERGY RECHARGE %", "ELEMENTAL MASTERY"].includes(selectMainstat.getElementsByTagName("option")[i].value)){
                    selectMainstat.getElementsByTagName("option")[i].disabled = false;
                }
                else{
                    selectMainstat.getElementsByTagName("option")[i].disabled = true;
                }
            }
            break;
        case "Goblet":
            for (var i = 1; i < selectMainstat.getElementsByTagName("option").length; i++){
                if (["ATK %", "HP %", "DEF %", "ELEMENTAL MASTERY", "ANEMO DAMAGE %", "PYRO DAMAGE %", "CRYO DAMAGE %", "HYDRO DAMAGE %", "ELECTRO DAMAGE %", "GEO DAMAGE %", "PHYSICAL DAMAGE %"].includes(selectMainstat.getElementsByTagName("option")[i].value)){
                    selectMainstat.getElementsByTagName("option")[i].disabled = false;
                }
                else{
                    selectMainstat.getElementsByTagName("option")[i].disabled = true;
                }
            }
            break;
        case "Circlet":
            for (var i = 1; i < selectMainstat.getElementsByTagName("option").length; i++){
                if (["ATK %", "HP %", "DEF %", "CRIT RATE %", "CRIT DAMAGE %", "ELEMENTAL MASTERY", "HEALING BONUS %"].includes(selectMainstat.getElementsByTagName("option")[i].value)){
                    selectMainstat.getElementsByTagName("option")[i].disabled = false;
                }
                else{
                    selectMainstat.getElementsByTagName("option")[i].disabled = true;
                }
            }
            break;
        default:
            break;
    }
    tryButton();
}

selectMainstat.onclick = function(){
    clearSubstats();
    setSubstatOptions();
    if (selectMainstat.value != "null"){
        showSubstats();
    }
    else{
        hideSubstats();
    }
    tryButton();
}

function setSubstatOptions(){
    for (var i = 0; i < selectSubstat.length; i++){
        for (var ii = 0; ii < selectSubstat[i].getElementsByTagName("option").length; ii++){
            if((possibleSubstats.includes(selectSubstat[i].getElementsByTagName("option")[ii].value)) 
            && (selectMainstat.value != selectSubstat[i].getElementsByTagName("option")[ii].value)){
                selectSubstat[i].getElementsByTagName("option")[ii].disabled = false;
                if ((substatsAdded.includes(selectSubstat[i].getElementsByTagName("option")[ii].value)) 
                && (selectSubstat[i].value != selectSubstat[i].getElementsByTagName("option")[ii].value)){
                    selectSubstat[i].getElementsByTagName("option")[ii].disabled = true;
                }
            }
            else{
                selectSubstat[i].getElementsByTagName("option")[ii].disabled = true;
            }
        }
    }
}

for (var i = 0; i < selectSubstat.length; i++){
    selectSubstat[i].onclick = function(){
        substatsAdded = [];
        for (var ii = 0; ii < selectSubstat.length; ii++){
            substatsAdded.push(selectSubstat[ii].value);
        }
        setSubstatOptions();
        tryButton();
    }
}
