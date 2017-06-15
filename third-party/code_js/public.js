function navAFoucs(elem){
    elem.focus(function(){
        this.blur();
    })
}
$(document).ready(function(){
    navAFoucs($('#nav a'));
})