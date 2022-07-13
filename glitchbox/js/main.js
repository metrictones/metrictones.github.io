// Key Events
document.addEventListener("keydown", event => {
    let x = event.key;
    if (x == "m" || x == "M" || x == "`") {
        ModuleToggle();
    }

    if (x == "ArrowUp") {
        expand();
    }

    if (x == "ArrowDown") {
        contract();
    }

    if (x == "ArrowRight") {
        focusOrb++;
        if (focusOrb == 6){
            focusOrb = 0;
        }
        orbFocus();
    }
    if (x == "ArrowLeft") {
        focusOrb--;
        if (focusOrb < 0){
            focusOrb = 5;
        }
        orbFocus();
    }

    if (x == "n" || x == "N") {
        AddNode();
    }

    if (x == "Escape") {
        focusOrb = -1;
        orbFocus();
    }
})



//Focus Functions
var focusOrb = -1;

const colorArray = ["red", "orange", "yellow", "lime", "cyan", "magenta"];



function orbFocus() {
    for (let i = 0; i < 6; i++ ){
        let orbit = document.getElementsByClassName("orb-" + colorArray[i])
        orbit[0].style.border = "1px solid " + colorArray[i];
        orbit[1].style.border = "1px solid " + colorArray[i];

        if (focusOrb == -1) {
        let orbNav = document.getElementById("orbnav");
        orbNav.setAttribute("stroke", "grey");
        orbNav.setAttribute("stroke-width", "1px");
        }

            if (focusOrb == i) {
            let orbit = document.getElementsByClassName("orb-" + colorArray[focusOrb])
            let orbNav = document.getElementById("orbnav");
            orbit[0].style.border = "3px solid " + colorArray[focusOrb];
            orbit[1].style.border = "3px solid " + colorArray[focusOrb];
            orbNav.setAttribute("stroke", colorArray[i]);
            orbNav.setAttribute("stroke-width", "2px");
            }  
    }
}



// Line Functions
window.addEventListener('resize', linePosTimeout);

function linePosition() {

        for (var i = 1; i < lineNum; i++) {


            var linestring = "line" + i;
            var currentline = document.getElementById(linestring);

            var startnode = currentline.getAttribute('startnode');
            var startel = document.getElementById(startnode);
            var startbox = startel.getBoundingClientRect();

            var endnode = currentline.getAttribute('endnode');
            var endel = document.getElementById(endnode);
            var endbox = endel.getBoundingClientRect();

            currentline.setAttribute('x1', ((startbox.left) + (startbox.width/2)));
            currentline.setAttribute('y1', ((startbox.top) + (startbox.height/2)));
            currentline.setAttribute('x2', ((endbox.left) + (endbox.width/2)));
            currentline.setAttribute('y2', ((endbox.top) + (endbox.height/2)));

        }
}

function linePosTimeout() {
    for (var i = 0; i<250; i++) {
    setTimeout(linePosition, i)
    }
}



//Connect Mode Toggle
var connectstate = false;
var clickone = false;
var clicktwo = false;

//Connect Button Style Property Toggle Function
function connectToggle() {
    connectstate = !connectstate;
    var connect = document.getElementById('connect');
    if (connectstate == true) {
    connect.style.backgroundColor = "white";
    connect.style.color = "black";
    }
    if (connectstate == false) {
        connect.style.removeProperty('background-color')
        connect.style.color = "white";
        }
}



var lineNum = 1;
var midconnect = false;
var clickednode = 0;
var nodebox = 0;
var line = null;



//LINE CONNECTION FUNCTIONS

function createline() {
    line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
}

function followcursor(f) {
    line.setAttribute('x2', f.clientX);
    line.setAttribute('y2', f.clientY);
    
}

document.querySelector(".nodecontainer").addEventListener('click', function(e) {

    if (connectstate == true && midconnect == false) {

        document.addEventListener('mousemove', followcursor);

        midconnect++;

        nodebox = e.target.getBoundingClientRect();
        nodeboxx = (nodebox.left) + (nodebox.width/2);
        nodeboxy = (nodebox.top) + (nodebox.height/2);

        createline();

        $("#linecontainer").append(line);

        line.setAttribute('startnode', e.target.id);

        line.style.stroke = 'grey';
        line.style.strokeWidth = 1;
        line.setAttribute('x1', nodeboxx);
        line.setAttribute('y1', nodeboxy);
        line.setAttribute('x2', e.clientX);
        line.setAttribute('y2', e.clientY);
        line.setAttribute('id', 'line'+lineNum);

        e.target.classList.add('line' + lineNum + 'start');
    }

    else if (connectstate == true && midconnect == true) {
        document.removeEventListener('mousemove', followcursor);
        var nodebox = e.target.getBoundingClientRect();
        var nodeboxx = (nodebox.left) + (nodebox.width/2);
        var nodeboxy = (nodebox.top) + (nodebox.height/2);
        var currentline = 'line' + lineNum;
        document.getElementById(currentline).setAttribute('x2', nodeboxx);
        document.getElementById(currentline).setAttribute('y2', nodeboxy);

        document.getElementById(currentline).setAttribute('endnode', e.target.id);

        midconnect = false;

        lineNum++;
    }
});

