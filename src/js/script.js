var substatsAdded = ["null"];
var substatsDesired = []; //["ATK %", "CRIT RATE %", "CRIT DAMAGE %"];
var substatAverages = []; //[5.0, 3.3, 6.6];
var selected_artifacts = [];
var artifactLines = [];
//VARIABLES: FORM 1
var searchSet = document.getElementById("select-set");
var cards = document.getElementsByClassName("card-custom");
var checked = $('.check-custom:checkbox:checked');
var checkboxes = $('.check-custom:checkbox');
//VARIABLES: FORM 2
var selectSet = document.getElementById("select-set-add");
var selectSetPiece = document.getElementById("select-piece-add");
var selectMainstat = document.getElementById("select-mainstat-add");
var selectSubstat = document.getElementsByClassName("select-substat-add");
var inputSubstat = document.getElementsByClassName("input-substat-add");
//VARIABLES: FORM 3
var checked2 = $('.check-custom2:checkbox:checked');
var checkboxes2 = $('.check-custom2:checkbox');

//FORM 1
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

//FORM 2
//FUNCTION: log # of lines
function logLines(){
    var linesStats = "";
    var overallStats = "";
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
    overallStats += '<b>Total # of Lines: </b>'
    + (artifactLines.reduce((x,y) => parseFloat(x) + parseFloat(y), 0)).toFixed(2)
    + '<br><b>Average # of Lines: </b>'
    + (artifactLines.reduce((x,y) => parseFloat(x) + parseFloat(y), 0)/artifactLines.length).toFixed(2)
    + '<br><br><a href = "#num-artis-selected">See artifacts added below.</a>';
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
    document.getElementById("avgstats").innerHTML = overallStats;
}
//FUNCTION: log # of artifacts
function logValues(){
    checked = $('.check-custom:checkbox:checked');
    selected_artifacts = Array.from(checked).map(_ => cards[_.value-1]);
    if (selected_artifacts.length != 0){
        document.getElementById("num-artis-selected").innerText = "Artifacts Added: " + selected_artifacts.length;
        logLines();
    }
    else{
        document.getElementById("num-artis-selected").innerText = "No artifacts added yet.";
        document.getElementById("stats").innerText = "";
        document.getElementById("avgstats").innerText = "Find how many lines there are in your artifacts. ";
    }
}
//FUNCTION: uncheck boxes
function uncheckAll(){
    Array.from(checkboxes).map(_ => _.checked = false);
    selected_artifacts = [];
    checked = $('.check-custom:checkbox:checked');
    document.getElementById("num-artis-selected").innerText = "Artifacts Added: " + selected_artifacts.length;
    logValues();
}
//FUNCTION: check boxes
function checkAll(){
    selected_artifacts = Array.from(checkboxes).map(function(_){
        _.checked = true;
        return cards[_.value-1];
    });
    checked = $('.check-custom:checkbox:checked');
    document.getElementById("num-artis-selected").innerText = "Artifacts Added: " + selected_artifacts.length;
    logValues();
}
//FUNCTION: show main stat
function showMainstat(){
    selectMainstat.style.display = "inherit";
}
//FUNCTION: hide main stat
function hideMainstat(){
    selectMainstat.style.display = "none";
}
//FUNCTION: show substats
function showSubstats(){
    for (var i = 0; i < selectSubstat.length; i++){
        selectSubstat[i].style.display = "inherit";
        inputSubstat[i].style.display = "inherit";
    }
}
//FUNCTION: hide substats
function hideSubstats(){
    for (var i = 0; i < selectSubstat.length; i++){
        selectSubstat[i].style.display = "none";
        inputSubstat[i].style.display = "none";
    }
}
//FUNCTION: clear main stat
function clearMainstat(){
    selectMainstat.value = "null";
}
//FUNCTION: clear substats
function clearSubstats(){
    for (var i = 0; i < selectSubstat.length; i++){
        selectSubstat[i].value = "null";
        inputSubstat[i].value = 0;
    }
    substatsAdded = ["null"];
}
//FUNCTION: set mainstat options
function setMainstatOptions(_, possible_stats){
    if (possible_stats.includes(_.value)){
        _.disabled = false;
    }
    else{
        _.disabled = true;
    }
}
//FUNCTION: set substat options
function setSubstatOptions(){
    Array.from(selectSubstat).map(function(select_substat){
        Array.from(select_substat.getElementsByTagName("option")).map(function(option){
            if(selectMainstat.value != option.value){
                option.disabled = false;
                if ((substatsAdded.includes(option.value)) 
                && (select_substat.value != option.value)){
                    option.disabled = true;
                }
            }
            else{
                option.disabled = true;
            }
        });
    });
}
//FUNCTION: try to enable button
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
//FORM 2 SET
Array.from(checkboxes).map(_ => _.onclick = logValues);
document.getElementById("uncheckAll").onclick = uncheckAll;
document.getElementById("checkAll").onclick = checkAll;
document.getElementById("submit-button").disabled = true;
selectSet.onclick = tryButton;
Array.from(inputSubstat).map(function(_){
    _.onclick = tryButton;
    _.onchange = tryButton;
});
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
            Array.from(selectMainstat.getElementsByTagName("option")).slice(1)
            .map(_ => setMainstatOptions(_, 
                ["HP"]));
            break;
        case "Feather":
            Array.from(selectMainstat.getElementsByTagName("option")).slice(1)
            .map(_ => setMainstatOptions(_, 
                ["ATK"]));
            break;
        case "Sands": 
            Array.from(selectMainstat.getElementsByTagName("option")).slice(1)
            .map(_ => setMainstatOptions(_, 
                ["ATK %", "HP %", "DEF %", "ENERGY RECHARGE %", "ELEMENTAL MASTERY"]));
            break;
        case "Goblet":
            Array.from(selectMainstat.getElementsByTagName("option")).slice(1)
            .map(_ => setMainstatOptions(_, 
                ["ATK %", "HP %", "DEF %", "ELEMENTAL MASTERY", "ANEMO DAMAGE %", "PYRO DAMAGE %", "CRYO DAMAGE %", "HYDRO DAMAGE %", "ELECTRO DAMAGE %", "GEO DAMAGE %", "PHYSICAL DAMAGE %"]));
            break;
        case "Circlet":
            Array.from(selectMainstat.getElementsByTagName("option")).slice(1)
            .map(_ => setMainstatOptions(_, 
                ["ATK %", "HP %", "DEF %", "CRIT RATE %", "CRIT DAMAGE %", "ELEMENTAL MASTERY", "HEALING BONUS %"]));
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
Array.from(selectSubstat).map(function(_){
    _.onclick = function(){
        substatsAdded = Array.from(selectSubstat).map(_ => _.value);
        setSubstatOptions();
        tryButton();
    }
});

//Form 3
//FUNCTION: log desired substats
function logDesiredSubstats(){
    var desiredSubstats = "<b>Desired Substats: </b>";
    desiredSubstats += Array.from(substatsDesired).join(', ');
    if (substatsDesired[0]){
        document.getElementById("desired-substats").innerHTML = desiredSubstats;
    }
    else{
        document.getElementById("desired-substats").innerHTML = "<b>Desired Substats: None</b>";
    }
}
//FUNCTION: add desired substats
function addDesiredSubstats(){
    substatsDesired = Array.from(checked2).map(_ => _.parentElement.getElementsByClassName("checkbox-custom2")[0].innerText);
    substatAverages = Array.from(checked2).map(_ => _.value);
}
Array.from(checkboxes2).map(function(_){
    _.onclick = function(){
        checked2 = $('.check-custom2:checkbox:checked');
        addDesiredSubstats();
        logDesiredSubstats();
        logValues();
    }
});

