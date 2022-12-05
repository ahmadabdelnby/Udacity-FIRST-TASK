let allSection=document.getElementsByClassName('section');
let allSectionTitle=document.getElementsByClassName('Sectiontitle');
let navItems=[];
let navIdxMap=new Map();
let sectionIdxMap=new Map();
let navBar;
let navBarHeight;

function addNavItem(title){
    let mainListItem=document.createElement('li');
    mainListItem.className='navItem';
    let link=document.createElement('a');
    link.innerText=title;
    //link.href="#";
    //prevent ancor link actions
    link.onclick="preventDefault()";
    //console.log(mainListItem);
    navItems.push(mainListItem);
    mainListItem.appendChild(link);
    navIdxMap.set(mainListItem,navItems.length-1);//add to index map
    document.getElementById('navContent').appendChild(mainListItem);
}
function getSectionTitle(idx){
    return allSectionTitle[idx].innerText;
}
//Build nabBar dynamically 
function generateNavBar(){
    //console.log(allSection);
    for(let i=0;i<allSection.length;i++){
        let title=getSectionTitle(i);
        addNavItem(title);
    }
}
//get axis
function getTop(item){
    return item.offsetTop;
}
function getHeight(item){
    return item.offsetHeight;
}


function scrollTo(idx){
    navBar=document.getElementById('navContent');
    navBarHeight=getHeight(navBar)+2;

    window.scroll({
        top:getTop(allSection[idx])-navBarHeight,
        left:0,
        behavior:'smooth'
    })
}

function addScrollEvent(idx){
    navItems[idx].addEventListener('click',()=>{
        let i=navIdxMap.get(navItems[idx]);//get section index by navItem
        scrollTo(i);  
    });
}
function addObserverTo(item){
    let observer=new IntersectionObserver(entries =>{
        for (const entry of entries) {
            let idx=sectionIdxMap.get(entry.target);
            entry.target.classList.toggle("active",entry.isIntersecting)
            navItems[idx].classList.toggle("activeNavItem",entry.isIntersecting);
        }
    },{
        threshold:1
    });

    observer.observe(item);
}
function runMainFunction(){
    //add scroll event listener to all navItems
    generateNavBar();

    //add Observers
    
    for (let i=0;i<allSection.length;i++) {
        sectionIdxMap.set(allSection[i],i);
        addObserverTo(allSection[i]);
    }
    for(let i=0;i<navItems.length;i++) {
        //build index map
        navIdxMap.set(navItems[i],i);
        //add scroll event
        addScrollEvent(i);
    }
}