const mouseTarget = document.getElementById('addModule');

mouseTarget.addEventListener('mouseenter', e => {
    if (collapsestate == false) {
    mouseTarget.style.opacity = .8;}

    if (collapsestate == true) {
        mouseTarget.style.opacity = 0;}
    
        
});

mouseTarget.addEventListener('mouseleave', e => {
    if (collapsestate == false) {
    mouseTarget.style.opacity = .5;}
});

const modulebox = document.getElementById('modulebox');

var collapsestate = true;

//Module Box Toggle
function ModuleToggle() {
    modulebox.style.width = collapsestate ? '50vw' : '48px';
    document.getElementById("addModule").style.opacity = collapsestate ? "0.5" : "0";
    collapsestate = !collapsestate;
    NodePosition();
    linePosTimeout();
    console.log(collapsestate);
}

//Module Select
function ModuleSelect() {
    var currentmodule = $("#moduleselect").find("option:selected").val();

    if (currentmodule == 1) {
        $("#stepseqdiv").css("display", "none");
        $("#textdiv").css("display", "block");
    }
    if (currentmodule == 2) {
        
        $("#textdiv").css("display", "none");
        $("#stepseqdiv").css("display", "block");
    }
}

//Module Box Node List Display & Button Border Functions
function OrbitBorder() {
    var currentorbit = $("#orbitselect").find("option:selected").val();
    if (currentorbit == 1) {
        RedBorder();
        
        document.getElementById("orangelist").style.display = "none";
        document.getElementById("yellowlist").style.display = "none";
        document.getElementById("greenlist").style.display = "none";
        document.getElementById("cyanlist").style.display = "none";
        document.getElementById("magentalist").style.display = "none";
        document.getElementById("redlist").style.display = "block";
    }
    if (currentorbit == 2) {
        OrangeBorder();
        
        document.getElementById("redlist").style.display = "none";
        document.getElementById("yellowlist").style.display = "none";
        document.getElementById("greenlist").style.display = "none";
        document.getElementById("cyanlist").style.display = "none";
        document.getElementById("magentalist").style.display = "none";

        document.getElementById("orangelist").style.display = "block";
    }
    if (currentorbit == 3) {
        YellowBorder();
        document.getElementById("redlist").style.display = "none";
        document.getElementById("orangelist").style.display = "none";       
        document.getElementById("greenlist").style.display = "none";
        document.getElementById("cyanlist").style.display = "none";
        document.getElementById("magentalist").style.display = "none";

        document.getElementById("yellowlist").style.display = "block";
    }
    if (currentorbit == 4) {
        GreenBorder();
        document.getElementById("redlist").style.display = "none";
        document.getElementById("orangelist").style.display = "none";       
        document.getElementById("yellowlist").style.display = "none";
        document.getElementById("cyanlist").style.display = "none";
        document.getElementById("magentalist").style.display = "none";

        document.getElementById("greenlist").style.display = "block";
    }
    if (currentorbit == 5) {
        CyanBorder();
        document.getElementById("redlist").style.display = "none";
        document.getElementById("orangelist").style.display = "none";       
        document.getElementById("yellowlist").style.display = "none";
        document.getElementById("greenlist").style.display = "none";
        document.getElementById("magentalist").style.display = "none";

        document.getElementById("cyanlist").style.display = "block";
    }
    if (currentorbit == 6) {
        MagentaBorder();
        document.getElementById("redlist").style.display = "none";
        document.getElementById("orangelist").style.display = "none";       
        document.getElementById("yellowlist").style.display = "none";
        document.getElementById("greenlist").style.display = "none";
        document.getElementById("cyanlist").style.display = "none";

        document.getElementById("magentalist").style.display = "block";
    
    }
}
function RedBorder() {
    $("#addnodebutton").css('border', "2px solid red");
}
function OrangeBorder() {
    $("#addnodebutton").css('border', "2px solid orange");
}
function YellowBorder() {
    $("#addnodebutton").css('border', "2px solid yellow");
}
function GreenBorder() {
    $("#addnodebutton").css('border', "2px solid lime");
}
function CyanBorder() {
    $("#addnodebutton").css('border', "2px solid cyan");
}
function MagentaBorder() {
    $("#addnodebutton").css('border', "2px solid magenta");
}

//ORBIT FUNCTIONS
var orbstep = 1;

//Orbit expand & contract (Radial Scroll) Functions
function expand() {
    orbstep++;
    ScrollStep();
    linePosTimeout();
}

function contract() {
    orbstep--;
    if (orbstep < 1) {
        orbstep = 12;
    }
    ScrollStep();
    linePosTimeout();
}

