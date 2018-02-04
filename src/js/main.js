jQuery(document).ready(function($){
  var menuItems         = [].slice.call( document.querySelectorAll( '.menu__item' ) ),
menuSubs          = [].slice.call( document.querySelectorAll( '.dropdown-menu') ),
selectedMenu      = undefined,
subBg			  = document.querySelector( '.dropdown__bg' ),
subBgBtm		  = document.querySelector( '.dropdown__bg-bottom' ),
subArr			  = document.querySelector( '.dropdown__arrow' ),
subCnt            = document.querySelector( '.dropdown__wrap' ),
header			  = document.querySelector( '.main-header' ),
closeDropdownTimeout,

startCloseTimeout = function (){
  closeDropdownTimeout = setTimeout( () => closeDropdown() , 50 );
},

stopCloseTimeout   = function () {
  clearTimeout( closeDropdownTimeout );
},

openDropdown      = function (el) {
  
  //- get menu ID
  var menuId     = el.getAttribute( 'data-sub' );
  //- get related sub menu
  var menuSub    = document.querySelector( '.dropdown-menu[data-sub="'+menuId+'"]' );
  //- get menu sub content
  var menuSubCnt = menuSub.querySelector( '.dropdown-menu__content' )
  //- get bottom section of current sub
  // var menuSubBtm = menuSubCnt.querySelector('.bottom-section').getBoundingClientRect();
  //- get height of top section
  var menuSubTop = menuSubCnt.querySelector('.top-section').getBoundingClientRect();
  //- get menu position
  var menuMeta   = el.getBoundingClientRect();
  //- get sub menu position
  var subMeta    = menuSubCnt.getBoundingClientRect();
  
  
  //- set selected menu
  selectedMenu = menuId;


  //- Remove active Menu
  menuItems.forEach( el => el.classList.remove( 'active' ) );
  //- Set current menu to active
  el.classList.add( 'active' );
  
  //- Remove active sub menu
  menuSubs.forEach( el => el.classList.remove( 'active' ) );
  //- Set current menu to active
  menuSub.classList.add( 'active' );

  //- Set dropdown menu background style to match current submenu style
  subBg.style.opacity    = 1;
  subBg.style.left       = menuMeta.left - ( (subMeta.width / 2) - menuMeta.width / 2 ) + 'px';
  subBg.style.width      = subMeta.width+'px';
  subBg.style.height     = subMeta.height+'px';
  //- Set dropdown menu bottom section background position
  subBgBtm.style.top     = menuSubTop.height+'px';
  // console.log( menuSubBtm );
  
  //- Set Arrow position
  subArr.style.opacity  = 1;
  subArr.style.left     = menuMeta.left + menuMeta.width/2 - 10 + 'px';
  
  //- Set sub menu style
  subCnt.style.opacity = 1;
  subCnt.style.left    = menuMeta.left - ( (subMeta.width / 2) - menuMeta.width / 2 ) + 'px';
  subCnt.style.width   = subMeta.width+'px';
  subCnt.style.height  = subMeta.height+'px';
  
  //- Set current sub menu style
  menuSub.style.opacity = 1;
  
  header.classList.add('dropdown-active');

},
closeDropdown     = function () {

  //- Remove active class from all menu items
  menuItems.forEach( el => el.classList.remove('active') );
  //- Remove active class from all sub menus
  menuSubs.forEach ( el => {
    el.classList.remove( 'active' );
    el.style.opacity = 0;
  } );
  //- set sub menu background opacity
  subBg.style.opacity   = 0;
  //- set arrow opacity
  subArr.style.opacity = 0;
  

  // unset selected menu
  selectedMenu = undefined;
  
  header.classList.remove('dropdown-active');
};


//- Binding mouse event to each menu items
menuItems.forEach( el => {

//- mouse enter event
el.addEventListener( 'mouseenter', function() {
  stopCloseTimeout();
  openDropdown( this );
}, false );

//- mouse leave event
el.addEventListener( 'mouseleave', () => startCloseTimeout(), false);

} );

//- Binding mouse event to each sub menus
menuSubs.forEach( el => {

el.addEventListener( 'mouseenter', () => stopCloseTimeout(), false );
el.addEventListener( 'mouseleave', () => startCloseTimeout(), false );

} );
})


Vue.component('sidebar-toggle',{
  template: 
  `
  <div class="sidebar-toggle" @click="toggleClass">
    <a href="#!">
      <span></span>
      <span></span>
      <span></span>
    </a>
  </div>  
  `,
  methods: {
    toggleClass () {
     $('.sidebar-toggle').toggleClass('active')
    }
  }
})