const orbred = document.getElementById('orb-red');
const orborange = document.getElementById('orb-orange');
const orbyellow = document.getElementById('orb-yellow');
const orblime = document.getElementById('orb-lime');
const orbcyan = document.getElementById('orb-cyan');
const orbmagenta = document.getElementById('orb-magenta');
const orbred2 = document.getElementById('orb-red2');
const orborange2 = document.getElementById('orb-orange2');
const orbyellow2 = document.getElementById('orb-yellow2');
const orblime2 = document.getElementById('orb-lime2');
const orbcyan2 = document.getElementById('orb-cyan2');
const orbmagenta2 = document.getElementById('orb-magenta2');

function ScrollStep() {
    if (orbstep == 1) {
        orbred.style.width = '20vh';
        orbred.style.height = '20vh';
        orbred.style.opacity = '1';
        orbred2.style.width = '80vh';
        orbred2.style.height = '80vh';
        orbred2.style.opacity = '0';

        orborange.style.width = '30vh';
        orborange.style.height = '30vh';

        orbyellow.style.width = '40vh';
        orbyellow.style.height = '40vh';

        orblime.style.width = '50vh';
        orblime.style.height = '50vh';

        orbcyan.style.width = '60vh';
        orbcyan.style.height = '60vh';

        orbmagenta.style.width = '70vh';
        orbmagenta.style.height = '70vh';
        orbmagenta.style.opacity = '1';
        orbmagenta2.style.width = '10vh';
        orbmagenta2.style.height = '10vh';
        orbmagenta2.style.opacity = '0';

        NodePosition();

        }
    if (orbstep == 2) {
        orbred.style.width = '30vh';
        orbred.style.height = '30vh';

        orborange.style.width = '40vh';
        orborange.style.height = '40vh';

        orbyellow.style.width = '50vh';
        orbyellow.style.height = '50vh';

        orblime.style.width = '60vh';
        orblime.style.height = '60vh';

        orbcyan.style.width = '70vh';
        orbcyan.style.height = '70vh';
        orbcyan.style.opacity = '1';
        orbcyan2.style.width = '10vh';
        orbcyan2.style.height = '10vh';
        orbcyan2.style.opacity = '0';

        orbmagenta.style.width = '80vh';
        orbmagenta.style.height = '80vh';
        orbmagenta.style.opacity = '0';


        orbmagenta2.style.width = '20vh';
        orbmagenta2.style.height = '20vh';
        orbmagenta2.style.opacity = '1';

        NodePosition();

    }
    if (orbstep == 3) {
        orbred.style.width = '40vh';
        orbred.style.height = '40vh';

        orborange.style.width = '50vh';
        orborange.style.height = '50vh';

        orbyellow.style.width = '60vh';
        orbyellow.style.height = '60vh';

        orblime.style.width = '70vh';
        orblime.style.height = '70vh';
        orblime.style.opacity = '1';
        orblime2.style.width = '10vh';
        orblime2.style.height = '10vh';
        orblime2.style.opacity = '0';

        orbcyan.style.width = '80vh';
        orbcyan.style.height = '80vh';
        orbcyan.style.opacity = '0';

        orbcyan2.style.width = '20vh';
        orbcyan2.style.height = '20vh';
        orbcyan2.style.opacity = '1';

        orbmagenta2.style.width = '30vh';
        orbmagenta2.style.height = '30vh';

        NodePosition();

        }
    if (orbstep == 4) {
        orbred.style.width = '50vh';
        orbred.style.height = '50vh';

        orborange.style.width = '60vh';
        orborange.style.height = '60vh';

        orbyellow.style.width = '70vh';
        orbyellow.style.height = '70vh';
        orbyellow.style.opacity = '1';
        orbyellow2.style.width = '10vh';
        orbyellow2.style.height = '10vh';
        orbyellow2.style.opacity = '0';

        orblime.style.width = '80vh';
        orblime.style.height = '80vh';
        orblime.style.opacity = '0';
        orblime2.style.width = '20vh';
        orblime2.style.height = '20vh';
        orblime2.style.opacity = '1';

        orbcyan2.style.width = '30vh';
        orbcyan2.style.height = '30vh';
        orbcyan2.style.opacity = '1';

        orbmagenta2.style.width = '40vh';
        orbmagenta2.style.height = '40vh';

        NodePosition();
        }
    if (orbstep == 5) {
        orbred.style.width = '60vh';
        orbred.style.height = '60vh';

        orborange.style.width = '70vh';
        orborange.style.height = '70vh';
        orborange.style.opacity = '1';
        orborange2.style.width = '10vh';
        orborange2.style.height = '10vh';
        orborange2.style.opacity = '0';

        orbyellow.style.width = '80vh';
        orbyellow.style.height = '80vh';
        orbyellow.style.opacity = '0';
        orbyellow2.style.width = '20vh';
        orbyellow2.style.height = '20vh';
        orbyellow2.style.opacity = '1';

        orblime2.style.width = '30vh';
        orblime2.style.height = '30vh';

        orbcyan2.style.width = '40vh';
        orbcyan2.style.height = '40vh';

        orbmagenta2.style.width = '50vh';
        orbmagenta2.style.height = '50vh';

        NodePosition();

        }
    if (orbstep == 6) {
        orbred.style.width = '70vh';
        orbred.style.height = '70vh';
        orbred.style.opacity = '1';
        orbred2.style.width = '10vh';
        orbred2.style.height = '10vh';
        orbred2.style.opacity = '0';

        orborange.style.width = '80vh';
        orborange.style.height = '80vh';
        orborange.style.opacity = '0';
        orborange2.style.width = '20vh';
        orborange2.style.height = '20vh';
        orborange2.style.opacity = '1';

        orbyellow2.style.width = '30vh';
        orbyellow2.style.height = '30vh';

        orblime2.style.width = '40vh';
        orblime2.style.height = '40vh';

        orbcyan2.style.width = '50vh';
        orbcyan2.style.height = '50vh';

        orbmagenta2.style.width = '60vh';
        orbmagenta2.style.height = '60vh';

        NodePosition();

        }
    if (orbstep == 7) {
        orbred.style.width = '80vh';
        orbred.style.height = '80vh';
        orbred.style.opacity = '0';
        orbred2.style.width = '20vh';
        orbred2.style.height = '20vh';
        orbred2.style.opacity = '1';

        orborange2.style.width = '30vh';
        orborange2.style.height = '30vh';

        orbyellow2.style.width = '40vh';
        orbyellow2.style.height = '40vh';

        orblime2.style.width = '50vh';
        orblime2.style.height = '50vh';

        orbcyan2.style.width = '60vh';
        orbcyan2.style.height = '60vh';

        orbmagenta2.style.width = '70vh';
        orbmagenta2.style.height = '70vh';
        orbmagenta2.style.opacity = '1';
        orbmagenta.style.width = '10vh';
        orbmagenta.style.height = '10vh';
        orbmagenta.style.opacity = '0';

        NodePosition();
        }
    if (orbstep == 8) {
        orbred2.style.width = '30vh';
        orbred2.style.height = '30vh';

        orborange2.style.width = '40vh';
        orborange2.style.height = '40vh';

        orbyellow2.style.width = '50vh';
        orbyellow2.style.height = '50vh';

        orblime2.style.width = '60vh';
        orblime2.style.height = '60vh';

        orbcyan2.style.width = '70vh';
        orbcyan2.style.height = '70vh';
        orbcyan2.style.opacity = '1';
        orbcyan.style.width = '10vh';
        orbcyan.style.height = '10vh';
        orbcyan.style.opacity = '0';


        orbmagenta2.style.width = '80vh';
        orbmagenta2.style.height = '80vh';
        orbmagenta2.style.opacity = '0';
        orbmagenta.style.width = '20vh';
        orbmagenta.style.height = '20vh';
        orbmagenta.style.opacity = '1';

        NodePosition();
        }
    if (orbstep == 9) {
        orbred2.style.width = '40vh';
        orbred2.style.height = '40vh';

        orborange2.style.width = '50vh';
        orborange2.style.height = '50vh';

        orbyellow2.style.width = '60vh';
        orbyellow2.style.height = '60vh';

        orblime2.style.width = '70vh';
        orblime2.style.height = '70vh';
        orblime2.style.opacity = '1';
        orblime.style.width = '10vh';
        orblime.style.height = '10vh';
        orblime.style.opacity = '0';


        orbcyan2.style.width = '80vh';
        orbcyan2.style.height = '80vh';
        orbcyan2.style.opacity = '0';
        orbcyan.style.width = '20vh';
        orbcyan.style.height = '20vh';
        orbcyan.style.opacity = '1';

        orbmagenta.style.width = '30vh';
        orbmagenta.style.height = '30vh';

        NodePosition();
        }
    if (orbstep == 10) {
        orbred2.style.width = '50vh';
        orbred2.style.height = '50vh';

        orborange2.style.width = '60vh';
        orborange2.style.height = '60vh';

        orbyellow2.style.width = '70vh';
        orbyellow2.style.height = '70vh';
        orbyellow2.style.opacity = '1';
        orbyellow.style.width = '10vh';
        orbyellow.style.height = '10vh';
        orbyellow.style.opacity = '0';

        orblime2.style.width = '80vh';
        orblime2.style.height = '80vh';
        orblime2.style.opacity = '0';
        orblime.style.width = '20vh';
        orblime.style.height = '20vh';
        orblime.style.opacity = '1';

        orbcyan.style.width = '30vh';
        orbcyan.style.height = '30vh';

        orbmagenta.style.width = '40vh';
        orbmagenta.style.height = '40vh';

        NodePosition();
        }
    if (orbstep == 11) {
        orbred2.style.width = '60vh';
        orbred2.style.height = '60vh';

        orborange2.style.width = '70vh';
        orborange2.style.height = '70vh';
        orborange2.style.opacity = '1';
        orborange.style.width = '10vh';
        orborange.style.height = '10vh';
        orborange.style.opacity = '0';

        orbyellow2.style.width = '80vh';
        orbyellow2.style.height = '80vh';
        orbyellow2.style.opacity = '0';
        orbyellow.style.width = '20vh';
        orbyellow.style.height = '20vh';
        orbyellow.style.opacity = '1';

        orblime.style.width = '30vh';
        orblime.style.height = '30vh';

        orbcyan.style.width = '40vh';
        orbcyan.style.height = '40vh';

        orbmagenta.style.width = '50vh';
        orbmagenta.style.height = '50vh';

        NodePosition();
        }
    if (orbstep == 12) {
        orbred2.style.width = '70vh';
        orbred2.style.height = '70vh';
        orbred2.style.opacity = '1';
        orbred.style.width = '10vh';
        orbred.style.height = '10vh';
        orbred.style.opacity = '0';

        orborange2.style.width = '80vh';
        orborange2.style.height = '80vh';
        orborange2.style.opacity = '0';
        orborange.style.width = '20vh';
        orborange.style.height = '20vh';
        orborange.style.opacity = '1';

        orbyellow.style.width = '30vh';
        orbyellow.style.height = '30vh';

        orblime.style.width = '40vh';
        orblime.style.height = '40vh';

        orbcyan.style.width = '50vh';
        orbcyan.style.height = '50vh';

        orbmagenta.style.width = '60vh';
        orbmagenta.style.height = '60vh';

        NodePosition();
        }
    if (orbstep == 13) {
        orbred.style.width = '20vh';
        orbred.style.height = '20vh';
        orbred.style.opacity = '1';
        orbred2.style.width = '80vh';
        orbred2.style.height = '80vh';
        orbred2.style.opacity = '0';

        orborange.style.width = '30vh';
        orborange.style.height = '30vh';

        orbyellow.style.width = '40vh';
        orbyellow.style.height = '40vh';

        orblime.style.width = '50vh';
        orblime.style.height = '50vh';

        orbcyan.style.width = '60vh';
        orbcyan.style.height = '60vh';

        orbmagenta.style.width = '70vh';
        orbmagenta.style.height = '70vh';
        orbmagenta.style.opacity = '1';
        orbmagenta2.style.width = '10vh';
        orbmagenta2.style.height = '10vh';
        orbmagenta2.style.opacity = '0';

        orbstep = 1;

        NodePosition();
        }
}

//NODE FUNCTIONS

var numRedNodes = 0;
var numOrangeNodes = 0;
var numYellowNodes = 0;
var numGreenNodes = 0;
var numCyanNodes = 0;
var numMagentaNodes = 0;
var currentAngle = 0;

//Add & Remove Node Functions
function AddNode() {
    //var currentorbit = $("#orbitselect").find("option:selected").val();

    var currentorbit = 1;
    if (focusOrb == 0) {
        numRedNodes++;
        var newnode = document.createElement("div");
        newnode.classList.add("rednodes");
        $(".nodecontainer").append(newnode);
        var thisNode = "rednode"+numRedNodes;
        newnode.id = thisNode;

        var redlistitem = document.createElement("li");
        redlistitem.setAttribute('class', 'list-group-item py-1 redlistitem'+numRedNodes);
        redlistitem.setAttribute('id', 'redlistitem'+numRedNodes);
        redlistitem.textContent = "Node "+numRedNodes ;

        var redlistnode = document.createElement("div");
        redlistnode.setAttribute('class', 'rednodes listnodes');

        $("#redlist").prepend(redlistitem);
        $(".redlistitem"+numRedNodes).append(redlistnode);


        }
    if (focusOrb == 1) {
        numOrangeNodes++;
        var newnode = document.createElement("div");
        newnode.classList.add("orangenodes");
        $(".nodecontainer").append(newnode);
        var thisNode = "orangenode"+numOrangeNodes;
        newnode.id = thisNode;

        var orangelistitem = document.createElement("li");
        orangelistitem.setAttribute('class', 'list-group-item py-1 orangelistitem'+numOrangeNodes);
        orangelistitem.setAttribute('id', 'orangelistitem'+numOrangeNodes);
        orangelistitem.textContent = "Node "+numOrangeNodes ;

        var orangelistnode = document.createElement("div");
        orangelistnode.setAttribute('class', 'orangenodes listnodes');

        $("#orangelist").prepend(orangelistitem);
        $(".orangelistitem"+numOrangeNodes).append(orangelistnode);
        }
    if (focusOrb == 2) {
        numYellowNodes++;
        var newnode = document.createElement("div");
        newnode.classList.add("yellownodes");
        $(".nodecontainer").append(newnode);
        var thisNode = "yellownode"+numYellowNodes;
        newnode.id = thisNode;

        var yellowlistitem = document.createElement("li");
        yellowlistitem.setAttribute('class', 'list-group-item py-1 yellowlistitem'+numYellowNodes);
        yellowlistitem.setAttribute('id', 'yellowlistitem'+numYellowNodes);
        yellowlistitem.textContent = "Node "+numYellowNodes ;

        var yellowlistnode = document.createElement("div");
        yellowlistnode.setAttribute('class', 'yellownodes listnodes');

        $("#yellowlist").prepend(yellowlistitem);
        $(".yellowlistitem"+numYellowNodes).append(yellowlistnode);
        }
    if (focusOrb == 3) {
        numGreenNodes++;
        var newnode = document.createElement("div");
        newnode.classList.add("greennodes");
        $(".nodecontainer").append(newnode);
        var thisNode = "greennode"+numGreenNodes;
        newnode.id = thisNode;

        var greenlistitem = document.createElement("li");
        greenlistitem.setAttribute('class', 'list-group-item py-1 greenlistitem'+numGreenNodes);
        greenlistitem.setAttribute('id', 'greenlistitem'+numGreenNodes);
        greenlistitem.textContent = "Node "+numGreenNodes ;

        var yellowlistnode = document.createElement("div");
        yellowlistnode.setAttribute('class', 'greennodes listnodes');

        $("#greenlist").prepend(greenlistitem);
        $(".greenlistitem"+numGreenNodes).append(yellowlistnode);
        }
    if (focusOrb == 4) {
        numCyanNodes++;
        var newnode = document.createElement("div");
        newnode.classList.add("cyannodes");
        $(".nodecontainer").append(newnode);
        var thisNode = "cyannode"+numCyanNodes;
        newnode.id = thisNode;

        var cyanlistitem = document.createElement("li");
        cyanlistitem.setAttribute('class', 'list-group-item py-1 cyanlistitem'+numCyanNodes);
        cyanlistitem.setAttribute('id', 'cyanlistitem'+numCyanNodes);
        cyanlistitem.textContent = "Node "+numCyanNodes ;

        var cyanlistnode = document.createElement("div");
        cyanlistnode.setAttribute('class', 'cyannodes listnodes');

        $("#cyanlist").prepend(cyanlistitem);
        $(".cyanlistitem"+numCyanNodes).append(cyanlistnode);
        }
    if (focusOrb == 5) {
        numMagentaNodes++;
        var newnode = document.createElement("div");
        newnode.classList.add("magentanodes");
        $(".nodecontainer").append(newnode);
        var thisNode = "magentanode"+numMagentaNodes;
        newnode.id = thisNode;
        
        var magentalistitem = document.createElement("li");
        magentalistitem.setAttribute('class', 'list-group-item py-1 magentalistitem'+numMagentaNodes);
        magentalistitem.setAttribute('id', 'magentalistitem'+numMagentaNodes);
        magentalistitem.textContent = "Node "+numMagentaNodes ;

        var magentalistnode = document.createElement("div");
        magentalistnode.setAttribute('class', 'magentanodes listnodes');

        $("#magentalist").prepend(magentalistitem);
        $(".magentalistitem"+numMagentaNodes).append(magentalistnode);
        
        }

    NodePosition();
    linePosTimeout();


}