Vue.component('mobile-nav', {
  template: 
  `
   <!-- MOBILE NAV -->
   
   <header class="hide-on-large-only">
    <div class="header-item">
      <a class="left"  href="/">
        <img src="src/images/logo.png">
      </a>

      <div class="right" @click="close()">
          <!--CROSS-->
          <sidebar-toggle></sidebar-toggle>
      </div>
    </div>
    <div menu-dropdown class="universal-shadow">
      <ul>
        <li><a href="#">About</a></li>
        <li @click="toggleLocation" data-sub="location"><a href="#">Location / 堂会</a></li>
        <ul id="location">
          <li><a href="">CBC SEA PARK (E)</a></li>
          <li><a href="">CBC SS2 中文堂</a></li>
          <li><a href="">CBC SUBANG(E)</a></li>
          <li><a href="">CBC PUCHONG (E)</a></li>
          <li><a href="">CBC 蒲种堂会</a></li>
          <li><a href="">CBC KOTA DAMANSARA (E)</a></li>
          <li><a href="">CBC 哥打白沙罗堂会</a></li>
          <li><a href="">CBC KOTA KEMUNING (E)</a></li>
          <li><a href="">CBC 增江</a></li>
          <li><a href="">CBC 任嘉隆</a></li>
          <li><a href="">CBC KINRARA</a></li>
        </ul>
        <li><a href="#">CBCLC</a></li>
        
    
        <li><a href="#">Touch Community Services</a></li>
      </ul>
      
    </div> 
   </header>
  `,
  methods: {
    close () {

      $('[menu-dropdown]').toggleClass('active')
      // $('#mobile-nav-list').toggleClass('active')
      if($('[menu-dropdown]').hasClass('active')) {
        $('.main').css('background', 'rgba(0,0,0,0.5)').css('filter','brightness(0.5)')
        // $('.header-item').toggleClass('active')
        // $('#mobile-nav-list .header-item .left').css('display','block')

      } else {
        $('.main').css('background', 'initial').css('filter','none')
        // $('.header-item').toggleClass('active')
        // if ($(window).scrollTop() > 10){
        //   $('#mobile-nav-list .header-item .left').css('display','none')
        // }
      }
    },
    toggleLocation () {
      $('[data-sub=location]').toggleClass('active')
    }
  }
 
})

Vue.component('desktop-nav', {
  template: 
  `
   <!-- MOBILE NAV -->
   
   <header class="main-header hide-on-med-and-down">
      <a href="/" class="logo">
        <!--LOGO-->
        <img src="src/images/logo.png">
      </a>
      <ul class="menu">
        <li  data-sub="about"><a href="#">About</a></li>
        <li class="menu__item" data-sub="location"><a href="#">Location / 堂会</a></li>
        <li  data-sub="cbclc"><a href="#">CBCLC</a></li>
        <li  data-sub="touch"><a href="#">Touch Community Services</a></li>
      </ul>
      
    <div class="dropdown-holder">
      <div class="dropdown__arrow"></div>
      <div class="dropdown__bg">
        <div class="dropdown__bg-bottom"></div>
      </div>
      <div class="dropdown__wrap">
        <div class="dropdown-menu" id="location" data-sub="location">
          <div class="dropdown-menu__content center-align">
            <div class="top-section">
              <div class="col-2">
                <ul>
                  <li><a href=""><h3>CBC SEA PARK (E)</h3></a></li>
                  <li><a href=""><h3>CBC SS2 中文堂</h3></a></li>
                  <li><a href=""><h3>CBC SUBANG(E)</h3></a></li>
                  <li><a href=""><h3>CBC PUCHONG (E)</h3></a></li>
                  <li><a href=""><h3>CBC 蒲种堂会</h3></a></li>
                  <li><a href=""><h3>CBC KOTA DAMANSARA (E)</h3></a></li>
                  <li><a href=""><h3>CBC 哥打白沙罗堂会</h3></a></li>
                  <li><a href=""><h3>CBC KOTA KEMUNING (E)</h3></a></li>
                  <li><a href=""><h3>CBC 增江</h3></a></li>
                  <li><a href=""><h3>CBC 任嘉隆</h3></a></li>
                  <li><a href=""><h3>CBC KINRARA</h3></a></li>
                </ul>
                
              </div>
            </div>
          
          </div>
        </div>
        
      </div>
    </div>
  </header>
  `
 
})

vueapp = new Vue({
  el: '#wrapper'
})