function removeNode() {
    //var currentorbit = $("#orbitselect").find("option:selected").val();
    var currentorbit = 1;

    if (currentorbit == 1) {
        //var redlistitem = document.getElementById("redlistitem"+numRedNodes);
        var latestrednode = document.getElementById("rednode"+numRedNodes);
        //redlistitem.remove();
        latestrednode.remove();
        numRedNodes--;
        NodePosition();
        }

    if (currentorbit == 2) {
        var orangelistitem = document.getElementById("orangelistitem"+numOrangeNodes);
        var latestorangenode = document.getElementById("orangenode"+numOrangeNodes);
        orangelistitem.remove();
        latestorangenode.remove();
        numOrangeNodes--;
        NodePosition();
        }

    if (currentorbit == 3) {
        var yellowlistitem = document.getElementById("yellowlistitem"+numYellowNodes);
        var latestyellownode = document.getElementById("yellownode"+numYellowNodes);
        yellowlistitem.remove();
        latestyellownode.remove();
        numYellowNodes--;
        NodePosition();
        }
    if (currentorbit == 4) {
        var greenlistitem = document.getElementById("greenlistitem"+numGreenNodes);
        var latestgreennode = document.getElementById("greennode"+numGreenNodes);
        greenlistitem.remove();
        latestgreennode.remove();
        numGreenNodes--;
        NodePosition();
        }
    if (currentorbit == 5) {
        var cyanlistitem = document.getElementById("cyanlistitem"+numCyanNodes);
        var latestcyannode = document.getElementById("cyannode"+numCyanNodes);
        cyanlistitem.remove();
        latestcyannode.remove();
        numCyanNodes--;
        NodePosition();
        }
    if (currentorbit == 6) {
        var magentalistitem = document.getElementById("magentalistitem"+numMagentaNodes);
        var latestmagentanode = document.getElementById("magentanode"+numMagentaNodes);
        magentalistitem.remove();
        latestmagentanode.remove();
        numMagentaNodes--;
        NodePosition();
        }

        linePosTimeout();

}


var redTrans = 10;
var orangeTrans = 15;
var yellowTrans = 20;
var greenTrans = 25;
var cyanTrans = 30;
var magentaTrans = 35;

//Node Auto-Position Functions
function NodePosition() {
    RedPosition();
    OrangePosition();
    YellowPosition();
    GreenPosition();
    CyanPosition();
    MagentaPosition();
}

function RedPosition() {
    if (orbstep == 1) {redTrans = 10;}
    if (orbstep == 2) {redTrans = 15;}
    if (orbstep == 3) {redTrans = 20;}
    if (orbstep == 4) {redTrans = 25;}
    if (orbstep == 5) {redTrans = 30;}
    if (orbstep == 6) {redTrans = 35;}
    if (orbstep == 7) {redTrans = 10;}
    if (orbstep == 8) {redTrans = 15;}
    if (orbstep == 9) {redTrans = 20;}
    if (orbstep == 10) {redTrans = 25;}
    if (orbstep == 11) {redTrans = 30;}
    if (orbstep == 12) {redTrans = 35;}

    if (collapsestate == true || collapsestate == false) {
        for (var i = 1; i <= numRedNodes; i++) {

            newAngle = (360/numRedNodes)*(i-1)-90;
            $("#rednode"+i).css('transform', "rotate("+newAngle+"deg)"+" translate("+redTrans+"vh)");
        }
    }
    // if (collapsestate == false) {
    //     if (numRedNodes == 1) {
    //         $("#rednode1").css('transform', "rotate(-180deg)"+" translate("+redTrans+"vh)");
    //     }
    //     else {
    //         for (var i = 1; i <= numRedNodes; i++) {

    //             newAngle = (180/(numRedNodes-1))*(i-1)-180;
    //             $("#rednode"+i).css('transform', "rotate("+newAngle+"deg)"+" translate("+redTrans+"vh)");
    //         }
    //     }
    // }
}
function OrangePosition() {
    if (orbstep == 1) {orangeTrans = 15;}
    if (orbstep == 2) {orangeTrans = 20;}
    if (orbstep == 3) {orangeTrans = 25;}
    if (orbstep == 4) {orangeTrans = 30;}
    if (orbstep == 5) {orangeTrans = 35;}
    if (orbstep == 6) {orangeTrans = 10;}
    if (orbstep == 7) {orangeTrans = 15;}
    if (orbstep == 8) {orangeTrans = 20;}
    if (orbstep == 9) {orangeTrans = 25;}
    if (orbstep == 10) {orangeTrans = 30;}
    if (orbstep == 11) {orangeTrans = 35;}
    if (orbstep == 12) {orangeTrans = 10;}


    if (collapsestate == true || collapsestate == false) {
        for (var i = 1; i <= numOrangeNodes; i++) {

            newAngle = (360/numOrangeNodes)*(i-1)-90;
            $("#orangenode"+i).css('transform', "rotate("+newAngle+"deg)"+" translate("+orangeTrans+"vh)");

        }
    }
    // if (collapsestate == false) {
    //     if (numOrangeNodes == 1) {
    //         $("#orangenode1").css('transform', "rotate(-180deg)"+" translate("+orangeTrans+"vh)");
    //     }
    //     else {
    //         for (var i = 1; i <= numOrangeNodes; i++) {

    //             newAngle = (180/(numOrangeNodes-1))*(i-1)-180;
    //             $("#orangenode"+i).css('transform', "rotate("+newAngle+"deg)"+" translate("+orangeTrans+"vh)");

    //         }
    //     }
    // }
}
function YellowPosition() {
    if (orbstep == 1) {yellowTrans = 20;}
    if (orbstep == 2) {yellowTrans = 25;}
    if (orbstep == 3) {yellowTrans = 30;}
    if (orbstep == 4) {yellowTrans = 35;}
    if (orbstep == 5) {yellowTrans = 10;}
    if (orbstep == 6) {yellowTrans = 15;}
    if (orbstep == 7) {yellowTrans = 20;}
    if (orbstep == 8) {yellowTrans = 25;}
    if (orbstep == 9) {yellowTrans = 30;}
    if (orbstep == 10) {yellowTrans = 35;}
    if (orbstep == 11) {yellowTrans = 10;}
    if (orbstep == 12) {yellowTrans = 15;}


    if (collapsestate == true || collapsestate == false) {
        for (var i = 1; i <= numYellowNodes; i++) {

            newAngle = (360/numYellowNodes)*(i-1)-90;
            $("#yellownode"+i).css('transform', "rotate("+newAngle+"deg)"+" translate("+yellowTrans+"vh)");

        }
    }
    // if (collapsestate == false) {
    //     if (numYellowNodes == 1) {
    //         $("#yellownode1").css('transform', "rotate(-180deg)"+" translate("+yellowTrans+"vh)");
    //     }
    //     else {
    //         for (var i = 1; i <= numYellowNodes; i++) {

    //             newAngle = (180/(numYellowNodes-1))*(i-1)-180;
    //             $("#yellownode"+i).css('transform', "rotate("+newAngle+"deg)"+" translate("+yellowTrans+"vh)");

    //         }
    //     }
    // }
}
function GreenPosition() {
    if (orbstep == 1) {greenTrans = 25;}
    if (orbstep == 2) {greenTrans = 30;}
    if (orbstep == 3) {greenTrans = 35;}
    if (orbstep == 4) {greenTrans = 10;}
    if (orbstep == 5) {greenTrans = 15;}
    if (orbstep == 6) {greenTrans = 20;}
    if (orbstep == 7) {greenTrans = 25;}
    if (orbstep == 8) {greenTrans = 30;}
    if (orbstep == 9) {greenTrans = 35;}
    if (orbstep == 10) {greenTrans = 10;}
    if (orbstep == 11) {greenTrans = 15;}
    if (orbstep == 12) {greenTrans = 20;}


    if (collapsestate == true || collapsestate == false) {
        for (var i = 1; i <= numGreenNodes; i++) {

            newAngle = (360/numGreenNodes)*(i-1)-90;
            $("#greennode"+i).css('transform', "rotate("+newAngle+"deg)"+" translate("+greenTrans+"vh)");

        }
    }
    // if (collapsestate == false) {
    //     if (numGreenNodes == 1) {
    //         $("#greennode1").css('transform', "rotate(-180deg)"+" translate("+greenTrans+"vh)");
    //     }
    //     else {
    //         for (var i = 1; i <= numGreenNodes; i++) {

    //             newAngle = (180/(numGreenNodes-1))*(i-1)-180;
    //             $("#greennode"+i).css('transform', "rotate("+newAngle+"deg)"+" translate("+greenTrans+"vh)");

    //         }
    //     }
    // }
}
function CyanPosition() {
    if (orbstep == 1) {cyanTrans = 30;}
    if (orbstep == 2) {cyanTrans = 35;}
    if (orbstep == 3) {cyanTrans = 10;}
    if (orbstep == 4) {cyanTrans = 15;}
    if (orbstep == 5) {cyanTrans = 20;}
    if (orbstep == 6) {cyanTrans = 25;}
    if (orbstep == 7) {cyanTrans = 30;}
    if (orbstep == 8) {cyanTrans = 35;}
    if (orbstep == 9) {cyanTrans = 10;}
    if (orbstep == 10) {cyanTrans = 15;}
    if (orbstep == 11) {cyanTrans = 20;}
    if (orbstep == 12) {cyanTrans = 25;}


    if (collapsestate == true || collapsestate == false) {
        for (var i = 1; i <= numCyanNodes; i++) {

            newAngle = (360/numCyanNodes)*(i-1)-90;
            $("#cyannode"+i).css('transform', "rotate("+newAngle+"deg)"+" translate("+cyanTrans+"vh)");

        }
    }
    // if (collapsestate == false) {
    //     if (numCyanNodes == 1) {
    //         $("#cyannode1").css('transform', "rotate(-180deg)"+" translate("+cyanTrans+"vh)");
    //     }
    //     else {
    //         for (var i = 1; i <= numCyanNodes; i++) {

    //             newAngle = (180/(numCyanNodes-1))*(i-1)-180;
    //             $("#cyannode"+i).css('transform', "rotate("+newAngle+"deg)"+" translate("+cyanTrans+"vh)");

    //         }
    //     }
    // }
}
function MagentaPosition() {
    if (orbstep == 1) {magentaTrans = 35;}
    if (orbstep == 2) {magentaTrans = 10;}
    if (orbstep == 3) {magentaTrans = 15;}
    if (orbstep == 4) {magentaTrans = 20;}
    if (orbstep == 5) {magentaTrans = 25;}
    if (orbstep == 6) {magentaTrans = 30;}
    if (orbstep == 7) {magentaTrans = 35;}
    if (orbstep == 8) {magentaTrans = 10;}
    if (orbstep == 9) {magentaTrans = 15;}
    if (orbstep == 10) {magentaTrans = 20;}
    if (orbstep == 11) {magentaTrans = 25;}
    if (orbstep == 12) {magentaTrans = 30;}


    if (collapsestate == true || collapsestate == false) {
        for (var i = 1; i <= numMagentaNodes; i++) {

            newAngle = (360/numMagentaNodes)*(i-1)-90;
            $("#magentanode"+i).css('transform', "rotate("+newAngle+"deg)"+" translate("+magentaTrans+"vh)");

        }
    }
    // if (collapsestate == false) {
    //     if (numMagentaNodes == 1) {
    //         $("#magentanode1").css('transform', "rotate(-180deg)"+" translate("+magentaTrans+"vh)");
    //     }
    //     else {
    //         for (var i = 1; i <= numMagentaNodes; i++) {

    //             newAngle = (180/(numMagentaNodes-1))*(i-1)-180;
    //             $("#magentanode"+i).css('transform', "rotate("+newAngle+"deg)"+" translate("+magentaTrans+"vh)");

    //         }
    //     }
    // }
}
